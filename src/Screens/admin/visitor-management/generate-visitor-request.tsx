// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   Modal,
//   Text,
// } from "react-native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { AdminStackParamList } from "../../../utils/interfaces";
// import { colors, spacing, typography, adjustSize } from "../../../theme";
// import { Header, Screen, TextField } from "../../../Components";
// import DropdownComponent from "../../../Components/DropDown";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { WithLocalSvg } from "react-native-svg/css";
// import { Images } from "../../../assets/Images";

// const typeOptions = [
//   { label: "Guest", value: "guest" },
//   { label: "Contractor", value: "contractor" },
//   { label: "Delivery", value: "delivery" },
//   { label: "Service Provider", value: "service_provider" },
//   { label: "Visitor", value: "visitor" },
// ];

// const propertyOptions = [
//   { label: "Farm House A", value: "farm_house_a" },
//   { label: "Farm House B", value: "farm_house_b" },
//   { label: "Town House 1", value: "town_house_1" },
//   { label: "Town House 2", value: "town_house_2" },
//   { label: "Villa 1", value: "villa_1" },
//   { label: "Villa 2", value: "villa_2" },
// ];

// const propertyGroupOptions = [
//   { label: "Farm Houses", value: "farm_houses" },
//   { label: "Town Houses", value: "town_houses" },
//   { label: "Villas", value: "villas" },
//   { label: "Apartments", value: "apartments" },
// ];

// const accessCodeOptions = [
//   { label: "Temporary Access", value: "temp_access" },
//   { label: "Full Access", value: "full_access" },
//   { label: "Limited Access", value: "limited_access" },
//   { label: "Emergency Access", value: "emergency_access" },
// ];

// export const AdminGenerateVisitorRequest: React.FC<Props> = ({
//   navigation,
// }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     type: "",
//     accessCode: "",
//     property: "",
//     propertyGroup: "",
//   });

