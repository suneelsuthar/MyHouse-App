// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { Screen, Text, Header2 } from "../../../Components";
// import { colors, typography, adjustSize } from "../../../theme";

// export const AdminPropertyRequests: React.FC = () => {
//   return (
//     <Screen
//       preset="fixed"
//       safeAreaEdges={["top"]}
//       contentContainerStyle={styles.container}
//     >
//       <Header2 title="Property Requests" onNotificationPress={() => {}} />
//       <View style={styles.content}>
//         <Text style={styles.pageTitle}>Property Requests</Text>
//         <Text style={styles.description}>
//           This screen will show all property requests from tenants and agents.
//         </Text>
//       </View>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.fill,
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: adjustSize(20),
//   },
//   pageTitle: {
//     fontSize: adjustSize(24),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.semiBold,
//     marginBottom: adjustSize(16),
//     textAlign: "center",
//   },
//   description: {
//     fontSize: adjustSize(16),
//     color: colors.grey,
//     fontFamily: typography.fonts.poppins.normal,
//     textAlign: "center",
//     lineHeight: adjustSize(24),
//   },
// });

// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { Screen, Text } from "../../../Components";
// import { spacing } from "../../../theme";

// export const AdminAccessAlerts: React.FC = () => {
//   return (
//     <Screen preset="fixed" safeAreaEdges={["top"]} contentContainerStyle={styles.container}>
//       <Text weight="semiBold" style={styles.title}>Access Alerts</Text>
//       <View style={styles.card}>
//         <Text style={styles.muted}>Render Access Alerts here.</Text>
//       </View>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: spacing.lg,
//   },
//   title: {
//     fontSize: 18,
//     marginBottom: spacing.md,
//   },
//   card: {
//     padding: spacing.md,
//     borderRadius: 8,
//     backgroundColor: "#fff",
//   },
//   muted: {
//     color: "#666",
//   },
// });

import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import { Screen, Text, Header, TextField } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { rentalProperties } from "../../../utils/data";
import { RentalCard } from "../../../Components/RentalCard";
import { useNavigation } from "@react-navigation/native";
type TabType = "Active" | "History";

const propertyGroupOptions = [
  { label: "All Properties", value: "all" },
  { label: "Farm House", value: "farm_house" },
  { label: "Town House", value: "town_house" },
  { label: "Villa", value: "villa" },
];

const sortOptions = [
  { label: "Name A-Z", value: "name_asc" },
  { label: "Name Z-A", value: "name_desc" },
  { label: "Date Added", value: "date_added" },
  { label: "Status", value: "status" },
];

const propertyRequestsData = [
  {
    id: "123456",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "pending",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
  },
  {
    id: "123457",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=300&h=200&fit=crop",
  },
  {
    id: "123458",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
  },
  {
    id: "123459",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300&h=200&fit=crop",
  },
  {
    id: "123460",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop",
  },
  {
    id: "123461",
    title: "Brume Villa",
    location: "Shortlet - Lagos, Nigeria",
    status: "approved",
    price: "$30000",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
  },
];

