import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { adjustSize, colors, typography } from "../../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../../assets/Images";
import { Text, Screen, TextField, Header } from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { AppStackScreenProps } from "../../../../utils/interfaces";
import { RentalCard } from "../../../../Components/RentalCard";
import { rentalProperties } from "../../../../utils/data";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../../utils/interfaces";

interface ViewPropertiesGroupsProps
  extends NativeStackScreenProps<AdminStackParamList, "ViewPropertiesGroups"> {}
export function ViewPropertiesGroups({ route }: ViewPropertiesGroupsProps) {
  const navigation = useNavigation();
  const { propertyType = "rental" } = route.params || {};

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      <Header title="View Property Groups" />
      <ScrollView>
        <View style={styles._topbar}>
          <Text
            text="Occupancy Rate:"
            weight="semiBold"
            style={{ color: colors.white, fontSize: adjustSize(14) }}
          />
          <Text
            text="12/31"
            weight="semiBold"
            style={{ color: colors.white, fontSize: adjustSize(14) }}
          />
        </View>

        <View style={styles._row}>
          <View style={styles._card}>
            <Text text="12" style={styles._num} />
            <Text text="Occupied" style={styles._text} />
          </View>

          <View style={styles._card}>
            <Text text="12" style={styles._num} />
            <Text text="Un-occupied" style={styles._text} />
          </View>
        </View>
        {/* Header */}

        {/* Recent Notifications */}

        {/* Search Bar */}
        <View style={styles._searchrow}>
          <View style={styles._inputview}>
            <TextField
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
              (navigation as any).navigate("AdminAddProperty" as never)
            }
          >
            <WithLocalSvg asset={Images.addprop} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles._seciton_row}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              Property Groups
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

        {/* Properties List */}

        {/* navigation.navigate("Admin", {
            screen: "Properties",
            params: {
              screen: "PropertyDetails",
              params: { propertyId: property.propertyId },
            },
          }); */}
        <FlatList
          data={rentalProperties}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <RentalCard
              property={item}
              type={"group"}
              onAction={(action, property) => {
                {
                  console.log("===========+>", action);
                }
                if (action === "View Details" || action === "View") {
                  (navigation as any).navigate(
                    "PropertyDetails" as never,
                    { propertyId: property.propertyId } as never
                  );
                } else if (action === "Edit") {
                  (navigation as any).navigate(
                    "AdminAddProperty" as never,
                    { propertyId: property.propertyId } as never
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
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
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
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
  },

  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginTop: adjustSize(20),
    // marginBottom: adjustSize(5),
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
    // marginTop: adjustSize(12),
  },
  listContent: {
    paddingHorizontal: adjustSize(10),
    paddingBottom: adjustSize(20),
  },
  username: {
    fontSize: adjustSize(15),
    color: colors.primary,
  },
  _topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(10),
    backgroundColor: "#6369A4",
    borderRadius: adjustSize(10),
    padding: adjustSize(15),
    marginVertical: adjustSize(5),
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: adjustSize(10),
    borderRadius: adjustSize(10),
    gap: adjustSize(15),
  },
  _card: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: adjustSize(10),
    backgroundColor: "#6369A4",
    borderRadius: adjustSize(10),
    padding: adjustSize(10),
    marginVertical: adjustSize(5),
    marginBottom: adjustSize(20),
    height: adjustSize(88),
    flex: 1,
  },
  _num: {
    fontSize: adjustSize(20),
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  _text: {
    fontSize: adjustSize(14),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
});
