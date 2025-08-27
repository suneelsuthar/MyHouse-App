// import React, { useState } from "react";
// import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { Screen, Text, Button, TextField } from "../../../Components";
// import DropDown from "../../../Components/DropDown";
// import { colors, spacing, typography, adjustSize } from "../../../theme";
// import { Ionicons } from "@expo/vector-icons";

// type Priority = "High" | "Medium" | "Low";
// type Status = "Open" | "In Progress" | "Completed" | "On Hold" | "Cancelled";

// const priorityOptions = [
//   { label: "High", value: "High" },
//   { label: "Medium", value: "Medium" },
//   { label: "Low", value: "Low" },
// ];

// const statusOptions = [
//   { label: "Open", value: "Open" },
//   { label: "In Progress", value: "In Progress" },
//   { label: "Completed", value: "Completed" },
//   { label: "On Hold", value: "On Hold" },
//   { label: "Cancelled", value: "Cancelled" },
// ];

// export const AdminFMOrderUpdate = () => {
//   const [formData, setFormData] = useState({
//     workOrderNo: "26",
//     title: "Toilet leakage",
//     category: "Plumbing",
//     priority: "High" as Priority,
//     status: "In Progress" as Status,
//     dueDate: "2024-04-05",
//     assignedTo: "John Doe",
//     description: "Toilet in the master bedroom is leaking and needs immediate attention.",
//     notes: "",
//   });

//   const handleUpdate = () => {
//     // Handle form submission
//     console.log("Form submitted:", formData);
//   };

//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <Screen preset="scroll" safeAreaEdges={["top"]} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Work Order No.</Text>
//           <TextField
//             value={formData.workOrderNo}
//             editable={false}
//             containerStyle={styles.input}
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Title</Text>
//           <TextField
//             value={formData.title}
//             onChangeText={(text) => handleChange("title", text)}
//             containerStyle={styles.input}
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Category</Text>
//           <TextField
//             value={formData.category}
//             onChangeText={(text) => handleChange("category", text)}
//             containerStyle={styles.input}
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Priority</Text>
//           <DropDown
//             data={priorityOptions}
//             value={formData.priority}
//             onChangeValue={(value: string) => handleChange("priority", value as Priority)}
//             dropdownStyle={styles.dropdown}
//             placeholderStyle={styles.dropdownPlaceholder}
//             selectedTextStyle={styles.dropdownSelected}
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Status</Text>
//           <DropDown
//             data={statusOptions}
//             value={formData.status}
//             onChangeValue={(value: string) => handleChange("status", value as Status)}
//             dropdownStyle={styles.dropdown}
//             placeholderStyle={styles.dropdownPlaceholder}
//             selectedTextStyle={styles.dropdownSelected}
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Due Date</Text>
//           <View style={styles.dateInputContainer}>
//             <TextField
//               value={formData.dueDate}
//               onChangeText={(text) => handleChange("dueDate", text)}
//               containerStyle={[styles.input, { flex: 1 }]}
//             />
//             <Ionicons name="calendar-outline" size={20} color={colors.primary} style={styles.calendarIcon} />
//           </View>
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Assigned To</Text>
//           <TextField
//             value={formData.assignedTo}
//             onChangeText={(text) => handleChange("assignedTo", text)}
//             containerStyle={styles.input}
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Description</Text>
//           <TextField
//             value={formData.description}
//             onChangeText={(text) => handleChange("description", text)}
//             multiline
//             numberOfLines={4}
//             containerStyle={[styles.input, styles.textArea]}
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Notes</Text>
//           <TextField
//             value={formData.notes}
//             onChangeText={(text) => handleChange("notes", text)}
//             placeholder="Add any additional notes or comments..."
//             multiline
//             numberOfLines={3}
//             containerStyle={[styles.input, styles.textArea]}
//           />
//         </View>

