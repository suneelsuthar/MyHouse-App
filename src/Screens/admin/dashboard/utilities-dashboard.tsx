import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { adjustSize, colors, typography } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import { Text, Screen, Button } from "../../../Components";
import { CustomDateTimePicker } from "../../../Components/CustomDateTimePicker";
import DropdownComponent from "../../../Components/DropDown";
import { HorizontalPropertyCard } from "../../../Components/tenant/HorizontalPropertyCard";
import BookingsChart from "../../../Components/BookingChart";

export type AnalyticsRange =
  | "monthly"
  | "weekly"
  | "daily"
  | "yearly"
  | "range";

type DashboardEventType =
  | "property_listed"
  | "booking_created"
  | "work_request"
  | "work_order"
  | "team_member"
  | "visitor";

export type DashboardEvent = {
  date: Date;
  type: DashboardEventType;
};

export type DashboardMetricKey =
  | "Properties"
  | "Bookings"
  | "Work Requests"
  | "Work Orders"
  | "Team"
  | "Visitors";

const metricToEventType: Record<DashboardMetricKey, DashboardEventType> = {
  Properties: "property_listed",
  Bookings: "booking_created",
  "Work Requests": "work_request",
  "Work Orders": "work_order",
  Team: "team_member",
  Visitors: "visitor",
};

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d: Date, days: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + days);

const isWithinRangeInclusive = (d: Date, start: Date, end: Date) => {
  const t = d.getTime();
  return t >= start.getTime() && t <= end.getTime();
};

const defaultWindowForRange = (range: AnalyticsRange) => {
  const now = new Date();
  const end = startOfDay(now);
  switch (range) {
    case "daily":
      return { start: end, end: addDays(end, 1) };
    case "weekly":
      return { start: addDays(end, -6), end: addDays(end, 1) };
    case "monthly":
      return { start: addDays(end, -29), end: addDays(end, 1) };
    case "yearly":
      return { start: addDays(end, -364), end: addDays(end, 1) };
    default:
      return { start: addDays(end, -29), end: addDays(end, 1) };
  }
};

const formatShort = (d: Date) =>
  d.toLocaleDateString(undefined, { day: "2-digit", month: "short" });

const formatMonthShort = (d: Date) =>
  d.toLocaleDateString(undefined, { month: "short" });

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, months: number) =>
  new Date(d.getFullYear(), d.getMonth() + months, 1);

export const getAnalyticsWindow = (
  range: AnalyticsRange,
  startDate: Date | null,
  endDate: Date | null,
) => {
  if (range === "range") {
    if (!startDate || !endDate) return null;
    const start = startOfDay(startDate);
    const end = addDays(startOfDay(endDate), 1);
    return { start, end };
  }
  return defaultWindowForRange(range);
};

export const filterEventsByWindow = (
  events: DashboardEvent[],
  window: { start: Date; end: Date },
) => {
  return events.filter((e) =>
    isWithinRangeInclusive(e.date, window.start, window.end),
  );
};

