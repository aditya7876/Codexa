import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CodeEditor from "@/components/code-editor";
import { useAuth } from "@/hooks/use-auth";
import { LANGUAGE_ID_MAP } from "@/lib/judge";
import {
  fetchProblemById,
  getAvailableLanguages,
  getExamples,
  getStarterCode,
  LANGUAGE_LABEL,
  type LanguageId,
  type Problem,
} from "@/lib/problems";
import { colors, radius, spacing, typography } from "@/lib/theme";

export default function SolveProblemScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { session } = useAuth();

  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState<LanguageId>("javascript");
  const [code, setCode] = useState("");
  const [showDescription, setShowDescription] = useState(false);

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [runResult, setRunResult] = useState<any | null>(null);
  const [submitResult, setSubmitResult] = useState<any | null>(null);

  useEffect(() => {
    async function loadProblem() {
      if (!id) return;
      try {
        const prob = await fetchProblemById(id);
        if (prob) {
          setProblem(prob);
          const langs = getAvailableLanguages(prob);
          if (langs.length > 0) {
            const defaultLang = langs[0];
            setLanguage(defaultLang);
            setCode(getStarterCode(prob, defaultLang));
          }
        }
      } catch (error) {
        console.error("Failed to load problem", error);
      } finally {
        setLoading(false);
      }
    }
    loadProblem();
  }, [id]);

  const handleLanguageChange = (lang: LanguageId) => {
    setLanguage(lang);
    if (problem) {
      setCode(getStarterCode(problem, lang));
    }
    setRunResult(null);
    setSubmitResult(null);
  };

  const handleRun = async () => {
    if (!problem) return;
    setRunning(true);
    setRunResult(null);
    setSubmitResult(null);
    try {
      const examples = getExamples(problem);
      const firstExample = examples[0];
      const rawInput = firstExample?.input || "";
      const cleanedInput =
        rawInput.match(/^[a-zA-Z0-9_]+\s*=\s*(.+)$/)?.[1]?.trim() ??
        rawInput.trim();
      const fallbackStdin =
        (cleanedInput.startsWith('"') && cleanedInput.endsWith('"')) ||
        (cleanedInput.startsWith("'") && cleanedInput.endsWith("'"))
          ? cleanedInput.slice(1, -1)
          : cleanedInput;

      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: id,
          language_id: LANGUAGE_ID_MAP[language],
          source_code: code,
          stdin: fallbackStdin,
          expected_output: firstExample?.output || "",
        }),
      });
      const text = await response.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        data = {
          stderr: text || "Execution failed",
          status: { id: -1, description: "Error" },
        };
      }
      setRunResult(data);
    } catch (error) {
      console.error("Run failed", error);
      setRunResult({
        stderr: error instanceof Error ? error.message : "Run failed",
        status: { id: -1, description: "Error" },
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;
    setSubmitting(true);
    setRunResult(null);
    setSubmitResult(null);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          problemId: id,
          language,
          sourceCode: code,
        }),
      });
      const text = await response.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        data = {
          status: "Error",
          results: [],
        };
      }
      setSubmitResult(data);
    } catch (error) {
      console.error("Submit failed", error);
      setSubmitResult({
        status: "Error",
        results: [],
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!problem) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Problem not found.</Text>
      </View>
    );
  }

  const langs = getAvailableLanguages(problem);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {problem.title}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.runButton}
              onPress={handleRun}
              disabled={running || submitting}
            >
              {running ? (
                <ActivityIndicator size="small" color={colors.textPrimary} />
              ) : (
                <Text style={styles.runButtonText}>Run</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={running || submitting}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.descriptionToggle}
          onPress={() => setShowDescription(!showDescription)}
        >
          <Text style={styles.descriptionToggleText}>Problem Context</Text>
          <Feather
            name={showDescription ? "chevron-up" : "chevron-down"}
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        {showDescription && (
          <View style={styles.descriptionContent}>
            <Text style={styles.descriptionText}>{problem.description}</Text>
            {getExamples(problem).length > 0 && (
              <View style={styles.exampleContainer}>
                <Text style={styles.exampleTitle}>Example 1:</Text>
                <Text style={styles.exampleText}>
                  Input: {getExamples(problem)[0].input}
                </Text>
                <Text style={styles.exampleText}>
                  Output: {getExamples(problem)[0].output}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.languageSelector}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {langs.map((lang) => {
              const isActive = language === lang;
              return (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.languageChip,
                    isActive && styles.languageChipActive,
                  ]}
                  onPress={() => handleLanguageChange(lang)}
                >
                  <Text
                    style={[
                      styles.languageText,
                      isActive && styles.languageTextActive,
                    ]}
                  >
                    {LANGUAGE_LABEL[lang] || lang}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.editorContainer}>
          <CodeEditor value={code} onChangeText={setCode} language={language} />
        </View>

        {(runResult || submitResult) && (
          <View style={styles.resultsPanel}>
            <ScrollView>
              {runResult && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultHeader}>Run Result</Text>
                  <Text
                    style={[
                      styles.resultStatus,
                      runResult.status?.id === 3
                        ? styles.successText
                        : styles.errorText,
                    ]}
                  >
                    {runResult.status?.description || "Unknown"}
                  </Text>
                  {runResult.stdout ? (
                    <View style={styles.outputBox}>
                      <Text style={styles.outputTitle}>Stdout:</Text>
                      <Text style={styles.outputText}>{runResult.stdout}</Text>
                    </View>
                  ) : null}
                  {runResult.stderr ? (
                    <View style={styles.outputBox}>
                      <Text style={styles.outputTitle}>Stderr:</Text>
                      <Text style={styles.outputText}>{runResult.stderr}</Text>
                    </View>
                  ) : null}
                </View>
              )}

              {submitResult && (
                <View style={styles.resultItem}>
                  <Text style={styles.resultHeader}>Submit Result</Text>
                  <Text
                    style={[
                      styles.resultStatus,
                      submitResult.solved
                        ? styles.successText
                        : submitResult.status === "error"
                          ? styles.errorText
                          : styles.warningText,
                    ]}
                  >
                    {submitResult.solved ? "Accepted" : "Not Accepted"}
                  </Text>
                  <Text style={styles.resultCounts}>
                    Passed: {submitResult.passed} / {submitResult.total}
                  </Text>
                  {submitResult.results?.map((res: any, idx: number) => (
                    <View key={idx} style={styles.testCaseItem}>
                      <Text style={styles.testCaseTitle}>
                        Test Case {res.index + 1}
                      </Text>
                      <Text
                        style={[
                          styles.testCaseOutcome,
                          res.outcome === "accepted"
                            ? styles.successText
                            : res.outcome === "wrong-answer"
                              ? styles.errorText
                              : styles.errorText,
                        ]}
                      >
                        {res.outcome === "accepted"
                          ? "Passed"
                          : res.outcome === "wrong-answer"
                            ? "Wrong Answer"
                            : "Error"}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.sidebar,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.sizes.md,
  },
  successText: {
    color: colors.success,
  },
  warningText: {
    color: colors.warning,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.sidebar,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 60,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  headerTitle: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold as any,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  runButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    marginRight: spacing.sm,
    height: 36,
    justifyContent: "center",
  },
  runButtonText: {
    color: colors.textPrimary,
    fontWeight: typography.weights.medium as any,
    fontSize: typography.sizes.sm,
  },
  submitButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    height: 36,
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#FFF",
    fontWeight: typography.weights.medium as any,
    fontSize: typography.sizes.sm,
  },
  descriptionToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  descriptionToggleText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold as any,
  },
  descriptionContent: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  descriptionText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  exampleContainer: {
    backgroundColor: colors.surfaceElevated,
    padding: spacing.sm,
    borderRadius: radius.sm,
  },
  exampleTitle: {
    color: colors.textPrimary,
    fontWeight: typography.weights.semibold as any,
    marginBottom: spacing.xs,
  },
  exampleText: {
    color: colors.textSecondary,
    fontSize: typography.sizes.sm,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  languageSelector: {
    flexDirection: "row",
    padding: spacing.sm,
    backgroundColor: colors.background,
  },
  languageChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    marginRight: spacing.sm,
  },
  languageChipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  languageText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.sm,
  },
  languageTextActive: {
    color: "#FFF",
    fontWeight: typography.weights.semibold as any,
  },
  editorContainer: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  resultsPanel: {
    maxHeight: "40%",
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
  },
  resultItem: {
    marginBottom: spacing.md,
  },
  resultHeader: {
    color: colors.textPrimary,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.bold as any,
    marginBottom: spacing.xs,
  },
  resultStatus: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold as any,
    marginBottom: spacing.sm,
  },
  resultCounts: {
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  outputBox: {
    backgroundColor: colors.surfaceElevated,
    padding: spacing.sm,
    borderRadius: radius.sm,
    marginBottom: spacing.sm,
  },
  outputTitle: {
    color: colors.textMuted,
    fontSize: typography.sizes.xs,
    marginBottom: spacing.xs,
  },
  outputText: {
    color: colors.textPrimary,
    fontSize: typography.sizes.sm,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },
  testCaseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  testCaseTitle: {
    color: colors.textPrimary,
    fontSize: typography.sizes.sm,
  },
  testCaseOutcome: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium as any,
  },
});