//         <View style={styles.buttonContainer}>
//           <Button
//             text="Update Work Order"
//             onPress={handleUpdate}
//             style={styles.updateButton}
//             textStyle={styles.buttonText}
//           />
//         </View>
//       </ScrollView>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.palette.neutral100,
//   },
//   scrollContent: {
//     padding: spacing.md,
//     paddingBottom: spacing.xxxl,
//   },
//   formGroup: {
//     marginBottom: spacing.md,
//   },
//   label: {
//     fontSize: adjustSize(14),
//     fontFamily: typography.fonts.poppins.medium,
//     color: colors.palette.neutral800,
//     marginBottom: spacing.xs,
//   },
//   input: {
//     backgroundColor: colors.palette.neutral200,
//     borderRadius: 8,
//     paddingHorizontal: spacing.sm,
//   },
//   dropdown: {
//     height: adjustSize(48),
//     borderRadius: 8,
//     backgroundColor: colors.palette.neutral200,
//     paddingHorizontal: spacing.sm,
//   },
//   dropdownPlaceholder: {
//     color: colors.palette.neutral500,
//     fontSize: adjustSize(14),
//   },
//   dropdownSelected: {
//     color: colors.palette.neutral800,
//     fontSize: adjustSize(14),
//   },
//   dateInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   calendarIcon: {
//     position: 'absolute',
//     right: 15,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//     paddingTop: spacing.sm,
//   },
//   buttonContainer: {
//     marginTop: spacing.lg,
//   },
//   updateButton: {
//     backgroundColor: colors.primary,
//     borderRadius: 8,
//     height: adjustSize(48),
//     justifyContent: 'center',
//   },
//   buttonText: {
//     color: colors.palette.neutral100,
//     fontSize: adjustSize(16),
//     fontFamily: typography.fonts.poppins.semiBold,
//   },
// });

// import React from "react";
// import { Screen, Text } from "../../../Components";

// export const AdminFMGenerateWorkOrder = () => {
//   return (
//     <Screen preset="fixed" safeAreaEdges={["top"]}>
//       <Text text="AdminFMGenerateWorkOrder" />
//     </Screen>
//   );
// };

// import React from "react";
// import { Screen, Text } from "../../../Components";

// export const AdminFMEdit = () => {
//   return (
//     <Screen preset="fixed" safeAreaEdges={["top"]}>
//       <Text text="AdminFMEdit" />
//     </Screen>
//   );
// };
import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen, Text, Button, TextField } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import DropdownComponent from "../../../Components/DropDown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { rentalProperties } from "../../../utils/data";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
type Props = AppStackScreenProps<"AdminFMOrderUpdate">;

