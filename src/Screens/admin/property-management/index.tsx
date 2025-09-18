import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { adjustSize, colors, typography } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import { Text, Screen, TextField } from "../../../Components";
import DropdownComponent from "../../../Components/DropDown";
import { AdminStackParamList } from "../../../utils/interfaces";
import { RentalCard } from "../../../Components/RentalCard";
import { rentalProperties } from "../../../utils/data";

import AdminPropertyServices from "./services";
import AdminPropertyFeatures from "./features";
import AdminPropertyRestriction from "./restriction";
import AdminManageInspections from "./manage-inspections";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
export {
  AdminPropertyServices,
  AdminPropertyFeatures,
  AdminPropertyRestriction,
  AdminManageInspections,
};

interface AdminPropertyManagementProps
  extends NativeStackScreenProps<
    AdminStackParamList,
    "AdminPropertyManagement"
  > {}
export function AdminPropertyManagement({
  route,
}: AdminPropertyManagementProps) {
  const navigation = useNavigation();
  const [data, setdata] = useState(rentalProperties);
  const { propertyType = "rental" } = route.params || {};
  const [search, setsearch] = useState("");

  const filterData = data.filter((val) => val.name.includes(search));
  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            (navigation as any)
              .getParent?.("AdminDrawer")
              ?.dispatch(DrawerActions.openDrawer())
          }
        >
          <WithLocalSvg asset={Images.user} />
        </TouchableOpacity>
        <View style={styles.headerinfo}>
          <Text weight="semiBold" style={styles.username}>
            {propertyType === "rental"
              ? "Rental Properties"
              : "Managed Properties"}
          </Text>
        </View>
        <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
          <WithLocalSvg asset={Images.notofication} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles._seciton_row}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            {propertyType === "rental"
              ? "Rental Properties"
              : "Managed Properties"}
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

      {/* Search Bar */}
      <View style={styles._searchrow}>
        <View style={styles._inputview}>
          <TextField
            value={search}
            onChangeText={setsearch}
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={{ backgroundColor: colors.white }}
            placeholder="Search property"
            style={styles._input}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles._addbtn}
          onPress={() =>
            (navigation as any).navigate("AdminAddProperty", {
              type: "fm",
            })
          }
        >
          <WithLocalSvg asset={Images.addprop} />
        </TouchableOpacity>
      </View>
      {/* Properties List */}
      <FlatList
        data={filterData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <RentalCard
            property={item}
            type={propertyType}
            onAction={(action, property) => {
              if (action === "View Details" || action === "View") {
                (navigation as any).navigate(
                  "PropertyDetails" as never,
                  { propertyId: property.propertyId } as never
                );
              } else if (action === "Edit") {
                (navigation as any).navigate(
                  "AdminAddProperty" as never,
                  { propertyId: property.propertyId, mode: "edit" } as never
                );
              } else if (action === "Manage Calendar") {
                (navigation as any).navigate(
                  "AdminManageCalendar" as never,
                  { propertyId: property.propertyId } as never
                );
              } else if (action === "Assign to agent") {
                (navigation as any).navigate(
                  "AdminAssignProperties" as never,
                  {
                    propertyId: property.propertyId,
                    type: "agent",
                    title: "Assign Agent",
                  } as never
                );
              } else if (action === "Assign to FM") {
                (navigation as any).navigate(
                  "AdminAssignProperties" as never,
                  {
                    propertyId: property.propertyId,
                    type: "fm",
                    title: "Assign Facility Manager",
                  } as never
                );
              } else if (action === "Register Tenant") {
                (navigation as any).navigate(
                  "AdminAssignProperties" as never,
                  {
                    propertyId: property.propertyId,
                    type: "tenant",
                    title: "Register Tenant",
                  } as never
                );
              } else if (action === "Generate work request") {
                (navigation as any).navigate(
                  "AdminGenerateWorkRequests" as never,
                  { propertyId: property.propertyId } as never
                );
              } else if (action === "Create Visitor request") {
                (navigation as any).navigate(
                  "AdminCreateVisitorRequests" as never,
                  { propertyId: property.propertyId } as never
                );
              }
            }}
          />
        )}
        style={styles.list}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(15),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    marginBottom: adjustSize(3),
    paddingHorizontal: adjustSize(10),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },

  section: {
    marginBottom: 24,
    marginHorizontal: adjustSize(10),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
  },

  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(20),
    marginBottom: adjustSize(5),
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
    fontFamily: typography.fonts.poppins.medium,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  _searchrow: {
    flexDirection: "row",
    gap: adjustSize(10),
    marginHorizontal: adjustSize(10),
  },
  _addbtn: {
    backgroundColor: colors.primary,
    height: adjustSize(47),
    width: adjustSize(47),
    borderRadius: adjustSize(10),
    justifyContent: "center",
    alignItems: "center",
  },

  _input: {
    margin: 0,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(14),
  },
  _inputview: {
    flex: 1,
    padding: 0,
  },
  list: {
    marginTop: adjustSize(12),
  },
  listContent: {
    paddingHorizontal: adjustSize(10),
    paddingBottom: adjustSize(20),
  },
  username: {
    fontSize: adjustSize(15),
  },
});