//   const [fromDate, setFromDate] = useState<Date | null>(null);
//   const [toDate, setToDate] = useState<Date | null>(null);
//   const [showFromPicker, setShowFromPicker] = useState(false);
//   const [showToPicker, setShowToPicker] = useState(false);
//   const [pickerStep, setPickerStep] = useState<"date" | "time">("date");
//   const [tempDate, setTempDate] = useState(new Date());

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleDateTimeChange = (event: any, selectedDate?: Date) => {
//     if (selectedDate) {
//       setTempDate(selectedDate);
//     }
//   };

//   const handleDateNext = () => {
//     setPickerStep("time");
//   };

//   const handleTimeConfirm = () => {
//     if (showFromPicker) {
//       setFromDate(tempDate);
//       setShowFromPicker(false);
//     } else if (showToPicker) {
//       setToDate(tempDate);
//       setShowToPicker(false);
//     }
//     setPickerStep("date");
//   };

//   const handleModalCancel = () => {
//     setShowFromPicker(false);
//     setShowToPicker(false);
//     setPickerStep("date");
//   };

//   const openDatePicker = (isFrom: boolean) => {
//     if (isFrom) {
//       setTempDate(fromDate || new Date());
//       setShowFromPicker(true);
//     } else {
//       setTempDate(toDate || new Date());
//       setShowToPicker(true);
//     }
//     setPickerStep("date");
//   };

//   const formatDate = (date: Date) => {
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   const formatDateTime = (date: Date) => {
//     const dateStr = date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//     const timeStr = date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//     return `${dateStr} ${timeStr}`;
//   };

//   const formatTime = (date: Date) => {
//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const handleGenerate = () => {
//     // Validate required fields
//     if (!formData.name.trim()) {
//       Alert.alert("Error", "Please enter visitor name");
//       return;
//     }
//     if (!formData.type) {
//       Alert.alert("Error", "Please select visitor type");
//       return;
//     }
//     if (!formData.accessCode) {
//       Alert.alert("Error", "Please select access code");
//       return;
//     }
//     if (!formData.property) {
//       Alert.alert("Error", "Please select property");
//       return;
//     }
//     if (!formData.propertyGroup) {
//       Alert.alert("Error", "Please select property group");
//       return;
//     }

//     Alert.alert("Success", "Visitor request has been generated successfully!", [
//       {
//         text: "OK",
//         onPress: () => navigation.goBack(),
//       },
//     ]);
//   };

//   return (
//     <Screen
//       preset="fixed"
//       safeAreaEdges={["top"]}
//       contentContainerStyle={styles.container}
//     >
//       <Header title="Generate Visitor Request" />

//       <ScrollView
//         style={styles.content}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Name Field */}
//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>Name*</Text>
//           <TextField
//             placeholder="Enter name"
//             value={formData.name}
//             onChangeText={(text) => handleInputChange("name", text)}
//             inputWrapperStyle={styles.textInput}
//           />
//         </View>

//         {/* Type Field */}
//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>Type*</Text>
//           <DropdownComponent
//             data={typeOptions}
//             value={formData.type}
//             onChangeValue={(value) => handleInputChange("type", value)}
//             placeholder="Choose type"
//             dropdownStyle={styles.dropdown}
//             placeholderStyle={styles.dropdownPlaceholder}
//             selectedTextStyle={styles.dropdownSelected}
//             rightIconColor={colors.primary}
//           />
//         </View>

//         {/* Access Code Field */}
//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>Access Code*</Text>
//           <DropdownComponent
//             data={accessCodeOptions}
//             value={formData.accessCode}
//             onChangeValue={(value) => handleInputChange("accessCode", value)}
//             placeholder="Choose type"
//             dropdownStyle={styles.dropdown}
//             placeholderStyle={styles.dropdownPlaceholder}
//             selectedTextStyle={styles.dropdownSelected}
//             rightIconColor={colors.primary}
//           />
//         </View>

//         {/* Date Fields */}
//         <View style={styles.dateRow}>
//           <View style={styles.dateField}>
//             <Text style={styles.label}>From*</Text>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={() => openDatePicker(true)}
//             >
//               <Text
//                 style={[styles.dateText, !fromDate && styles.placeholderText]}
//               >
//                 {fromDate ? formatDate(fromDate) : "Select D & T"}
//               </Text>
//               <WithLocalSvg asset={Images.calendar} />
//             </TouchableOpacity>
//           </View>

//           <View style={styles.dateField}>
//             <Text style={styles.label}>To*</Text>
//             <TouchableOpacity
//               style={styles.dateButton}
//               onPress={() => openDatePicker(false)}
//             >
//               <Text
//                 style={[styles.dateText, !toDate && styles.placeholderText]}
//               >
//                 {toDate ? formatDate(toDate) : "Select D & T"}
//               </Text>
//               <WithLocalSvg asset={Images.calendar} />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Property Field */}
//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>Property*</Text>
//           <DropdownComponent
//             data={propertyOptions}
//             value={formData.property}
//             onChangeValue={(value) => handleInputChange("property", value)}
//             placeholder="Select property"
//             dropdownStyle={styles.dropdown}
//             placeholderStyle={styles.dropdownPlaceholder}
//             selectedTextStyle={styles.dropdownSelected}
//             rightIconColor={colors.primary}
//           />
//         </View>

//         {/* Property Group Field */}
//         <View style={styles.fieldContainer}>
//           <Text style={styles.label}>Property Group*</Text>
//           <DropdownComponent
//             data={propertyGroupOptions}
//             value={formData.propertyGroup}
//             onChangeValue={(value) => handleInputChange("propertyGroup", value)}
//             placeholder="Select property"
//             dropdownStyle={styles.dropdown}
//             placeholderStyle={styles.dropdownPlaceholder}
//             selectedTextStyle={styles.dropdownSelected}
//             rightIconColor={colors.primary}
//           />
//         </View>

//         {/* Generate Button */}
//         <TouchableOpacity
//           style={styles.generateButton}
//           onPress={handleGenerate}
//         >
//           <Text style={styles.generateButtonText}>Generate</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Date & Time Picker Modal */}
//       <Modal
//         visible={showFromPicker || showToPicker}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={handleModalCancel}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <View style={styles.modalHeader}>
//               <TouchableOpacity onPress={handleModalCancel}>
//                 <Text style={styles.modalCancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <Text style={styles.modalTitle}>
//                 {pickerStep === "date"
//                   ? showFromPicker
//                     ? "Select From Date"
//                     : "Select To Date"
//                   : showFromPicker
//                   ? "Select From Time"
//                   : "Select To Time"}
//               </Text>
//               <TouchableOpacity
//                 onPress={
//                   pickerStep === "date" ? handleDateNext : handleTimeConfirm
//                 }
//               >
//                 <Text style={styles.modalDoneText}>
//                   {pickerStep === "date" ? "Next" : "Done"}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <DateTimePicker
//               value={tempDate}
//               mode={pickerStep}
//               display="spinner"
//               onChange={handleDateTimeChange}
//               style={styles.datePicker}
//             />
//           </View>
//         </View>
//       </Modal>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: spacing.lg,
//   },
//   scrollContent: {
//     paddingBottom: spacing.xl,
//   },
//   fieldContainer: {
//     marginBottom: spacing.lg,
//   },
//   label: {
//     fontSize: adjustSize(12),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.medium,
//     marginBottom: spacing.sm,
//   },
//   textInput: {
//     borderRadius: adjustSize(12),
//     borderWidth: 1,
//     borderColor: colors.border,
//     paddingHorizontal: spacing.md,
//     height: adjustSize(50),
//   },
//   dropdown: {
//     backgroundColor: colors.fill,
//     borderRadius: adjustSize(12),
//     borderWidth: 1,
//     borderColor: colors.border,
//     paddingHorizontal: spacing.md,
//     height: adjustSize(50),
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     elevation: 2,
//   },
//   dropdownPlaceholder: {
//     fontSize: adjustSize(14),
//     color: colors.grey,
//     fontFamily: typography.fonts.poppins.normal,
//   },
//   dropdownSelected: {
//     fontSize: adjustSize(14),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.normal,
//   },
//   dateRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: spacing.lg,
//   },
//   dateField: {
//     flex: 1,
//     marginHorizontal: spacing.xs,
//   },
//   dateButton: {
//     backgroundColor: colors.fill,
//     borderRadius: adjustSize(12),
//     borderWidth: 1,
//     borderColor: colors.border,
//     paddingHorizontal: spacing.md,
//     height: adjustSize(50),
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     elevation: 2,
//   },
//   dateText: {
//     fontSize: adjustSize(14),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.normal,
//   },
//   placeholderText: {
//     color: colors.textDim,
//     opacity: 0.6,
//   },
//   generateButton: {
//     backgroundColor: colors.primary,
//     borderRadius: adjustSize(12),
//     paddingVertical: spacing.md,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: spacing.xl,
//     height: adjustSize(50),
//   },
//   generateButtonText: {
//     fontSize: adjustSize(16),
//     color: colors.white,
//     fontFamily: typography.fonts.poppins.semiBold,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: colors.white,
//     borderTopLeftRadius: adjustSize(20),
//     borderTopRightRadius: adjustSize(20),
//     paddingBottom: spacing.xl,
//   },
//   modalHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.md,
//     borderBottomWidth: 1,
//     borderBottomColor: colors.border,
//   },
//   modalTitle: {
//     fontSize: adjustSize(16),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.semiBold,
//   },
//   modalCancelText: {
//     fontSize: adjustSize(14),
//     color: colors.textDim,
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   modalDoneText: {
//     fontSize: adjustSize(14),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.semiBold,
//   },
//   datePicker: {
//     backgroundColor: colors.white,
//   },
// });

import React, { useMemo, useState } from "react";
import { StyleSheet, View, Pressable, Modal, Platform } from "react-native";
import { Screen, Text, Button, TextField } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Images } from "../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import DropdownComponent from "../../../Components/DropDown";
import {
  AdminStackParamList,
  AppStackScreenProps,
} from "../../../utils/interfaces";
import { rentalProperties } from "../../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<
  AdminStackParamList,
  "AdminGenerateVisitorRequest"
>;
export function AdminGenerateVisitorRequest({ route, navigation }: Props) {
  const preselectId: any = route?.params?.propertyId;
  const [name, setName] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [accessCode, setAccessCode] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  // unified modal picker state
  const [pickerVisible, setPickerVisible] = useState(false);
  const [pickerStep, setPickerStep] = useState<"date" | "time">("date");
  const [activeTarget, setActiveTarget] = useState<"from" | "to">("from");
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [propertyId, setPropertyId] = useState<string | null>(
    preselectId ?? null
  );
  const [group, setGroup] = useState<string | null>(null);
  const [visitorsCount, setVisitorsCount] = useState<number>(1);

  const propertyOptions = useMemo(
    () => rentalProperties.map((p) => ({ label: p.name, value: p.propertyId })),
    []
  );
  const groupOptions = useMemo(
    () =>
      Array.from(new Set(rentalProperties.map((p) => p.group))).map((g) => ({
        label: g,
        value: g,
      })),
    []
  );
  const typeOptions = useMemo(
    () => [
      { label: "One-Time", value: "One-Time" },
      { label: "Permanent", value: "Permanent" },
      { label: "Event", value: "Event" },
    ],
    []
  );

  const fmt = (d: Date | null) => (d ? d.toLocaleDateString() : "Select Date");
  const fmtTime = (d: Date | null) =>
    d
      ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "--:-- --";

  const canSubmit =
    name.trim().length > 0 &&
    !!type &&
    accessCode.trim().length > 0 &&
    !!fromDate &&
    !!toDate &&
    !!propertyId &&
    !!group &&
    (type !== "Event" || visitorsCount > 0);

  const onGenerate = () => {
    // TODO: Wire API call here
    // For now just log values
    console.log({
      name,
      type,
      accessCode,
      fromDate,
      toDate,
      propertyId,
      group,
      visitorsCount,
    });
    navigation.goBack();
  };

  const openPicker = (
    target: "from" | "to",
    step: "date" | "time" = "date"
  ) => {
    setActiveTarget(target);
    setPickerStep(step);
    const base =
      target === "from" ? fromDate ?? new Date() : toDate ?? new Date();
    setTempDate(base);
    setPickerVisible(true);
  };

  const cancelPicker = () => {
    setPickerVisible(false);
  };

  const confirmPicker = () => {
    if (activeTarget === "from") setFromDate(tempDate);
    else setToDate(tempDate);
    setPickerVisible(false);
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Generate Visitor Request" />
      <View style={styles.container}>
        {/* Name */}
        <Text weight="semiBold" style={styles.label}>
          {type === "Event" ? "Event Name" : "Name"}
          <Text style={styles.required}>*</Text>
        </Text>
        <TextField
          placeholder={type === "Event" ? "Enter Event Name" : "Enter name"}
          value={name}
          onChangeText={setName}
          inputWrapperStyle={styles.inputWrapper}
          style={styles.input}
          placeholderTextColor={colors.primaryLight}
        />

        {/* Type */}
        <Text weight="semiBold" style={styles.label}>
          Type<Text style={styles.required}>*</Text>
        </Text>
        <DropdownComponent
          data={typeOptions}
          label="Choose type"
          placeholder="Choose type"
          value={type ?? undefined}
          onChangeValue={(v: string) => setType(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Access Code */}
        <Text weight="semiBold" style={styles.label}>
          Access Code<Text style={styles.required}>*</Text>
        </Text>
        <TextField
          placeholder="Enter access code"
          value={accessCode}
          onChangeText={setAccessCode}
          inputWrapperStyle={styles.inputWrapper}
          style={styles.input}
          placeholderTextColor={colors.primaryLight}
        />

        {/* Date/Time layout */}
        {type === "Permanent" ? (
          <>
            {/* Row 1: From (Date) + Time */}
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" style={styles.label}>
                  From<Text style={styles.required}>*</Text>
                </Text>
                <Pressable
                  onPress={() => openPicker("from", "date")}
                  style={styles.dtButton}
                >
                  <Text
                    style={[
                      styles.dtText,
                      {
                        color: fromDate ? colors.primary : colors.primaryLight,
                      },
                    ]}
                  >
                    {fmt(fromDate)}
                  </Text>
                  <WithLocalSvg asset={Images.calendar} />
                </Pressable>
              </View>
              <View style={{ width: spacing.md }} />
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" style={styles.label}>
                  Time<Text style={styles.required}>*</Text>
                </Text>
                <Pressable
                  onPress={() => openPicker("from", "time")}
                  style={styles.dtButton}
                >
                  <Text
                    style={[
                      styles.dtText,
                      {
                        color: fromDate ? colors.primary : colors.primaryLight,
                      },
                    ]}
                  >
                    {fmtTime(fromDate)}
                  </Text>
                  <WithLocalSvg asset={Images.clock} />
                </Pressable>
              </View>
            </View>

            {/* Row 2: To (Date) + Time */}
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" style={styles.label}>
                  To<Text style={styles.required}>*</Text>
                </Text>
                <Pressable
                  onPress={() => openPicker("to", "date")}
                  style={styles.dtButton}
                >
                  <Text
                    style={[
                      styles.dtText,
                      { color: toDate ? colors.primary : colors.primaryLight },
                    ]}
                  >
                    {fmt(toDate)}
                  </Text>
                  <WithLocalSvg asset={Images.calendar} />
                </Pressable>
              </View>
              <View style={{ width: spacing.md }} />
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" style={styles.label}>
                  Time<Text style={styles.required}>*</Text>
                </Text>
                <Pressable
                  onPress={() => openPicker("to", "time")}
                  style={styles.dtButton}
                >
                  <Text
                    style={[
                      styles.dtText,
                      { color: toDate ? colors.primary : colors.primaryLight },
                    ]}
                  >
                    {fmtTime(toDate)}
                  </Text>
                  <WithLocalSvg asset={Images.clock} />
                </Pressable>
              </View>
            </View>
          </>
        ) : type === "Event" ? (
          // Event: single row with From/To time only
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text weight="semiBold" style={styles.label}>
                From<Text style={styles.required}>*</Text>
              </Text>
              <Pressable
                onPress={() => openPicker("from", "time")}
                style={styles.dtButton}
              >
                <Text
                  style={[
                    styles.dtText,
                    { color: fromDate ? colors.primary : colors.primaryLight },
                  ]}
                >
                  {fmtTime(fromDate)}
                </Text>
                <WithLocalSvg asset={Images.clock} />
              </Pressable>
            </View>
            <View style={{ width: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text weight="semiBold" style={styles.label}>
                To<Text style={styles.required}>*</Text>
              </Text>
              <Pressable
                onPress={() => openPicker("to", "time")}
                style={styles.dtButton}
              >
                <Text
                  style={[
                    styles.dtText,
                    { color: toDate ? colors.primary : colors.primaryLight },
                  ]}
                >
                  {fmtTime(toDate)}
                </Text>
                <WithLocalSvg asset={Images.clock} />
              </Pressable>
            </View>
          </View>
        ) : (
          // Non-permanent: single row with From/To dates only
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text weight="semiBold" style={styles.label}>
                From<Text style={styles.required}>*</Text>
              </Text>
              <Pressable
                onPress={() => openPicker("from", "date")}
                style={styles.dtButton}
              >
                <Text
                  style={[
                    styles.dtText,
                    { color: fromDate ? colors.primary : colors.primaryLight },
                  ]}
                >
                  {fmt(fromDate)}
                </Text>
                <WithLocalSvg asset={Images.calendar} />
              </Pressable>
            </View>
            <View style={{ width: spacing.md }} />
            <View style={{ flex: 1 }}>
              <Text weight="semiBold" style={styles.label}>
                To<Text style={styles.required}>*</Text>
              </Text>
              <Pressable
                onPress={() => openPicker("to", "date")}
                style={styles.dtButton}
              >
                <Text
                  style={[
                    styles.dtText,
                    { color: toDate ? colors.primary : colors.primaryLight },
                  ]}
                >
                  {fmt(toDate)}
                </Text>
                <WithLocalSvg asset={Images.calendar} />
              </Pressable>
            </View>
          </View>
        )}

        {/* Property */}
        <Text weight="semiBold" style={styles.label}>
          Property<Text style={styles.required}>*</Text>
        </Text>
        <DropdownComponent
          data={propertyOptions}
          label="Select property"
          placeholder="Select property"
          value={propertyId ?? undefined}
          onChangeValue={(v: string) => setPropertyId(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Property Group */}
        <Text weight="semiBold" style={styles.label}>
          Property Group<Text style={styles.required}>*</Text>
        </Text>
        <DropdownComponent
          data={groupOptions}
          label="Select property"
          placeholder="Select property"
          value={group ?? undefined}
          onChangeValue={(v: string) => setGroup(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Number of Visitors - only for Event */}
        {type === "Event" && (
          <>
            <Text weight="semiBold" style={styles.label}>
              Number of Visitors<Text style={styles.required}>*</Text>
            </Text>
            <View style={[styles.row, { alignItems: "center" }]}>
              <Pressable
                onPress={() => setVisitorsCount((v) => Math.max(0, v - 1))}
                style={[
                  styles.dtButton,
                  { width: 60, justifyContent: "center" },
                ]}
              >
                <Text style={styles.dtText}>-</Text>
              </Pressable>
              <View style={{ width: spacing.md }} />
              <View
                style={[styles.dtButton, { flex: 1, justifyContent: "center" }]}
              >
                <Text style={[styles.dtText, { color: colors.primary }]}>
                  {visitorsCount}
                </Text>
              </View>
              <View style={{ width: spacing.md }} />
              <Pressable
                onPress={() => setVisitorsCount((v) => v + 1)}
                style={[
                  styles.dtButton,
                  { width: 60, justifyContent: "center" },
                ]}
              >
                <Text style={styles.dtText}>+</Text>
              </Pressable>
            </View>
          </>
        )}

        <View style={{ height: spacing.xl }} />
        <Button
          text="Generate"
          preset="reversed"
          style={styles.generateBtn}
          textStyle={styles.generateText}
          onPress={onGenerate}
          disabled={!canSubmit}
        />
      </View>

      {/* Modal Date & Time Picker */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelPicker}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text weight="semiBold" style={styles.modalTitle}>
              {pickerStep === "date" ? "Select Date" : "Select Time"}
            </Text>

            <View style={styles.modalPickerWrap}>
              <DateTimePicker
                value={tempDate}
                mode={pickerStep}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_, d) => {
                  if (!d) return;
                  setTempDate(d);
                }}
              />
            </View>

            <View style={styles.modalActions}>
              <Button
                text="Cancel"
                preset="default"
                style={styles.modalBtn}
                onPress={cancelPicker}
              />
              {pickerStep === "date" ? (
                <Button
                  text={Platform.OS === "ios" ? "Next" : "Next"}
                  preset="reversed"
                  style={styles.modalBtn}
                  onPress={() => setPickerStep("time")}
                />
              ) : (
                <Button
                  text="Done"
                  preset="reversed"
                  style={styles.modalBtn}
                  onPress={confirmPicker}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    // flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  required: {
    color: colors.primary,
  },
  inputWrapper: {
    // backgroundColor: colors.white,
    borderRadius: adjustSize(10),
  },
  input: {
    fontFamily: typography.fonts.poppins.medium,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: spacing.md,
  },
  dtButton: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  dtText: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  generateBtn: {
    height: adjustSize(48),
    borderRadius: adjustSize(12),
    backgroundColor: colors.primary,
  },
  generateText: {
    fontFamily: typography.fonts.poppins.semiBold,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: adjustSize(16),
    borderTopRightRadius: adjustSize(16),
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginBottom: spacing.md,
  },
  modalPickerWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  modalBtn: {
    minWidth: 110,
  },
});
