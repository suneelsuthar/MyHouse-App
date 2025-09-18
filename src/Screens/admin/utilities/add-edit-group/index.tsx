import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import {
  Screen,
  Text,
  Header,
  TextField,
  Button,
  MultiSelectDropdown,
} from "../../../../Components";
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
  "AddEditGroup"
>;
type RoutePropType = RouteProp<AdminStackParamList, "AddEditGroup">;

export const AddEditGroup: React.FC = () => {
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
    title: group?.title || "",
    groupId: group?.groupId || "",
    selectedProperties: (group as GroupType)?.selectedProperties || [],
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
        title={
          mode === "add" ? "Add New Property Group" : "Edit Property Group"
        }
      />

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Property Group Name*</Text>
          <TextField
            placeholder="Enter group name"
            value={formData.title}
            onChangeText={(text) => handleInputChange("title", text)}
            inputWrapperStyle={styles.input}
          />
        </View>

        {/* <View style={styles.formGroup}>
          <Text style={styles.label}>Property Group Id*</Text>
          <TextField
            placeholder="Enter group ID"
            value={formData.groupId}
            onChangeText={(text) => handleInputChange("groupId", text)}
            containerStyle={styles.input}
            editable={mode === "add"}
          />
        </View> */}

        {/* Add more form fields as needed */}

        <View style={styles.formGroup}>
          <Text style={styles.label}>Properties</Text>
          <MultiSelectDropdown
            data={allProperties.map((p) => ({
              label: `${p.name} (${p.address})`,
              value: p.id,
            }))}
            showSelectedChips={true}
            selectedValues={formData.selectedProperties}
            onChangeSelected={(values) =>
              handleInputChange("selectedProperties", values)
            }
            placeholder="Search & Select"
            containerStyle={styles.dropdownContainer}
          />
          <View style={styles.selectedProperties}>
            {(formData.selectedProperties as string[]).map((propId: string) => {
              const prop = allProperties.find((p: Property) => p.id === propId);
              if (!prop) return null;
              return (
                <View key={propId} style={styles.selectedProperty}>
                  <Text style={styles.propertyText}>
                    {prop.name} ({prop.address})
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      handleInputChange(
                        "selectedProperties",
                        (formData.selectedProperties as string[]).filter(
                          (id: string) => id !== propId
                        )
                      );
                    }}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

        <Button
          text={mode === "add" ? "Create Group" : "Save Changes"}
          onPress={handleSubmit}
          style={styles.submitButton}
          preset="reversed"
          disabled={formData.selectedProperties.length === 0}
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
  input: {
    borderWidth: 0.2,
    borderColor: colors.grey,
  },
  dropdownContainer: {
    marginTop: 8,
  },
  selectedProperties: {
    flexWrap: "wrap",
    marginTop: 10,
  },
  selectedProperty: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    borderRadius: 100,
    paddingVertical: adjustSize(10),
    paddingHorizontal: adjustSize(15),
    marginRight: 8,
    marginBottom: 8,
    width: "100%",
  },
  propertyText: {
    color: colors.white,
    fontSize: adjustSize(12),
    marginRight: 8,
    flex: 1,
  },
  removeButton: {
    width: adjustSize(20),
    height: adjustSize(20),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    color: colors.white,
    fontSize: adjustSize(15),
  },
  submitButton: {
    marginTop: spacing.lg,
  },
});

export default AddEditGroup;
