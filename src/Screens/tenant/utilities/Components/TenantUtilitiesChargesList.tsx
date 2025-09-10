import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { adjustSize, colors, typography } from "../../../../theme";
import { Text, Button, TextField } from "../../../../Components";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { CustomModal } from "./CustomModal";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";

interface Transaction {
  chargeType: string;
  totalAmount: number;
  amountPaid: number;
  status: "Pending" | "Paid" | "Overdue";
  createdDate: string;
  dueDate: string;
  comment: string;
}

export const UtilitiesChargesList: React.FC = () => {
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [payNowModal, setPayNowModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Transaction | null>(null);
  const [amount, setAmount] = useState("");
  const amountRef = useRef(null);
  const pinRef = useRef(null);

  const formatAmount = (num: number) =>
    new Intl.NumberFormat("en-IN").format(num);

  // ✅ global computed outstanding amount
  const outstanding =
    (selectedData?.totalAmount || 0) - (selectedData?.amountPaid || 0);

  const getButtonTitle = () => {
    if (!amount || parseInt(amount, 10) === 0) return "Pay Now";
    if (parseInt(amount, 10) === outstanding) return "Pay Full";
    if (parseInt(amount, 10) < outstanding) return "Pay Partial";
    return "Pay Now";
  };

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
                        else {
                          setAmount("");
                          setPayNowModal(true);
                        }
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
            Remaining Payment: ₦{formatAmount(outstanding)}
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
        <View style={styles.outstandingHeader}>
          <Text style={styles.outstandingAmountPaid}>
            ₦ {formatAmount(selectedData?.amountPaid || 0)}{" "}
            <Text
              style={[styles.outstandingAmountPaid, { color: colors.grey }]}
            >
              (Paid)
            </Text>
          </Text>
          <TouchableOpacity activeOpacity={0.7} style={styles.fundWalletBtn}>
            <Text style={styles.fundWalletBtnTxt}>Fund Wallet</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.OutstandingAmount}>Outstanding Amount</Text>
        <Text style={styles.OutstandingRemaningPayment}>
          ₦ {formatAmount(outstanding)}
        </Text>
        {outstanding > 0 && (
          <View
            style={{
              marginHorizontal: adjustSize(10),
              marginVertical: adjustSize(10),
            }}
          >
            <TextField
              ref={amountRef}
              value={amount}
              onChangeText={(text) => {
                let numeric = text.replace(/[^0-9]/g, "");
                if (numeric === "") {
                  setAmount("");
                  return;
                }
                let num = parseInt(numeric, 10);
                if (num > outstanding) num = outstanding;
                setAmount(num.toString());
                if (num === outstanding) {
                  amountRef.current?.blur();
                }
              }}
              placeholderTextColor={colors.primaryLight}
              inputWrapperStyle={{ backgroundColor: colors.fill }}
              placeholder={`Max ₦${formatAmount(outstanding)}`}
              keyboardType="numeric"
              maxLength={outstanding.toString().length}
            />
          </View>
        )}

        <Text style={styles.outstandingTxt}>Reason of Charges</Text>
        <Text style={styles.outstandingTxt}>Common Area Charges</Text>
        <View style={styles.btnMain}>
          {outstanding > 0 ? (
            <Button
              text={getButtonTitle()}
              preset="reversed"
              disabled={amount === "" ? true : false}
              onPress={() => {
                setPayNowModal(false);
                setPinModal(true);
              }}
            />
          ) : (
            <Button
              text="Close"
              preset="reversed"
              onPress={() => setPayNowModal(false)}
            />
          )}
        </View>
      </CustomModal>

      {/* PIN Modal */}
      <CustomModal visible={pinModal} onClose={() => setPinModal(false)}>
        <Text style={styles.modalHeading}>Enter Your PIN</Text>
        <View
          style={{
            marginHorizontal: adjustSize(10),
            marginVertical: adjustSize(15),
            marginTop: adjustSize(20),
          }}
        >
          <TextField
            ref={pinRef}
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={{ backgroundColor: colors.fill }}
            placeholder={`Enter Pin`}
            keyboardType="numeric"
            maxLength={4}
            style={{ textAlign: "center" }}
            secureTextEntry={true}
            onChangeText={(text) => {
              if (text.length === 4) {
                pinRef.current?.blur(); // ✅ auto unfocus
              }
            }}
          />
        </View>
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
        <WithLocalSvg
          asset={Images.check}
          style={{
            alignSelf: "center",
            marginTop: adjustSize(10),
            marginBottom: adjustSize(15),
          }}
        />
        <Text style={styles.modalHeading}>Purchase Successful 🎉</Text>
        <View style={styles.btnMain}>
          <Button
            text={"Continue"}
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
  outstandingHeader: {
    flexDirection: "row",
    paddingHorizontal: adjustSize(15),
    borderBottomWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: adjustSize(20),
    marginTop: adjustSize(30),
  },
  outstandingAmountPaid: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  fundWalletBtn: {
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 0.5,
    borderWidth: adjustSize(0.5),
    borderColor: "#F2F3FF",
    height: adjustSize(40),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: adjustSize(15),
  },
  fundWalletBtnTxt: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    opacity: 0.7,
  },
  OutstandingAmount: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    opacity: 0.7,
    marginTop: adjustSize(10),
  },
  OutstandingRemaningPayment: {
    fontSize: adjustSize(36),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.bold,
    textAlign: "center",
    lineHeight: adjustSize(55),
  },
  outstandingTxt: {
    fontSize: adjustSize(14),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    marginTop: adjustSize(5),
  },
});
