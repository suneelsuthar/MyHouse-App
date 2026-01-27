import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "../../../../Components";
import { Controller } from "react-hook-form";
import { adjustSize, colors, typography } from "../../../../theme";
import DropdownComponent from "../../../../Components/DropDown";
import { propertyGroups, properties, amenities } from "./reservationData"; // 👈 import data

export default function ReservationStep1({ control, errors, onPress }: any) {
  return (
    <View style={styles.container}>
      <View>
        {/* Property Group */}
        <Text style={styles.title}>Select Property Group</Text>
        <Controller
          control={control}
          name="propertyGroup"
          render={({ field: { onChange, value } }) => (
            <DropdownComponent
              data={propertyGroups}
              label="Choose type"
              placeholder="Select Property group"
              value={value}
              onChangeValue={onChange}
              dropdownStyle={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelected}
              rightIconColor={colors.primary}
            />
          )}
        />
        {errors.propertyGroup && <Text style={styles.errorText}>{errors.propertyGroup.message}</Text>}

        {/* Property */}
        <Text style={styles.title}>Select Property</Text>
        <Controller
          control={control}
          name="property"
          render={({ field: { onChange, value } }) => (
            <DropdownComponent
              data={properties}
              label="Choose type"
              placeholder="Select Property"
              value={value}
              onChangeValue={onChange}
              dropdownStyle={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelected}
              rightIconColor={colors.primary}
            />
          )}
        />
        {errors.property && <Text style={styles.errorText}>{errors.property.message}</Text>}

        {/* Amenity */}
        <Text style={styles.title}>Select Amenity</Text>
        <Controller
          control={control}
          name="amenity"
          render={({ field: { onChange, value } }) => (
            <DropdownComponent
              data={amenities}
              label="Choose type"
              placeholder="Select Amenity"
              value={value}
              onChangeValue={onChange}
              dropdownStyle={styles.dropdown}
              placeholderStyle={styles.dropdownPlaceholder}
              selectedTextStyle={styles.dropdownSelected}
              rightIconColor={colors.primary}
            />
          )}
        />
        {errors.amenity && <Text style={styles.errorText}>{errors.amenity.message}</Text>}
      </View>
      {/* Continue Button */}
      <Button
        text={"Continue"}
        preset="reversed"
        style={styles.btn}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(15),
    justifyContent: "space-between",
  },
  title: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(3),
    marginTop: adjustSize(5),
  },
  dropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(1),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  btn: {
    marginTop: adjustSize(50),
    marginBottom: adjustSize(20),
    height: adjustSize(49),
  },
  errorText: {
    color: "red",
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
    marginLeft: adjustSize(5),
  },
});
