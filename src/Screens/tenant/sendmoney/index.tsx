import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { adjustSize, colors, typography } from "../../../theme";
import { AdminStackParamList } from "../../../utils/interfaces";
import { Button, Header2, Screen, Text, TextField } from "../../../Components";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
interface Transaction {
  id: string;
  type: "rent" | "deposit" | "refund" | "fee";
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  description: string;
}
interface SendMoneyProps
  extends NativeStackScreenProps<AdminStackParamList, "SendMoney"> {}

export function SendMoney(props: SendMoneyProps) {
  const [showBalance, setShowBalance] = useState(true);
  const [seleted, setselected] = useState(-1);
  const [step, setsteps] = useState(0);
  const [search, setsearch] = useState("");
  const [amount, setamout] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [benificiaries, setbenificiaries] = useState([
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
      transactionId: "0110706712",
    },
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
      transactionId: "0110706712",
    },
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
      transactionId: "0110706712",
    },
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
      transactionId: "0110706712",
    },
    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
      transactionId: "0110706712",
    },

    {
      profileURL:
        "https://www.allthewallets.com/wp-content/uploads/2020/10/Nodus-Hifold-Wallet.jpg",
      name: "Brume Djbah",
      bankName: "Gt Bank Pic",
      transactionId: "0110706712",
    },
  ]);

  const filterBenificiaries = benificiaries.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Send Money" />

      <ScrollView style={styles.scrollView}>
        {/* Balance Card */}
        <View style={styles.priceBox}>
          <Text style={styles.priceBoxHeading}>
            Your current account balance:
          </Text>
          <Text style={styles.price}>
            {showBalance ? "₦ 15,00,000" : "*********"}
          </Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.showBalanceBTn}
            onPress={() => setShowBalance(!showBalance)}
          >
            <Feather
              name={showBalance ? "eye-off" : "eye"}
              size={adjustSize(26)}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {step <= 0 && (
          <>
            <Text
              text="Select Beneficiaries"
              weight="medium"
              style={styles._label}
            />

            {/* Search and Filters */}
            <Text text="Your Beneficiaries" style={styles.sub_label} />
            <View style={styles.filtersContainer}>
              <View style={styles.searchDropdownContainer}>
                <TextField
                  placeholder="Search for a beneficiary"
                  inputWrapperStyle={{
                    backgroundColor: colors.white,
                    margin: adjustSize(10),
                    alignSelf: "center",
                    height: adjustSize(47),
                  }}
                  value={search}
                  onChangeText={setsearch}
                />
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  props.navigation.navigate("AddBeneficiary");
                }}
              >
                <WithLocalSvg asset={Images.addprop} />
              </TouchableOpacity>
            </View>

            <View>
              {filterBenificiaries.map((val, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setselected(index)}
                    key={index}
                    activeOpacity={0.3}
                    style={[
                      seleted === index ? styles.active_list : styles.list,
                    ]}
                  >
                    <Image
                      source={{ uri: val.profileURL }}
                      style={styles.thumbnail}
                    />
                    <View>
                      <Text
                        style={
                          seleted === index ? styles.active_name : styles.name
                        }
                      >
                        {val.name}

                        <Text
                          text="   NG"
                          style={{
                            color:
                              seleted === index
                                ? colors.white
                                : colors.primary,
                            fontSize: 10,
                          }}
                        />
                      </Text>
                      <Text
                        style={[
                          styles.bankName,
                          {
                            color:
                              seleted === index
                                ? colors.white
                                : colors.primary,
                          },
                        ]}
                      >
                        <Text
                          style={
                            seleted === index
                              ? styles.active_transactionId
                              : styles._transactionId
                          }
                          text={val.transactionId}
                        />{" "}
                        • {val.bankName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}
        {step === 1 && (
          <View style={{ paddingVertical: adjustSize(10) }}>
            <Text
              text="Enter Amount"
              weight="semiBold"
              style={[styles._label, { color: colors.primary }]}
            />
            <TouchableOpacity
              activeOpacity={0.3}
              style={[
                {
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  padding: 20,
                },
              ]}
            >
              <Text weight="semiBold" text="Sending to:" />
              <View style={[styles.list]}>
                <View
                  style={{
                    backgroundColor: "#fdba74",
                    height: adjustSize(40),
                    width: adjustSize(40),
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Text
                    text="DO"
                    weight="semiBold"
                    style={{ color: colors.white }}
                  />
                </View>
                <View>
                  <Text style={styles.name}>Djebah Bryan 🇳🇬</Text>
                  <Text
                    style={[
                      styles.bankName,
                      {
                        color: colors.primary,
                      },
                    ]}
                  >
                    <Text style={styles._transactionId} text={"0110706712"} /> •
                    Gtbank Plc
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <Text
              weight="normal"
              text="Amount to Send"
              style={{ marginVertical: 10 }}
            />
            <TextField
              keyboardType="number-pad"
              placeholder="Enter amount"
              value={amount.toString()}
              onChangeText={(e: any) => setamout(e)}
              style={{
                fontFamily: typography.fonts.poppins.semiBold,
              }}
              inputWrapperStyle={{ borderWidth: 0.3, borderColor: colors.grey }}
            />
          </View>
        )}

        {step === 2 && (
          <View style={{ paddingVertical: adjustSize(10) }}>
            <Text
              text="Confirm Transaction"
              weight="semiBold"
              style={[styles._label, { color: colors.primary }]}
            />
            <TouchableOpacity
              activeOpacity={0.3}
              style={[
                {
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  padding: 20,
                },
              ]}
            >
              <Text weight="semiBold" text="Transaction Details" />
              <View style={[styles.list]}>
                <View
                  style={{
                    backgroundColor: "#fdba74",
                    height: adjustSize(40),
                    width: adjustSize(40),
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                  }}
                >
                  <Text
                    text="DO"
                    weight="semiBold"
                    style={{ color: colors.white }}
                  />
                </View>
                <View>
                  <Text style={styles.name}>Djebah Bryan 🇳🇬</Text>
                  <Text
                    style={[
                      styles.bankName,
                      {
                        color: colors.primary,
                      },
                    ]}
                  >
                    <Text style={styles._transactionId} text={"0110706712"} /> •
                    Gtbank Plc
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text weight="medium" text="Amount:" />
                <Text weight="semiBold" text={"₦" + amount} />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text weight="medium" text="Remaining Balance:" />
                <Text weight="semiBold" text={"₦149,999,500"} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {seleted !== -1 && (
        <View
          style={{
            padding: adjustSize(10),
            flexDirection: "row",
            justifyContent: step < 1 ? "flex-end" : "space-between",
            alignItems: "center",
            paddingHorizontal: adjustSize(20),
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {step > 0 && (
            <Button
              text="Back"
              preset="reversed"
              style={{
                width: adjustSize(80),
                minHeight: adjustSize(36),
                backgroundColor: "#6b7280",
              }}
              onPress={() => setsteps(step - 1)}
            />
          )}

          {step === 2 ? (
            <Button
              text="Send Money"
              preset="reversed"
              style={{
                width: adjustSize(120),
                minHeight: adjustSize(36),
                backgroundColor: colors.primary,
              }}
              onPress={() => setModalVisible(true)}
            />
          ) : (
            <Button
              text="Next"
              preset="reversed"
              style={{
                width: adjustSize(80),
                minHeight: adjustSize(36),
              }}
              onPress={() => setsteps(step + 1)}
            />
          )}
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={adjustSize(60)} color={colors.primary} />
            <Text style={styles.modalText}>Processing Transaction</Text>
            <Text style={styles.modalSubText}>
              Please wait while we process your transaction...
            </Text>
            <Button
              text="Transaction Completed"
              preset="reversed"
              style={{
                backgroundColor: colors.primary,
                width: adjustSize(200),
              }}
              onPress={() => {
                setselected(-1);
                setsteps(0);
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalText: {
    marginVertical: 15,
    textAlign: "center",
    fontFamily: typography.fonts.poppins.bold,
    fontSize: adjustSize(20),
    color: colors.primary,
  },
  modalSubText: {
    marginBottom: 25,
    textAlign: "center",
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
    padding: adjustSize(15),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },

  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },

  priceBox: {
    backgroundColor: colors.primary,
    marginTop: adjustSize(15),
    borderRadius: adjustSize(10),
    padding: adjustSize(15),
  },
  priceBoxHeading: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
  },
  price: {
    textAlign: "center",
    color: colors.white,
    fontSize: adjustSize(24),
    fontFamily: typography.fonts.poppins.semiBold,
    marginVertical: adjustSize(10),
    lineHeight: adjustSize(38),
  },
  showBalanceBTn: {
    alignSelf: "center",
  },

  thumbnail: {
    backgroundColor: "#D9D9D9",
    height: adjustSize(58),
    width: adjustSize(58),
    borderRadius: 100,
    marginRight: adjustSize(15),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: adjustSize(7),
    marginBottom: adjustSize(10),
  },
  active_list: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: adjustSize(7),
    marginBottom: adjustSize(10),
    backgroundColor: colors.primary,
    padding: adjustSize(10),
    borderRadius: adjustSize(10),
  },
  name: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    lineHeight: adjustSize(20),
  },
  active_name: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    lineHeight: adjustSize(20),
  },
  active_transactionId: {
    color: colors.white,
    fontSize: adjustSize(12),
  },
  bankName: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  _label: {
    paddingVertical: adjustSize(10),
    fontSize: adjustSize(15),
    color: colors.primary,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
  },
  addButton: {
    width: adjustSize(48),
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: adjustSize(5),
  },
  searchDropdownContainer: {
    flex: 1,
  },
  sub_label: {
    marginTop: adjustSize(10),
  },
  _transactionId: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
});
