
import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import { Text } from "../../../../Components";
import { adjustSize, colors, typography, spacing } from "../../../../theme";
import DropdownComponent from "../../../../Components/DropDown";
import { dummyData } from "./reservationData"; // 👈 import data

type Mode = "single" | "range";
type DayCell = { date: Date; inMonth: boolean };

type Props = {
  navigation?: any;
  onPress?: any;
  rightBtnTitle?: string;
  backHandler?: () => void;
  rightBtnHandler?: () => void;
  onDatesChange?: (dates: Date[]) => void; // callback for parent
};

export default function ReservationCalendar({
  navigation,
  onPress,
  rightBtnTitle = "Next",
  backHandler,
  rightBtnHandler,
  onDatesChange,
}: Props) {
  const [propertyGroup, setPropertyGroup] = useState<string | undefined>();
  const [property, setProperty] = useState<string | undefined>();
  const [mode] = useState<Mode>("range");
  const [monthCursor, setMonthCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [blockedKeys, setBlockedKeys] = useState<Set<string>>(new Set());

  // Month title
  const monthTitle = useMemo(
    () =>
      monthCursor.toLocaleString(undefined, {
        month: "long",
        year: "numeric",
      }),
    [monthCursor]
  );

  // Calendar days grid
  const daysGrid: DayCell[] = useMemo(() => {
    const first = new Date(monthCursor);
    const startWeekday = (first.getDay() + 6) % 7; // Monday=0
    const gridStart = new Date(first);
    gridStart.setDate(first.getDate() - startWeekday);

    return Array.from({ length: 35 }).map((_, i) => {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      return { date: d, inMonth: d.getMonth() === monthCursor.getMonth() };
    });
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

  // Toggle day selection
  const toggleDay = (d: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate(null);
    } else if (startDate && !endDate) {
      setEndDate(d);
    }
  };

  // Selected range array
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

  // Call parent callback whenever selectedRange changes
  useEffect(() => {
    onDatesChange?.(selectedRange);
  }, [selectedRange]);

  // Apply block/unblock action
  const applyActionToDates = (dates: Date[]) => {
    setBlockedKeys((prev) => {
      const next = new Set(prev);
      for (const d of dates) {
        const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(d.getDate()).padStart(2, "0")}`;
        next.has(k) ? next.delete(k) : next.add(k);
      }
      return next;
    });
  };

  // Remove a single day from selectedRange
  const removeFromSelected = (d: Date) => {
    if (selectedRange.length <= 1) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    const idx = selectedRange.findIndex((x) => isSameDay(x, d));
    if (idx === 0) setStartDate(selectedRange[1]);
    else if (idx === selectedRange.length - 1)
      setEndDate(selectedRange[selectedRange.length - 2]);
    else {
      const mid = selectedRange[idx];
      setStartDate(mid);
      setEndDate(mid);
    }
  };

  // Month navigation
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Property Group */}
        <Text style={styles.title}>Capacity</Text>
        <DropdownComponent
          data={dummyData}
          label="Choose type"
          placeholder="Enter Capacity"
          value={propertyGroup}
          onChangeValue={(v: string) => setPropertyGroup(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Property */}
        <Text style={styles.title}>Reserved For</Text>
        <DropdownComponent
          data={dummyData}
          label="Choose type"
          placeholder="Tenant"
          value={property}
          onChangeValue={(v: string) => setProperty(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        <Text style={styles.title}>Reserve Amenity</Text>

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
            if (!cell.inMonth)
              return (
                <View key={idx} style={[styles.dayCell, styles.dayCellEmpty]} />
              );

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
                onPress={() => toggleDay(cell.date)}
                style={[styles.dayCell]}
              >
                <View
                  style={[sel && styles.daySelected, isEdge && styles.dayEdge]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      sel && styles.dayTextSelected,
                      !sel && isBlocked && styles.dayTextBlocked,
                      !sel && !isBlocked && isToday && styles.dayTextAvailable,
                    ]}
                  >
                    {cell.date.getDate()}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text weight="semiBold" style={styles.blockedTitle}>
          Selected dates
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
              <Pressable onPress={() => removeFromSelected(item)}>
                <Text style={styles.pillCloseText}>×</Text>
              </Pressable>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No dates selected</Text>
          }
        />
      </ScrollView>

      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backBtn]}
          onPress={backHandler}
        >
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rightBtn}
          onPress={() => {
            rightBtnHandler?.();
            onDatesChange?.(selectedRange); // pass selected dates to parent
          }}
        >
          <Text style={styles.rightBtnText}>{rightBtnTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles remain the same as your original component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(15),
  },
  title: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(3),
    marginTop: adjustSize(5),
  },
  dropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(1),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: adjustSize(10),
    marginVertical: adjustSize(13),
    backgroundColor: colors.fill,
  },
  backBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(41),
  },
  backBtnText: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  rightBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    height: adjustSize(41),
    justifyContent: "center",
  },
  rightBtnText: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
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
  navBtn: { paddingHorizontal: adjustSize(20) },
  navBtnText: {
    fontSize: adjustSize(20),
    lineHeight: adjustSize(24),
    color: colors.white,
  },
  monthTitle: { fontSize: adjustSize(13), color: colors.white },
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
  dayCellEmpty: { backgroundColor: "transparent", borderWidth: 0 },
  daySelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    height: adjustSize(25),
    width: adjustSize(25),
    borderRadius: adjustSize(4),
    justifyContent: "center",
    alignItems: "center",
  },
  dayEdge: { borderWidth: 2, borderColor: colors.primary },
  dayText: { color: colors.primary, fontSize: adjustSize(12) },
  dayTextSelected: { color: colors.white },
  dayTextBlocked: { color: "#E53935" },
  dayTextAvailable: { color: "#3CD448" },
  pillRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primaryLight,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  pillText: { fontSize: adjustSize(14), color: colors.white },
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
  blockedTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    marginTop: -30,
    marginBottom: adjustSize(20),
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
