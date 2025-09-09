import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { Header, Screen, Text, Button } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { AdminStackParamList } from "../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import Feather from "@expo/vector-icons/Feather";
export type AdminBookingDetailsProps = NativeStackScreenProps<
  AdminStackParamList,
  "AdminBookingDetails"
>;

export function AdminBookingDetails({ route }: AdminBookingDetailsProps) {
  // const { bookingId } = route?.params;
  const navigation = useNavigation();

  const [agree, setAgree] = React.useState(false);
  const [allowNegotiable, setAllowNegotiable] = React.useState(true);
  const [allowActual, setAllowActual] = React.useState(false);
  const [refundDeposit, setRefundDeposit] = React.useState(false);
  const [reject, setReject] = React.useState(false);
  const [cancelModalVisible, setCancelModalVisible] = React.useState(false);

  // Steps config (order matters)
  const steps = React.useMemo(
    () => [
      "Reservation pending",
      "Reservation Approved",
      "Payment Confirmed",
      "Booking Confirmed",
      "Check in Confirmed",
      "Check Out Confirmed",
    ],
    []
  );

  // TODO: derive this from real booking status when available
  const bookingStatusLabel = "Reservation Approved";
  const currentStep = Math.max(0, steps.indexOf(bookingStatusLabel));

  const Check = ({ checked }: { checked: boolean }) => (
    <View style={[styles.checkboxBox, checked && styles.checkboxBoxChecked]}>
      {checked ? (
        <Feather name="check" size={adjustSize(12)} color={colors.white} />
      ) : null}
    </View>
  );

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header title="Bookings Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      >
        {/* Steps */}
        <View style={styles.stepsBar}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stepsRow}
          >
            {steps.map((label, idx) => {
              const isActiveOrDone = idx <= currentStep;
              const isActive = idx === currentStep;
              return (
                <React.Fragment key={label}>
                  <View style={styles.stepItem}>
                    {/* Step box */}
                    <View
                      style={[
                        styles.stepBox,
                        isActiveOrDone && styles.stepBoxActive,
                      ]}
                    >
                      {isActiveOrDone && (
                        <Feather
                          name="check"
                          size={adjustSize(12)}
                          color={colors.white}
                        />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.stepLabel,
                        isActiveOrDone ? styles.stepLabelActive : undefined,
                      ]}
                      numberOfLines={2}
                    >
                      {label}
                    </Text>
                  </View>
                  {/* Reserve connector space between every step to keep widths equal */}
                  {idx !== steps.length - 1 && (
                    <View>
                      {idx === currentStep ? (
                        <Image
                          source={Images.arrowRightIcon}
                          style={[
                            styles.connectorImg,
                            styles.connectorImgActive,
                          ]}
                          resizeMode="contain"
                        />
                      ) : (
                        <View style={styles.connectorImgPlaceholder} />
                      )}
                    </View>
                  )}
                </React.Fragment>
              );
            })}
          </ScrollView>
        </View>

        {/* Property Section */}
        <View style={[styles.card, { paddingBottom: spacing.md }]}>
          <View style={styles.rowBetween}>
            <View style={{ flexShrink: 1 }}>
              <Text weight="semiBold" style={styles.propTitle}>
                Brume Villa <Text style={styles.muted}> (Short-let)</Text>
              </Text>
            </View>
            <View style={styles.rowCenter}>
              <Ionicons name="star" size={adjustSize(16)} color="#F26938" />
              <Text style={[styles.muted, { marginLeft: spacing.xs }]}>
                4.6
              </Text>
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
            <Text style={styles.kvVal}>10029</Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Booked by:</Text>
            <Text style={styles.kvVal}>
              Brume Djdah <Text style={styles.muted}>(Facility Manager)</Text>
            </Text>
          </View>
          <View style={styles.kvRow}>
            <Text style={styles.kvKey}>Agent Code:</Text>
            <Text style={styles.kvVal}>123456</Text>
          </View>
          <View style={styles.divider} />

          <Text weight="semiBold" style={styles.sectionTitle}>
            Guest Details
          </Text>
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

          <View style={styles.divider} />

          <View style={{ height: spacing.md }} />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.kvKey}>Booking Status:</Text>
              <Text style={[styles.statusGreen]}>Approved</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.kvKey}>Deposit Refund Status:</Text>
              <Text style={[styles.statusOrange]}>Pending</Text>
            </View>
          </View>

          <View style={{ height: spacing.sm }} />
          <View style={[styles.rowBetween, styles.datesBox]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.kvKey, { flex: 0 }]}>Check In:</Text>
              <Text style={[styles.kvVal, { flex: 0, color: colors.grey }]}>
                {" "}
                Sep 25,2024
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.kvKey, { flex: 0 }]}>Check Out:</Text>
              <Text style={[styles.kvVal, { flex: 0, color: colors.grey }]}>
                {" "}
                Sep 25,2024
              </Text>
            </View>
          </View>

          <View style={{ height: spacing.md }} />
          <View>
            <View style={styles.kvRow}>
              <Text style={styles.kvKey}>Cleaning fee:</Text>
              <Text style={styles.kvVal}>$150</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kvKey}>Taxes:</Text>
              <Text style={styles.kvVal}>$150</Text>
            </View>
            <View style={styles.kvRow}>
              <Text style={styles.kvKey}>Other fee:</Text>
              <Text style={styles.kvVal}>$150</Text>
            </View>
          </View>

          <View style={{ height: spacing.md }} />
          <View style={styles.totalPill}>
            <Text weight="semiBold" style={styles.totalLabel}>
              Total:
            </Text>
            <Text weight="semiBold" style={styles.totalValue}>
              $2000
            </Text>
          </View>

          <View style={{ height: spacing.md }} />
          {/* Agreement Checkbox */}
          <TouchableOpacity
            style={styles.agreeRow}
            activeOpacity={0.8}
            onPress={() => setAgree((v) => !v)}
          >
            <Check checked={agree} />
            <Text
              style={[
                styles.kvVal,
                { marginLeft: spacing.sm, color: colors.grey },
              ]}
            >
              I have read the{" "}
              <Text
                style={{
                  color: colors.primary,
                  textDecorationLine: "underline",
                }}
              >
                Rental Agreement
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={{ height: spacing.md }} />
          <TouchableOpacity
            disabled={!agree}
            style={[styles.primaryBtn]}
            activeOpacity={0.9}
          >
            <Text
              weight="semiBold"
              style={{ color: colors.white, fontSize: adjustSize(15) }}
            >
              Sign Agreement
            </Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </View>

        {/* Admin options */}
        <View style={[styles.card, { paddingVertical: 0 }]}>
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
        <TouchableOpacity
          style={styles.dangerBtn}
          activeOpacity={0.9}
          onPress={() => setCancelModalVisible(true)}
        >
          <Text weight="medium" style={{ color: "#E15241" }}>
            Cancel Booking
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Cancel Booking Confirmation Modal (inline) */}
      <Modal
        transparent
        visible={cancelModalVisible}
        animationType="fade"
        onRequestClose={() => setCancelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() => setCancelModalVisible(false)}
              style={styles.modalCloseBtn}
              activeOpacity={0.8}
            >
              <Ionicons
                name="close"
                size={adjustSize(20)}
                color={colors.error}
              />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Are you Sure?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to You want to Cancel this Booking?
            </Text>
            <View style={styles.modalActions}>
              <Button
                text="Cancel"
                preset="default"
                onPress={() => setCancelModalVisible(false)}
                style={styles.modalBtnSecondary}
                textStyle={styles.modalBtnSecondaryText}
              />
              <Button
                text="Yes"
                preset="reversed"
                onPress={() => {
                  // TODO: hook up real cancel booking action
                  setCancelModalVisible(false);
                }}
                style={styles.modalBtnPrimary}
                textStyle={styles.modalBtnPrimaryText}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  },
  stepsBar: {
    backgroundColor: "#CACAE0",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
    minHeight: adjustSize(84),
  },
  stepsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
    width: adjustSize(84),
  },
  stepBox: {
    width: adjustSize(20),
    height: adjustSize(20),
    borderRadius: adjustSize(4),
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBoxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stepLabel: {
    fontSize: adjustSize(10),
    color: colors.white,
    textAlign: "center",
    lineHeight: adjustSize(14),
  },
  stepLabelActive: {
    color: colors.primary,
  },
  connectorImg: {
    width: adjustSize(56),
    height: adjustSize(8),
    marginHorizontal: spacing.xs,
    position: "absolute",
    alignSelf: "center",
    bottom: 15,
  },
  connectorImgActive: {
    opacity: 1,
    tintColor: colors.white,
  },
  connectorImgInactive: {
    opacity: 0.4,
    tintColor: colors.primaryLight,
  },
  connectorImgPlaceholder: {
    height: adjustSize(8),
    opacity: 0,
    marginHorizontal: spacing.xs,
  },
  card: {
    // backgroundColor: colors.white,
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
    fontSize: adjustSize(18),
    lineHeight: adjustSize(20),
  },
  muted: {
    color: colors.grey,
  },
  kvRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  kvKey: {
    color: colors.primary,
    flex: 1,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,

    // width: "45%",
  },
  kvVal: {
    color: colors.primary,
    flex: 1.5,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.primaryLight,
    marginVertical: spacing.md,
  },
  sectionTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
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
    flex: 1.5,
  },
  statusOrange: {
    color: "#F7A400",
    flex: 1.3,
  },
  datesBox: {
    padding: spacing.md,
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: colors.grey,
    marginVertical: adjustSize(5),
  },
  totalPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: adjustSize(10),
    backgroundColor: "#6369A4",
  },
  totalLabel: {
    color: colors.white,
    fontSize: adjustSize(15),
  },
  totalValue: {
    color: colors.white,
    fontSize: adjustSize(15),
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
    borderColor: colors.primary,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
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
    marginVertical: adjustSize(10),
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(5),
  },
  dangerBtn: {
    height: adjustSize(46),
    borderWidth:2,
    borderColor:"#E15241",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:adjustSize(10),
    marginHorizontal:adjustSize(15)
  },
  // Inline Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.palette.overlay50,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modalCard: {
    width: "100%",
    borderRadius: adjustSize(12),
    backgroundColor: colors.white,
    padding: spacing.lg,
    paddingVertical: adjustSize(50),
  },
  modalTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
    textAlign: "center",
    marginBottom: spacing.xs,
  },
  modalMessage: {
    color: colors.primary,
    textAlign: "center",
  },
  modalCloseBtn: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.error,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  // Modal styles
  modalActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginTop: adjustSize(50),
  },
  modalBtnSecondary: {
    flex: 1,
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  modalBtnSecondaryText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  modalBtnPrimary: {
    flex: 1,
    backgroundColor: "#D51E1E",
    borderColor: colors.palette.angry500,
  },
  modalBtnPrimaryText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
});