export const AdminPropertyRequests: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Active");
  const [propertyGroup, setPropertyGroup] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [propertyRequests, setPropertyRequests] =
    useState(propertyRequestsData);
  const navigation = useNavigation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "#F26938";
      case "approved":
        return "#0AD029";
      case "rejected":
        return "#D80027";
      default:
        return colors.primary;
    }
  };

  const renderPropertyRequestCard = ({ item }: { item: any }) => (
    <View style={{ position: "relative" }}>
      <View style={styles.propertyCard}>
        <Image source={{ uri: item.image }} style={styles.propertyImage} />
        <View style={styles.propertyContent}>
          <View style={styles.propertyHeader}>
            <View style={styles.propertyInfo}>
              <Text style={styles.propertyTitle}>
                {item.title}
                <Text style={styles.propertyId}>
                  {` `}({item.id})
                </Text>
              </Text>
              <Text style={styles.propertyLocation}>{item.location}</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.statusRow}>
                  <Text style={styles.statusLabel}>Status: </Text>
                  <Text
                    style={[
                      styles.statusValue,
                      { color: getStatusColor(item.status) },
                    ]}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
                <Text style={styles.propertyPrice}>{item.price}</Text>
              </View>
            </View>
            <View style={styles.propertyActions}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() =>
                  setDropdownVisible(
                    dropdownVisible === parseInt(item.id)
                      ? null
                      : parseInt(item.id)
                  )
                }
              >
                <Entypo
                  name="dots-three-vertical"
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {dropdownVisible === parseInt(item.id) && (
        <View style={styles.menuBox}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setDropdownVisible(null);
              // Handle View action
            }}
          >
            <Text style={styles.menuText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setDropdownVisible(null);
              // Handle Mark as approved action
            }}
          >
            <Text style={styles.menuText}>Mark as approved</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setDropdownVisible(null);
              // Handle Reject action
            }}
          >
            <Text style={styles.menuText}>Reject</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header
        leftAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.user} />
          </TouchableOpacity>
        }
        centerAccessory={
          <Text
            weight="semiBold"
            style={{ fontSize: adjustSize(15), color: colors.primary }}
          >
            Manage Properties Requests
          </Text>
        }
        rightAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        }
      />

      {/* Property Group Label and Sort */}
      <View style={styles.listHeader}>
        <Text style={styles.propertyGroupLabel} weight="semiBold">
          Properties Requests
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

      <TextField
        placeholder="search property"
        inputWrapperStyle={{
          backgroundColor: colors.white,
          margin: adjustSize(10),
          width: "94%",
          alignSelf: "center",
        }}
      />

      {/* Visitor List */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Property Requests List */}
        <FlatList
          data={propertyRequests}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={renderPropertyRequestCard}
          showsVerticalScrollIndicator={false}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.fill,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: adjustSize(40),
    height: adjustSize(40),
    borderRadius: adjustSize(20),
    marginRight: spacing.sm,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    fontSize: adjustSize(18),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  notificationIcon: {
    padding: spacing.xs,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#dedfef",

    // padding: spacing.xs,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    // gap: spacing.xs,
  },
  activeTab: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderBottomWidth: 3,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: adjustSize(10),
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchDropdownContainer: {
    flex: 1,
  },
  searchDropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: "#6369A4",
    paddingHorizontal: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  addButton: {
    width: adjustSize(48),
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  propertyGroupLabel: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  sortContainer: {
    minWidth: 120,
  },
  sortDropdown: {
    height: adjustSize(35),
    borderRadius: adjustSize(100),
    backgroundColor: "#6369A4",
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
    // paddingHorizontal: spacing.lg,
  },
  visitorItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: adjustSize(10),
    marginVertical: adjustSize(5),
  },
  visitorAvatar: {
    width: adjustSize(50),
    height: adjustSize(50),
    borderRadius: adjustSize(25),
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
  },
  avatarText: {
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: 2,
  },
  visitorProperty: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  statusContainer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusText: {
    fontSize: adjustSize(10),
    color: "#FF6B35",
    fontFamily: typography.fonts.poppins.medium,
  },
  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
  },
  username: {
    fontSize: adjustSize(15),
    color: colors.primary,
    lineHeight: adjustSize(20),
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },
  card: {
    backgroundColor: colors.fill,
    padding: adjustSize(10),
    borderRadius: adjustSize(7),
    // shadowColor: "#000",
    // boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    elevation: 2,
    marginHorizontal: adjustSize(10),
    minHeight: adjustSize(96),
    marginVertical: adjustSize(8),
    zIndex: 1,
    shadowColor: "#000",
    borderWidth: 0.4,
    borderColor: colors.grey,
  },
  cardWithDropdown: {
    zIndex: 9999,
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 1,
  },
  cardTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(15),
  },
  subtitle: {
    color: colors.grey,
    fontSize: adjustSize(10),
    // marginBottom: spacing.sm,
  },

  label: {
    color: colors.primary,
    fontSize: adjustSize(10),
    zIndex: -1,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    zIndex: -1,
  },
  labelValue: {
    color: colors.primary,
    fontSize: adjustSize(10),
    zIndex: -1,
  },
  dropdown: {
    minWidth: adjustSize(120),
    height: adjustSize(33),
    borderRadius: 100,
    backgroundColor: colors.primaryLight,
  },
  dropdownMenu: {
    position: "absolute",
    top: adjustSize(25),
    shadowColor: "transparent",
    right: 0,
    backgroundColor: colors.white,
    borderRadius: adjustSize(8),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
    zIndex: 10000,
    minWidth: adjustSize(160),
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(10),
    borderBottomWidth: 0.5,
    borderBottomColor: "#E0E0E0",
  },
  dropdownText: {
    marginLeft: adjustSize(8),
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
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
  propertyCard: {
    flexDirection: "row",
    backgroundColor: colors.fill,
    alignItems: "center",
    borderRadius: adjustSize(12),
    marginVertical: adjustSize(6),
    marginHorizontal: adjustSize(10),
    padding: adjustSize(12),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: adjustSize(85),
    borderWidth: 0.4,
    borderColor: colors.grey,
  },
  propertyImage: {
    width: adjustSize(85),
    height: adjustSize(85),
    borderRadius: adjustSize(8),
    marginRight: adjustSize(12),
  },
  propertyContent: {
    flex: 1,
  },
  propertyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  propertyInfo: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(2),
  },
  propertyId: {
    fontSize: adjustSize(12),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
    marginBottom: adjustSize(4),
  },
  propertyLocation: {
    fontSize: adjustSize(11),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusLabel: {
    fontSize: adjustSize(10),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  statusValue: {
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  propertyActions: {
    alignItems: "flex-end",
    position: "absolute",
    right: 0,
  },
  propertyPrice: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.bold,
  },
  menuButton: {
    // position: "absolute",
    // right: adjustSize(10),
    // top: adjustSize(10),
    padding: adjustSize(4),
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
});
