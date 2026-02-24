import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { adjustSize, colors, typography } from "../../../theme";
import { Screen, Header2, Text } from "../../../Components";
import DropdownComponent from "../../../Components/DropDown";
import { useNavigation } from "@react-navigation/native";

export const TenantNewRequests = () => {
  const navigation = useNavigation();

  const [estate, setEstate] = useState("");
  const [property, setProperty] = useState("");
  const [search, setSearch] = useState("");
  const estateData = [
    { label: "11:55 Apartments", value: "E1234" },
    { label: "Sunrise Villas", value: "E2234" },
    { label: "Downtown Residency", value: "E3234" },
  ];
  const filteredEstates = estateData.filter((item) => {
    if (!search.trim()) return true;

    const searchText = search.toLowerCase();
    return (
      item.label.toLowerCase().includes(searchText) ||
      item.value.toLowerCase().includes(searchText)
    );
  });
  return (
    <Screen contentContainerStyle={styles.container} safeAreaEdges={["top"]}>
      <Header2 title="New Property Request" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* ESTATE SECTION */}
        <Text text="Estate" weight="semiBold" style={styles.label} />

        <DropdownComponent
          placeholder="Estate (ID)"
          value={estate}
          onChangeValue={(v: string) => setEstate(v)}
          data={[
            { label: "11:55 Apartments", value: "E1234" },
            { label: "Sunrise Villas", value: "E2234" },
            { label: "Downtown Residency", value: "E3234" },
          ]}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />
        <View style={[styles.card, { marginTop: 30 }]}>
          {/* SEARCH INPUT */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search Estate by name or ID"
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#A1A1A1"
              style={styles.searchInput}
            />
          </View>

          {/* Example Estate List */}
          {filteredEstates.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.estateItem}
              onPress={() => {
                setEstate(item.value);
                setSearch(item.label);
              }}
            >
              <Text text={item.label} style={styles.estateTitle} />
              <Text text={`ID: ${item.value}`} style={styles.estateId} />
            </TouchableOpacity>
          ))}
        </View>

        {/* PROPERTY SECTION */}
        <Text
          text="Property"
          weight="semiBold"
          style={[styles.label, { marginTop: 20 }]}
        />

        <DropdownComponent
          placeholder="Property (ID)"
          value={property}
          onChangeValue={(v: string) => setProperty(v)}
          data={[
            { label: "Unit 101", value: "P101" },
            { label: "Unit 202", value: "P202" },
            { label: "Unit 303", value: "P303" },
          ]}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}
        />
      </ScrollView>

      {/* SUBMIT BUTTON */}
      <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8}>
        <Text text="Submit" weight="semiBold" style={styles.submitText} />
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: adjustSize(15),
  },
  label: {
    fontSize: adjustSize(14),
    color: colors.primary,
    marginBottom: 8,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    padding: adjustSize(15),
    marginBottom: adjustSize(20),
    elevation: 3,
  },
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(8),
    borderColor: colors.grey,
    borderWidth: adjustSize(0.4),
    boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.1)",
    elevation: 2,
    height: adjustSize(47),
  },
  dropdownPlaceholder: {
    color: "#A1A1A1",
    fontSize: adjustSize(12),
  },
  dropdownSelected: {
    color: colors.text,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  placeholder: {
    color: "#A1A1A1",
    fontSize: adjustSize(13),
  },
  selectedText: {
    fontSize: adjustSize(14),
    color: colors.text,
  },
  searchContainer: {
    marginTop: adjustSize(15),
    borderWidth: 1,
    borderColor: "#A1A1A1",
    borderRadius: adjustSize(12),
    paddingHorizontal: adjustSize(12),
  },
  searchInput: {
    height: adjustSize(47),
    fontSize: adjustSize(13),
    color: colors.text,
  },
  estateItem: {
    marginTop: adjustSize(20),
  },
  estateTitle: {
    fontSize: adjustSize(12),
    color: colors.primary,
  },
  estateId: {
    fontSize: adjustSize(12),
    color: "#737373",
  },
  submitBtn: {
    backgroundColor: colors.primary,
    padding: adjustSize(15),
    borderRadius: adjustSize(15),
    margin: adjustSize(15),
    alignItems: "center",
  },
  submitText: {
    color: colors.white,
    fontSize: adjustSize(16),
  },
});
