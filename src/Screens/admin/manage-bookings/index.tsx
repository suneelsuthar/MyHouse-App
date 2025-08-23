import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { AdminStackParamList } from "../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";

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
  const navigation = useNavigation<
    NativeStackNavigationProp<AdminStackParamList>
  >();

  const [activeTab, setActiveTab] = React.useState<
    "all" | BookingStatus
  >("all");

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
        <Text weight="semiBold" style={styles.cardTitle}>
          {item.title}
        </Text>
        <Text weight="medium" style={[styles.statusText, statusLabelColor(item.status)]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
      </View>
      {item.subtitle ? (
        <Text style={styles.subtitle}>({item.subtitle})</Text>
      ) : null}

      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.label}>Check In: {item.checkIn}</Text>
          <Text style={[styles.label, { marginTop: spacing.xs }]}>Check Out: {item.checkOut}</Text>
        </View>
        <View>
          <Text style={styles.label}>List Price: {item.listPrice}</Text>
          <Text style={[styles.label, { marginTop: spacing.xs }]}>Booked price: {item.bookedPrice}</Text>
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
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back-outline" size={adjustSize(22)} color={colors.primary} />
        </TouchableOpacity>
        <Text weight="semiBold" style={styles.title}>Bookings</Text>
        <TouchableOpacity style={styles.pill} activeOpacity={0.8}>
          <Text weight="medium" style={styles.pillText}>Last 7 days</Text>
          <Ionicons name="chevron-down" size={adjustSize(16)} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "all" && styles.tabItemActive]}
          onPress={() => setActiveTab("all")}
        >
          <Ionicons name="grid-outline" size={adjustSize(18)} color={activeTab === "all" ? colors.primary : colors.primaryLight} />
          <Text style={[styles.tabLabel, activeTab === "all" && styles.tabLabelActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "approved" && styles.tabItemActive]}
          onPress={() => setActiveTab("approved")}
        >
          <Ionicons name="checkmark-circle-outline" size={adjustSize(18)} color={activeTab === "approved" ? colors.primary : colors.primaryLight} />
          <Text style={[styles.tabLabel, activeTab === "approved" && styles.tabLabelActive]}>Approved</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "pending" && styles.tabItemActive]}
          onPress={() => setActiveTab("pending")}
        >
          <Ionicons name="pause-circle-outline" size={adjustSize(18)} color={activeTab === "pending" ? colors.primary : colors.primaryLight} />
          <Text style={[styles.tabLabel, activeTab === "pending" && styles.tabLabelActive]}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === "rejected" && styles.tabItemActive]}
          onPress={() => setActiveTab("rejected")}
        >
          <Ionicons name="close-circle-outline" size={adjustSize(18)} color={activeTab === "rejected" ? colors.primary : colors.primaryLight} />
          <Text style={[styles.tabLabel, activeTab === "rejected" && styles.tabLabelActive]}>Rejected</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: spacing.md }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
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
    backgroundColor: colors.primaryLight + "22",
    borderRadius: adjustSize(10),
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: adjustSize(8),
  },
  tabItemActive: {
    backgroundColor: colors.white,
  },
  tabLabel: {
    marginTop: spacing.xs,
    color: colors.primaryLight,
    fontSize: adjustSize(12),
  },
  tabLabelActive: {
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: adjustSize(12),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
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
    color: colors.primaryLight,
    marginBottom: spacing.sm,
  },
  statusText: {
    fontFamily: typography.fonts.poppins.medium,
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
});
