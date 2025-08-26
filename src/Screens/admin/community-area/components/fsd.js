import React, { useState, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Text } from "../../../../Components";
import { adjustSize, colors, typography, spacing } from "../../../../theme";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
export default function ReservationCalendarAddTime({
  navigation,
  onPress,
  rightBtnTitle = "Next",
  backHandler,
  selectedDates,
}: any) {
  console.log("selectedDates-------------", selectedDates);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Property Group */}
        <Text style={styles.title}>Add time slots for selected dates</Text>
        {selectedDates?.map((val, index) => {
          //   const slotsForDay = dayTimeSlots.filter((slot) => slot.day === val);
          return (
            <View key={index}>
              <View
                style={[
                  styles.daysHeader,
                  {
                    marginBottom:
                      index === selectedDates.length - 1 ? adjustSize(10) : 0,
                  },
                ]}
              >
                <Text style={styles.daysName}>{val}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  //   onPress={() => openDayPicker(val, "start")}
                >
                  <WithLocalSvg asset={Images.clockWhiteIcon} />
                </TouchableOpacity>
                <Text style={styles.toTxt}>To</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  //   onPress={() => openDayPicker(val, "end")}
                >
                  <WithLocalSvg asset={Images.clockWhiteIcon} />
                </TouchableOpacity>
              </View>

              {/* Show added slots */}
              {/* <View style={styles.timeBoxMain}>
                {slotsForDay.map((slot, idx) => (
                  <View key={idx} style={styles.timeBox}>
                    <Text style={styles.timeBoxVal}>
                      {slot.start} - {slot.end}
                    </Text>
                  </View>
                ))}
              </View> */}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.backBtn]}
          onPress={backHandler}
        >
          <Text style={styles.backBtnText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={styles.rightBtn}>
          <Text style={styles.rightBtnText}>{rightBtnTitle}</Text>
        </TouchableOpacity>
      </View>
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
    color: colors.white,
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
});
