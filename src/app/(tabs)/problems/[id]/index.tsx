import { useAuth } from "@/hooks/use-auth";
import { useScreenInsets } from "@/hooks/use-screen-insets";
import {
  difficultyTint,
  fetchProblemById,
  fetchUserSubmissionsForProblem,
  getConstraintLines,
  getExamples,
  type LanguageExample,
  type Problem,
  type SubmissionListItem,
} from "@/lib/problems";
import { colors } from "@/lib/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Tab = "description" | "solutions" | "submissions";

const TABS: { id: Tab; label: string; icon: keyof typeof Feather.glyphMap }[] =
  [
    { id: "description", label: "Description", icon: "file-text" },
    { id: "solutions", label: "Solutions", icon: "lock" },
    { id: "submissions", label: "Submissions", icon: "code" },
  ];

export default function ProblemDetailsScreen() {
  const { contentPadding } = useScreenInsets({
    includeBottomInset: true,
    bottomExtra: 28,
    topExtra: 8,
  });
  const { user } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [submissions, setSubmissions] = useState<SubmissionListItem[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProblemById(id);
        if (!active) return;
        setProblem(data);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load problem",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      if (!id || !user?.id) return;
      setSubmissionsLoading(true);
      fetchUserSubmissionsForProblem(user.id, id)
        .then(setSubmissions)
        .finally(() => setSubmissionsLoading(false));
    }, [id, user?.id]),
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.centered} edges={["top", "bottom"]}>
        <ActivityIndicator color={colors.accent} />
      </SafeAreaView>
    );
  }

  if (error || !problem) {
    return (
      <SafeAreaView style={styles.centered} edges={["top", "bottom"]}>
        <Feather name="alert-circle" size={32} color={colors.textMuted} />
        <Text style={styles.notFoundTitle}>Problem not found</Text>
        <Text style={styles.notFoundSubtitle}>
          {error ?? `The problem with id "${id}" doesn't exist yet.`}
        </Text>
        <Pressable
          onPress={() => router.replace("/problems" as never)}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.backButtonLabel}>Back to problems</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const tint = difficultyTint(problem.difficulty);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView
          contentContainerStyle={[styles.scroll, contentPadding]}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={styles.navRow}>
            <Pressable
              onPress={() => router.back()}
              hitSlop={8}
              style={({ pressed }) => [
                styles.iconButton,
                pressed && styles.pressed,
              ]}
            >
              <Feather name="arrow-left" size={18} color={colors.textPrimary} />
            </Pressable>
            <Text style={styles.navTitle}>Problem Details</Text>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.problemTitle}>{problem.title}</Text>
            <View
              style={[styles.difficultyBadge, { backgroundColor: tint.bg }]}
            >
              <Text style={[styles.difficultyText, { color: tint.fg }]}>
                {problem.difficulty}
              </Text>
            </View>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaLeft}>
              <Feather name="tag" size={13} color={colors.accent} />
              <Text style={styles.metaText}>
                {problem.tags.slice(0, 2).join(" · ") || "General"}
              </Text>
            </View>
            <Pressable
              onPress={() =>
                Alert.alert(
                  "Report bug",
                  "Thanks! Bug reporting is coming soon.",
                )
              }
              hitSlop={6}
              style={({ pressed }) => [
                styles.reportButton,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons name="bug-outline" size={12} color={colors.textMuted} />
              <Text style={styles.reportText}>Report bug</Text>
            </Pressable>
          </View>

          <View style={styles.tabs}>
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  style={({ pressed }) => [
                    styles.tabItem,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.tabLabelRow}>
                    <Feather
                      name={tab.icon}
                      size={13}
                      color={active ? colors.accent : colors.textMuted}
                    />
                    <Text
                      style={[
                        styles.tabLabel,
                        { color: active ? colors.accent : colors.textMuted },
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </View>
                  {active ? <View style={styles.tabIndicator} /> : null}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.tabBody}>
            {activeTab === "description" ? (
              <DescriptionTab problem={problem} />
            ) : null}
            {activeTab === "solutions" ? (
              <LockedTab
                title="Solutions are locked"
                subtitle="Submit a passing answer to unlock community solutions."
                icon="lock"
              />
            ) : null}
            {activeTab === "submissions" ? (
              <SubmissionsTab
                submissions={submissions}
                loading={submissionsLoading}
              />
            ) : null}
          </View>

          <View style={styles.footer}>
            <Pressable
              onPress={() =>
                router.push(`/problems/${problem.id}/solve` as never)
              }
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.submitLabel}>Solve</Text>
              <Feather name="play" size={16} color="#FFFFFF" />
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function DescriptionTab({ problem }: { problem: Problem }) {
  const examples = getExamples(problem);
  const constraints = getConstraintLines(problem.constraints);

  return (
    <View>
      <RichDescription text={problem.description} />

      {examples.map((example, index) => (
        <ExampleBlock key={index} example={example} index={index} />
      ))}

      {constraints.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Constraints</Text>
          <View style={styles.constraintsList}>
            {constraints.map((constraint, index) => (
              <View key={index} style={styles.constraintRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.constraintText}>{constraint}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {problem.hints ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hints</Text>
          <Text style={styles.bodyText}>{problem.hints}</Text>
        </View>
      ) : null}

      {problem.tags.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.tagsLabel}>TAGS</Text>
          <View style={styles.tagsRow}>
            {problem.tags.map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </View>
  );
}

function ExampleBlock({
  example,
  index,
}: {
  example: LanguageExample;
  index: number;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Example {index + 1}</Text>
      <View style={styles.codeBlock}>
        <Text style={styles.codeLine}>
          <Text style={styles.codeMuted}>Input: </Text>
          {example.input}
        </Text>
        <Text style={[styles.codeLine, { marginTop: 4 }]}>
          <Text style={styles.codeMuted}>Output: </Text>
          {example.output}
        </Text>
        {example.explanation ? (
          <Text style={styles.explanation}>{example.explanation}</Text>
        ) : null}
      </View>
    </View>
  );
}

function RichDescription({ text }: { text: string }) {
  const blocks = text.split(/\n\n+/);

  return (
    <View style={{ gap: 12 }}>
      {blocks.map((block, idx) => {
        const lines = block.split("\n");
        const isList = lines.every((line) => line.startsWith("- "));
        if (isList) {
          return (
            <View key={idx} style={{ gap: 6 }}>
              {lines.map((line, lineIdx) => (
                <View key={lineIdx} style={styles.constraintRow}>
                  <Text style={styles.bullet}>•</Text>
                  <BoldText text={line.slice(2)} style={styles.bodyText} />
                </View>
              ))}
            </View>
          );
        }

        return <BoldText key={idx} text={block} style={styles.bodyText} />;
      })}
    </View>
  );
}

function BoldText({
  text,
  style,
}: {
  text: string;
  style: { fontSize: number; lineHeight: number; color?: string };
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={[styles.bodyText, style]}>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <Text key={idx} style={styles.boldPart}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return <Text key={idx}>{part}</Text>;
      })}
    </Text>
  );
}

function LockedTab({
  title,
  subtitle,
  icon,
}: {
  title: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
}) {
  return (
    <View style={styles.lockedCard}>
      <View style={styles.lockedIcon}>
        <Feather name={icon} size={20} color={colors.accent} />
      </View>
      <Text style={styles.lockedTitle}>{title}</Text>
      <Text style={styles.lockedSubtitle}>{subtitle}</Text>
    </View>
  );
}

function statusTint(status: string) {
  if (status.toLowerCase().includes("accepted")) {
    return { fg: colors.success, bg: colors.successBg };
  }
  if (status.toLowerCase().includes("wrong")) {
    return { fg: colors.error, bg: colors.errorBg };
  }
  return { fg: colors.warning, bg: colors.warningBg };
}

function SubmissionsTab({
  submissions,
  loading,
}: {
  submissions: SubmissionListItem[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <View style={styles.submissionsLoading}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (submissions.length === 0) {
    return (
      <LockedTab
        title="No submissions yet"
        subtitle="Once you run your first attempt it will appear here."
        icon="inbox"
      />
    );
  }

  return (
    <View style={styles.submissionsList}>
      {submissions.map((submission) => {
        const tint = statusTint(submission.status);
        return (
          <View key={submission.id} style={styles.submissionCard}>
            <View style={styles.submissionTop}>
              <View style={[styles.statusBadge, { backgroundColor: tint.bg }]}>
                <Text style={[styles.statusBadgeText, { color: tint.fg }]}>
                  {submission.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.submissionDate}>
                {new Date(submission.created_at).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            <View style={styles.submissionMeta}>
              <View style={styles.submissionMetaItem}>
                <Feather name="code" size={12} color={colors.textMuted} />
                <Text style={styles.submissionMetaText}>
                  {submission.language}
                </Text>
              </View>
              {submission.time ? (
                <View style={styles.submissionMetaItem}>
                  <Feather name="clock" size={12} color={colors.textMuted} />
                  <Text style={styles.submissionMetaText}>
                    {submission.time}
                  </Text>
                </View>
              ) : null}
              {submission.memory ? (
                <View style={styles.submissionMetaItem}>
                  <Feather name="cpu" size={12} color={colors.textMuted} />
                  <Text style={styles.submissionMetaText}>
                    {submission.memory}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safe: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: colors.background,
  },
  notFoundTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
  },
  notFoundSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: "center",
    marginTop: 8,
  },
  backButton: {
    marginTop: 24,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.accent,
  },
  backButtonLabel: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  scroll: {
    flexGrow: 1,
  },
  navRow: {
    height: 48,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  navTitle: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  problemTitle: {
    flex: 1,
    paddingRight: 12,
    color: colors.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1,
  },
  metaRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingRight: 12,
  },
  metaText: {
    color: colors.textMuted,
    fontSize: 12,
    marginLeft: 8,
  },
  reportButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reportText: {
    color: colors.textMuted,
    fontSize: 11,
    marginLeft: 6,
  },
  tabs: {
    marginTop: 20,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 12,
  },
  tabLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 6,
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    left: "20%",
    right: "20%",
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.accent,
  },
  tabBody: {
    marginTop: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  bodyText: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
  boldPart: {
    color: colors.textPrimary,
    fontWeight: "700",
  },
  codeBlock: {
    marginTop: 8,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.sidebar,
    borderWidth: 1,
    borderColor: colors.border,
  },
  codeLine: {
    color: colors.textPrimary,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Courier",
  },
  codeMuted: {
    color: colors.textMuted,
  },
  explanation: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 8,
  },
  constraintsList: {
    marginTop: 8,
    gap: 6,
  },
  constraintRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bullet: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
    marginRight: 8,
  },
  constraintText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Courier",
  },
  tagsLabel: {
    color: colors.textMuted,
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  lockedCard: {
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  lockedIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accentSoft,
  },
  lockedTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 16,
  },
  lockedSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8,
  },
  submissionsLoading: {
    paddingVertical: 40,
    alignItems: "center",
  },
  submissionsList: {
    gap: 12,
  },
  submissionCard: {
    borderRadius: 12,
    padding: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  submissionTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  submissionDate: {
    color: colors.textMuted,
    fontSize: 12,
  },
  submissionMeta: {
    marginTop: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  submissionMetaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  submissionMetaText: {
    color: colors.textMuted,
    fontSize: 12,
  },
  footer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  submitButton: {
    height: 54,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
  },
  submitLabel: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
  pressed: {
    opacity: 0.75,
  },
});