export const buildChartSeries = (
  events: DashboardEvent[],
  window: { start: Date; end: Date },
  range: AnalyticsRange,
  metricKey: DashboardMetricKey,
) => {
  const eventType = metricToEventType[metricKey];
  const seriesEvents = events.filter((e) => e.type === eventType);

  const diffDays = Math.max(
    1,
    Math.round(
      (window.end.getTime() - window.start.getTime()) / (24 * 60 * 60 * 1000),
    ),
  );

  // Fixed buckets so the chart is always stable and missing periods show as 0.
  if (range === "daily") {
    const d = startOfDay(window.end);
    const labels = [formatShort(d)];
    const data = [
      seriesEvents.filter((e) =>
        isWithinRangeInclusive(e.date, d, addDays(d, 1)),
      ).length,
    ];
    return { labels, data };
  }

  if (range === "weekly") {
    const endDay = startOfDay(window.end);
    const startDay = addDays(endDay, -6);
    const buckets = Array.from({ length: 7 }).map((_, i) => {
      const bs = addDays(startDay, i);
      const be = addDays(bs, 1);
      return { start: bs, end: be, label: formatShort(bs) };
    });

    const labels = buckets.map((b) => b.label);
    const data = buckets.map(
      (b) =>
        seriesEvents.filter((e) =>
          isWithinRangeInclusive(e.date, b.start, b.end),
        ).length,
    );
    return { labels, data };
  }

  if (range === "monthly") {
    const endDay = startOfDay(window.end);
    const startDay = addDays(endDay, -27);
    const buckets = Array.from({ length: 4 }).map((_, i) => {
      const bs = addDays(startDay, i * 7);
      const be = addDays(bs, 7);
      return { start: bs, end: be, label: `W${i + 1}` };
    });

    const labels = buckets.map((b) => b.label);
    const data = buckets.map(
      (b) =>
        seriesEvents.filter((e) =>
          isWithinRangeInclusive(e.date, b.start, b.end),
        ).length,
    );
    return { labels, data };
  }

  if (range === "yearly") {
    const endMonth = startOfMonth(window.end);
    const startMonth = addMonths(endMonth, -11);
    const buckets = Array.from({ length: 12 }).map((_, i) => {
      const bs = addMonths(startMonth, i);
      const be = addMonths(bs, 1);
      return { start: bs, end: be, label: formatMonthShort(bs) };
    });

    const labels = buckets.map((b) => b.label);
    const data = buckets.map(
      (b) =>
        seriesEvents.filter((e) =>
          isWithinRangeInclusive(e.date, b.start, b.end),
        ).length,
    );
    return { labels, data };
  }

  // Custom range: choose bucket strategy by span.
  if (diffDays <= 7) {
    const buckets = Array.from({ length: diffDays }).map((_, i) => {
      const bs = addDays(startOfDay(window.start), i);
      const be = addDays(bs, 1);
      return { start: bs, end: be, label: formatShort(bs) };
    });
    const labels = buckets.map((b) => b.label);
    const data = buckets.map(
      (b) =>
        seriesEvents.filter((e) =>
          isWithinRangeInclusive(e.date, b.start, b.end),
        ).length,
    );
    return { labels, data };
  }

  if (diffDays <= 31) {
    const bucketsCount = Math.min(5, Math.ceil(diffDays / 7));
    const buckets = Array.from({ length: bucketsCount }).map((_, i) => {
      const bs = addDays(startOfDay(window.start), i * 7);
      const be = addDays(bs, 7);
      return { start: bs, end: be, label: `W${i + 1}` };
    });
    const labels = buckets.map((b) => b.label);
    const data = buckets.map(
      (b) =>
        seriesEvents.filter((e) =>
          isWithinRangeInclusive(e.date, b.start, b.end),
        ).length,
    );
    return { labels, data };
  }

  const monthStart = startOfMonth(window.start);
  const monthEnd = startOfMonth(window.end);
  const months = Math.max(
    1,
    (monthEnd.getFullYear() - monthStart.getFullYear()) * 12 +
      (monthEnd.getMonth() - monthStart.getMonth()) +
      1,
  );
  const buckets = Array.from({ length: Math.min(12, months) }).map((_, i) => {
    const bs = addMonths(monthStart, i);
    const be = addMonths(bs, 1);
    return { start: bs, end: be, label: formatMonthShort(bs) };
  });
  const labels = buckets.map((b) => b.label);
  const data = buckets.map(
    (b) =>
      seriesEvents.filter((e) => isWithinRangeInclusive(e.date, b.start, b.end))
        .length,
  );
  return { labels, data };
};

export const buildMetricCards = (
  events: DashboardEvent[],
  window: { start: Date; end: Date },
  metricKeys: DashboardMetricKey[],
) => {
  const filtered = filterEventsByWindow(events, window);

  const cardData = metricKeys.map((title) => {
    const eventType = metricToEventType[title];
    const value = filtered.filter((e) => e.type === eventType).length;
    const chartdata = [
      Math.max(0, Math.round(value * 0.25)),
      Math.max(0, Math.round(value * 0.5)),
      Math.max(0, Math.round(value * 0.75)),
      value,
      Math.max(0, Math.round(value * 0.6)),
      Math.max(0, Math.round(value * 0.85)),
    ];
    return {
      title,
      value,
      subtitle: "Get from last month",
      isLoss: false,
      chartdata,
      onPress: () => console.log(`${title} pressed`),
    };
  });

  return cardData;
};

