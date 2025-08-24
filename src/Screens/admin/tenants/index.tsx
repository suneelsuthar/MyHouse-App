import React from "react";
import { StyleSheet, View, FlatList ,TouchableOpacity} from "react-native";
import { Screen, Text, Header2 } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import Dropdown from "../../../Components/DropDown";
import SearchDropdown from "../../../Components/SearchDropdown";
import DropdownComponent from "../../../Components/DropDown";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
export const data = [
  {
    name: "Ethan Baker",
    property: "Farm House",
    dateAdded: "2025-08-20T09:15:32+05:00",
  },
  {
    name: "Sophia Carter",
    property: "Apartment",
    dateAdded: "2025-08-18T14:42:11+05:00",
  },
  {
    name: "Liam Johnson",
    property: "Villa",
    dateAdded: "2025-08-16T19:08:45+05:00",
  },
  {
    name: "Olivia Brown",
    property: "Town House",
    dateAdded: "2025-08-14T08:27:59+05:00",
  },
  {
    name: "Noah Wilson",
    property: "Cottage",
    dateAdded: "2025-08-12T16:54:22+05:00",
  },
  {
    name: "Ava Smith",
    property: "Farm House",
    dateAdded: "2025-08-10T11:36:07+05:00",
  },
  {
    name: "Mason Lee",
    property: "Apartment",
    dateAdded: "2025-08-08T21:18:54+05:00",
  },
  {
    name: "Isabella Davis",
    property: "Villa",
    dateAdded: "2025-08-06T13:47:33+05:00",
  },
  {
    name: "Lucas Martinez",
    property: "Town House",
    dateAdded: "2025-08-04T07:22:41+05:00",
  },
  {
    name: "Mia Taylor",
    property: "Cottage",
    dateAdded: "2025-08-02T18:55:10+05:00",
  },
  {
    name: "James Anderson",
    property: "Farm House",
    dateAdded: "2025-07-30T10:41:29+05:00",
  },
  {
    name: "Amelia Thomas",
    property: "Apartment",
    dateAdded: "2025-07-28T20:12:55+05:00",
  },
  {
    name: "Benjamin White",
    property: "Villa",
    dateAdded: "2025-07-26T15:07:13+05:00",
  },
  {
    name: "Harper Garcia",
    property: "Town House",
    dateAdded: "2025-07-24T09:33:48+05:00",
  },
  {
    name: "Elijah Clark",
    property: "Cottage",
    dateAdded: "2025-07-22T22:19:27+05:00",
  },
  {
    name: "Charlotte Rodriguez",
    property: "Farm House",
    dateAdded: "2025-07-20T08:05:14+05:00",
  },
  {
    name: "William Lewis",
    property: "Apartment",
    dateAdded: "2025-07-18T12:48:39+05:00",
  },
  {
    name: "Ella Walker",
    property: "Villa",
    dateAdded: "2025-07-16T17:26:01+05:00",
  },
  {
    name: "Henry Hall",
    property: "Town House",
    dateAdded: "2025-07-14T07:59:43+05:00",
  },
  {
    name: "Scarlett Allen",
    property: "Cottage",
    dateAdded: "2025-07-12T19:44:28+05:00",
  },
];

export function AdminTenants() {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Tenants" onNotificationPress={() => {}} />
      <SearchDropdown />
      <View style={styles.section}>
        <View style={styles._seciton_row}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Tenants
          </Text>
          <View style={styles.dropdownContainer}>
            <DropdownComponent
              data={[
                { label: "A", value: "A" },
                { label: "B", value: "B" },
                { label: "C", value: "C" },
              ]}
              label="Select Period"
              placeholder="Sort by"
              dropdownStyle={styles.customDropdownStyle}
              placeholderStyle={styles.customPlaceholderStyle}
              selectedTextStyle={styles.customSelectedTextStyle}
            />
          </View>
        </View>
        {/* ÷÷ */}
      </View>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.card,
              { backgroundColor: index % 2 === 0 ? "#dedff0" : "transparent" },
            ]}
          >
            <View>
              <Text>{item.name.slice(0, 1)}</Text>
            </View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.property}>{item.property}</Text>
              <Text style={styles.date}>
                {item.dateAdded}
                {moment().format("MMMM Do YYYY, h:mm:ss a")}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles._morebutton}
                onPress={() => setMenuVisible((v) => !v)}
              >
                <Entypo
                  name="dots-three-vertical"
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  section: {
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(8),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
    marginBottom: adjustSize(20),
  },
  dropdownContainer: {
    width: adjustSize(120),
  },
  customDropdownStyle: {
    height: adjustSize(33),
    borderRadius: adjustSize(100),
    backgroundColor: "#6369A4",
  },
  customPlaceholderStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  card: {
    paddingVertical: adjustSize(15),
    paddingHorizontal: adjustSize(10),
  },
});
