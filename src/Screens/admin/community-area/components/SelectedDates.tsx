import React, { useMemo, useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Text } from "../../../../Components";
import { adjustSize, colors, spacing, typography } from "../../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";

type Slot = { day: string; start: string; end: string };
type SelectedDatesProps = {
  selectedDates: Date[];
  timeSlots: Slot[];
  backHandler: () => void;
  rightBtnHandler: () => void;
};

const dayName = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "short" });
const dayNum = (d: Date) => d.getDate();
const monthTitle = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "long", year: "numeric" });

export default function SelectedDates({
  selectedDates = [],
  timeSlots = [],
  backHandler,
  rightBtnHandler,
}: SelectedDatesProps) {
  const headerDate = selectedDates[0] ?? new Date();
  const formatKey = (d: Date) =>
    d
      .toLocaleDateString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toLowerCase();

  const [activeKey, setActiveKey] = useState<string>(
    selectedDates.length ? formatKey(selectedDates[0]) : formatKey(new Date()),
  );

  const filteredSlots = useMemo(
    () => timeSlots.filter((s) => s.day === activeKey),
    [timeSlots, activeKey],
  );

  const keys = useMemo(
    () => selectedDates.map((d) => formatKey(d)),
    [selectedDates],
  );
  const activeIndex = keys.indexOf(activeKey);
  const activeDate = selectedDates[activeIndex] ?? headerDate;

  const goPrev = () => {
    if (activeIndex > 0) setActiveKey(keys[activeIndex - 1]);
  };
  const goNext = () => {
    if (activeIndex >= 0 && activeIndex < keys.length - 1)
      setActiveKey(keys[activeIndex + 1]);
  };

  return (
    <View style={styles.container}>
      {/* Month header */}
      <View style={styles.monthHeader}>
        <TouchableOpacity
          style={styles.navBtn}
          activeOpacity={0.7}
          onPress={goPrev}
        >
          <WithLocalSvg asset={Images.pre} />
        </TouchableOpacity>
        <Text weight="semiBold" style={styles.monthTitle}>
          {monthTitle(activeDate)}
        </Text>
        <TouchableOpacity
          style={styles.navBtn}
          activeOpacity={0.7}
          onPress={goNext}
        >
          <WithLocalSvg asset={Images.next} />
        </TouchableOpacity>
      </View>

      {/* Horizontal selected dates pills */}
      <View>
        <ScrollView
          horizontal
          style={{ height: adjustSize(80) }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daysRow}
        >
          {selectedDates.map((d, idx) => {
            const key = formatKey(d);
            const active = key === activeKey;
            return (
              <TouchableOpacity
                key={`${d.toDateString()}-${idx}`}
                activeOpacity={0.7}
                onPress={() => setActiveKey(key)}
                style={[
                  styles.dayPill,
                  active ? styles.dayPillActive : styles.dayPillInactive,
                ]}
              >
                <Text
                  style={[
                    styles.dayNum,
                    active ? styles.dayTextActive : styles.dayTextInactive,
                  ]}
                >
                  {dayNum(d)}
                </Text>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.dayName,
                    active ? styles.dayTextActive : styles.dayTextInactive,
                  ]}
                >
                  {dayName(d)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Reservations grid */}
      <Text style={styles.sectionTitle}>Reservations</Text>
      <View style={styles.slotGrid}>
        {filteredSlots.map((t, i) => (
          <View
            key={`${t.day}-${t.start}-${t.end}-${i}`}
            style={styles.slotPill}
          >
            <Text style={styles.slotText}>{`${t.start} - ${t.end}`}</Text>
          </View>
        ))}
      </View>

      {/* Footer buttons */}
      <View style={styles.footerRow}>
        <Button
          text="Back"
          onPress={backHandler}
          style={[styles.backBtn]}
          textStyle={[styles.backBtnText]}
        />
        <Button
          text="Next"
          preset="reversed"
          onPress={rightBtnHandler}
          style={styles.nextBtn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: adjustSize(10),
    // paddingBottom: adjustSize(20),
    backgroundColor: colors.fill,
    flex: 1,
  },
  monthHeader: {
    height: adjustSize(49),
    borderRadius: adjustSize(10),
    // backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: adjustSize(12),
    marginTop: adjustSize(10),
    marginBottom: adjustSize(10),
  },
  monthTitle: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.medium,
  },
  navBtn: {
    paddingHorizontal: adjustSize(10),
    height: "100%",
    justifyContent: "center",
  },
  navBtnText: {
    color: colors.white,
    fontSize: adjustSize(18),
    lineHeight: adjustSize(20),
  },
  daysRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderColor: "#D4D4D4",
  },
  dayPill: {
    // minWidth: adjustSize(56),
    paddingHorizontal: adjustSize(10),
    height: adjustSize(45),
    width: adjustSize(45),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  dayPillActive: {
    backgroundColor: colors.primary,
  },
  dayPillInactive: {
    backgroundColor: "#B0B0B0",
  },
  dayNum: {
    fontSize: adjustSize(16),
    // lineHeight: adjustSize(16),
    fontFamily: typography.fonts.poppins.bold,
  },
  dayName: {
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  dayTextActive: {
    color: colors.white,
  },
  dayTextInactive: {
    color: colors.white,
  },
  sectionTitle: {
    marginTop: adjustSize(10),
    marginBottom: adjustSize(8),
    color: colors.primary,
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.sm,
    flex: 1,
  },
  slotPill: {
    backgroundColor: colors.primary,
    height: adjustSize(44),
    borderRadius: 100,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
  },
  slotText: {
    color: colors.white,
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginVertical: adjustSize(20),
    // marginBottom: adjustSize(10),
  },
  backBtn: {
    flex: 1,
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: colors.primary,
    minHeight: adjustSize(41),
  },
  backBtnText: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  nextBtn: {
    flex: 1,
    minHeight: adjustSize(41),
    borderRadius: adjustSize(10),
  },
});
