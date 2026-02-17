import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Screen, Text, Button } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { AdminStackParamList } from "../../../utils/interfaces";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Mode = "single" | "range";

type DayCell = {
  date: Date;
  inMonth: boolean;
};

export function AdminManageCalendar({
  route,
  navigation,
}: NativeStackScreenProps<AdminStackParamList, "AdminManageCalendar">) {
  const [mode, setMode] = useState<Mode>("single");
  const [monthCursor, setMonthCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "block" | "reopen" | null
  >(null);
  const [blockedKeys, setBlockedKeys] = useState<Set<string>>(new Set());

  const monthTitle = useMemo(() => {
    return monthCursor.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    });
  }, [monthCursor]);

  const daysGrid: DayCell[] = useMemo(() => {
    // Build a 6x7 grid for the current month view
    const first = new Date(monthCursor);
    const startWeekday = (first.getDay() + 6) % 7; // make Monday=0
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - startWeekday);

    const cells: DayCell[] = [];
    for (let i = 0; i < 35; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      cells.push({ date: d, inMonth: d.getMonth() === monthCursor.getMonth() });
    }
    return cells;
  }, [monthCursor]);

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isBetween = (d: Date, a: Date, b: Date) => {
    const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const s = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
    const e = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
    return x >= Math.min(s, e) && x <= Math.max(s, e);
  };

  const toggleDay = (d: Date) => {
    if (mode === "single") {
      setStartDate(d);
      setEndDate(d);
      return;
    }
    // range mode
    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (isSameDay(startDate, d)) {
        setEndDate(d);
      } else {
        setEndDate(d);
      }
    }
  };

  const selectedRange: Date[] = useMemo(() => {
    if (!startDate) return [];
    if (!endDate) return [startDate];
    const out: Date[] = [];
    const s = new Date(startDate);
    const e = new Date(endDate);
    const step = s <= e ? 1 : -1;
    const cur = new Date(s);
    while (true) {
      out.push(new Date(cur));
      if (isSameDay(cur, e)) break;
      cur.setDate(cur.getDate() + step);
    }
    return out;
  }, [startDate, endDate]);

  const applyActionToDates = (dates: Date[], action: "block" | "reopen") => {
    setBlockedKeys((prev) => {
      const next = new Set(prev);
      for (const d of dates) {
        const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(d.getDate()).padStart(2, "0")}`;
        if (action === "block") next.add(k);
        else next.delete(k);
      }
      return next;
    });
  };

  const onConfirm = () => {
    // No navigation; apply colors and clear selection
    if (startDate == null && endDate == null) return;
    if (mode === "range") {
      const dates = selectedRange;
      const action = selectedAction ?? "block";
      applyActionToDates(dates, action);
    } else {
      if (!startDate) return;
      const k = `${startDate.getFullYear()}-${String(
        startDate.getMonth() + 1
      ).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
      const isBlocked = blockedKeys.has(k);
      applyActionToDates([startDate], isBlocked ? "reopen" : "block");
    }
    setStartDate(null);
    setEndDate(null);
    setActionOpen(false);
  };

  const removeFromSelected = (d: Date) => {
    // If removing on edges, adjust range; otherwise fall back to single selection of clicked day
    if (selectedRange.length <= 1) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    const idx = selectedRange.findIndex((x) => isSameDay(x, d));
    if (idx === 0) {
      setStartDate(selectedRange[1]);
    } else if (idx === selectedRange.length - 1) {
      setEndDate(selectedRange[selectedRange.length - 2]);
    } else {
      // Split not supported in simple UI, collapse to single day at clicked index
      const mid = selectedRange[idx];
      setStartDate(mid);
      setEndDate(mid);
    }
  };

  const onPrevMonth = () => {
    const d = new Date(monthCursor);
    d.setMonth(d.getMonth() - 1);
    setMonthCursor(d);
  };
  const onNextMonth = () => {
    const d = new Date(monthCursor);
    d.setMonth(d.getMonth() + 1);
    setMonthCursor(d);
  };

  const confirmText = useMemo(() => {
    if (mode === "range") {
      return selectedAction === "reopen"
        ? "Confirm Reopened Dates"
        : "Confirm Blocked Dates";
    }
    if (startDate) {
      const k = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
      const isBlocked = blockedKeys.has(k);
      return isBlocked ? "Confirm Reopened Dates" : "Confirm Blocked Dates";
    }
    return "Confirm Blocked Dates";
  }, [mode, selectedAction, startDate, blockedKeys]);

  const listTitle = useMemo(() => {
    if (mode === "range") {
      return selectedAction === "reopen" ? "Enabled dates" : "Blocked dates";
    }
    if (startDate) {
      const k = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
      const isBlocked = blockedKeys.has(k);
      return isBlocked ? "Enabled dates" : "Blocked dates";
    }
    return "Blocked dates";
  }, [mode, selectedAction, startDate, blockedKeys]);

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top", "bottom"]}
    >
      <Header title="Manage calendar" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Mode toggle */}
          <View style={styles.segmentWrap}>
            <Pressable
              onPress={() => setMode("single")}
              style={[
                styles.segmentBtn,
                mode === "single" && styles.segmentActive,
              ]}
            >
              <Text
                weight="medium"
                style={[
                  styles.segmentText,
                  mode === "single" && styles.segmentTextActive,
                  {},
                ]}
              >
                Select Single Date
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setMode("range")}
              style={[
                styles.segmentBtn,
                mode === "range" && styles.segmentActive,
              ]}
            >
              <Text
                weight="medium"
                style={[
                  styles.segmentText,
                  mode === "range" && styles.segmentTextActive,
                ]}
              >
                Select Date Range
              </Text>
            </Pressable>
          </View>

          {/* Title and description */}
          <Text weight="semiBold" style={styles.sectionTitle}>
            Swimming Pool
          </Text>
          <Text style={styles.helpText}>
            Select the start and end dates to block availability and manage your
            calendar with ease.
          </Text>

          {/* Action dropdown (only for range mode) */}
          {mode === "range" && (
            <View style={styles.actionWrap}>
              <Text weight="medium" style={styles.actionLabel}>
                Select action
              </Text>
              <Pressable
                onPress={() => setActionOpen((p) => !p)}
                style={styles.actionSelect}
              >
                <Text style={styles.actionSelectText}>
                  {selectedAction === "block"
                    ? "Block dates"
                    : selectedAction === "reopen"
                    ? "Reopen dates"
                    : "Block dates/ Reopen dates"}
                </Text>
                <Text style={styles.actionCaret}>▾</Text>
              </Pressable>
              {actionOpen && (
                <View style={styles.actionOptions}>
                  <Pressable
                    style={styles.actionOption}
                    onPress={() => {
                      setSelectedAction("block");
                      setActionOpen(false);
                    }}
                  >
                    <Text style={styles.actionOptionText}>Block dates</Text>
                  </Pressable>
                  <Pressable
                    style={styles.actionOption}
                    onPress={() => {
                      setSelectedAction("reopen");
                      setActionOpen(false);
                    }}
                  >
                    <Text style={styles.actionOptionText}>Reopen dates</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: "#3CD448" }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: "#E53935" }]} />
              <Text style={styles.legendText}>Not Available</Text>
            </View>
          </View>

          {/* Month header */}
          <View style={styles.monthHeader}>
            <Pressable onPress={onPrevMonth} style={styles.navBtn}>
              <Text style={styles.navBtnText}>{"<"}</Text>
            </Pressable>
            <Text weight="semiBold" style={styles.monthTitle}>
              {monthTitle}
            </Text>
            <Pressable onPress={onNextMonth} style={styles.navBtn}>
              <Text style={styles.navBtnText}>{">"}</Text>
            </Pressable>
          </View>

          {/* Weekdays */}
          <View style={styles.weekdaysRow}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <Text weight="semiBold" key={d} style={styles.weekday}>
                {d}
              </Text>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={styles.grid}>
            {daysGrid.map((cell, idx) => {
              const key = `${cell.date.getFullYear()}-${String(
                cell.date.getMonth() + 1
              ).padStart(2, "0")}-${String(cell.date.getDate()).padStart(
                2,
                "0"
              )}`;
              const isBlocked = blockedKeys.has(key);
              const sel =
                startDate && endDate
                  ? isBetween(cell.date, startDate, endDate)
                  : startDate && isSameDay(cell.date, startDate);
              const isEdge =
                (startDate && isSameDay(cell.date, startDate)) ||
                (endDate && isSameDay(cell.date, endDate));
              const isToday = isSameDay(cell.date, new Date());
              return (
                <Pressable
                  key={idx}
                  onPress={() => (cell.inMonth ? toggleDay(cell.date) : null)}
                  style={[styles.dayCell, !cell.inMonth && styles.dayCellFaded]}
                >
                  <View
                    style={[
                      sel && cell.inMonth && styles.daySelected,
                      isEdge && cell.inMonth && styles.dayEdge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        !cell.inMonth && styles.dayTextFaded,
                        sel && cell.inMonth && styles.dayTextSelected,
                        !sel && cell.inMonth && isBlocked && styles.dayTextBlocked,
                        !sel && cell.inMonth && !isBlocked && isToday && styles.dayTextAvailable,
                      ]}
                    >
                      {cell.date.getDate()}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Selected dates list */}
          <Text weight="semiBold" style={styles.blockedTitle}>
            {listTitle}
          </Text>
          <FlatList
            data={selectedRange}
            keyExtractor={(d) => d.toISOString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: spacing.xl }}
            renderItem={({ item }) => (
              <View style={styles.pillRow}>
                <Text style={styles.pillText}>
                  {item
                    .toLocaleDateString(undefined, {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                    .toLowerCase()}
                </Text>
                <Pressable
                  onPress={() => removeFromSelected(item)}
                  style={styles.pillClose}
                >
                  <Text style={styles.pillCloseText}>×</Text>
                </Pressable>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No dates selected</Text>
            }
          />

          {/* Actions */}
          <Button
            text={confirmText}
            preset="reversed"
            style={styles.confirmBtn}
            textStyle={styles.confirmText}
            disabled={
              mode === "range" ? selectedRange.length === 0 : !startDate
            }
            onPress={onConfirm}
          />
          <Pressable
            style={{ alignItems: "center", marginBottom: 20 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    paddingHorizontal: spacing.lg,
  },
  segmentWrap: {
    flexDirection: "row",
    backgroundColor: "#F2F3FF",
    borderWidth: 1,
    borderRadius: adjustSize(10),
    borderColor: colors.primary,
    marginVertical: adjustSize(20),
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
  },
  segmentActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  segmentText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    textAlign: "center",
  },
  segmentTextActive: {
    color: colors.white,
    fontSize: adjustSize(12),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  helpText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    marginBottom: spacing.md,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: adjustSize(20),
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    // gap: spacing.xs,
  },
  dot: {
    width: adjustSize(10),
    height: adjustSize(10),
    borderRadius: adjustSize(5),
    marginRight: spacing.xs,
  },
  legendText: {
    fontSize: adjustSize(12),
    color: colors.greylight,
  },
  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
    backgroundColor: colors.primary,
    height: adjustSize(49),
    borderRadius: adjustSize(10),
  },
  navBtn: {
    paddingHorizontal: adjustSize(20),
  },
  navBtnText: {
    fontSize: adjustSize(20),
    lineHeight: adjustSize(24),
    color: colors.white,
  },
  monthTitle: {
    fontSize: adjustSize(13),
    color: colors.white,
  },
  actionWrap: {
    marginBottom: spacing.md,
  },
  actionLabel: {
    color: colors.black,
    marginBottom: spacing.xs,
    fontSize: adjustSize(12),
  },
  actionSelect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    height: adjustSize(49),
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  actionSelectText: {
    color: colors.black,
    fontSize: adjustSize(13),
  },
  actionCaret: {
    color: colors.greylight,
    fontSize: adjustSize(14),
  },
  actionOptions: {
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  actionOption: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  actionOptionText: {
    color: colors.black,
    fontSize: adjustSize(13),
  },
  weekdaysRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.xs,
  },
  weekday: {
    flex: 1,
    textAlign: "center",
    color: colors.grey,
    fontSize: adjustSize(13),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    // marginBottom: spacing.md,
  },
  dayCell: {
    width: "14.2857%",
    aspectRatio: 1.1,
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayCellEmpty: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  dayCellFaded: {
    opacity: 0.4,
  },
  daySelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    height: adjustSize(25),
    width: adjustSize(25),
    borderRadius: adjustSize(4),
    justifyContent: "center",
    alignItems: "center",
  },
  dayEdge: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dayText: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  dayTextAvailable: {
    color: "#3CD448",
  },
  dayTextBlocked: {
    color: "#E53935",
  },
  dayTextFaded: {
    color: colors.greylight,
  },
  dayTextSelected: {
    color: colors.white,
  },
  blockedTitle: {
    // marginTop: spacing.sm,
    fontSize: adjustSize(14),
    color: colors.black,
    marginTop: -30,
    marginBottom: adjustSize(20),
  },
  pillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  pillText: {
    fontSize: adjustSize(14),
    color: colors.white,
  },
  pillClose: {},
  pillCloseText: {
    color: colors.white,
    fontSize: adjustSize(20),
    lineHeight: adjustSize(24),
  },
  emptyText: {
    textAlign: "center",
    color: colors.greylight,
    marginVertical: spacing.sm,
  },
  confirmBtn: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  confirmText: {
    fontSize: adjustSize(14),
    fontFamily: typography.primary.semiBold,
  },
  cancelText: {
    color: colors.error,
    fontSize: adjustSize(14),
  },
});
