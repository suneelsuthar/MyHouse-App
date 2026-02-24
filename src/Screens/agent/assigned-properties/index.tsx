import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Screen, Text, TextField, Header2 } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { rentalProperties } from "../../../utils/data";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";

const sortOptions = [
  { label: "All", value: "name_asc" },
  { label: "Last 7 days", value: "name_desc" },
  { label: "Last 30 days", value: "date_added" },
  { label: "Last 60 days", value: "status" },
];

const ACTIONS = ["View", "Generate Referral Link"];

export const AgentAssignedProp: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [visitorList, setVisitorList] = useState(rentalProperties);
  const navigation = useNavigation();
  const [visibleMenuId, setVisibleMenuId] = useState<string | null>(null);

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles._contaier}
    >
      <Header2 title="Assigned Properties" />

      <TextField
        placeholder="search property"
        inputWrapperStyle={{
          backgroundColor: colors.white,
          margin: adjustSize(10),
          width: "94%",
          alignSelf: "center",
        }}
      />

      {/* Property Group Label and Sort */}
      <View style={styles.listHeader}>
        <Text style={styles.propertyGroupLabel} weight="semiBold">
          Assigned Properties
        </Text>
        <View style={styles.sortContainer}>
          <DropdownComponent
            data={sortOptions}
            value={sortBy}
            onChangeValue={setSortBy}
            placeholder="Sort by"
            dropdownStyle={styles.sortDropdown}
            placeholderStyle={styles.sortPlaceholder}
            selectedTextStyle={styles.sortSelected}
          />
        </View>
      </View>

      {/* Visitor List */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {visitorList.map((property, index) => (
          <View style={{ position: "relative", marginLeft: adjustSize(15) }}>
            <View style={styles.container}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles._morebutton}
                onPress={() =>
                  setVisibleMenuId(
                    visibleMenuId === property.id ? null : property.id
                  )
                }
              >
                <Entypo
                  name="dots-three-vertical"
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>

              <Image
                source={{ uri: property.images[0] }}
                style={styles.thumbnail}
              />

              <View style={styles._boostview}>
                <WithLocalSvg
                  asset={Images.boost}
                  height={adjustSize(20)}
                  width={adjustSize(20)}
                />
              </View>
              <View style={styles.content}>
                <View style={styles.rowBetween}>
                  <Text
                    weight="semiBold"
                    style={styles.title}
                    numberOfLines={1}
                  >
                    Brume Villa
                  </Text>
                  <Text style={styles.group} numberOfLines={1}>
                    {" "}
                    (Shortlet)
                  </Text>
                </View>

                <Text style={styles.location} numberOfLines={1}>
                  Shortlet - {property.location}
                </Text>

                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Status:</Text>
                  <Text style={[styles.status, { color: "#0AD029" }]}>
                    Approved
                  </Text>
                </View>
                <View style={styles.metaRow}>
                  <Text style={styles.metaLabel}>Agent:</Text>
                  <Text style={styles.metaValue} numberOfLines={1}>
                    Primary Agent
                  </Text>
                </View>
                <View style={styles.metaRow}>
                  <Text
                    style={[
                      styles.metaLabel,
                      {
                        fontFamily: typography.fonts.poppins.semiBold,
                        fontSize: adjustSize(12),
                      },
                    ]}
                  >
                    Commission%:
                  </Text>
                  <Text
                    style={[
                      styles.metaValue,
                      {
                        fontSize: adjustSize(12),
                        fontFamily: typography.fonts.poppins.semiBold,
                        color: "#F6B64E",
                      },
                    ]}
                  >
                    10%
                  </Text>
                </View>
              </View>
            </View>
            {visibleMenuId === property.id && (
              <View style={styles.menuBox}>
                {ACTIONS.map((a) => (
                  <TouchableOpacity
                    key={a}
                    onPress={() => {
                      setVisibleMenuId(null);
                      //   onAction?.(a, property);
                    }}
                    style={styles.menuItem}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.menuText}>{a}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  _contaier: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.fill,
  },

  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  propertyGroupLabel: {
    fontSize: adjustSize(16),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  sortContainer: {
    minWidth: 150,
  },
  sortDropdown: {
    height: adjustSize(35),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
  },
  sortPlaceholder: {
    fontSize: adjustSize(11),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  sortSelected: {
    fontSize: adjustSize(11),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    // justifyContent: "space-between",
    marginTop: spacing.sm,
    zIndex: -1,
  },

  container: {
    flexDirection: "row",
    backgroundColor: "#F2F3FF",
    borderRadius: adjustSize(12),
    padding: adjustSize(10),
    marginBottom: adjustSize(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    zIndex: -1,
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: "#00000040",
  },
  thumbnail: {
    height: adjustSize(106),
    width: adjustSize(99),
    borderRadius: adjustSize(8),
    marginRight: adjustSize(10),
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
  },

  title: {
    fontSize: adjustSize(13),
    color: colors.primary,
  },
  group: {
    fontSize: adjustSize(11),
    color: colors.primaryLight,
  },
  location: {
    fontSize: adjustSize(11),
    color: "#B0B0B0",
    marginTop: adjustSize(3),
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: adjustSize(6),
    marginTop: adjustSize(6),
    overflow: "hidden",
  },
  metaLabel: {
    fontSize: adjustSize(10),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    lineHeight: adjustSize(12),
  },
  metaValue: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
    color: "#7E7E7E",
  },
  status: {
    fontSize: adjustSize(10),
    marginRight: adjustSize(6),
    lineHeight: adjustSize(12),
  },
  dotMenu: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },

  menuBox: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(36),
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
    width: adjustSize(190),
    paddingVertical: adjustSize(6),
    paddingBottom: adjustSize(15),
  },
  menuItem: {
    paddingVertical: adjustSize(5),
    paddingHorizontal: adjustSize(12),
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
  },
  _morebutton: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(10),
  },
  _boostview: {
    position: "absolute",
    left: adjustSize(-20),
    backgroundColor: colors.primary,
    borderRadius: 100,
    padding: adjustSize(5),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(40),
    width: adjustSize(40),
    zIndex: 1,
  },
});
