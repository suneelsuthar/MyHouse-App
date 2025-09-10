import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Text,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../../utils/interfaces";
import { colors, spacing, typography, adjustSize } from "../../../../theme";
import { Header, Screen, TextField } from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";

type Props = NativeStackScreenProps<AdminStackParamList, "EditCreateMeter">;

const manufacturerOptions = [
  { label: "Manufacturer A", value: "manufacturer_a" },
  { label: "Manufacturer B", value: "manufacturer_b" },
  { label: "Manufacturer C", value: "manufacturer_c" },
];

const propertyOptions = [
  { label: "Farm House A", value: "farm_house_a" },
  { label: "Farm House B", value: "farm_house_b" },
  { label: "Town House 1", value: "town_house_1" },
];

const propertyGroupOptions = [
  { label: "Farm Houses", value: "farm_houses" },
  { label: "Town Houses", value: "town_houses" },
  { label: "Villas", value: "villas" },
];

const EditCreateMeter: React.FC<Props> = ({ navigation, route }) => {
  const { mode } = route.params || {};
  const isEditMode = mode === "edit";

  const [formData, setFormData] = useState({
    meterId: "",
    meterNumber: "",
    manufacturer: "",
    phaseNumber: "",
    propertyGroup: "",
    property: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (
      !formData.meterId ||
      !formData.meterNumber ||
      !formData.manufacturer ||
      !formData.phaseNumber ||
      !formData.propertyGroup ||
      !formData.property
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    Alert.alert(
      "Success",
      `Meter ${isEditMode ? "updated" : "added"} successfully!`,
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header title={isEditMode ? "Update Meter" : "Add Meter"} />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Meter ID</Text>
          <TextField
            placeholder="lorem ipsum"
            value={isEditMode ? "MTR001" : formData.meterId}
            onChangeText={(text) => handleInputChange("meterId", text)}
            inputWrapperStyle={styles.textInput}
            editable={!isEditMode}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Meter Number</Text>
          <TextField
            placeholder="lorem ipsum"
            value={formData.meterNumber}
            onChangeText={(text) => handleInputChange("meterNumber", text)}
            inputWrapperStyle={styles.textInput}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Manufacturer</Text>
          <DropdownComponent
            data={manufacturerOptions}
            value={formData.manufacturer}
            onChangeValue={(value) => handleInputChange("manufacturer", value)}
            placeholder="Select Manufacturer"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phase Number</Text>
          <DropdownComponent
            data={[
              { label: "Phase 1", value: "phase_1" },
              { label: "Phase 2", value: "phase_2" },
              { label: "Phase 3", value: "phase_3" },
            ]}
            value={formData.phaseNumber}
            onChangeValue={(value) => handleInputChange("phaseNumber", value)}
            placeholder="Select Phase Number"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Property Group</Text>
          <DropdownComponent
            data={propertyGroupOptions}
            value={formData.propertyGroup}
            onChangeValue={(value) => handleInputChange("propertyGroup", value)}
            placeholder="Select Property Group"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Property</Text>
          <DropdownComponent
            data={propertyOptions}
            value={formData.property}
            onChangeValue={(value) => handleInputChange("property", value)}
            placeholder="Select Property"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>
            {isEditMode ? "Save" : "Add"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

export default EditCreateMeter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
    paddingTop: adjustSize(30),
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
    // paddingHorizontal: spacing.md,
    height: adjustSize(50),
    backgroundColor: colors.white,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: adjustSize(50),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(14),
    color: colors.textDim,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: adjustSize(12),
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
    height: adjustSize(50),
    marginBottom:20
  },
  addButtonText: {
    fontSize: adjustSize(16),
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
