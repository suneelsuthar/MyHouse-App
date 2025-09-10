import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Screen, Text, TextField, Button } from "../../../../Components";
import { colors, adjustSize, typography } from "../../../../theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";

export const SelectSubscriptionplans: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Professional Plan"); // 🔹 string state
  const [months, setMonths] = useState<string>("1"); // 🔹 default = 1

  const formatAmount = (num: number) =>
    new Intl.NumberFormat("en-IN").format(num);
  const monthlyPrice = activeTab === "Professional Plan" ? 3000 : 500000;
  const monthsNum = Math.min(Math.max(Number(months) || 1, 1), 100);
  const totalPrice = monthlyPrice * monthsNum;
  const handleMonthsChange = (val: string) => {
    const num = Number(val);
    if (!val) {
      setMonths("1"); // fallback if cleared
    } else if (num < 1) {
      setMonths("1");
    } else if (num > 100) {
      setMonths("100");
    } else {
      setMonths(val);
    }
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            (navigation as any)
              .getParent?.("FacilityManagerDrawer")
              ?.dispatch(DrawerActions.openDrawer())
          }
        >
          <WithLocalSvg asset={Images.user} />
        </TouchableOpacity>
        <View style={styles.headerinfo}>
          <Text style={styles._welcomtext}>Welcome!</Text>
          <Text weight="semiBold" style={styles.username}>
            Brume Djbah
          </Text>
          <Text style={styles.role}>KYC Level: Tier 3</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: adjustSize(10) }}>
        <Text style={styles.subPlanHeading}>Subscription Details</Text>

        {/* Tabs */}
        <View style={styles.tabs}>
          {["Professional Plan", "Enterprise Plan"].map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              style={[styles.tab, item === activeTab && styles.activeTab]}
              onPress={() => setActiveTab(item)}
            >
              <Text
                style={[
                  styles.tabTxt,
                  item === activeTab && styles.activeTabTxt,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscription Box */}
        <View style={styles.box}>
          <View style={styles.boxHeader}>
            <Text style={styles.boxTitle}>{activeTab}</Text>
            <View style={styles.lineMain}>
              <View style={styles.cicle} />
              <View style={styles.line} />
            </View>
            <Text style={styles.boxPrice} numberOfLines={1}>
              {`₦${formatAmount(totalPrice)}/${monthsNum} ${
                monthsNum > 1 ? "Months" : "Month"
              }`}
            </Text>
          </View>

          {activeTab === "Professional Plan" ? (
            <Text style={styles.txt}>
              Ideal for small teams. Includes advanced features such as
              reporting and collaboration tools.
            </Text>
          ) : (
            <Text style={styles.txt}>
              Perfect for large teams. Includes premium features like SLA,
              dedicated support, and enterprise integrations.
            </Text>
          )}

          <Text style={styles.inputTitle}>Number of Months</Text>
          <View style={styles.input}>
            <TextField
              value={months}
              onChangeText={handleMonthsChange}
              placeholder="Enter number of months"
              placeholderTextColor={colors.primaryLight}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.btn}>
            <Button
              preset="reversed"
              text="Select Plan"
              textStyle={styles.btnTxt}
              style={{ height: adjustSize(49) }}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(7),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    paddingHorizontal: adjustSize(10),
  },
  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
  },
  username: {
    fontSize: adjustSize(15),
    color: colors.primary,
    lineHeight: adjustSize(20),
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
  },
  subPlanHeading: {
    fontSize: adjustSize(24),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    textAlign: "center",
    marginTop: adjustSize(25),
    lineHeight: adjustSize(30),
  },
  tabs: {
    flexDirection: "row",
    backgroundColor: "#F2F3FF",
    borderWidth: adjustSize(0.5),
    borderColor: "#6369A4",
    height: adjustSize(41),
    borderRadius: adjustSize(10),
    marginTop: adjustSize(15),
  },
  tab: {
    flex: 1,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: "#6369A4",
  },
  tabTxt: {
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.primary,
  },
  activeTabTxt: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  box: {
    backgroundColor: "#F2F3FF",
    borderWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    borderRadius: adjustSize(12),
    marginTop: adjustSize(25),
  },
  boxHeader: {
    backgroundColor: colors.primary,
    borderTopRightRadius: adjustSize(12),
    borderTopLeftRadius: adjustSize(12),
    height: adjustSize(109),
    alignItems: "center",
    justifyContent: "center",
  },
  cicle: {
    width: adjustSize(3),
    height: adjustSize(3),
    backgroundColor: "#B0B0B0",
    borderRadius: 100,
  },
  line: {
    backgroundColor: colors.white,
    height: adjustSize(2),
    width: adjustSize(166),
    borderRadius: 100,
    marginLeft: 3,
  },
  lineMain: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: adjustSize(11),
  },
  boxTitle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
  },
  boxPrice: {
    fontSize: adjustSize(24),
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    lineHeight: adjustSize(30),
  },
  txt: {
    fontSize: adjustSize(14),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(20),
  },
  inputTitle: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(10),
  },
  input: {
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(5),
  },
  btnTxt: {
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(15),
  },
  btn: {
    margin: adjustSize(10),
    marginTop: adjustSize(25),
    marginBottom: adjustSize(15),
  },
});
