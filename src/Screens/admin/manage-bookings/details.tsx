import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AdminStackParamList } from "../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export type AdminBookingDetailsProps = NativeStackScreenProps<
  AdminStackParamList,
  "AdminBookingDetails"
>;

export function AdminBookingDetails({ route }: AdminBookingDetailsProps) {
  const { bookingId } = route.params;
  const navigation = useNavigation();

  const [agree, setAgree] = React.useState(false);
  const [allowNegotiable, setAllowNegotiable] = React.useState(true);
  const [allowActual, setAllowActual] = React.useState(false);
  const [refundDeposit, setRefundDeposit] = React.useState(false);
  const [reject, setReject] = React.useState(false);

  const Check = ({ checked }: { checked: boolean }) => (
    <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]} />
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
        <Text weight="semiBold" style={styles.title}>Bookings Details</Text>
        <View style={{ width: adjustSize(36) }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      >
        {/* Steps */}
        <View style={styles.stepsBar}>
          {[
            "Reservation pending",
            "Reservation Approved",
            "Payment Confirmed",
            "Booking Confirmed",
            "Check in Confirmed",
          ].map((label, idx) => (
            <View key={label} style={styles.stepItem}>
              <View style={[styles.stepBox, idx === 0 && styles.stepBoxActive]} />
              <Text
                style={[
                  styles.stepLabel,
                  idx === 0 ? styles.stepLabelActive : undefined,
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </View>
          ))}
        </View>

        {/* Property Section */}
        <View style={[styles.card, { paddingBottom: spacing.md }] }>
          <View style={styles.rowBetween}>
            <View style={{ flexShrink: 1 }}>
              <Text weight="semiBold" style={styles.propTitle}>
                Brume Villa <Text style={styles.muted}> (Short-let)</Text>
              </Text>
            </View>
            <View style={styles.rowCenter}>
              <Ionicons name="star" size={adjustSize(16)} color="#F5A623" />
              <Text style={[styles.muted, { marginLeft: spacing.xs }]}>4.6</Text>
            </View>
          </View>

          <View style={{ height: spacing.md }} />

          {/* Key-Value Rows */}
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Username:</Text>
            <Text style={styles.kvVal}>Brume</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Booking ID:</Text>
            <Text style={styles.kvVal}>{bookingId}</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Booked by:</Text>
            <Text style={styles.kvVal}>Brume Djdah <Text style={styles.muted}>(Facility Manager)</Text></Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Agent Code:</Text>
            <Text style={styles.kvVal}>123456</Text>
          </View>

          <View style={styles.divider} />

          <Text weight="semiBold" style={styles.sectionTitle}>Guest Details</Text>
          <View style={{ height: spacing.sm }} />
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Name:</Text>
            <Text style={styles.kvVal}>Brume Djbah</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Phone:</Text>
            <Text style={styles.kvVal}>123456789900</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Email:</Text>
            <Text style={styles.kvVal}>emailabc.123@gmail.com</Text>
          </View>

          <View style={{ height: spacing.md }} />
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.kvKey}>Booking Status:</Text>
              <Text style={[styles.statusGreen]}>Approved</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.kvKey}>Deposit Refund Status:</Text>
              <Text style={[styles.statusOrange]}>Pending</Text>
            </View>
          </View>

          <View style={{ height: spacing.sm }} />
          <View style={[styles.rowBetween, styles.datesBox]}>
            <View>
              <Text style={styles.kvKey}>Check In:</Text>
              <Text style={styles.kvVal}>Sep 25,2024</Text>
            </View>
            <View>
              <Text style={styles.kvKey}>Check Out:</Text>
              <Text style={styles.kvVal}>Sep 25,2024</Text>
            </View>
          </View>

          <View style={{ height: spacing.md }} />
          <View>
            <View style={styles.kvRow}><Text style={styles.kvKey}>Cleaning fee:</Text><Text style={styles.kvVal}>$150</Text></View>
            <View style={styles.kvRow}><Text style={styles.kvKey}>Taxes:</Text><Text style={styles.kvVal}>$150</Text></View>
            <View style={styles.kvRow}><Text style={styles.kvKey}>Other fee:</Text><Text style={styles.kvVal}>$150</Text></View>
          </View>

          <View style={{ height: spacing.md }} />
          <View style={styles.totalPill}>
            <Text weight="semiBold" style={styles.totalLabel}>Total:</Text>
            <Text weight="semiBold" style={styles.totalValue}>$2000</Text>
          </View>

          <View style={{ height: spacing.md }} />
          {/* Agreement Checkbox */}
          <TouchableOpacity
            style={styles.agreeRow}
            activeOpacity={0.8}
            onPress={() => setAgree((v) => !v)}
          >
            <Check checked={agree} />
            <Text style={[styles.kvVal, { marginLeft: spacing.sm }]}>I have read the <Text weight="medium" style={{ color: colors.primary }}>Rental Agreement</Text></Text>
          </TouchableOpacity>

          <View style={{ height: spacing.md }} />
          <TouchableOpacity
            disabled={!agree}
            style={[styles.primaryBtn, !agree && { opacity: 0.5 }]}
            activeOpacity={0.9}
          >
            <Text weight="semiBold" style={{ color: colors.white }}>Sign Agreement</Text>
          </TouchableOpacity>
        </View>

        {/* Admin options */}
        <View style={[styles.card, { marginTop: spacing.md }] }>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setAllowNegotiable((v) => !v)}
            activeOpacity={0.7}
          >
            <Text style={styles.kvVal}>Approve Negotiable price</Text>
            <Check checked={allowNegotiable} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setAllowActual((v) => !v)}
            activeOpacity={0.7}
          >
            <Text style={styles.kvVal}>Approve Actual price</Text>
            <Check checked={allowActual} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setRefundDeposit((v) => !v)}
            activeOpacity={0.7}
          >
            <Text style={styles.kvVal}>Refund Caution Deposit</Text>
            <Check checked={refundDeposit} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toggleRow}
            onPress={() => setReject((v) => !v)}
            activeOpacity={0.7}
          >
            <Text style={styles.kvVal}>Reject</Text>
            <Check checked={reject} />
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.md }} />
        <TouchableOpacity style={styles.dangerBtn} activeOpacity={0.9}>
          <Text weight="medium" style={{ color: "#E15241" }}>Cancel Booking</Text>
        </TouchableOpacity>
      </ScrollView>
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
  },
  stepsBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight + "22",
    borderRadius: adjustSize(10),
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  stepItem: {
    flex: 1,
    alignItems: "center",
  },
  stepBox: {
    width: adjustSize(20),
    height: adjustSize(20),
    borderRadius: adjustSize(4),
    backgroundColor: colors.white,
    marginBottom: spacing.xs,
  },
  stepBoxActive: {
    backgroundColor: colors.primary,
  },
  stepLabel: {
    fontSize: adjustSize(10),
    color: colors.primaryLight,
  },
  stepLabelActive: {
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
  propTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  muted: {
    color: colors.primaryLight,
  },
  kvRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  kvKey: {
    color: colors.primaryLight,
    width: "45%",
  },
  kvVal: {
    color: colors.primary,
    width: "55%",
    textAlign: "right",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.primaryLight + "33",
    marginVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusGreen: {
    color: "#00A878",
  },
  statusOrange: {
    color: "#F7A400",
  },
  datesBox: {
    padding: spacing.md,
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
  },
  totalPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: adjustSize(10),
    backgroundColor: "#6E6BAE",
  },
  totalLabel: {
    color: colors.white,
  },
  totalValue: {
    color: colors.white,
  },
  agreeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    width: adjustSize(18),
    height: adjustSize(18),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    backgroundColor: colors.white,
  },
  checkboxBoxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  primaryBtn: {
    height: adjustSize(46),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
  },
  dangerBtn: {
    height: adjustSize(46),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: "#E15241",
    backgroundColor: colors.white,
  },
});
