import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { adjustSize, colors, typography } from "../../../../theme";
import { Text, Button } from "../../../../Components";
import moment from "moment";
import Entypo from "@expo/vector-icons/Entypo";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store";
export const TransactionHistory = () => {
  const navigation = useNavigation();
  const [visibleMenuIndex, setVisibleMenuIndex] = useState<number | null>(null);
  const [visible, setVisiable] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const data = [
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
      <Text style={styles.heading}>Transaction History</Text>
      {data.map((item, index) => {
        const isMenuVisible = visibleMenuIndex === index;
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectedData(item);
              setVisiable(true);
            }}
            key={index}
            style={[
              styles.card,
              {
                borderBottomWidth:
                  index === data.length - 1 ? adjustSize(0.5) : 0,
                marginBottom: index === data.length - 1 ? adjustSize(10) : 0,
              },
            ]}
          >
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
              <Text style={styles.date} numberOfLines={1}>
                {moment(item.date).format("DD MMM, YYYY")}
              </Text>
              <Text style={styles.price} numberOfLines={1}>
                ${item.price}
              </Text>
              <Text style={styles.paymentType} numberOfLines={1}>
                {item.paymentType}
              </Text>
            </View>

            <View>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() =>
                  setVisibleMenuIndex(
                    isMenuVisible ? null : index // toggle
                  )
                }
              >
                <Entypo
                  name="dots-three-vertical"
                  size={16}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>

            {isMenuVisible && (
              <>
                {/* Transparent overlay */}
                <TouchableOpacity
                  style={styles.overlay}
                  activeOpacity={1}
                  onPress={() => setVisibleMenuIndex(null)}
                />

                {/* Menu box */}
                <View style={styles.menuBox}>
                  {["View  Receipt"].map((a) => (
                    <TouchableOpacity
                      key={a}
                      onPress={() => {
                        setVisibleMenuIndex(null);
                        setSelectedData(item);
                        setVisiable(true);
                        // (navigation as any).navigate("AdminTenantDetails");
                        // onAction?.(a, item);
                      }}
                      // AdminTenantDetails
                      style={styles.menuItem}
                      activeOpacity={0.6}
                    >
                      <Text style={styles.menuText}>{a}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </TouchableOpacity>
        );
      })}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setSelectedData(null);
          setVisiable(false);
        }}
      >
        <View style={styles.modalMain}>
          <View style={styles.modalCard}>
            <TouchableOpacity
              onPress={() => {
                setSelectedData(null);
                setVisiable(false);
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
              {selectedData?.paymentType}
            </Text>
            <Text style={styles.modalTransactionID}>
              Transaction ID: T12345
            </Text>
            <Text style={styles.modalDate}>
              On {moment(selectedData?.date).format("MMMM DD, YYYY")} at{" "}
              {moment(selectedData?.date).format("h:mm a")}
            </Text>
            <Text style={styles.modalPrice}>${selectedData?.price}</Text>

            {user?.role === "admin" && (
              <>
                <View style={styles.modalList}>
                  <Text style={styles.modalListTitle}>User ID:</Text>
                  <Text style={styles.modalListVal}>B1234557</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.modalListTitle}>Booking ID: </Text>
                  <Text style={styles.modalListVal}>B1234556</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.modalListTitle}>Activity:</Text>
                  <Text style={styles.modalListVal}>Booking</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.modalListTitle}>Status:</Text>
                  <Text style={[styles.modalListVal, { color: "#4CAF50" }]}>
                    Successful
                  </Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.modalListTitle}>Booking ID:</Text>
                  <Text style={styles.modalListVal}>B1234556</Text>
                </View>
              </>
            )}

            {user?.role !== "admin" && (
              <>
                <View style={styles.modalList}>
                  <Text style={styles.modalListTitle}>Activity:</Text>
                  <Text style={styles.modalListVal}>Booking</Text>
                </View>
                <View style={styles.modalList}>
                  <Text style={styles.modalListTitle}>Status:</Text>
                  <Text style={[styles.modalListVal, { color: "#4CAF50" }]}>
                    Successful
                  </Text>
                </View>
              </>
            )}
            <View style={styles.btnMain}>
              <Button
                text={"Download Receipt"}
                preset="reversed"
                onPress={() => {
                  setSelectedData(null);
                  setVisiable(false);
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
  container: {
    //
  },
  heading: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(15),
    marginBottom: adjustSize(15),
    marginHorizontal: adjustSize(10),
  },
  card: {
    paddingVertical: adjustSize(15),
    paddingHorizontal: adjustSize(10),
    flexDirection: "row",
    position: "relative",
    borderTopWidth: adjustSize(0.5),
    borderTopColor: "#B0B0B0",
  },

  data: {
    flex: 1,
    marginHorizontal: adjustSize(15),
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
    backgroundColor: "transparent", // invisible but catch taps
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
    textAlign: "center",
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
    paddingHorizontal: adjustSize(10),
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
  modalTransactionID: {
    fontSize: adjustSize(12),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    marginHorizontal: adjustSize(15),
    marginTop: adjustSize(5),
  },
  modalDate: {
    fontSize: adjustSize(12),
    color: "#4CAF50",
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    marginHorizontal: adjustSize(15),
  },
  modalPrice: {
    borderTopWidth: adjustSize(0.5),
    borderBottomWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    fontSize: adjustSize(24),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    lineHeight: adjustSize(60),
    marginTop: adjustSize(15),
    marginBottom: adjustSize(15),
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
    borderTopWidth: adjustSize(0.5),
    borderTopColor: "#B0B0B0",
    paddingHorizontal: adjustSize(15),
    marginTop: adjustSize(15),
    paddingTop: adjustSize(30),
    paddingBottom: adjustSize(15),
  },
});
