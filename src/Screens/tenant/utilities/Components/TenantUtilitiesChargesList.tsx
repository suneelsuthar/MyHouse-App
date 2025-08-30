import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { adjustSize, colors, typography } from "../../../../theme";
import { Text, Button } from "../../../../Components";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { CustomModal } from "./CustomModal";
// ✅ Define Transaction type
interface Transaction {
  chargeType: string;
  totalAmount: number;
  amountPaid: number;
  status: "Pending" | "Paid" | "Overdue";
  createdDate: string;
  dueDate: string;
  comment: string;
}

export const TenantUtilitiesChargesList: React.FC = () => {
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false); // receipt modal
  const [payNowModal, setPayNowModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Transaction | null>(null);

  const formatAmount = (num: number) =>
    new Intl.NumberFormat("en-IN").format(num);

  const data: Transaction[] = Array.from({ length: 20 }, (_, i) => {
    const totalAmount = 100000 + i * 50000;
    const status: "Pending" | "Paid" | "Overdue" =
      i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Paid" : "Overdue";

    const amountPaid =
      status === "Paid"
        ? totalAmount
        : Math.floor((totalAmount * (10 + i * 5)) / 100);

    return {
      chargeType: [
        "Late Rent Payment",
        "Maintenance Fee",
        "Electricity Bill",
        "Water Bill",
        "Gas Bill",
        "Security Charges",
        "Service Tax",
        "Parking Fee",
        "Lift Maintenance",
        "Building Insurance",
        "Garbage Collection",
        "Community Tax",
        "Repair Charges",
        "Cleaning Fee",
        "Pest Control",
        "Internet Bill",
        "Cable TV",
        "Fire Safety",
        "Garden Maintenance",
        "Miscellaneous Fee",
      ][i],
      totalAmount,
      amountPaid,
      status,
      createdDate: moment().subtract(i, "days").toISOString(),
      dueDate: moment().add(i, "days").toISOString(),
      comment: `This is a test comment for ${i + 1}`,
    };
  });

  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const isMenuVisible = visibleMenuIndex === index;

        return (
          <View key={index} style={styles.card}>
            <View style={styles.data}>
              <Text
                style={[
                  styles.status,
                  {
                    color:
                      item.status === "Pending"
                        ? "#F26938"
                        : item.status === "Paid"
                        ? "#4CAF50"
                        : "#D51E1E",
                  },
                ]}
              >
                {item.status}
              </Text>
              <Text style={styles.chargeType} numberOfLines={1}>
                {item.chargeType}
              </Text>
              <Text style={styles.price} numberOfLines={1}>
                ₦ {formatAmount(item.totalAmount)}
                <Text
                  style={[
                    styles.price,
                    {
                      color: colors.greylight,
                      fontFamily: typography.fonts.poppins.medium,
                    },
                  ]}
                >
                  {" "}
                  (₦ {formatAmount(item.amountPaid)} Paid)
                </Text>
              </Text>
            </View>

            {/* Menu Trigger */}
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setVisibleMenuIndex(isMenuVisible ? null : index)}
            >
              <Entypo
                name="dots-three-vertical"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>

            {/* Dropdown Menu */}
            {isMenuVisible && (
              <>
                <TouchableOpacity
                  style={styles.overlay}
                  activeOpacity={1}
                  onPress={() => setVisibleMenuIndex(null)}
                />
                <View style={styles.menuBox}>
                  {["View Receipt", "Pay Now"].map((a) => (
                    <TouchableOpacity
                      key={a}
                      onPress={() => {
                        setVisibleMenuIndex(null);
                        setSelectedData(item);
                        if (a === "View Receipt") setVisible(true);
                        else setPayNowModal(true);
                      }}
                      style={styles.menuItem}
                      activeOpacity={0.6}
                    >
                      <Text style={styles.menuText}>{a}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        );
      })}

      {/* Receipt Modal */}
      <CustomModal
        visible={visible}
        onClose={() => {
          setSelectedData(null);
          setVisible(false);
        }}
      >
        <Text style={styles.modalHeading}>View Charge Details</Text>
        <Text style={[styles.modalTitle, { marginVertical: adjustSize(10) }]}>
          Status:{" "}
          <Text
            style={{
              color:
                selectedData?.status === "Pending"
                  ? "#F26938"
                  : selectedData?.status === "Paid"
                  ? "#4CAF50"
                  : "#D51E1E",
            }}
          >
            {selectedData?.status}
          </Text>
        </Text>
        <Text style={styles.modalTitle}>
          Date Created:{" "}
          <Text style={{ color: "#7E7E7E" }}>
            {moment(selectedData?.createdDate).format("MMM DD YYYY")}
          </Text>
        </Text>
        <Text style={styles.modalTitle}>
          Due Date:{" "}
          <Text style={{ color: "#7E7E7E" }}>
            {moment(selectedData?.dueDate).format("MMM DD YYYY")}
          </Text>
        </Text>
        <View style={styles.modalAmountMain}>
          <Text style={styles.modalTitle}>
            Charge type:{" "}
            <Text style={{ color: "#7E7E7E" }}>{selectedData?.chargeType}</Text>
          </Text>
          <Text style={styles.modalPrice}>
            ₦ {formatAmount(selectedData?.totalAmount || 0)}
          </Text>
          <Text style={styles.modalRemaningPayment}>
            Remaining Payment: ₦
            {formatAmount(
              (selectedData?.totalAmount || 0) - (selectedData?.amountPaid || 0)
            )}
          </Text>
        </View>

        {/* Progress Bar */}
        {selectedData && (
          <View style={styles.progressMain}>
            <View
              style={[
                styles.doneProgress,
                {
                  backgroundColor:
                    selectedData.status === "Paid" ? "#4CAF50" : "#D51E1E",
                  width: `${Math.round(
                    ((selectedData.amountPaid ?? 0) /
                      (selectedData.totalAmount || 1)) *
                      100
                  )}%`,
                },
              ]}
            />
          </View>
        )}

        <Text
          style={[
            styles.modalTitle,
            {
              marginTop: adjustSize(10),
              textAlign: "left",
              marginHorizontal: adjustSize(10),
            },
          ]}
        >
          Comment:{" "}
          <Text style={{ color: "#7E7E7E" }}>{selectedData?.comment}</Text>
        </Text>

        <View style={styles.btnMain}>
          <Button
            text={"Close"}
            preset="reversed"
            onPress={() => {
              setSelectedData(null);
              setVisible(false);
            }}
          />
        </View>
      </CustomModal>

      {/* Pay Now Modal */}
      <CustomModal visible={payNowModal} onClose={() => setPayNowModal(false)}>
        <Text style={styles.modalHeading}>Outstanding</Text>
        <View style={styles.btnMain}>
          <Button
            text={"Pay Now"}
            preset="reversed"
            onPress={() => {
              setPayNowModal(false);
              setPinModal(true);
            }}
          />
        </View>
      </CustomModal>

      {/* PIN Modal */}
      <CustomModal visible={pinModal} onClose={() => setPinModal(false)}>
        <Text style={styles.modalHeading}>Enter Your PIN</Text>
        <View style={styles.btnMain}>
          <Button
            text={"Continue"}
            preset="reversed"
            onPress={() => {
              setPinModal(false);
              setSuccessModal(true);
            }}
          />
        </View>
      </CustomModal>

      {/* Success Modal */}
      <CustomModal
        visible={successModal}
        onClose={() => setSuccessModal(false)}
      >
        <Text style={styles.modalHeading}>Purchase Successful 🎉</Text>
        <View style={styles.btnMain}>
          <Button
            text={"Close"}
            preset="reversed"
            onPress={() => setSuccessModal(false)}
          />
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    paddingVertical: adjustSize(12),
    paddingHorizontal: adjustSize(10),
    flexDirection: "row",
    borderBottomWidth: adjustSize(0.5),
    borderBottomColor: "#B0B0B0",
  },
  data: { flex: 1, marginRight: adjustSize(15) },
  status: {
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  price: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  chargeType: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    opacity: 0.7,
    marginVertical: adjustSize(3),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 5,
  },
  menuBox: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(36),
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    elevation: 4,
    width: adjustSize(120),
    paddingVertical: adjustSize(6),
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: adjustSize(5),
    paddingHorizontal: adjustSize(12),
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  modalHeading: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
  },
  modalAmountMain: {
    borderTopWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    marginTop: adjustSize(15),
    paddingTop: adjustSize(15),
  },
  modalPrice: {
    fontSize: adjustSize(36),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.bold,
    textAlign: "center",
    lineHeight: adjustSize(50),
  },
  btnMain: {
    paddingHorizontal: adjustSize(15),
    paddingTop: adjustSize(20),
    paddingBottom: adjustSize(10),
  },
  modalTitle: {
    textAlign: "center",
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  modalRemaningPayment: {
    textAlign: "center",
    fontSize: adjustSize(14),
    color: "#D62828",
    fontFamily: typography.fonts.poppins.normal,
  },
  progressMain: {
    backgroundColor: colors.grey,
    height: adjustSize(13),
    borderRadius: 100,
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(10),
  },
  doneProgress: { height: "100%", borderRadius: 100 },
});
