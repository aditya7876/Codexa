import { colors, spacing, radius } from "@/lib/theme";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";

interface ActivityHeatmapProps {
  activity: Map<string, number>;
  loading: boolean;
}

const WEEKS_TO_SHOW = 16;
const DAYS_TO_SHOW = WEEKS_TO_SHOW * 7;

function getActivityColor(count: number): string {
  if (count === 0) return colors.surface;
  if (count === 1) return "#24594B";
  if (count >= 2 && count <= 3) return "#217A62";
  if (count >= 4 && count <= 5) return "#169B78";
  return colors.accent;
}

export function ActivityHeatmap({ activity, loading }: ActivityHeatmapProps) {
  const { grid, totalSubmissions, activeDays, monthLabels } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDate = new Date(today);
    firstDate.setDate(today.getDate() - DAYS_TO_SHOW + 1);
    
    // Align firstDate to Sunday
    const dayOfWeek = firstDate.getDay();
    if (dayOfWeek !== 0) {
      firstDate.setDate(firstDate.getDate() - dayOfWeek);
    }

    const gridDates: Date[] = [];
    let curr = new Date(firstDate);
    // Fill up to today, and complete the week if necessary
    while (curr <= today || curr.getDay() !== 0) {
      if (curr > today && curr.getDay() === 0) break;
      gridDates.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }
    
    const columns = Math.ceil(gridDates.length / 7);
    const gridData: { date: Date; dateStr: string; count: number }[][] = Array.from({ length: columns }, () => []);
    
    let totalSubCount = 0;
    let activeDayCount = 0;

    gridDates.forEach((date, i) => {
      const colIndex = Math.floor(i / 7);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      
      // Ensure we don't render future days beyond today if today isn't Saturday
      // But we need empty placeholders if it's past today
      let count = 0;
      if (date <= today) {
        count = activity.get(dateStr) || 0;
        if (count > 0) {
          totalSubCount += count;
          activeDayCount++;
        }
      }
      
      gridData[colIndex].push({ date, dateStr, count });
    });

    const mLabels: { text: string; colIndex: number }[] = [];
    let lastMonth = -1;
    gridDates.forEach((date, i) => {
      if (date.getDate() === 1 || (i === 0 && date.getDate() <= 7)) {
        const m = date.getMonth();
        if (m !== lastMonth) {
          mLabels.push({
            text: date.toLocaleString('default', { month: 'short' }),
            colIndex: Math.floor(i / 7)
          });
          lastMonth = m;
        }
      }
    });

    return { grid: gridData, totalSubmissions: totalSubCount, activeDays: activeDayCount, monthLabels: mLabels };
  }, [activity]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.accent} size="large" />
        </View>
      ) : (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.chartWrapper}>
              {/* Month labels */}
              <View style={styles.monthLabelsContainer}>
                {monthLabels.map((label, idx) => (
                  <Text
                    key={idx}
                    style={[
                      styles.monthLabel,
                      { left: label.colIndex * 15 + 24 } // 15 = 12px square + 3px gap, 24 = day labels width
                    ]}
                  >
                    {label.text}
                  </Text>
                ))}
              </View>

              <View style={styles.gridRow}>
                {/* Day labels */}
                <View style={styles.dayLabelsContainer}>
                  <Text style={styles.dayLabel}></Text>
                  <Text style={styles.dayLabel}>M</Text>
                  <Text style={styles.dayLabel}></Text>
                  <Text style={styles.dayLabel}>W</Text>
                  <Text style={styles.dayLabel}></Text>
                  <Text style={styles.dayLabel}>F</Text>
                  <Text style={styles.dayLabel}></Text>
                </View>

                {/* Grid */}
                <View style={styles.grid}>
                  {grid.map((col, colIdx) => (
                    <View key={colIdx} style={styles.column}>
                      {col.map((item, rowIdx) => (
                        <View
                          key={rowIdx}
                          style={[
                            styles.square,
                            { backgroundColor: getActivityColor(item.count) },
                            // If the item date is in the future relative to today, make it transparent or surface
                            item.date > new Date() ? { backgroundColor: 'transparent' } : null
                          ]}
                        />
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.statsRow}>
            <Text style={styles.statsText}>{totalSubmissions} total submissions</Text>
            <Text style={styles.statsText}>{activeDays} active days</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginVertical: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: spacing.md,
  },
  loadingContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingBottom: spacing.xs,
  },
  chartWrapper: {
    flexDirection: "column",
  },
  monthLabelsContainer: {
    flexDirection: "row",
    height: 20,
    position: "relative",
  },
  monthLabel: {
    color: colors.textMuted,
    fontSize: 10,
    position: "absolute",
    bottom: 4,
  },
  gridRow: {
    flexDirection: "row",
  },
  dayLabelsContainer: {
    width: 24,
    justifyContent: "space-between",
    paddingRight: 8,
  },
  dayLabel: {
    color: colors.textMuted,
    fontSize: 10,
    height: 12,
    lineHeight: 12,
    marginBottom: 3,
  },
  grid: {
    flexDirection: "row",
    gap: 3,
  },
  column: {
    flexDirection: "column",
    gap: 3,
  },
  square: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statsText: {
    color: colors.textMuted,
    fontSize: 12,
  },
});