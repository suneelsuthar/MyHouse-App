import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { adjustSize, colors, typography } from "../../../theme";
import { AdminStackParamList } from "../../../utils/interfaces";
import { Header2, Screen, Text, TextField } from "../../../Components";
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
interface SendMoneyProps extends NativeStackScreenProps<AdminStackParamList, "SendMoney"> {}

export function SendMoney(props: SendMoneyProps) {
  const [showBalance, setShowBalance] = useState(true);

  const benificiaries = [
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
  ];

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
              }}
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

        <View style={{ padding: adjustSize(10) }}>
          {benificiaries.map((val, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.3}
                style={styles.list}
              >
                <Image
                  source={{ uri: val.profileURL }}
                  style={styles.thumbnail}
                />
                <View>
                  <Text style={styles.name}>
                    {val.name}

                    <Text
                      text="   NG"
                      style={{ color: colors.primaryLight, fontSize: 10 }}
                    />
                  </Text>
                  <Text style={styles.bankName}>
                    <Text
                      style={styles._transactionId}
                      text={val.transactionId}
                    />{" "}
                    • {val.bankName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#6369A4",
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
  name: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    lineHeight: adjustSize(20),
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
