import { useAuth } from "@/hooks/use-auth";
import { useScreenInsets } from "@/hooks/use-screen-insets";
import { fetchProblems, fetchSolvedCount } from "@/lib/problems";
import { colors, radius, spacing } from "@/lib/theme";
import { getAvatar, getDisplayName, getInitials } from "@/lib/user";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { contentPadding } = useScreenInsets({ bottomExtra: 24, topExtra: 8 });
  const { user, isLoading } = useAuth();
  const [firstProblemId, setFirstProblemId] = useState<string | null>(null);
  const [solvedCount, setSolvedCount] = useState(0);

  useEffect(() => {
    if (!user?.id) return;
    fetchProblems().then((problems) =>
      setFirstProblemId(problems[0]?.id ?? null),
    );
    fetchSolvedCount(user.id).then(setSolvedCount);
  }, [user?.id]);

  if (isLoading || !user) {
    return (
      <SafeAreaView style={styles.loading} edges={["top", "bottom"]}>
        <ActivityIndicator color={colors.accent} />
      </SafeAreaView>
    );
  }

  const displayName = getDisplayName(user);
  const firstName = displayName.split(" ")[0] ?? "User";
  const initials = getInitials(displayName);
  const avatarUrl = getAvatar(user);

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView
          contentContainerStyle={[styles.scroll, contentPadding]}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.brand}>Codexa</Text>
          </View>

          {/* Welcome */}
          <View style={styles.welcomeRow}>
            <View style={styles.avatar}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarInitials}>{initials}</Text>
              )}
            </View>
            <View style={styles.welcomeText}>
              <Text style={styles.welcomeLabel}>Welcome back</Text>
              <Text style={styles.welcomeName} numberOfLines={1}>
                {firstName}
              </Text>
            </View>
          </View>

          {/* Hero Card */}
          <Pressable
            onPress={() => {
              if (firstProblemId) {
                router.push(`/problems/${firstProblemId}` as never);
              } else {
                router.push("/problems" as never);
              }
            }}
            style={({ pressed }) => [
              styles.heroCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroIconBox}>
                <Feather name="zap" size={22} color={colors.accent} />
              </View>
              <View style={styles.heroTextWrap}>
                <Text style={styles.heroTitle}>Ready to practice</Text>
                <Text style={styles.heroSubtitle}>
                  Jump into a problem and keep the streak going.
                </Text>
              </View>
            </View>
            <Feather name="chevron-right" size={18} color={colors.accent} />
          </Pressable>

          {/* Quick Practice */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Practice</Text>
            <Text style={styles.sectionHint}>Tap to start</Text>
          </View>

          <View style={styles.actions}>
            <ActionCard
              icon="code"
              title="Browse Problems"
              subtitle="Pick from the problem set"
              onPress={() => router.push("/problems" as never)}
            />
            <ActionCard
              icon="play-circle"
              title="Daily Challenge"
              subtitle="Start with the first challenge"
              onPress={() => {
                if (firstProblemId) {
                  router.push(`/problems/${firstProblemId}` as never);
                } else {
                  router.push("/problems" as never);
                }
              }}
            />
            <ActionCard
              icon="bookmark"
              title="Saved Problems"
              subtitle="Bookmarks are coming soon"
              onPress={() => router.push("/problems" as never)}
            />
          </View>

          {/* Stats */}
          <View style={styles.weekSection}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <View style={styles.statsRow}>
              <StatCard label="Solved" value={String(solvedCount)} />
              <StatCard label="Streak" value="0" />
              <StatCard label="Saved" value="0" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function ActionCard({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.actionCard, pressed && styles.pressed]}
    >
      <View style={styles.actionIcon}>
        <Feather name={icon} size={20} color={colors.accent} />
      </View>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
      <Feather name="chevron-right" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statDot} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
  },
  header: {
    marginBottom: spacing.lg,
  },
  brand: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "700",
  },
  welcomeRow: {
    marginBottom: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: colors.accentSoft,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarInitials: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: "700",
  },
  welcomeText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  welcomeLabel: {
    color: colors.textMuted,
    fontSize: 13,
  },
  welcomeName: {
    color: colors.textPrimary,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
  },
  heroCard: {
    marginBottom: spacing.xl,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: "rgba(16, 163, 127, 0.3)",
    backgroundColor: colors.accentSoft,
    padding: spacing.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  heroIconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16, 163, 127, 0.2)",
  },
  heroTextWrap: {
    flex: 1,
    marginLeft: spacing.md,
    marginRight: spacing.sm,
  },
  heroTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  heroSubtitle: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
  },
  sectionHint: {
    color: colors.textMuted,
    fontSize: 12,
  },
  actions: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  actionCard: {
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.base,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.7,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accentSoft,
  },
  actionText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  actionTitle: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  actionSubtitle: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  weekSection: {
    marginBottom: spacing.xl,
  },
  statsRow: {
    marginTop: spacing.md,
    flexDirection: "row",
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.base,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginBottom: spacing.sm,
  },
  statValue: {
    color: colors.textPrimary,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
  },
  statLabel: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
});
