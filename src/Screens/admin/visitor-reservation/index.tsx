import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen, Text, Header } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { IRentalProperty, rentalProperties } from "../../../utils/data";
import Feather from "@expo/vector-icons/Feather";

interface PropertyDetailsProps
  extends AppStackScreenProps<"PropertyDetails"> {}

export function AdminVisitorReservation(props: PropertyDetailsProps) {
  const { propertyId } = props.route.params || { propertyId: "" };
  const [tab, setTab] = useState<
    "details" | "inspection" | "agents" | "fm" | "media"
  >("details");
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  const property: IRentalProperty | undefined = useMemo(
    () => rentalProperties.find((p) => p.propertyId === propertyId),
    [propertyId]
  );

  useEffect(() => {
    // reset gallery selection when property changes
    setSelectedImgIdx(0);
  }, [propertyId]);

  type DayName =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  const days: DayName[] = useMemo(
    () => [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    []
  );
  // Demo: variable number of slots per day (some 4, some 2)
  const daySlots: Record<DayName, string[]> = useMemo(
    () => ({
      Monday: [
        "9:00 AM - 11:00 AM",
        "9:00 AM - 11:00 AM",
        "9:00 AM - 11:00 AM",
        "9:00 AM - 11:00 AM",
      ],
      Tuesday: ["9:00 AM - 11:00 AM", "9:00 AM - 11:00 AM"],
      Wednesday: ["9:00 AM - 11:00 AM", "9:00 AM - 11:00 AM"],
      Thursday: ["9:00 AM - 11:00 AM", "9:00 AM - 11:00 AM"],
      Friday: ["9:00 AM - 11:00 AM", "9:00 AM - 11:00 AM"],
      Saturday: ["9:00 AM - 11:00 AM", "9:00 AM - 11:00 AM"],
      Sunday: ["9:00 AM - 11:00 AM", "9:00 AM - 11:00 AM"],
    }),
    []
  );

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Visitor Reservation" />
      <View style={styles.container}>
        {!property ? (
          <View style={styles.centerEmpty}>
            <Text>Property not found.</Text>
          </View>
        ) : (
          <>
            {/* Title and rating */}
            <View style={styles.headerRow}>
              <Text
                weight="semiBold"
                text={property.name}
                style={styles.propTitle}
                numberOfLines={1}
              />

              <Text style={styles.rating}>
                <Text style={{ color: "#F26938" }}>★ </Text>
                <Text style={styles.ratingReviews}>{property.rating}</Text>
                <Text style={styles.ratingReviews}>
                  {" "}
                  ({property.reviewsCount} Reviews)
                </Text>
              </Text>
            </View>

            {/* Tabs */}
            <View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabs}
              >
                {[
                  { k: "media", label: "Media" },
                  { k: "details", label: "Property details" },
                  { k: "inspection", label: "Inspection Details" },
                  { k: "agents", label: "Agents" },
                  { k: "fm", label: "Facility Managers" },
                ].map((t) => (
                  <TouchableOpacity
                    key={t.k}
                    onPress={() => setTab(t.k as any)}
                    activeOpacity={0.7}
                    style={[styles.chip, tab === t.k && styles.chipActive]}
                  >
                    {t.k === "media" ? (
                      <Feather
                        name="image"
                        size={18}
                        color={tab === t.k ? colors.white : colors.text}
                      />
                    ) : (
                      <Text
                        style={[
                          styles.chipText,
                          tab === t.k && styles.chipTextActive,
                        ]}
                        text={t.label}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles._tabview}>
              {/* Content */}
              {tab === "details" && (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={styles.content}
                >
                  <View
                    style={[styles.gridRow, { marginBottom: adjustSize(10) }]}
                  >
                    {renderRow("Mandate", property.mandate)}
                    {renderRow("Category", property.category)}
                    {renderRow("Complete Address", property.address)}
                    {renderRow("City", property.city)}
                    {renderRow("State", property.state)}
                    {renderRow("Country", property.country)}
                  </View>

                  <View style={styles.sectionDivider} />

                  <Text weight="semiBold" style={styles.sectionTitle}>
                    Pricing
                  </Text>
                  <View style={[styles.gridRow]}>
                    {renderRow(
                      "Price (per night)",
                      currency(property.pricePerNight)
                    )}
                    {renderRow(
                      "Caution Deposit",
                      currency(property.cautionDeposit)
                    )}
                    {renderRow(
                      "Service Charge (Flat)",
                      currency(property.serviceChargeFlat)
                    )}
                    {renderRow(
                      "Other Fees (Flat)",
                      currency(property.otherFeesFlat)
                    )}
                  </View>
                  <View style={styles.sectionDivider} />
                  <View style={[styles.gridRow, { flexDirection: "row" }]}>
                    <Text
                      weight="semiBold"
                      style={[styles.sectionTitle, { flex: 1 }]}
                    >
                      Description
                    </Text>

                    <Text style={[styles.description, { flex: 1 }]}>
                      {property.description}
                    </Text>
                  </View>
                  <View style={styles.sectionDivider} />

                  <View style={{ flex: 1 }}>
                    <Text weight="semiBold" style={styles.sectionTitle}>
                      Other details
                    </Text>
                    <View style={styles.gridRow}>
                      {renderRow("Status", property.status)}
                      {renderRow(
                        "360 Virtual Link",
                        property.virtualTourUrl || "—"
                      )}
                      {renderRow("Features", property.features.join(", "))}
                      {renderRow("Amenity", property.amenities.join(", "))}
                      {renderRow("Quantity", String(property.quantity))}
                    </View>
                  </View>

                  <View style={{ height: spacing.lg }} />
                </ScrollView>
              )}

              {tab === "inspection" && (
                <ScrollView
                  style={styles.content}
                  showsVerticalScrollIndicator={false}
                >
                  <Text weight="semiBold" style={styles.insTitle}>
                    Day and Time Slots
                  </Text>

                  {days.map((day) => (
                    <View key={day} style={styles.dayBlock}>
                      <Text weight="normal" style={styles.dayTitle}>
                        {day}
                      </Text>
                      <View style={styles.slotGrid}>
                        {daySlots[day].map((slot, idx) => (
                          <View key={day + idx} style={styles.slotChip}>
                            <Text style={styles.slotChipText}>{slot}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  ))}

                  <View style={{ height: spacing.lg }} />
                </ScrollView>
              )}

              {tab === "agents" && (
                <ScrollView style={styles.content}>
                  {property.agents.map((a) => (
                    <View key={a.id} style={styles.personRow}>
                      <Image source={{ uri: a.avatar }} style={styles.avatar} />
                      <View style={{ flex: 1 }}>
                        <Text weight="medium" style={styles.personName}>
                          {a.name}{" "}
                          <Text style={styles.personRole}>({a.role})</Text>
                        </Text>
                        <Text style={styles.personMeta}>({a.code}) </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}

              {tab === "fm" && (
                <ScrollView style={styles.content}>
                  {property.facilityManagers.map((a) => (
                    <View key={a.id} style={styles.personRow}>
                      <Image source={{ uri: a.avatar }} style={styles.avatar} />
                      <View style={{ flex: 1 }}>
                        <Text weight="medium" style={styles.personName}>
                          {a.name}
                          {"  "}
                          <Text style={styles.personRole}>({a.role})</Text>
                        </Text>
                        <Text style={styles.personMeta}>({a.code}) </Text>
                      </View>
                    </View>
                  ))}
                </ScrollView>
              )}

              {tab === "media" && (
                <ScrollView>
                  <Image
                    source={{ uri: property.images[selectedImgIdx] }}
                    style={styles.hero}
                  />
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.galleryRow}
                  >
                    {property.images.map((img, i) => (
                      <TouchableOpacity
                        key={img + i}
                        activeOpacity={0.7}
                        onPress={() => setSelectedImgIdx(i)}
                      >
                        <Image
                          source={{ uri: img }}
                          style={[
                            styles.galleryThumb,
                            i === selectedImgIdx && styles.galleryThumbSelected,
                          ]}
                        />
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </ScrollView>
              )}
            </View>
          </>
        )}
        <View style={styles.footerRow}>
          <TouchableOpacity activeOpacity={0.7} style={styles.rejectBtn}>
            <Text style={styles.rejectText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.approveBtn}>
            <Text style={styles.approveText}>Approve</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    // justifyContent:"center",
    // padding: spacing.lg,
    paddingTop: spacing.md,
  },
  centerEmpty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: adjustSize(5),
    paddingHorizontal: adjustSize(10),
  },
  propTitle: {
    fontSize: adjustSize(18),
    lineHeight: adjustSize(20),
    color: colors.primary,
  },
  rating: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  ratingReviews: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
  },
  tabs: {
    gap: adjustSize(5),
    alignItems: "center",
    paddingHorizontal: adjustSize(10),
    height: 40,
    marginVertical: adjustSize(10),
  },
  chip: {
    paddingHorizontal: adjustSize(6),
    borderRadius: adjustSize(5),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.125,
    shadowRadius: 1.84,
    elevation: 2,
    marginVertical: adjustSize(8),
    marginLeft: adjustSize(2),
    height: adjustSize(26),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.fill,
    borderWidth: 0.17,
    borderColor: colors.primaryLight,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: adjustSize(5),
  },
  chipText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(10),
    // lineHeight: adjustSize(14),
    // padding: adjustSize(5),
  },
  chipTextActive: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  gridRow: {
    gap: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: adjustSize(10),
  },
  rowLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flex: 1,
  },
  rowValue: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    flex: 1,
  },
  sectionTitle: {
    fontSize: adjustSize(18),
    color: colors.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  sectionDivider: {
    height: 0.5,
    backgroundColor: colors.grey,
    marginVertical: spacing.md,
  },
  description: {
    fontSize: adjustSize(12),
    lineHeight: adjustSize(18),
    color: colors.primaryLight,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
    paddingVertical: adjustSize(8),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  avatar: {
    width: adjustSize(59),
    height: adjustSize(59),
    borderRadius: adjustSize(59 / 2),
    backgroundColor: colors.border,
  },
  personName: {
    color: colors.primary,
    fontSize: adjustSize(14),
  },
  personMeta: {
    color: colors.grey,
    fontSize: adjustSize(10),
  },
  personRole: {
    color: colors.grey,
    fontSize: adjustSize(10),
  },
  hero: {
    width: "100%",
    height: adjustSize(228),
    backgroundColor: colors.border,
    marginTop: adjustSize(5),
  },
  galleryRow: {
    gap: adjustSize(10),
    paddingVertical: adjustSize(10),
  },
  galleryThumb: {
    width: adjustSize(81),
    height: adjustSize(74),
    borderRadius: adjustSize(7),
  },
  galleryThumbSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  insTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginBottom: spacing.md,
  },
  dayBlock: {
    marginBottom: spacing.lg,
  },
  dayTitle: {
    fontSize: adjustSize(14),
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  slotGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    justifyContent: "space-between",
  },
  slotChip: {
    width: "48%",
    height: adjustSize(40),
    borderRadius: adjustSize(20),
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  slotChipText: {
    color: colors.white,
    fontSize: adjustSize(11),
    fontFamily: typography.fonts.poppins.medium,
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.md,
    paddingHorizontal: adjustSize(10),
    marginVertical: adjustSize(10),
  },
  rejectBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: adjustSize(12),
    borderRadius: adjustSize(10),
    alignItems: "center",
  },
  rejectText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  approveBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: adjustSize(12),
    borderRadius: adjustSize(10),
    alignItems: "center",
  },
  approveText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  content: {
    paddingHorizontal: adjustSize(10),
  },
  _tabview: {
    flex: 1,
  },
});

function renderRow(label: string, value?: string) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text weight="semiBold" style={styles.rowLabel}>
        {label}
      </Text>
      <Text style={styles.rowValue}>{value ?? "—"}</Text>
    </View>
  );
}

function currency(v: number) {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(v);
  } catch {
    return `₦${v}`;
  }
}
