import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AdminStackParamList } from "../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../../../Components";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type BookingStatus = "approved" | "pending" | "rejected";

type BookingItem = {
  id: string;
  title: string;
  subtitle?: string;
  checkIn: string;
  checkOut: string;
  listPrice: string;
  bookedPrice: string;
  status: BookingStatus;
};

const MOCK_DATA: BookingItem[] = [
  {
    id: "BK-0001",
    title: "Brume Villa",
    subtitle: "Shortlet",
    checkIn: "25 Sep,2024",
    checkOut: "26 Sep,2024",
    listPrice: "$20000",
    bookedPrice: "$20000",
    status: "rejected",
  },
  {
    id: "BK-0002",
    title: "Brume Villa",
    subtitle: "Shortlet",
    checkIn: "25 Sep,2024",
    checkOut: "26 Sep,2024",
    listPrice: "$20000",
    bookedPrice: "$20000",
    status: "approved",
  },
  {
    id: "BK-0003",
    title: "Brume Villa",
    subtitle: "Shortlet",
    checkIn: "25 Sep,2024",
    checkOut: "26 Sep,2024",
    listPrice: "$20000",
    bookedPrice: "$20000",
    status: "pending",
  },
  {
    id: "BK-0004",
    title: "Brume Villa",
    subtitle: "Shortlet",
    checkIn: "25 Sep,2024",
    checkOut: "26 Sep,2024",
    listPrice: "$20000",
    bookedPrice: "$20000",
    status: "rejected",
  },
  {
    id: "BK-0005",
    title: "Brume Villa",
    subtitle: "Shortlet",
    checkIn: "25 Sep,2024",
    checkOut: "26 Sep,2024",
    listPrice: "$20000",
    bookedPrice: "$20000",
    status: "rejected",
  },
  {
    id: "BK-0006",
    title: "Brume Villa",
    subtitle: "Shortlet",
    checkIn: "25 Sep,2024",
    checkOut: "26 Sep,2024",
    listPrice: "$20000",
    bookedPrice: "$20000",
    status: "rejected",
  },
];

export function AdminManageBookings() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AdminStackParamList>>();

  const [activeTab, setActiveTab] = React.useState<"all" | BookingStatus>(
    "all"
  );

  const filtered = React.useMemo(() => {
    if (activeTab === "all") return MOCK_DATA;
    return MOCK_DATA.filter((b) => b.status === activeTab);
  }, [activeTab]);

  const statusLabelColor = (status: BookingStatus) => {
    switch (status) {
      case "approved":
        return { color: "#00A878" };
      case "pending":
        return { color: "#F7A400" };
      case "rejected":
        return { color: "#E15241" };
    }
  };

  const renderItem = ({ item }: { item: BookingItem }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("AdminBookingDetails", { bookingId: item.id })
      }
    >
      <View style={styles.cardHeaderRow}>
        <View style={styles.cardHeaderRow}>
          <Text weight="semiBold" style={styles.cardTitle}>
            {item.title}
          </Text>

          {item.subtitle ? (
            <Text style={styles.subtitle}>
              {"  "}({item.subtitle})
            </Text>
          ) : null}
        </View>

        <Text
          weight="medium"
          style={[styles.statusText, statusLabelColor(item.status)]}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      <View style={styles.rowBetween}>
        <View>
          <Text weight="medium" style={styles.label}>
            Check In:
            <Text style={styles.labelValue}>
              {"  "}
              {item.checkIn}
            </Text>
          </Text>
          <Text weight="medium" style={[styles.label]}>
            Check Out:
            {"  "}
            <Text style={styles.labelValue}>{item.checkOut}</Text>
          </Text>
        </View>
        <View>
          <Text weight="medium" style={styles.label}>
            List Price:
            <Text style={styles.labelValue}> {item.listPrice}</Text>
          </Text>
          <Text weight="medium" style={[styles.label]}>
            Booked price
            <Text style={styles.labelValue}> {item.bookedPrice}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header title="View Property Details" />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "all" && styles.tabItemActive]}
          onPress={() => setActiveTab("all")}
        >
          <MaterialIcons
            name="dashboard"
            size={adjustSize(22)}
            color={activeTab === "all" ? colors.primary : colors.white}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "all" && styles.tabLabelActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "approved" && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab("approved")}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={adjustSize(22)}
            color={activeTab === "approved" ? colors.primary : colors.white}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "approved" && styles.tabLabelActive,
            ]}
          >
            Approved
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "pending" && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab("pending")}
        >
          <Ionicons
            name="pause-circle-outline"
            size={adjustSize(22)}
            color={activeTab === "pending" ? colors.primary : colors.white}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "pending" && styles.tabLabelActive,
            ]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabItem,
            activeTab === "rejected" && styles.tabItemActive,
          ]}
          onPress={() => setActiveTab("rejected")}
        >
          <Ionicons
            name="close-circle-outline"
            size={adjustSize(22)}
            color={activeTab === "rejected" ? colors.primary : colors.white}
          />
          <Text
            style={[
              styles.tabLabel,
              activeTab === "rejected" && styles.tabLabelActive,
            ]}
          >
            Rejected
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingVertical: spacing.md,
          paddingHorizontal: adjustSize(5),
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  backBtn: {
    width: adjustSize(36),
    height: adjustSize(36),
    borderRadius: adjustSize(18),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
    marginBottom: spacing.md,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    height: adjustSize(34),
    borderRadius: adjustSize(18),
    backgroundColor: colors.primaryLight + "33",
  },
  pillText: {
    color: colors.white,
    marginRight: spacing.xs,
    fontFamily: typography.fonts.poppins.medium,
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight,
    padding: spacing.sm,
    // paddingHorizontal: spacing.sm,
    height: adjustSize(83),
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    // paddingVertical: spacing.sm,
    borderRadius: adjustSize(8),
  },
  tabItemActive: {
    // backgroundColor: colors.white,
  },
  tabLabel: {
    marginTop: spacing.xs,
    color: colors.white,
    fontSize: adjustSize(12),
  },
  tabLabelActive: {
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.fill,
    padding: adjustSize(10),
    borderRadius: adjustSize(7),
    shadowColor: "#000",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    elevation: 2,
    marginHorizontal: adjustSize(2),
    minHeight: adjustSize(96),
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  subtitle: {
    color: colors.grey,
    // marginBottom: spacing.sm,
  },
  statusText: {
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(10),
  },
  label: {
    color: colors.primary,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: spacing.sm,
  },
  labelValue: {
    color: colors.primaryLight,
    // fontSize: adjustSize(12),
  },
});
