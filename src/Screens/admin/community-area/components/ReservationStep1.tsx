import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "../../../../Components";
import { adjustSize, colors, typography } from "../../../../theme";
import DropdownComponent from "../../../../Components/DropDown";
import { propertyGroups, properties, amenities } from "./reservationData"; // 👈 import data
export default function ReservationStep1({ navigation, onPress }: any) {
  const [propertyGroup, setPropertyGroup] = useState<string | undefined>();
  const [property, setProperty] = useState<string | undefined>();
  const [amenity, setAmenity] = useState<string | undefined>();
  return (
    <View style={styles.container}>
      <View>
        {/* Property Group */}
        <Text style={styles.title}>Select Property Group</Text>
        <DropdownComponent
          data={propertyGroups}
          label="Choose type"
          placeholder="Select Property group"
          value={propertyGroup}
          onChangeValue={(v: string) => setPropertyGroup(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Property */}
        <Text style={styles.title}>Select Property</Text>
        <DropdownComponent
          data={properties}
          label="Choose type"
          placeholder="Select Property"
          value={property}
          onChangeValue={(v: string) => setProperty(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />

        {/* Amenity */}
        <Text style={styles.title}>Select Amenity</Text>
        <DropdownComponent
          data={amenities}
          label="Choose type"
          placeholder="Select Amenity"
          value={amenity}
          onChangeValue={(v: string) => setAmenity(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />
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
    backgroundColor: colors.fill,
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
});
