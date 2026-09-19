import {
  CaseResult,
  outcomeStatusLabel,
  parseTestCases,
  runAllTestCases,
} from "@/lib/judge";
import { runTaskAsync } from "@/lib/run-task";
import { getSupabaseAdmin, getUserFromRequest } from "@/lib/supabase-admin";

function overallStatus(results: CaseResult[]) {
  if (results.every((r) => r.outcome === "accepted"))
    return "accepted" as const;
  if (results.some((r) => r.outcome === "error")) return "error" as const;
  return "wrong-answer" as const;
}

export async function POST(request: Request) {
  try {
    const user = await getUserFromRequest(request);

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { problemId, language, sourceCode } = await request.json();

    if (!problemId || !language || !sourceCode) {
      return Response.json(
        { error: "problemId, language and sourceCode are required" },
        { status: 400 },
      );
    }

    const admin = getSupabaseAdmin();
    const { data: problem } = await admin
      .from("problems")
      .select("id, test_cases")
      .eq("id", problemId)
      .maybeSingle();

    if (!problem) {
      return Response.json(
        { error: `Problem with id ${problemId} not found` },
        { status: 404 },
      );
    }

    const testCases = parseTestCases(problem.test_cases);

    if (!testCases || testCases.length === 0) {
      return Response.json(
        { error: "No test cases found for this problem" },
        { status: 400 },
      );
    }

    const results = await runTaskAsync(() =>
      runAllTestCases({
        language,
        sourceCode,
        testCases,
      }),
    );

    const status = overallStatus(results);
    const statusLabel = outcomeStatusLabel(status);
    const times = results
      .map((r) => r.timeSec)
      .filter((t): t is number => t != null);
    const memories = results
      .map((r) => r.memoryKb)
      .filter((m): m is number => m != null);

    const { data: submission, error: submissionError } = await admin
      .from("submissions")
      .insert({
        user_id: user.id,
        problem_id: problemId,
        source_code: { [language]: sourceCode },
        language,
        status: statusLabel,
        memory: memories.length ? `${Math.max(...memories)} KB` : null,
        time: times.length ? `${Math.max(...times).toFixed(3)} s` : null,
      })
      .select("id")
      .single();

    if (submissionError || !submission) {
      return Response.json(
        { error: submissionError?.message ?? "Failed to save submission." },
        { status: 500 },
      );
    }

    await admin.from("test_case_results").insert(
      results.map((result) => ({
        submission_id: submission.id,
        test_case: result.index + 1,
        passed: result.outcome === "accepted",
        stdout: result.actualOutput,
        expected: result.expectedOutput,
        stderr: result.stderr || null,
        status: outcomeStatusLabel(result.outcome),
        memory: result.memoryKb != null ? `${result.memoryKb} KB` : null,
        time: result.timeSec != null ? `${result.timeSec.toFixed(3)} s` : null,
      })),
    );

    const solved = status === "accepted";
    if (solved) {
      await admin
        .from("problem_solved")
        .upsert(
          { user_id: user.id, problem_id: problemId },
          { onConflict: "user_id,problem_id", ignoreDuplicates: true },
        );
    }

    return Response.json({
      submissionId: submission.id,
      status: statusLabel,
      solved,
      passed: results.filter((r) => r.outcome === "accepted").length,
      total: results.length,
      results,
    });
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "Submission failed";
    return Response.json({ error: message }, { status: error?.status || 500 });
  }
}
