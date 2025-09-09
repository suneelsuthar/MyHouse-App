import React, { useMemo, useReducer, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { Screen, Text, CustomGallery } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";

type DayCell = {
  date: Date;
  inMonth: boolean;
};

// export function AdminAmenityView({route}: AppStackScreenProps<"AdminAmenityView">) {
export function AdminAmenityView({ route }: any) {
  const navigation: any = useNavigation();
  const { user } = useAppSelector((state: any) => state.auth);
  const data: any = route?.params?.data;
  const [monthCursor, setMonthCursor] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [blockedKeys, setBlockedKeys] = useState<Set<string>>(new Set());

  const monthTitle = useMemo(() => {
    return monthCursor.toLocaleString(undefined, {
      month: "long",
      year: "numeric",
    });
  }, [monthCursor]);

  const daysGrid: DayCell[] = useMemo(() => {
    const first = new Date(monthCursor);
    const startWeekday = (first.getDay() + 6) % 7; // Monday = 0
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
    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate(null);
    } else if (startDate && !endDate) {
      setEndDate(d);
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
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top", "bottom"]}
    >
      <Header title={data?.title} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomGallery images={data?.images} hideList={false} />
        <View style={styles.container}>
          <Text style={styles.heading}>
            Duration Per Slot:{"   "}
            <Text
              style={[
                styles.heading,
                {
                  fontFamily: typography.fonts.poppins.normal,
                  color: "#7E7E7E",
                },
              ]}
            >
              60 min
            </Text>
          </Text>
          <Text style={styles.heading}>
            Maximum Duration Per Reservation: {"   "}
            <Text
              style={[
                styles.heading,
                {
                  fontFamily: typography.fonts.poppins.normal,
                  color: "#7E7E7E",
                },
              ]}
            >
              60 min
            </Text>
          </Text>
          <View style={styles.line} />
          <Text style={styles.heading}>Earliest Available Slot</Text>
          <View style={styles.availableBox}>
            <Text style={styles.availableBoxDate}>March 10, 2025</Text>
            <Text style={styles.availableBoxTime}>10:00am - 11:00am</Text>
          </View>
          <View style={styles.line} />

          {/* Legend */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: "#3CD448" }]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: "#E53935" }]} />
              <Text style={styles.legendText}>Unavailable</Text>
            </View>
          </View>

          <Text style={styles.heading}>Availability Calendar</Text>

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
              if (!cell.inMonth) {
                return (
                  <View
                    key={idx}
                    style={[styles.dayCell, styles.dayCellEmpty]}
                  />
                );
              }
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
                    style={[
                      sel && styles.daySelected,
                      isEdge && styles.dayEdge,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        sel && styles.dayTextSelected,
                        !sel && isBlocked && styles.dayTextBlocked,
                        !sel &&
                          !isBlocked &&
                          isToday &&
                          styles.dayTextAvailable,
                      ]}
                    >
                      {cell.date.getDate()}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={[styles.line, { marginTop: 0 }]} />
          <Text style={styles.heading}>Description</Text>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
        </View>
        <View style={styles.footerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.addMoneyBtn,
              {
                backgroundColor:
                  user?.role !== "tenant" || user?.role !== "facility_manager"
                    ? colors.primary
                    : colors.fill,
              },
            ]}
            onPress={() =>
              (navigation as any).navigate("AdminAmenityMakeReservation")
            }
          >
            <Text
              weight="semiBold"
              style={[
                styles.addMoneyBtnText,
                {
                  color:
                    user?.role !== "tenant" || user?.role !== "facility_manager"
                      ? colors.white
                      : colors.primary,
                },
              ]}
            >
              New Reservation
            </Text>
          </TouchableOpacity>

          {user?.role !== "tenant" ||
            (user?.role !== "facility_manager" && (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.sendMoneyBtn}
                onPress={() =>
                  (navigation as any).navigate("AdminAmenityManageCalendar")
                }
              >
                <Text weight="semiBold" style={styles.sendMoneyBtnText}>
                  Manage Calendar
                </Text>
              </TouchableOpacity>
            ))}
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
    paddingHorizontal: adjustSize(10),
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
    marginTop: adjustSize(15),
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
  dayCellEmpty: {
    backgroundColor: "transparent",
    borderWidth: 0,
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
  dayTextSelected: {
    color: colors.white,
  },
  heading: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(4),
  },
  line: {
    height: adjustSize(0.5),
    backgroundColor: "#B0B0B0",
    marginVertical: adjustSize(20),
  },
  availableBox: {
    backgroundColor: colors.primaryLight,
    height: adjustSize(47),
    borderRadius: adjustSize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: adjustSize(15),
    marginTop: adjustSize(10),
    marginBottom: adjustSize(10),
  },
  availableBoxDate: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  availableBoxTime: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  description: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "justify",
    marginTop: adjustSize(5),
    marginBottom: adjustSize(15),
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: adjustSize(10),
    marginVertical: adjustSize(13),
    backgroundColor: colors.fill,
  },
  addMoneyBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
  },
  addMoneyBtnText: {
    color: colors.primaryLight,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  sendMoneyBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    height: adjustSize(47),
    justifyContent: "center",
  },
  sendMoneyBtnText: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
