import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen, Text, Header } from "../../../Components";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { IRentalProperty, rentalProperties } from "../../../utils/data";
import { useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";

const ViewRequests = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState<"details" | "agents" | "fm">("details");

  const property: IRentalProperty | undefined = rentalProperties[0];

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header
        title={
          (tab === "details" && "View Property Details") ||
          (tab === "agents" && "Resident") ||
          (tab === "fm" && "Facility Managers") ||
          "View Property Details"
        }
      />
      <ScrollView>
        <View style={styles.container}>
          {!property ? (
            <View style={styles.centerEmpty}>
              <Text>Property not found.</Text>
            </View>
          ) : (
            <>
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
                  <Text style={styles.ratingReviews}> {property.rating}</Text>
                  <Text style={styles.ratingReviews}>
                    {" "}
                    ({property.reviewsCount} Reviews)
                  </Text>
                </Text>
              </View>

              <View style={styles.badgesRow}>
                <View style={styles.inlineBadge}>
                  <Text style={styles.inlineBadgeText}>Estate ID</Text>
                </View>
              </View>

              <View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tabs}
                >
                  {[
                    { k: "details", label: "Property Overview" },
                    { k: "agents", label: "Residents" },
                    { k: "fm", label: "Facility Managers" },
                  ].map((t) => (
                    <TouchableOpacity
                      key={t.k}
                      onPress={() => setTab(t.k as any)}
                      activeOpacity={0.7}
                      style={[styles.chip, tab === t.k && styles.chipActive]}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          tab === t.k && styles.chipTextActive,
                        ]}
                        text={t.label}
                      />
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

                    <View style={styles.badgesRow}>
                      <View style={styles.inlineBadge}>
                        <WithLocalSvg asset={Images.apartment} />
                        <Text style={styles.inlineBadgeText}>Shortlet</Text>
                      </View>
                      <View style={styles.inlineMeta}>
                        <WithLocalSvg asset={Images.location2} />

                        <Text style={styles.inlineMetaText}>
                          {property.city}, {property.state}
                        </Text>
                      </View>
                    </View>

                    <View style={{ height: spacing.lg }} />
                  </ScrollView>
                )}

                {tab === "agents" && (
                  <ScrollView style={styles.content}>
                    <Text
                      text="Residents Assigned to Property"
                      style={styles.title}
                      weight="semiBold"
                    />
                    {property.agents.map((a) => (
                      <View key={a.id} style={styles.personRow}>
                        <Image
                          source={{ uri: a.avatar }}
                          style={styles.avatar}
                        />
                        <View style={{ flex: 1 }}>
                          <Text weight="medium" style={styles.personName}>
                            {a.name}{" "}
                            <Text style={styles.personRole}>
                              (Primary agent)
                            </Text>
                          </Text>
                          <Text style={styles.personMeta}>({a.code}) </Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                )}

                {tab === "fm" && (
                  <ScrollView style={styles.content}>
                    <Text
                      text="Facility Managers Assigned to Property"
                      style={styles.title}
                      weight="semiBold"
                    />
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
        </View>
      </ScrollView>
      <View style={styles.footerRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.rejectBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.rejectText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.approveBtn}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.approveText}>Send</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

export default ViewRequests;

const styles = StyleSheet.create({
  screenContentContainer: {},

  container: {
    flex: 1,
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
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
    flex: 1,
    color: colors.primaryLight,
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
    color: colors.primaryLight,
    fontSize: adjustSize(10),
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
    color: colors.primary,
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
    borderColor: "#D62828",
    borderRadius: adjustSize(10),
    alignItems: "center",
    height: adjustSize(47),
    justifyContent: "center",
  },
  rejectText: {
    color: "#D62828",
    fontFamily: typography.fonts.poppins.semiBold,
  },
  approveBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    height: adjustSize(47),
    justifyContent: "center",
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

  content: {
    paddingHorizontal: adjustSize(10),
  },
  _tabview: {
    flex: 1,
  },

  title: {
    color: colors.primary,
    fontSize: adjustSize(14),
    marginBottom: 20,
  },
});

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
