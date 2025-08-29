import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Platform,
} from "react-native";
import { Text } from "../../../../Components";
import { adjustSize, colors, typography, spacing } from "../../../../theme";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import { CustomDateTimePicker } from "../../../../Components/CustomDateTimePicker"; // ✅ replaced import

const formatTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minStr} ${ampm}`;
};

export default function ReservationCalendarAddTime({
  navigation,
  rightBtnTitle = "Next",
  backHandler,
  selectedDates,
  rightBtnHandler,
}: any) {
  const [dayTimeSlots, setDayTimeSlots] = useState<
    { day: string; start: string; end: string }[]
  >([]);
  const [showPicker, setShowPicker] = useState(false);
  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [slotStep, setSlotStep] = useState<"start" | "end">("start");
  const [tempStart, setTempStart] = useState<string>("");
  const [tempDate, setTempDate] = useState(new Date());
  const [timeDone, setTimeDone] = useState<boolean>(false);

  const openDayPicker = (day: string, step: "start" | "end") => {
    setCurrentDay(day);
    setSlotStep(step);
    setTempDate(new Date());
    setShowPicker(true);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      const formatted = formatTime(selectedDate);

      if (slotStep === "start") {
        setTempStart(formatted);
        setSlotStep("end");

        // close and reopen for end
        setShowPicker(false);
        setTimeout(() => {
          setTempDate(new Date());
          setShowPicker(true);
        }, 100);
        return;
      } else {
        if (currentDay) {
          setDayTimeSlots((prev) => [
            ...prev,
            { day: currentDay, start: tempStart, end: formatted },
          ]);
        }
      }
    }
    if (Platform.OS === "android") setShowPicker(false);
    setTimeDone(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Add time slots for selected dates</Text>

        <FlatList
          data={selectedDates}
          keyExtractor={(d) => d.toISOString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: spacing.xl }}
          renderItem={({ item, index }) => {
            const dateStr = item
              .toLocaleDateString(undefined, {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
              .toLowerCase();

            const slotsForDay = dayTimeSlots.filter(
              (slot) => slot.day === dateStr
            );

            return (
              <View>
                <View
                  style={[
                    styles.daysHeader,
                    {
                      marginBottom:
                        index === selectedDates.length - 1 ? adjustSize(10) : 0,
                    },
                  ]}
                >
                  <Text style={styles.daysName}>{dateStr}</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => openDayPicker(dateStr, "start")}
                  >
                    <WithLocalSvg asset={Images.clockWhiteIcon} />
                  </TouchableOpacity>
                  <Text style={styles.toTxt}>To</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => openDayPicker(dateStr, "end")}
                  >
                    <WithLocalSvg asset={Images.clockWhiteIcon} />
                  </TouchableOpacity>
                </View>

                <View style={styles.timeBoxMain}>
                  {slotsForDay.map((slot, idx) => (
                    <View key={idx} style={styles.timeBox}>
                      <Text style={styles.timeBoxVal}>
                        {slot.start} - {slot.end}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          }}
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
          disabled={!timeDone}
          onPress={rightBtnHandler}
        >
          <Text style={styles.rightBtnText}>
            {timeDone ? "Submit" : rightBtnTitle}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ✅ replaced DateTimePicker with CustomDateTimePicker */}
      {showPicker && (
        <CustomDateTimePicker
          mode="time"
          value={tempDate}
          visible={showPicker}
          onChange={(d: Date) => {
            onChange({ type: "set" }, d);
          }}
          onCancel={() => setShowPicker(false)}
          onConfirm={() => setShowPicker(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(15),
  },
  title: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(3),
    marginTop: adjustSize(5),
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
  daysHeader: {
    backgroundColor: colors.primaryLight,
    height: adjustSize(47),
    borderRadius: adjustSize(7),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: adjustSize(15),
    marginTop: adjustSize(15),
  },
  daysName: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    flex: 1,
    textTransform: "capitalize",
  },
  toTxt: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    marginHorizontal: adjustSize(25),
  },
  timeBoxMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: adjustSize(5),
  },
  timeBox: {
    height: adjustSize(40),
    borderRadius: adjustSize(20),
    backgroundColor: colors.fill,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    width: "48%",
    marginTop: adjustSize(10),
    marginHorizontal: adjustSize(1),
  },
  timeBoxVal: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  emptyText: {
    textAlign: "center",
    color: colors.greylight,
    marginVertical: spacing.sm,
  },
});
