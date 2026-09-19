import { executeOnCodeBox, parseTestCases } from "@/lib/judge";
import { runTaskAsync } from "@/lib/run-task";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { StatusError } from "expo-server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body?.language_id || !body?.source_code) {
      throw new StatusError(
        400,
        "`language_id` and `source_code` are required.",
      );
    }

    let stdin = body.stdin ?? "";
    let expectedOutput = body.expected_output ?? "";

    // If problemId is supplied, use the problem's first actual test case from the database
    if (body.problemId) {
      try {
        const admin = getSupabaseAdmin();
        const { data: problem } = await admin
          .from("problems")
          .select("test_cases")
          .eq("id", body.problemId)
          .maybeSingle();

        const testCases = parseTestCases(problem?.test_cases);
        if (testCases.length > 0) {
          stdin = testCases[0].input;
          expectedOutput = testCases[0].output;
        }
      } catch (err) {
        console.warn(
          "Failed to fetch test case for problemId, falling back to body:",
          err,
        );
      }
    }

    const data = await runTaskAsync(() =>
      executeOnCodeBox({
        languageId: body.language_id,
        sourceCode: body.source_code,
        stdin,
        expectedOutput,
      }),
    );

    return Response.json(data);
  } catch (error: any) {
    const message =
      error instanceof Error ? error.message : "Run execution failed.";
    return Response.json(
      {
        stdout: null,
        stderr: message,
        status: { id: -1, description: "Error" },
      },
      { status: error?.status || 500 },
    );
  }
}
