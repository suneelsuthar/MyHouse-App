import React, { useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Screen, Text, Header2,TextField } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import SearchDropdown from "../../../Components/SearchDropdown";
import DropdownComponent from "../../../Components/DropDown";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
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

export function Tenants() {
  const navigation = useNavigation();
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Residents" onNotificationPress={() => {}} />
      {/* <SearchDropdown /> */}
      <View
        style={{
          marginHorizontal: adjustSize(10),
          marginTop:20
          //   flexDirection: "row",
        }}
      >
        <TextField
          placeholderTextColor={colors.primaryLight}
          inputWrapperStyle={{ backgroundColor: colors.white }}
          placeholder="Search"
        />
      </View>
      <View style={styles.section}>
        <View style={styles._seciton_row}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Residents
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
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          const isMenuVisible = visibleMenuIndex === index;

          return (
            <View style={styles.card}>
              <View style={styles.cardRowTop}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <View style={styles.profileMain}>
                    <WithLocalSvg asset={Images.profile} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={styles.name}
                        numberOfLines={1}
                        text={item.name}
                      />

                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() =>
                          setVisibleMenuIndex(isMenuVisible ? null : index)
                        }
                      >
                        <Entypo
                          name="dots-three-vertical"
                          size={adjustSize(18)}
                          color={colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.cardRowBottom}>
                      <Text style={styles.propertyText} numberOfLines={1}>
                        {item.property}
                      </Text>
                      <Text style={styles.dateText} numberOfLines={1}>
                        {moment(item.dateAdded).format("DD MMM, YYYY")}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {isMenuVisible && (
                <>
                  <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={() => setVisibleMenuIndex(null)}
                  />
                  <View style={styles.menuBox}>
                    {["View"].map((a) => (
                      <TouchableOpacity
                        key={a}
                        onPress={() => {
                          setVisibleMenuIndex(null);
                          (navigation as any).navigate("TenantDetails", {
                            params: {
                              tenantId: index.toString(),
                              tenantName: item.name,
                              property: item.property,
                            },
                          });
                        }}
                        style={styles.menuItem}
                        activeOpacity={0.6}
                      >
                        <Text style={styles.menuText}>{a}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}
            </View>
          );
        }}
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
    // marginTop: adjustSize(8),
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
    // marginTop: adjustSize(10),
    marginBottom: adjustSize(10),
  },
  dropdownContainer: {
    width: adjustSize(120),
  },
  customDropdownStyle: {
    height: adjustSize(33),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
  },
  customPlaceholderStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
  },
  card: {
    backgroundColor: colors.white,
    padding: adjustSize(10),
    borderRadius: adjustSize(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: adjustSize(10),
    marginVertical: adjustSize(5),
    minHeight: adjustSize(76),
    position: "relative",
  },
  cardRowTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardRowBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  profileMain: {
    backgroundColor: colors.primary,
    height: adjustSize(50),
    width: adjustSize(50),
    borderRadius: adjustSize(25),
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  data: {
    flex: 1,
    marginHorizontal: adjustSize(10),
  },
  name: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  propertyText: {
    color: colors.primary,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
    flex: 1,
  },
  dateText: {
    color: colors.primary,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent", // invisible but catch taps
    zIndex: 5,
  },
  menuBox: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(36),
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    elevation: 3,
    width: adjustSize(70),
    paddingVertical: adjustSize(2),
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: {
    paddingVertical: adjustSize(5),
    paddingHorizontal: adjustSize(6),
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
});
