// import React, { useState } from "react";
// import { StyleSheet, View, Pressable, Modal, Platform } from "react-native";
// import { Screen, Text, Button } from "../../../../Components";
// import { Header } from "../../../../Components/Header";
// import { adjustSize, colors, spacing, typography } from "../../../../theme";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import moment from "moment";

// export const AdminUtilitiesSettings: React.FC = () => {
//   const [fromDate, setFromDate] = useState<Date | null>(null);
//   const [pickerVisible, setPickerVisible] = useState(false);
//   const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
//   const [tempDate, setTempDate] = useState<Date>(new Date());

//   const fmt = (d: Date | null) =>
//     d ? moment(d).format("DD/MM/YYYY") : "Select Date";
//   const fmtTime = (d: Date | null) =>
//     d ? moment(d).format("hh:mm A") : "Select Time";

//   const openPicker = (mode: "date" | "time") => {
//     setPickerMode(mode);
//     setTempDate(fromDate ?? new Date());
//     setPickerVisible(true);
//   };

//   const cancelPicker = () => setPickerVisible(false);

//   const confirmPicker = () => {
//     setFromDate(tempDate);
//     setPickerVisible(false);
//   };

//   const handleAndroidChange = (event: any, selectedDate?: Date) => {
//     if (event.type === "dismissed") {
//       cancelPicker();
//       return;
//     }
//     if (selectedDate) {
//       setTempDate(selectedDate);
//       confirmPicker(); // finish immediately on Android
//     }
//   };

//   return (
//     <Screen
//       preset="auto"
//       contentContainerStyle={styles.screenContentContainer}
//       statusBarStyle="dark"
//       safeAreaEdges={["top"]}
//     >
//       <Header title="Testing " />
//       <View style={styles.container}>
//         <View style={styles.row}>
//           <View style={{ flex: 1 }}>
//             <Text weight="semiBold" style={styles.label}>
//               Date<Text style={styles.required}>*</Text>
//             </Text>
//             <Pressable
//               onPress={() => openPicker("date")}
//               style={styles.dtButton}
//             >
//               <Text
//                 style={[
//                   styles.dtText,
//                   { color: fromDate ? colors.primary : colors.primaryLight },
//                 ]}
//               >
//                 {fmt(fromDate)}
//               </Text>
//             </Pressable>
//           </View>
//           <View style={{ width: spacing.md }} />
//           <View style={{ flex: 1 }}>
//             <Text weight="semiBold" style={styles.label}>
//               Time<Text style={styles.required}>*</Text>
//             </Text>
//             <Pressable
//               onPress={() => openPicker("time")}
//               style={styles.dtButton}
//             >
//               <Text
//                 style={[
//                   styles.dtText,
//                   { color: fromDate ? colors.primary : colors.primaryLight },
//                 ]}
//               >
//                 {fmtTime(fromDate)}
//               </Text>
//             </Pressable>
//           </View>
//         </View>
//       </View>

//       {Platform.OS === "ios" ? (
//         <Modal
//           visible={pickerVisible}
//           transparent
//           animationType="fade"
//           onRequestClose={cancelPicker}
//         >
//           <View style={styles.modalBackdrop}>
//             <View style={styles.modalCard}>
//               <Text weight="semiBold" style={styles.modalTitle}>
//                 {pickerMode === "date" ? "Select Date" : "Select Time"}
//               </Text>

//               <View style={styles.modalPickerWrap}>
//                 <DateTimePicker
//                   value={tempDate}
//                   mode={pickerMode}
//                   display="spinner"
//                   onChange={(_, d) => d && setTempDate(d)}
//                 />
//               </View>

//               <View style={styles.modalActions}>
//                 <Button
//                   text="Cancel"
//                   preset="default"
//                   style={styles.modalBtn}
//                   onPress={cancelPicker}
//                 />
//                 <Button
//                   text="Done"
//                   preset="reversed"
//                   style={styles.modalBtn}
//                   onPress={confirmPicker}
//                 />
//               </View>
//             </View>
//           </View>
//         </Modal>
//       ) : (
//         pickerVisible && (
//           <DateTimePicker
//             value={tempDate}
//             mode={pickerMode}
//             display="default"
//             onChange={handleAndroidChange}
//           />
//         )
//       )}
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   screenContentContainer: { backgroundColor: colors.fill },
//   container: { flex: 1, padding: spacing.lg },
//   label: {
//     marginTop: spacing.md,
//     marginBottom: spacing.xs,
//     color: colors.primary,
//     fontSize: adjustSize(12),
//     fontFamily: typography.fonts.poppins.semiBold,
//   },
//   required: { color: colors.primary },
//   row: {
//     flexDirection: "row",
//     alignItems: "flex-start",
//     marginTop: spacing.md,
//   },
//   dtButton: {
//     height: adjustSize(48),
//     borderRadius: adjustSize(10),
//     backgroundColor: colors.fill,
//     paddingHorizontal: spacing.md,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     shadowColor: "#000000",
//     shadowOpacity: 0.15,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   dtText: {
//     color: colors.primaryLight,
//     fontSize: adjustSize(12),
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     alignItems: "center",
//     justifyContent: "flex-end",
//   },
//   modalCard: {
//     width: "100%",
//     backgroundColor: colors.white,
//     borderTopLeftRadius: adjustSize(16),
//     borderTopRightRadius: adjustSize(16),
//     padding: spacing.lg,
//   },
//   modalTitle: {
//     fontSize: adjustSize(16),
//     color: colors.primary,
//     marginBottom: spacing.md,
//   },
//   modalPickerWrap: {
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: spacing.md,
//   },
//   modalActions: {
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     gap: spacing.sm,
//   },
//   modalBtn: { minWidth: 110 },
// });




import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Screen } from "../../../../Components";
import { CustomDateTimePicker } from "./CustomDateTimePicker";
import { spacing, colors } from "../../../../theme";

export const AdminUtilitiesSettings: React.FC = () => {
  const [date1, setDate1] = useState<Date | null>(null);
  const [date2, setDate2] = useState<Date | null>(null);
  const [time1, setTime1] = useState<Date | null>(null);
  const [time2, setTime2] = useState<Date | null>(null);
  const [time3, setTime3] = useState<Date | null>(null);

  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <CustomDateTimePicker mode="date" value={date1} onChange={setDate1} label="Date 1" required />
        <CustomDateTimePicker mode="date" value={date2} onChange={setDate2} label="Date 2" />
      </View>
      <View style={styles.row}>
        <CustomDateTimePicker mode="time" value={time1} onChange={setTime1} label="Time 1" required />
        <CustomDateTimePicker mode="time" value={time2} onChange={setTime2} label="Time 2" />
        <CustomDateTimePicker mode="time" value={time3} onChange={setTime3} label="Time 3" />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, backgroundColor: colors.fill },
  row: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.md },
});