const width = Dimensions.get("screen").width;

export const AdminUtilitiesDashboard = () => {
  const navigation = useNavigation();
  const analyticsData = [
    { label: "Monthly", value: "monthly" },
    { label: "Weekly", value: "weekly" },
    { label: "Daily", value: "daily" },
    { label: "Yearly", value: "yearly" },
    { label: "Range", value: "range" },
  ];

  const [analyticsRange, setAnalyticsRange] =
    useState<AnalyticsRange>("monthly");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const dashboardEvents: DashboardEvent[] = useMemo(() => {
    const now = new Date();
    const day = (n: number) =>
      new Date(now.getFullYear(), now.getMonth(), now.getDate() - n);
    return [
      { type: "booking_created", date: day(0) },
      { type: "booking_created", date: day(1) },
      { type: "booking_created", date: day(3) },
      { type: "property_listed", date: day(2) },
      { type: "property_listed", date: day(9) },
      { type: "work_request", date: day(6) },
      { type: "work_order", date: day(4) },
      { type: "team_member", date: day(20) },
      { type: "visitor", date: day(5) },
    ];
  }, []);

  const analyticsWindow = useMemo(
    () => getAnalyticsWindow(analyticsRange, startDate, endDate),
    [analyticsRange, startDate, endDate],
  );

  useEffect(() => {
    if (analyticsRange !== "range") {
      setStartDate(null);
      setEndDate(null);
      setShowStartPicker(false);
      setShowEndPicker(false);
    }
  }, [analyticsRange]);

  const formatRangeDate = useMemo(
    () => (d: Date | null) =>
      d
        ? d.toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "Select",
    [],
  );

  const metricKeys: DashboardMetricKey[] = useMemo(
    () => [
      "Properties",
      "Bookings",
      "Work Requests",
      "Work Orders",
      "Team",
      "Visitors",
    ],
    [],
  );

  const propertiesData = useMemo(() => {
    if (!analyticsWindow) return [];
    const cards = buildMetricCards(
      dashboardEvents,
      analyticsWindow,
      metricKeys,
    );
    return cards.map((c, idx) => ({ ...c, id: String(idx + 1) }));
  }, [analyticsWindow, dashboardEvents, metricKeys]);

  const bookingsSeries = useMemo(() => {
    if (!analyticsWindow) return { labels: [""], data: [0] };
    return buildChartSeries(
      dashboardEvents,
      analyticsWindow,
      analyticsRange,
      "Bookings",
    );
  }, [analyticsWindow, dashboardEvents, analyticsRange]);

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
          <Text style={styles._welcomtext}>Welcome!</Text>
          <Text weight="semiBold" style={styles.username}>
            Brume Djbah
          </Text>
          <Text style={styles.role}>Admin</Text>
        </View>
        <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
          <WithLocalSvg asset={Images.notofication} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles._card}
              activeOpacity={0.7}
              onPress={() =>
                (navigation as any).navigate("AdminPropertyRequests")
              }
            >
              <WithLocalSvg asset={Images.met} />
              <Text text="Meters" style={styles._card_text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles._card}
              activeOpacity={0.7}
              onPress={() =>
                (navigation as any).navigate("AdminManageBookings")
              }
            >
              <WithLocalSvg asset={Images.tra} />
              <Text text="Transactions" style={styles._card_text} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles._card}
              activeOpacity={0.7}
              onPress={() =>
                (navigation as any).navigate("AdminManagePropertyGroup")
              }
            >
              <WithLocalSvg asset={Images.est} />
              <Text text="Estates" style={styles._card_text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles._seciton_row}>
            <View style={styles.analyticsLeftRow}>
              <Text weight="semiBold" style={styles.sectionTitle}>
                Analytics
              </Text>
              {analyticsRange === "range" && (
                <View style={styles.dateRangeRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.dateBtn}
                    onPress={() => setShowStartPicker(true)}
                  >
                    <WithLocalSvg asset={Images.calendar} />
                    <Text style={styles.dateBtnText}>
                      {formatRangeDate(startDate)}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.toText}>To</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.dateBtn}
                    onPress={() => {
                      if (startDate) {
                        setShowEndPicker(true);
                      } else {
                        setShowStartPicker(true);
                      }
                    }}
                  >
                    <WithLocalSvg asset={Images.calendar} />
                    <Text style={styles.dateBtnText}>
                      {formatRangeDate(endDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                data={analyticsData}
                label="Select Period"
                placeholder="Range"
                value={analyticsRange}
                onChangeValue={(v) => setAnalyticsRange(v as AnalyticsRange)}
                dropdownStyle={styles.customDropdownStyle}
                placeholderStyle={styles.customPlaceholderStyle}
                selectedTextStyle={styles.customSelectedTextStyle}
              />
            </View>
          </View>
          <CustomDateTimePicker
            mode="date"
            value={startDate}
            visible={showStartPicker}
            onChange={(d) => {
              setStartDate(d);
              if (endDate && d > endDate) setEndDate(null);
            }}
            onCancel={() => setShowStartPicker(false)}
            onConfirm={() => setShowStartPicker(false)}
          />
          <CustomDateTimePicker
            mode="date"
            value={endDate}
            visible={showEndPicker}
            onChange={(d) => {
              if (startDate && d < startDate) {
                setEndDate(null);
                return;
              }
              setEndDate(d);
            }}
            onCancel={() => setShowEndPicker(false)}
            onConfirm={() => setShowEndPicker(false)}
          />
          {/* ÷÷ */}
        </View>

        <Button
          preset="reversed"
          text="Total Suppliers"
          style={{
            width: "95%",
            alignSelf: "center",
          }}
        />
        {/* PROPERTIES CARD */}
        <View style={styles.propertiesSection}>
          <FlatList
            data={propertiesData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.propertiesList}
            renderItem={({ item }) => <HorizontalPropertyCard data={item} />}
          />
        </View>
        <View>
          <View
            style={[
              styles._seciton_row,
              { paddingHorizontal: adjustSize(10), marginTop: adjustSize(30) },
            ]}
          >
            <Text weight="semiBold" style={styles.sectionTitle}>
              Total Suppliers
            </Text>
            <Text style={[styles.change, { color: "#0AD029" }]}>
              ▲ 35% more
            </Text>
          </View>

          <View style={{ paddingHorizontal: adjustSize(10) }}>
            <Text style={styles.subtitle}>
              You have got 10% increase in Suppliers from the last month
            </Text>
          </View>
          {analyticsRange === "range" && !analyticsWindow ? (
            <View
              style={{
                paddingHorizontal: adjustSize(10),
                paddingTop: adjustSize(10),
              }}
            >
              <Text style={styles.subtitle}>
                Select start and end date to view range analytics
              </Text>
            </View>
          ) : (
            <BookingsChart
              data={bookingsSeries.data}
              labels={bookingsSeries.labels}
                renderCustomBottomLabels={true}   // hides default x labels and renders our row

            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

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
    marginBottom: adjustSize(15),
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
    flex: 1,
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },

  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.black,
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
  _card: {
    backgroundColor: colors.primary,
    height: adjustSize(102),
    borderRadius: adjustSize(10),
    alignItems: "center",
    // width: adjustSize(106),
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 1,
  },

  _card_text: {
    color: colors.white,
    fontSize: adjustSize(14),
    textAlign: "center",
  },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(20),
    marginBottom: adjustSize(5),
  },
  analyticsLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
    flex: 1,
  },
  dateRangeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
    marginLeft: adjustSize(10),
  },
  dateBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(6),
    height: adjustSize(36),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    paddingHorizontal: adjustSize(8),
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  dateBtnText: {
    color: colors.primary,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
  },
  toText: {
    color: colors.primary,
    marginHorizontal: adjustSize(4),
  },
  dropdownContainer: {
    width: adjustSize(120),
    marginLeft: 15,
  },
  customDropdownStyle: {
    height: adjustSize(40),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
    width: adjustSize(125),
    marginRight: adjustSize(20),
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
  propertiesSection: {
    marginTop: adjustSize(20),
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
  },
  propertiesList: {
    marginTop: adjustSize(30),
    marginBottom: adjustSize(10),
    marginHorizontal: adjustSize(10),
  },
  title: {
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  subtitle: {
    fontSize: adjustSize(10),
    color: colors.primaryLight,
  },

  change: {
    fontSize: adjustSize(10),
    color: "#0AD029",
  },
});
