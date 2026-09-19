import { useAuth } from "@/hooks/use-auth";
import { useScreenInsets } from "@/hooks/use-screen-insets";
import {
  difficultyLabel,
  difficultyTint,
  fetchProblems,
  type Difficulty,
  type ProblemListItem,
} from "@/lib/problems";
import { supabase } from "@/lib/supabase";
import { colors, radius, spacing } from "@/lib/theme";
import { Feather } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FilterDifficulty = Difficulty | "ALL";

export default function ProblemsScreen() {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const { contentPadding } = useScreenInsets({ bottomExtra: 24, topExtra: 8 });

  const [problems, setProblems] = useState<ProblemListItem[]>([]);
  const [solvedProblemIds, setSolvedProblemIds] = useState<Set<string>>(
    new Set(),
  );

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterDifficulty>("ALL");

  const loadData = useCallback(
    async (isRefresh = false) => {
      if (!isRefresh) setLoading(true);
      setError(null);
      try {
        const [fetchedProblems, solvedResponse] = await Promise.all([
          fetchProblems(),
          userId
            ? supabase
                .from("problem_solved")
                .select("problem_id")
                .eq("user_id", userId)
            : Promise.resolve({ data: null, error: null }),
        ]);

        setProblems(fetchedProblems || []);

        if (solvedResponse.data) {
          setSolvedProblemIds(
            new Set(solvedResponse.data.map((d) => d.problem_id)),
          );
        } else {
          setSolvedProblemIds(new Set());
        }
      } catch (err: any) {
        setError(err.message || "Failed to load problems");
      } finally {
        if (!isRefresh) setLoading(false);
        if (isRefresh) setRefreshing(false);
      }
    },
    [userId],
  );

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const handleRefresh = () => {
    setRefreshing(true);
    loadData(true);
  };

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      const matchesSearch = p.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "ALL" || p.difficulty === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [problems, searchQuery, activeFilter]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Problems</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filteredProblems.length}</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color={colors.textMuted}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search problems..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filtersContainer}>
        {(["ALL", "EASY", "MEDIUM", "HARD"] as FilterDifficulty[]).map(
          (filter) => {
            const isActive = activeFilter === filter;
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  isActive
                    ? styles.filterChipActive
                    : styles.filterChipInactive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isActive
                      ? styles.filterChipTextActive
                      : styles.filterChipTextInactive,
                  ]}
                >
                  {filter === "ALL"
                    ? "All"
                    : difficultyLabel(filter as Difficulty)}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>
    </View>
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: ProblemListItem;
    index: number;
  }) => {
    const isSolved = solvedProblemIds.has(item.id);
    const tint = difficultyTint(item.difficulty);

    return (
      <Pressable
        style={({ pressed }) => [
          styles.problemRow,
          pressed && styles.problemRowPressed,
        ]}
        onPress={() => router.push(`/problems/${item.id}`)}
      >
        <View style={styles.problemLeft}>
          <Text style={styles.problemNumber}>{index + 1}.</Text>
          <View style={styles.problemInfo}>
            <Text style={styles.problemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            {item.tags && item.tags.length > 0 && (
              <Text style={styles.problemTags} numberOfLines={1}>
                {item.tags.slice(0, 2).join(", ")}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.problemRight}>
          <View style={[styles.difficultyBadge, { backgroundColor: tint.bg }]}>
            <Text style={[styles.difficultyText, { color: tint.fg }]}>
              {difficultyLabel(item.difficulty)}
            </Text>
          </View>
          <View style={styles.solvedContainer}>
            {isSolved ? (
              <Feather name="check-circle" size={20} color={colors.accent} />
            ) : (
              <View style={styles.unsolvedCircle} />
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.accent} />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => loadData()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredProblems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No problems found</Text>
          </View>
        }
        contentContainerStyle={contentPadding}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.accent}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  headerContainer: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  countBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
  },
  countText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    height: 48,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
  },
  filtersContainer: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  filterChipActive: {
    backgroundColor: colors.accent,
  },
  filterChipInactive: {
    backgroundColor: colors.surface,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  filterChipTextInactive: {
    color: colors.textSecondary,
  },
  problemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  problemRowPressed: {
    backgroundColor: colors.surface,
  },
  problemLeft: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  problemNumber: {
    color: colors.textMuted,
    fontSize: 16,
    width: 30,
  },
  problemInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  problemTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  problemTags: {
    color: colors.textMuted,
    fontSize: 13,
  },
  problemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "600",
  },
  solvedContainer: {
    width: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  unsolvedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  retryButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "500",
  },
});
