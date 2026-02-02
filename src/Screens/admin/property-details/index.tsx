import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { Screen, Text, Header } from "../../../Components";
import {
  AppStackScreenProps,
  AdminStackParamList,
} from "../../../utils/interfaces";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { IRentalProperty, rentalProperties } from "../../../utils/data";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import Feather from "@expo/vector-icons/Feather";

type PropertyDetailsScreenRouteProp = RouteProp<
  AdminStackParamList,
  "PropertyDetails"
>;

export function PropertyDetails() {
  const route = useRoute<PropertyDetailsScreenRouteProp>();
  const { propertyId } = route.params;
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [confirmationMode, setConfirmationMode] = useState<
    "approve" | "reject"
  >("approve");
  const [tab, setTab] = useState<
    "details" | "inspection" | "agents" | "fm" | "media"
  >("details");
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [descExpanded, setDescExpanded] = useState(false);

  const heroWidth = Dimensions.get("window").width - adjustSize(20);
  const heroScrollRef = React.useRef<ScrollView>(null);

  const property: IRentalProperty | undefined = useMemo(
    () => rentalProperties.find((p) => p.propertyId === propertyId),
    [propertyId],
  );

  const images = useMemo(() => property?.images ?? [], [property?.images]);

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
    [],
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
    [],
  );

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="View Property Details" />
      <ScrollView>
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
                  style={[styles.propTitle, { flex: 2 }]}
                  numberOfLines={1}
                />
                <View style={{ marginBottom: 4 }}>
                  <WithLocalSvg asset={Images.star} />
                </View>
                <Text style={[styles.rating, { flex: 1.5 }]}>
                  {/* <Text style={{ color: "#F26938" }}>★ </Text> */}
                  <Text style={styles.ratingReviews}> {property.rating}</Text>
                  <Text style={styles.ratingReviews}>
                    {" "}
                    ({property.reviewsCount} Reviews)
                  </Text>
                </Text>
              </View>

              {/* Badges and mandate */}
              <View style={styles.badgesRow}>
                <View style={styles.inlineBadge}>
                  {/* <Feather name="home" size={14} color={colors.white} /> */}
                  <WithLocalSvg asset={Images.apartment} />
                  <Text style={styles.inlineBadgeText}>Apartment</Text>
                </View>
                <View style={styles.inlineMeta}>
                  {/* <Feather name="map-pin" size={14} color={colors.primary} /> */}
                  <WithLocalSvg asset={Images.location2} />

                  <Text style={styles.inlineMetaText}>
                    {property.city}, {property.state}
                  </Text>
                </View>
                {/* right side kept empty as per new layout */}
              </View>
              {/* Property ID button */}
              <TouchableOpacity activeOpacity={0.8} style={styles.idButton}>
                <Text style={styles.idButtonText}>
                  Property ID will be here
                </Text>
              </TouchableOpacity>

              {/* Mandate row */}
              <View style={styles.mandateRow}>
                <Text weight="semiBold" style={styles.mandateLabel}>
                  Mandate
                </Text>
                <Text style={styles.mandateValue}>
                  Lorem Ipsum is a dummy text
                </Text>
              </View>

              <View>
                {/* Media */}
                <View style={{ paddingHorizontal: adjustSize(10) }}>
                  {images.length > 0 && (
                    <>
                      <ScrollView
                        ref={heroScrollRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(e) => {
                          const pageWidth =
                            e.nativeEvent.layoutMeasurement.width || heroWidth;
                          const x = e.nativeEvent.contentOffset.x;
                          const nextIdx = Math.round(
                            x / Math.max(1, pageWidth),
                          );
                          if (Number.isFinite(nextIdx))
                            setSelectedImgIdx(nextIdx);
                        }}
                      >
                        {images.map((img, i) => (
                          <View key={img + i} style={{ width: heroWidth }}>
                            <Image source={{ uri: img }} style={styles.hero} />
                          </View>
                        ))}
                      </ScrollView>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.galleryRow}
                      >
                        {images.map((img, i) => (
                          <TouchableOpacity
                            key={img + i}
                            activeOpacity={0.7}
                            onPress={() => {
                              setSelectedImgIdx(i);
                              heroScrollRef.current?.scrollTo({
                                x: heroWidth * i,
                                y: 0,
                                animated: true,
                              });
                            }}
                          >
                            <Image
                              source={{ uri: img }}
                              style={[
                                styles.galleryThumb,
                                i === selectedImgIdx &&
                                  styles.galleryThumbSelected,
                              ]}
                            />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </>
                  )}
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tabs}
                >
                  {[
                    { k: "details", label: "Property Overview" },
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
                    {/* Overview */}
                    <Text weight="semiBold" style={styles.sectionTitle}>
                      Property Overview
                    </Text>
                    <View style={styles.overviewRow}>
                      <Text weight="semiBold" style={styles.overviewPrice}>
                        {currency(property.pricePerNight)}{" "}
                        <Text style={styles.smallMuted}>/ night</Text>
                      </Text>
                      <View style={styles.overviewPill}>
                        <Text style={styles.overviewPillText}>
                          {property.category}
                        </Text>
                      </View>
                    </View>

                    {/* <View
                      style={[styles.gridRow, { marginBottom: adjustSize(10) }]}
                    >
                      {renderRow("Mandate", property.mandate)}
                      {renderRow("Category", property.category)}
                      {renderRow("Complete Address", property.address)}
                      {renderRow("City", property.city)}
                      {renderRow("State", property.state)}
                      {renderRow("Country", property.country)}
                    </View> */}

                    {/* <View style={styles.sectionDivider} /> */}

                    {/* <Text weight="semiBold" style={styles.sectionTitle}>Pricing</Text> */}
                    <View style={styles.priceCard}>
                      <View style={styles.priceColLeft}>
                        <Text weight="semiBold" style={styles.priceLabel}>
                          Caution Deposit
                        </Text>
                        <Text weight="semiBold" style={styles.priceLabel}>
                          Service Charges (Flat)
                        </Text>
                        <Text weight="semiBold" style={styles.priceLabel}>
                          Other Fees (Flat)
                        </Text>
                      </View>
                      <View style={styles.priceDivider} />
                      <View style={styles.priceColRight}>
                        <Text style={styles.priceValue}>
                          {currency(property.cautionDeposit)}
                        </Text>
                        <Text style={styles.priceValue}>
                          {currency(property.serviceChargeFlat)}
                        </Text>
                        <Text style={styles.priceValue}>
                          {currency(property.otherFeesFlat)}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={styles.sectionDivider} /> */}
                    {/* Description card with icon pills on the left */}
                    <View style={[styles.card, styles.descCard]}>
                      <Text
                        weight="semiBold"
                        style={[styles.sectionTitle, { marginTop: 0 }]}
                      >
                        Description
                      </Text>
                      <View style={styles.descRow}>
                        <View style={styles.iconPillsCol}>
                          <View style={styles.iconPill}>
                            {/* <Feather
                              name="home"
                              size={14}
                              color={colors.white}
                            /> */}
                            <WithLocalSvg asset={Images.bed} />
                            <Text style={styles.iconPillText}>• 2</Text>
                          </View>
                          <View style={styles.iconPill}>
                            <WithLocalSvg asset={Images.user2} />
                            <Text style={styles.iconPillText}>• 5</Text>
                          </View>
                        </View>
                        <View style={{ flex: 1.5 }}>
                          <Text
                            style={[styles.description, { flex: 1 }]}
                            numberOfLines={descExpanded ? undefined : 4}
                          >
                            {property.description}
                          </Text>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setDescExpanded((v) => !v)}
                          >
                            <Text style={styles.viewMore}>
                              {descExpanded ? "View less" : "View more..."}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    {/* Amenity and Features grouped card (left label, right content) */}
                    <View style={[styles.card, styles.groupCard]}>
                      <View style={styles.groupRow}>
                        <Text weight="semiBold" style={styles.groupLabel}>
                          Amenity
                        </Text>
                        <View style={styles.groupContent}>
                          <View style={[styles.iconGridRow]}>
                            {property.amenities.map((a) => (
                              <View key={a} style={[styles.iconTile]}>
                                <View style={styles.iconCircle}>
                                  <Feather
                                    name="wifi"
                                    size={16}
                                    color={colors.white}
                                  />
                                </View>
                                <Text style={styles.iconTileLabel}>lorem</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                      <View style={styles.groupRow}>
                        <Text weight="semiBold" style={styles.groupLabel}>
                          Features
                        </Text>
                        <View style={styles.groupContent}>
                          <View style={styles.iconGridRow}>
                            {property.features.map((f) => (
                              <View key={f} style={styles.iconTile}>
                                <View style={styles.iconCircle}>
                                  <Feather
                                    name="tv"
                                    size={16}
                                    color={colors.white}
                                  />
                                </View>
                                <Text style={styles.iconTileLabel}>lorem</Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Complete Address card */}
                    <View style={[styles.card, styles.addressCard]}>
                      <Text weight="semiBold" style={styles.addressLabel}>
                        Complete Address
                      </Text>
                      <Text style={styles.addressValue}>
                        {property.address}
                      </Text>
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.primaryButton}
                      onPress={() => {
                        if (property.virtualTourUrl) {
                          Linking.openURL(property.virtualTourUrl).catch(
                            () => {},
                          );
                        }
                      }}
                    >
                      <Text style={styles.primaryButtonText}>
                        360 Virtual Link
                      </Text>
                    </TouchableOpacity>

                    <Image source={Images.mapImage} style={styles.mapImage} />

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

                    <View
                      style={[
                        styles.card,
                        styles.addressCard,
                        { borderRadius: 100, height: adjustSize(50) },
                      ]}
                    >
                      <Text
                        weight="normal"
                        style={[styles.addressLabel, { flex: 1 }]}
                      >
                        Contact Number
                      </Text>
                      <Text style={[styles.addressValue, { flex: 1 }]}>
                        +1 (555) 123-4567
                      </Text>
                    </View>
                    <View style={{ height: spacing.lg }} />
                  </ScrollView>
                )}

                {tab === "agents" && (
                  <ScrollView style={styles.content}>
                    {property.agents.map((a) => (
                      <View key={a.id} style={styles.personRow}>
                        <Image
                          source={{ uri: a.avatar }}
                          style={styles.avatar}
                        />
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
                        <Image
                          source={{ uri: a.avatar }}
                          style={styles.avatar}
                        />
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
              </View>
            </>
          )}
          <View style={styles.footerRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.rejectBtn}
              onPress={() => {
                setRejectionReason("");
                setConfirmationMode("reject");
                setApproveModalVisible(true);
              }}
            >
              <Text style={styles.rejectText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.approveBtn}
              onPress={() => {
                setConfirmationMode("approve");
                setApproveModalVisible(true);
              }}
            >
              <Text style={styles.approveText}>Approve</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Approval Confirmation Modal */}
        <Modal
          visible={approveModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setApproveModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setApproveModalVisible(false)}
              >
                <Feather name="x" size={20} color={colors.error} />
              </TouchableOpacity>
              <Text weight="semiBold" style={styles.modalTitle}>
                Are you Sure?
              </Text>
              <Text style={styles.modalMessage}>
                {confirmationMode === "approve"
                  ? "Are you sure you want to approve this property listing?"
                  : "Are you sure you want to reject this property listing?"}
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setApproveModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => {
                    // Handle approval/rejection logic here
                    setApproveModalVisible(false);
                    // Add your approve/reject logic
                  }}
                >
                  <Text style={styles.modalButtonText}>
                    {confirmationMode === "approve" ? "Approve" : "Reject"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000B2",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#F2F3FF",
    borderRadius: 12,
    padding: 24,
    width: "90%",
    maxWidth: 400,
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    height: adjustSize(25),
    width: adjustSize(25),
    borderRadius: 100,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.error,
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 16,
    color: colors.primary,
    textAlign: "center",
    marginTop: adjustSize(40),
  },
  modalMessage: {
    fontSize: 14,
    color: colors.primary,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    // paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 4,
    height: adjustSize(47),
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: "#D51E1E",
  },
  cancelButtonText: {
    color: "#D51E1E",
    fontWeight: "500",
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: "500",
  },
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
    // marginBottom: spacing.md,
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
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  badgesRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(8),
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(4),
    justifyContent: "space-between",
  },
  inlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(6),
    height: adjustSize(24),
    borderRadius: adjustSize(6),
    flex: 2,
  },
  inlineBadgeText: {
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
    flex: 1,
  },
  inlineMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(4),
    backgroundColor: colors.fill,
    paddingHorizontal: adjustSize(8),
    height: adjustSize(24),
    borderRadius: adjustSize(6),
    flex: 1.5,
  },
  inlineMetaText: {
    color: colors.primary,
    fontSize: adjustSize(10),
  },
  idPill: {
    marginLeft: "auto",
    backgroundColor: colors.fill,
    paddingHorizontal: adjustSize(8),
    height: adjustSize(24),
    borderRadius: adjustSize(6),
    justifyContent: "center",
  },
  idPillText: {
    color: colors.primary,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
  },
  mandateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(8),
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(8),
    marginBottom: 20,
  },
  mandateLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flex: 1,
  },
  mandateValue: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flex: 3,
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
    borderColor: colors.primary,
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
    // fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(12),
    flex: 1,
  },
  rowValue: {
    color: colors.primary,
    fontSize: adjustSize(12),
    // marginBottom: spacing.sm,
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
  priceCard: {
    flexDirection: "row",
    alignItems: "stretch",
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    paddingVertical: adjustSize(12),
    paddingHorizontal: adjustSize(14),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  priceColLeft: {
    flex: 1,
    justifyContent: "space-between",
    gap: adjustSize(12),
  },
  priceColRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: adjustSize(12),
  },
  priceDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.grey,
    marginHorizontal: adjustSize(14),
  },
  priceLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  priceValue: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flex: 1,
    minWidth: adjustSize(50),
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    padding: adjustSize(10),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 20,
  },
  description: {
    fontSize: adjustSize(12),
    lineHeight: adjustSize(18),
    color: colors.primary,
  },
  descCard: {
    paddingVertical: adjustSize(12),
  },
  descRow: {
    flexDirection: "row",
    gap: adjustSize(12),
    alignItems: "flex-start",
  },
  iconPillsCol: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: adjustSize(8),
    flex: 1,
  },
  iconPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(6),
    backgroundColor: colors.primary,
    paddingHorizontal: adjustSize(15),
    height: adjustSize(28),
    borderRadius: adjustSize(18),
  },
  iconPillText: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
    marginLeft: -2,
  },
  viewMore: {
    color: colors.primary,
    marginTop: adjustSize(8),
    textDecorationLine: "underline",
    fontSize: adjustSize(12),
  },
  groupCard: {
    paddingVertical: adjustSize(12),
    gap: adjustSize(14),
  },
  groupRow: {
    gap: adjustSize(8),
    flexDirection: "row",
  },
  groupLabel: {
    color: colors.primary,
    fontSize: adjustSize(14),
    marginTop: adjustSize(10),
    marginRight: 20,
  },
  groupContent: {
    flex: 1,
  },
  iconGridRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: adjustSize(8),
  },
  iconTile: {
    // width: adjustSize(64),
    alignItems: "center",
    // gap: adjustSize(6),
  },
  iconCircle: {
    width: adjustSize(35),
    height: adjustSize(35),
    borderRadius: adjustSize(5),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  iconTileLabel: {
    color: colors.primary,
    fontSize: adjustSize(10),
    textAlign: "center",
  },
  groupChipsRow: {
    flexDirection: "row",
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(8),
  },
  addressLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  addressValue: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flex: 1,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: adjustSize(8),
  },
  chipPill: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(20),
    paddingHorizontal: adjustSize(10),
    height: adjustSize(28),
    justifyContent: "center",
  },
  chipPillText: {
    color: colors.primary,
    fontSize: adjustSize(11),
    fontFamily: typography.fonts.poppins.medium,
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
    height: adjustSize(192),
    // borderRadius: adjustSize(12),
    backgroundColor: colors.border,
    marginTop: adjustSize(5),
    borderRadius: 10,
  },
  galleryRow: {
    gap: adjustSize(10),
    paddingVertical: adjustSize(10),
  },
  galleryThumb: {
    width: adjustSize(81),
    height: adjustSize(74),
    borderRadius: adjustSize(7),
    // backgroundColor: colors.border,
  },
  galleryThumbSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  overviewRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(6),
  },
  overviewPrice: {
    color: colors.primary,
    fontSize: adjustSize(20),
    lineHeight: adjustSize(24),
  },
  smallMuted: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  overviewPill: {
    backgroundColor: colors.fill,
    paddingHorizontal: adjustSize(10),
    height: adjustSize(28),
    borderRadius: adjustSize(20),
    justifyContent: "center",
    alignItems: "center",
  },
  overviewPillText: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  // Inspection tab styles
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
    backgroundColor: colors.primary,
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
    marginBottom: 50,
  },
  rejectBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    // paddingVertical: adjustSize(12),
    borderRadius: adjustSize(10),
    alignItems: "center",
     height:adjustSize(47),
    justifyContent:"center"

  },
  rejectText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  approveBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    // paddingVertical: adjustSize(12),
    borderRadius: adjustSize(10),
    alignItems: "center",
    height:adjustSize(47),
    justifyContent:"center"
  },
  approveText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  idButton: {
    marginTop: adjustSize(8),
    marginHorizontal: adjustSize(10),
    backgroundColor: colors.primary,
    height: adjustSize(39),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
  },
  idButtonText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(12),
  },
  primaryButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
    height: adjustSize(47),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(14),
  },
  content: {
    paddingHorizontal: adjustSize(10),
  },
  _tabview: {
    flex: 1,
  },
  mapImage: {
    width: "100%",
    height: adjustSize(185),
    borderRadius: adjustSize(10),
    marginTop: spacing.md,
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
