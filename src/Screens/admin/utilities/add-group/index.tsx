import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView, Switch } from "react-native";
import {
  Screen,
  Text,
  Header,
  TextField,
  Button,
  MultiSelectDropdown,
} from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { colors, typography, adjustSize, spacing } from "../../../../theme";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";
import { AdminStackParamList } from "../../../../utils/interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type Property = {
  id: string;
  name: string;
  address: string;
};

type GroupType = {
  id?: string;
  title: string;
  groupId: string;
  selectedProperties?: string[];
  noOfProp?: string;
  noOfTenents?: string;
  noOfMeters?: string;
  date?: string;
};

type NavigationProp = NativeStackNavigationProp<
  AdminStackParamList,
  "AddGroup"
>;
type RoutePropType = RouteProp<AdminStackParamList, "AddGroup">;

export const AddGroup: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { mode = "add", group } = route.params || {};

  // Sample properties data - replace with actual API call
  const allProperties: Property[] = [
    { id: "1", name: "Property 1", address: "123 Main St" },
    { id: "2", name: "Property 2", address: "456 Oak Ave" },
    { id: "3", name: "Property 3", address: "789 Pine Rd" },
  ];

  const [formData, setFormData] = useState({
    userType: "",
    user: "",
    estate: "",
    useCurrentLocation: false,
    address: "",
    city: "",
    stateName: "",
    country: "",
    noOfProperties: 0,
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData);
    // Navigate back or show success message
    navigation.goBack();
  };
  {
    console.log(mode);
  }

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header
        title={"Property or Estate Details"}
      />

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>User Type</Text>
          <DropdownComponent
            data={[
              { label: "Admin", value: "admin" },
              { label: "Manager", value: "manager" },
              { label: "Resident", value: "resident" },
            ]}
            label="Select"
            placeholder="Select"
            value={formData.userType}
            onChangeValue={(v: string) => handleInputChange("userType", v)}
            dropdownStyle={styles.dropdownInput}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            rightIconColor={colors.primary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>User</Text>
          <DropdownComponent
            data={[
              { label: "John Doe", value: "1" },
              { label: "Jane Smith", value: "2" },
            ]}
            label="Select User"
            placeholder="Select User"
            value={formData.user}
            onChangeValue={(v: string) => handleInputChange("user", v)}
            dropdownStyle={styles.dropdownInput}
            placeholderStyle={styles.dropdownText}
            selectedTextStyle={styles.dropdownText}
            rightIconColor={colors.primary}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Estate</Text>
          <TextField
            placeholder="lorem ipsum"
            value={formData.estate}
            onChangeText={(text) => handleInputChange("estate", text)}
            inputWrapperStyle={styles.inputWhite}
          />
        </View>

        <View style={[styles.formGroup, { marginTop: adjustSize(8) }]}>
          <Text style={styles.sectionSubheading}>Location</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.labelInline}>Use Current Location</Text>
            <Switch
              value={formData.useCurrentLocation}
              onValueChange={(val) => handleInputChange("useCurrentLocation", val as any)}
              trackColor={{ false: "#E2E8F0", true: colors.primaryLight }}
              thumbColor={formData.useCurrentLocation ? colors.primary : "#f4f3f4"}
            />
          </View>
          <Text style={styles.orText}>OR</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Address</Text>
          <TextField
            placeholder="Enter Address"
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
            inputWrapperStyle={styles.inputWhite}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>City</Text>
          <TextField
            placeholder=""
            value={formData.city}
            onChangeText={(text) => handleInputChange("city", text)}
            inputWrapperStyle={styles.inputWhite}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>State</Text>
          <TextField
            placeholder=""
            value={formData.stateName}
            onChangeText={(text) => handleInputChange("stateName", text)}
            inputWrapperStyle={styles.inputWhite}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Country</Text>
          <TextField
            placeholder=""
            value={formData.country}
            onChangeText={(text) => handleInputChange("country", text)}
            inputWrapperStyle={styles.inputWhite}
          />
        </View>

        <View style={[styles.formGroup,{
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"space-between"
        }]}>
          <Text style={styles.label}>No. of Properties</Text>
          <View style={styles.stepperRow}>
            <TouchableOpacity
              style={[styles.stepperBtn, styles.stepperBtnLeft]}
              onPress={() =>
                handleInputChange(
                  "noOfProperties",
                  Math.max(0, (formData.noOfProperties as number) - 1) as any
                )
              }
            >
              <Text style={styles.stepperBtnText}>-</Text>
            </TouchableOpacity>
            <View style={styles.stepperValueBox}>
              <Text style={styles.stepperValueText}>{formData.noOfProperties}</Text>
            </View>
            <TouchableOpacity
              style={[styles.stepperBtn, styles.stepperBtnRight]}
              onPress={() =>
                handleInputChange(
                  "noOfProperties",
                  ((formData.noOfProperties as number) + 1) as any
                )
              }
            >
              <Text style={styles.stepperBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          text={"Save & continue Later"}
          onPress={handleSubmit}
          style={styles.primaryCta}
          preset="reversed"
        />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: adjustSize(18),
    color: colors.primary,
    marginBottom: spacing.lg,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: adjustSize(12),
    color: colors.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fonts.poppins.medium,
  },
  inputWhite: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
  },
  dropdownInput: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
  },
  dropdownText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  sectionSubheading: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(8),
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: adjustSize(4),
  },
  labelInline: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  orText: {
    alignSelf: "center",
    color: colors.primary,
    marginVertical: adjustSize(10),
  },
  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
  },
  stepperBtn: {
    width: adjustSize(32),
    height: adjustSize(32),
    borderRadius: adjustSize(8),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  stepperBtnLeft: {},
  stepperBtnRight: {},
  stepperBtnText: {
    color: colors.white,
    fontSize: adjustSize(16),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  stepperValueBox: {
    minWidth: adjustSize(48),
    height: adjustSize(32),
    backgroundColor: colors.fill,
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: adjustSize(8),
    borderColor: "#D9D9D9",
    borderWidth: 0.55,
  },
  stepperValueText: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  primaryCta: {
    marginTop: spacing.lg,
    borderRadius: adjustSize(10),
    marginBottom:50
  },
});

export default AddGroup;
