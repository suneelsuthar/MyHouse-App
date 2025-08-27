import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../utils/interfaces";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { Header, Screen, TextField } from "../../../Components";
import DropdownComponent from "../../../Components/DropDown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";

type Props = NativeStackScreenProps<
  AdminStackParamList,
  "AdminGenerateVisitorRequest"
>;

const typeOptions = [
  { label: "Guest", value: "guest" },
  { label: "Contractor", value: "contractor" },
  { label: "Delivery", value: "delivery" },
  { label: "Service Provider", value: "service_provider" },
  { label: "Visitor", value: "visitor" },
];

const propertyOptions = [
  { label: "Farm House A", value: "farm_house_a" },
  { label: "Farm House B", value: "farm_house_b" },
  { label: "Town House 1", value: "town_house_1" },
  { label: "Town House 2", value: "town_house_2" },
  { label: "Villa 1", value: "villa_1" },
  { label: "Villa 2", value: "villa_2" },
];

const propertyGroupOptions = [
  { label: "Farm Houses", value: "farm_houses" },
  { label: "Town Houses", value: "town_houses" },
  { label: "Villas", value: "villas" },
  { label: "Apartments", value: "apartments" },
];

const accessCodeOptions = [
  { label: "Temporary Access", value: "temp_access" },
  { label: "Full Access", value: "full_access" },
  { label: "Limited Access", value: "limited_access" },
  { label: "Emergency Access", value: "emergency_access" },
];

export const AdminGenerateVisitorRequest: React.FC<Props> = ({
  navigation,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    accessCode: "",
    property: "",
    propertyGroup: "",
  });

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [pickerStep, setPickerStep] = useState<"date" | "time">("date");
  const [tempDate, setTempDate] = useState(new Date());

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDateTimeChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  };

  const handleDateNext = () => {
    setPickerStep("time");
  };

  const handleTimeConfirm = () => {
    if (showFromPicker) {
      setFromDate(tempDate);
      setShowFromPicker(false);
    } else if (showToPicker) {
      setToDate(tempDate);
      setShowToPicker(false);
    }
    setPickerStep("date");
  };

  const handleModalCancel = () => {
    setShowFromPicker(false);
    setShowToPicker(false);
    setPickerStep("date");
  };

  const openDatePicker = (isFrom: boolean) => {
    if (isFrom) {
      setTempDate(fromDate || new Date());
      setShowFromPicker(true);
    } else {
      setTempDate(toDate || new Date());
      setShowToPicker(true);
    }
    setPickerStep("date");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatDateTime = (date: Date) => {
    const dateStr = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${dateStr} ${timeStr}`;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleGenerate = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter visitor name");
      return;
    }
    if (!formData.type) {
      Alert.alert("Error", "Please select visitor type");
      return;
    }
    if (!formData.accessCode) {
      Alert.alert("Error", "Please select access code");
      return;
    }
    if (!formData.property) {
      Alert.alert("Error", "Please select property");
      return;
    }
    if (!formData.propertyGroup) {
      Alert.alert("Error", "Please select property group");
      return;
    }

    Alert.alert("Success", "Visitor request has been generated successfully!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header title="Generate Visitor Request" />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Name*</Text>
          <TextField
            placeholder="Enter name"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
            inputWrapperStyle={styles.textInput}
          />
        </View>

        {/* Type Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Type*</Text>
          <DropdownComponent
            data={typeOptions}
            value={formData.type}
            onChangeValue={(value) => handleInputChange("type", value)}
            placeholder="Choose type"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        {/* Access Code Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Access Code*</Text>
          <DropdownComponent
            data={accessCodeOptions}
            value={formData.accessCode}
            onChangeValue={(value) => handleInputChange("accessCode", value)}
            placeholder="Choose type"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        {/* Date Fields */}
        <View style={styles.dateRow}>
          <View style={styles.dateField}>
            <Text style={styles.label}>From*</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => openDatePicker(true)}
            >
              <Text
                style={[styles.dateText, !fromDate && styles.placeholderText]}
              >
                {fromDate ? formatDate(fromDate) : "Select D & T"}
              </Text>
              <WithLocalSvg asset={Images.calendar} />
            </TouchableOpacity>
          </View>

          <View style={styles.dateField}>
            <Text style={styles.label}>To*</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => openDatePicker(false)}
            >
              <Text
                style={[styles.dateText, !toDate && styles.placeholderText]}
              >
                {toDate ? formatDate(toDate) : "Select D & T"}
              </Text>
              <WithLocalSvg asset={Images.calendar} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Property Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Property*</Text>
          <DropdownComponent
            data={propertyOptions}
            value={formData.property}
            onChangeValue={(value) => handleInputChange("property", value)}
            placeholder="Select property"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        {/* Property Group Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Property Group*</Text>
          <DropdownComponent
            data={propertyGroupOptions}
            value={formData.propertyGroup}
            onChangeValue={(value) => handleInputChange("propertyGroup", value)}
            placeholder="Select property"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerate}
        >
          <Text style={styles.generateButtonText}>Generate</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date & Time Picker Modal */}
      <Modal
        visible={showFromPicker || showToPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleModalCancel}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {pickerStep === "date"
                  ? showFromPicker
                    ? "Select From Date"
                    : "Select To Date"
                  : showFromPicker
                  ? "Select From Time"
                  : "Select To Time"}
              </Text>
              <TouchableOpacity
                onPress={
                  pickerStep === "date" ? handleDateNext : handleTimeConfirm
                }
              >
                <Text style={styles.modalDoneText}>
                  {pickerStep === "date" ? "Next" : "Done"}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={tempDate}
              mode={pickerStep}
              display="spinner"
              onChange={handleDateTimeChange}
              style={styles.datePicker}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  fieldContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    marginBottom: spacing.sm,
  },
  textInput: {
    borderRadius: adjustSize(12),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: adjustSize(50),
  },
  dropdown: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(12),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: adjustSize(50),
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(14),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  dateField: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  dateButton: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(12),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: adjustSize(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  dateText: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  placeholderText: {
    color: colors.textDim,
    opacity: 0.6,
  },
  generateButton: {
    backgroundColor: colors.primary,
    borderRadius: adjustSize(12),
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
    height: adjustSize(50),
  },
  generateButtonText: {
    fontSize: adjustSize(16),
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: adjustSize(20),
    borderTopRightRadius: adjustSize(20),
    paddingBottom: spacing.xl,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  modalCancelText: {
    fontSize: adjustSize(14),
    color: colors.textDim,
    fontFamily: typography.fonts.poppins.medium,
  },
  modalDoneText: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  datePicker: {
    backgroundColor: colors.white,
  },
});
