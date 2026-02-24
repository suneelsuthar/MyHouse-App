import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { adjustSize, colors, typography } from "../../../../theme";
import { Text, Button } from "../../../../Components";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
// import Feather from "@expo/vector-icons/Feather";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import Feather from "@expo/vector-icons/Feather";
// Define transaction type
interface Transaction {
  type: "send" | "receive";
  date: string;
  price: string;
  paymentType: string;
}

interface TenantUtilitiesHistoryProps {
  title: "Transaction Details" | "Vending Information";
}

// Reusable row component
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.modalList}>
    <Text style={styles.modalListTitle}>{label}</Text>

    <Text style={styles.modalListVal}>
      {value}{" "}
      {label === "Token:" && (
        <Feather name="copy" size={18} color={colors.primary} />
      )}
    </Text>
  </View>
);

export const TenantUtilitiesHistory: React.FC<TenantUtilitiesHistoryProps> = ({
  title,
}) => {
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<Transaction | null>(null);
  const data: Transaction[] = [
    {
      type: "send",
      date: "2025-08-01T10:15:26+05:00",
      price: "1,200",
      paymentType: "Utility Bill Payment",
    },
    {
      type: "receive",
      date: "2025-08-02T14:32:10+05:00",
      price: "5,500",
      paymentType: "Bank Transfer",
    },
    {
      type: "send",
      date: "2025-08-03T09:45:50+05:00",
      price: "3,000",
      paymentType: "Mobile Recharge",
    },
    {
      type: "receive",
      date: "2025-08-04T19:12:36+05:00",
      price: "7,200",
      paymentType: "Freelance Payment",
    },
    {
      type: "send",
      date: "2025-08-05T08:22:41+05:00",
      price: "1,800",
      paymentType: "Shopping",
    },
    {
      type: "receive",
      date: "2025-08-06T11:30:15+05:00",
      price: "2,400",
      paymentType: "Refund",
    },
    {
      type: "send",
      date: "2025-08-07T20:55:03+05:00",
      price: "6,100",
      paymentType: "Restaurant",
    },
    {
      type: "receive",
      date: "2025-08-08T15:44:59+05:00",
      price: "8,000",
      paymentType: "Salary",
    },
    {
      type: "send",
      date: "2025-08-09T17:12:45+05:00",
      price: "2,350",
      paymentType: "Internet Bill",
    },
    {
      type: "receive",
      date: "2025-08-10T21:05:12+05:00",
      price: "1,500",
      paymentType: "Gift",
    },
    {
      type: "send",
      date: "2025-08-11T07:18:26+05:00",
      price: "4,200",
      paymentType: "Utility Bill Payment",
    },
    {
      type: "receive",
      date: "2025-08-12T12:26:33+05:00",
      price: "3,600",
      paymentType: "Cashback",
    },
    {
      type: "send",
      date: "2025-08-13T09:59:44+05:00",
      price: "9,500",
      paymentType: "Electronics Purchase",
    },
    {
      type: "receive",
      date: "2025-08-14T18:40:08+05:00",
      price: "2,800",
      paymentType: "Refund",
    },
    {
      type: "send",
      date: "2025-08-15T11:14:52+05:00",
      price: "1,250",
      paymentType: "Mobile Recharge",
    },
    {
      type: "receive",
      date: "2025-08-16T20:22:37+05:00",
      price: "7,700",
      paymentType: "Project Payment",
    },
    {
      type: "send",
      date: "2025-08-17T13:35:26+05:00",
      price: "5,600",
      paymentType: "Shopping",
    },
    {
      type: "receive",
      date: "2025-08-18T16:48:11+05:00",
      price: "6,900",
      paymentType: "Friend Transfer",
    },
    {
      type: "send",
      date: "2025-08-19T22:12:40+05:00",
      price: "2,100",
      paymentType: "Gas Bill",
    },
    {
      type: "receive",
      date: "2025-08-20T09:58:26+05:00",
      price: "4,300",
      paymentType: "Bank Transfer",
    },
  ];
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const isMenuVisible = visibleMenuIndex === index;
        return (
          <View key={index} style={styles.card}>
            <View style={{ justifyContent: "center" }}>
              <Feather
                name={
                  item.type === "send" ? "arrow-up-right" : "arrow-down-right"
                }
                size={24}
                color={item.type === "send" ? "#D51E1E" : "#4CAF50"}
              />
            </View>

            <View style={styles.data}>
              <Text style={styles.price} numberOfLines={1}>
                {item.paymentType}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <Text style={styles.date} numberOfLines={1}>
                  {moment(item.date).format("DD MMM, YYYY")}
                </Text>
                <Text style={styles.price} numberOfLines={1}>
                  ₦ {item.price}
                </Text>
              </View>
              {/* <Text style={styles.paymentType} numberOfLines={1}></Text> */}
            </View>

            {/* Menu Trigger */}
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ position: "absolute", right: 10, top: 10 }}
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
                  {["View Receipt", "Download"].map((a) => (
                    <TouchableOpacity
                      key={a}
                      onPress={() => {
                        setVisibleMenuIndex(null);
                        if (a === "View Receipt") {
                          setSelectedData(item);
                          setVisible(true);
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

      {/* Modal */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setSelectedData(null);
          setVisible(false);
        }}
      >
        <View style={styles.modalMain}>
          <View style={styles.modalCard}>
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => {
                setSelectedData(null);
                setVisible(false);
              }}
              style={styles.closeBtn}
            >
              <WithLocalSvg
                asset={Images.closeIcon}
                height={adjustSize(30)}
                width={adjustSize(30)}
              />
            </TouchableOpacity>

            <Text style={styles.modalPaymentType}>
              {title === "Transaction Details"
                ? "Transaction Details"
                : "Vending Information"}
            </Text>

            {selectedData && (
              <>
                <Text style={styles.modalDate}>
                  On {moment(selectedData.date).format("MMMM DD, YYYY")} at{" "}
                  {moment(selectedData.date).format("h:mm a")}
                </Text>
                <View style={styles.modalAmountMain}>
                  <Text style={styles.amountTitle}>Amount</Text>
                  <Text style={styles.modalPrice}>${selectedData.price}</Text>
                </View>
              </>
            )}

            {/* Dynamic Details */}
            {title === "Transaction Details" ? (
              <>
                <InfoRow label="ID:" value="T0001" />
                <InfoRow label="Transaction Type:" value="Electric" />
                <InfoRow label="Resident:" value="John Doe" />
                <InfoRow label="Estate:" value="Apartment" />
                <InfoRow label="Property Name:(ID)" value="B1234556" />
                <InfoRow label="Meter Number:" value="MTR34556" />
                <InfoRow label="Token:" value="T0001" />
              </>
            ) : (
              <>
                <InfoRow label="Token:" value="T0001" />
                <InfoRow label="Units:" value="250Kwh" />
                <InfoRow label="Utility Type:" value="Electric" />
                <InfoRow label="Resident:" value="John Doe" />
                <InfoRow label="Estate:" value="Apartment" />
                <InfoRow label="Property Name(ID):" value="B1234556" />
                <InfoRow label="Meter Number:" value="MTR34556" />
              </>
            )}

            {/* Footer Button */}
            <View style={styles.btnMain}>
              <Button
                text={"Share"}
                preset="reversed"
                style={{ flex: 1 }}
                onPress={() => {
                  setSelectedData(null);
                  setVisible(false);
                }}
              />
              <Button
                text={"Download Receipt"}
                preset="reversed"
                style={{ flex: 1 }}
                onPress={() => {
                  setSelectedData(null);
                  setVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    paddingVertical: adjustSize(12),
    paddingHorizontal: adjustSize(10),
    flexDirection: "row",
    position: "relative",
    margin: 10,
    marginTop: 0,
    borderRadius: 10,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  data: {
    flex: 1,
    // marginHorizontal: adjustSize(15),
    marginLeft: adjustSize(20),
  },
  date: {
    color: "#7E7E7E",
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  price: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  paymentType: {
    color: colors.primary,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    zIndex: 5,
  },
  menuBox: {
    position: "absolute",
    right: adjustSize(25),
    top: adjustSize(5),
    width: adjustSize(120),
    paddingVertical: adjustSize(6),
    zIndex: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  menuItem: {
    paddingVertical: adjustSize(3),
    paddingHorizontal: adjustSize(15),
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  modalPaymentType: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    marginHorizontal: adjustSize(15),
  },
  modalMain: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: adjustSize(15),
  },
  modalCard: {
    width: "100%",
    backgroundColor: colors.fill,
    borderRadius: adjustSize(20),
    paddingVertical: adjustSize(20),
  },
  closeBtn: {
    alignSelf: "flex-end",
    marginRight: adjustSize(15),
  },
  modalDate: {
    fontSize: adjustSize(12),
    color: "#4CAF50",
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    marginHorizontal: adjustSize(15),
  },
  modalAmountMain: {
    borderTopWidth: adjustSize(0.5),
    borderBottomWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    marginTop: adjustSize(15),
    marginBottom: adjustSize(15),
    paddingVertical: adjustSize(15),
  },
  amountTitle: {
    fontSize: adjustSize(14),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
  },
  modalPrice: {
    fontSize: adjustSize(24),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    lineHeight: adjustSize(31),
  },
  modalList: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: adjustSize(15),
    marginVertical: adjustSize(3),
  },
  modalListTitle: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  modalListVal: {
    fontSize: adjustSize(12),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
  },
  btnMain: {
    // borderTopWidth: adjustSize(0.5),
    borderTopColor: "#B0B0B0",
    paddingHorizontal: adjustSize(15),
    // marginTop: adjustSize(15),
    paddingTop: adjustSize(30),
    paddingBottom: adjustSize(15),
    flexDirection: "row",
    alignItems: "center",
    gap:10
  },
});