export function AdminFMOrderUpdate({ navigation }: Props) {
  // form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [fm, setFm] = useState<string | null>(null);
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // date modal
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  // compute start of today once per render
  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const fmtDate = (d: Date | null) => (d ? d.toLocaleDateString() : "Date");

  const canGenerate =
    title.trim().length > 0 &&
    !!category &&
    !!issueDate &&
    !!priority &&
    !!propertyId &&
    desc.trim().length > 0;

  const onGenerate = () => {
    if (!canGenerate) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 1000);
  };

  const openIssuePicker = () => {
    const base = issueDate ?? new Date();
    // ensure not earlier than today
    const clamped = base < todayStart ? todayStart : base;
    setTempDate(clamped);
    setPickerVisible(true);
  };

  const cancelPicker = () => setPickerVisible(false);
  const confirmPicker = () => {
    // clamp to today if somehow earlier
    const finalDate = tempDate < todayStart ? todayStart : tempDate;
    setIssueDate(finalDate);
    setPickerVisible(false);
  };

  const pickImages = async () => {
    // Request permission first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 8,
    });

    if (result.canceled) return;

    // result.assets is an array
    const uris = (result.assets || [])
      .map((a) => a.uri)
      .filter(Boolean) as string[];
    setSelectedImages((prev) => {
      const combined = [...prev, ...uris];
      // Dedup by URI and cap at 12 thumbs
      return Array.from(new Set(combined)).slice(0, 12);
    });
  };

  // Build gallery: prefer user-selected images, else fallback slides
  const gallery: any[] = useMemo(() => {
    if (selectedImages.length > 0) {
      return selectedImages.map((uri) => ({ uri }));
    }
    return [Images.slide1, Images.slide2, Images.slide3];
  }, [selectedImages]);

  // Active hero image index
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Update Work Order" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ padding: adjustSize(10) }}>
          {/* Title */}
          <Text style={styles.label} weight="semiBold">
            Title
          </Text>
          <TextField
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            inputWrapperStyle={styles.inputWrapper}
            style={styles.input}
            placeholderTextColor={colors.primaryLight}
          />

          <Text style={styles.label} weight="semiBold">
            Work Order No.*
          </Text>
          <TextField
            placeholder="Order Number"
            value={title}
            onChangeText={setTitle}
            inputWrapperStyle={styles.inputWrapper}
            style={styles.input}
            placeholderTextColor={colors.primaryLight}
          />
          {/* Issue date */}
          <Text style={styles.label} weight="medium">
            Update Date*
          </Text>
          <Pressable onPress={openIssuePicker} style={styles.dtButton}>
            <Text
              style={[
                styles.dtText,
                { color: issueDate ? colors.primary : colors.primaryLight },
              ]}
            >
              {fmtDate(issueDate)}
            </Text>
            <WithLocalSvg asset={Images.calendar} />
          </Pressable>

          {/* Description */}
          <Text style={styles.label} weight="semiBold">
            Description*
          </Text>
          <TextField
            placeholder="Write a detailed description"
            value={desc}
            onChangeText={setDesc}
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={[
              styles.inputWrapper,
              { height: adjustSize(120), alignItems: "flex-start" },
            ]}
            style={[styles.input, { height: adjustSize(110) }]}
            multiline
          />

          {/* Issue date */}
          <Text style={styles.label} weight="medium">
            Upload Images
          </Text>
          <Pressable
            onPress={() => pickImages()}
            style={[styles.dtButton, { marginBottom: 20 }]}
          >
            <Text
              style={[
                styles.dtText,
                { color: issueDate ? colors.primary : colors.primaryLight },
              ]}
            >
              No file choosen
            </Text>
            <WithLocalSvg asset={Images.upload} />
          </Pressable>

          <View style={styles.mediaRow}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {gallery.map((src, i) => (
                <Pressable key={i} onPress={() => setActiveSlide(i)}>
                  <Image
                    source={src}
                    style={[
                      styles.thumb,
                      i === activeSlide && styles.thumbActive,
                    ]}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={{ height: spacing.xl }} />
          <Button
            text={loading ? "Adding Update..." : "Add Update"}
            preset="reversed"
            style={styles.generateBtn}
            textStyle={styles.generateText}
            onPress={onGenerate}
            disabled={!canGenerate || loading}
          />
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelPicker}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text weight="semiBold" style={styles.modalTitle}>
              Select Date
            </Text>
            <View style={styles.modalPickerWrap}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                minimumDate={todayStart}
                onChange={(_, d) => d && setTempDate(d)}
              />
            </View>
            <View style={styles.modalActions}>
              <Button
                text="Cancel"
                preset="default"
                style={styles.modalBtn}
                onPress={cancelPicker}
              />
              <Button
                text="Done"
                preset="reversed"
                style={styles.modalBtn}
                onPress={confirmPicker}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {},
  heroImg: {
    height: adjustSize(228),
    borderRadius: adjustSize(0),
    position: "relative",
  },
  dotsRow: {
    position: "absolute",
    bottom: adjustSize(10),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(6),
  },
  dot: {
    width: adjustSize(8),
    height: adjustSize(8),
    borderRadius: adjustSize(4),
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotInactive: {
    backgroundColor: colors.white,
    opacity: 0.9,
  },
  mediaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  uploadTile: {
    width: adjustSize(60),
    height: adjustSize(60),
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  thumb: {
    width: adjustSize(60),
    height: adjustSize(60),
    borderRadius: adjustSize(10),
    marginRight: spacing.sm,
    backgroundColor: colors.fill,
  },
  thumbActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  inputWrapper: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
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
  generateBtn: {
    height: adjustSize(48),
    borderRadius: adjustSize(12),
    backgroundColor: colors.primary,
    marginBottom: adjustSize(30),
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
