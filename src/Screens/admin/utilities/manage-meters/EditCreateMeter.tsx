import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../../utils/interfaces";
import { colors, spacing, typography, adjustSize } from "../../../../theme";
import { Header, Screen, Text, TextField } from "../../../../Components";
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

const utilityTypeOptions = [
  { label: "Electricity", value: "electricity" },
  { label: "Water", value: "water" },
  { label: "Gas", value: "gas" },
];

const phaseNumberOptions = [
  { label: "1 Phase", value: "1" },
  { label: "2 Phase", value: "2" },
  { label: "3 Phase", value: "3" },
];

const EditCreateMeter: React.FC<Props> = ({ navigation, route }) => {
  const { mode } = route.params || {};
  const isEditMode = mode === "edit";

  const [formData, setFormData] = useState({
    meterId: "",
    manufacturer: "",
    meterType: "",
    meterNumber: "",
    utilityType: "",
    sgc: "",
    tariffIndex: "",
    krn: "",
    estate: "",
    property: "",
    property2: "",
    phaseNum:""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdd = () => {
    if (
      !formData.meterId ||
      !formData.manufacturer ||
      !formData.meterType ||
      !formData.meterNumber ||
      !formData.utilityType ||
      !formData.sgc ||
      !formData.tariffIndex ||
      !formData.krn ||
      !formData.estate ||
      !formData.property ||
      !formData.phaseNum
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
      ],
    );
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header title={isEditMode ? "Update Meter" : "Add meter"} />

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
            placeholderTextColor={colors.white}
            inputWrapperStyle={[
              styles.textInput,
              {
                backgroundColor: "#A1A1A1",
                marginBottom: 0,
              },
            ]}
            editable={false}
          />
        </View>
        <View style={[styles.fieldContainer, { marginTop: 0 }]}>
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
          <Text style={styles.label}>Meter Type</Text>
          <TextField
            placeholder="lorem ipsum"
            value={formData.meterType}
            onChangeText={(text) => handleInputChange("meterType", text)}
            inputWrapperStyle={styles.textInput}
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
          <Text style={styles.label}>Utility type</Text>
          <DropdownComponent
            data={utilityTypeOptions}
            value={formData.utilityType}
            onChangeValue={(value) => handleInputChange("utilityType", value)}
            placeholder="Select Estate"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>SGC</Text>
          <TextField
            placeholder="Enter SGC"
            value={formData.sgc}
            onChangeText={(text) => handleInputChange("sgc", text)}
            inputWrapperStyle={styles.textInput}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Tariff Index</Text>
          <TextField
            placeholder="Enter Tariff Index"
            value={formData.tariffIndex}
            onChangeText={(text) => handleInputChange("tariffIndex", text)}
            inputWrapperStyle={styles.textInput}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>KRN</Text>
          <TextField
            placeholder="Enter KRN"
            value={formData.krn}
            onChangeText={(text) => handleInputChange("krn", text)}
            inputWrapperStyle={styles.textInput}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Estate</Text>
          <DropdownComponent
            data={propertyGroupOptions}
            value={formData.estate}
            onChangeValue={(value) => handleInputChange("estate", value)}
            placeholder="Select Estate"
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

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phase Number</Text>
          <DropdownComponent
            data={phaseNumberOptions}
            value={formData.phaseNum}
            onChangeValue={(value) => handleInputChange("phaseNum", value)}
            placeholder="Select Phase Number"
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text
            style={styles.addButtonText}
            text={isEditMode ? "Update Meter" : "Add"}
          />
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
    // paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.xl,
    height: adjustSize(50),
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: adjustSize(15),
    // lineHeight: adjustSize(16),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
});
