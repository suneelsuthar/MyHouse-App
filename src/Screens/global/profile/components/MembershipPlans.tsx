import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Button } from "../../../../Components";
import { colors, adjustSize, typography } from "../../../../theme";
import { useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";

export const MembershipPlans: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Facility Manager");
  const [professionalPlanSelectedTab, setProfessionalPlanSelectedTab] =
    useState<"Monthly" | "Yearly">("Monthly");
  const [enterpriseplanSelectedTab, setEnterpriseplanSelectedTab] = useState<
    "Monthly" | "Yearly"
  >("Monthly");

  const formatAmount = (num: number) =>
    new Intl.NumberFormat("en-IN").format(num);

  // 🔹 Local PlanBox
  const PlanBox = ({
    title,
    price,
    billingType,
    onBillingChange,
    discount = 0,
    features,
    showTabs = false,
    free = false,
  }: {
    title: string;
    price: number;
    billingType: "Monthly" | "Yearly";
    onBillingChange?: (type: "Monthly" | "Yearly") => void;
    discount?: number;
    features: string[];
    showTabs?: boolean;
    free?: boolean;
  }) => {
    const yearlyPrice = price * 12;

    // 🔹 Apply discount only on Yearly
    const selectedPrice = billingType === "Monthly" ? price : yearlyPrice;

    const discountedPrice =
      billingType === "Yearly" && discount > 0
        ? selectedPrice - (selectedPrice * discount) / 100
        : selectedPrice;

    return (
      <View style={styles.box}>
        <View
          style={[
            styles.boxHeader,
            { height: adjustSize(free ? 91 :110), marginBottom: adjustSize(40) },
          ]}
        >
          <Text style={styles.boxTitle}>{title}</Text>
          <View style={styles.lineMain}>
            <View style={styles.cicle} />
            <View style={styles.line} />
          </View>

          {/* 🔹 FREE Plan */}
          {free ? (
            <Text style={styles.boxPrice}>Free</Text>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {billingType === "Yearly" && discount > 0 && (
                <Text style={styles.discountPrice}>
                  ₦{formatAmount(selectedPrice)}
                </Text>
              )}
              <Text style={styles.boxPrice} numberOfLines={1}>
                ₦{formatAmount(discountedPrice)}
              </Text>
            </View>
          )}

          {/* Monthly / Yearly tabs */}
          {showTabs && (
            <View style={styles.planTabs}>
              {["Monthly", "Yearly"].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.5}
                  style={[styles.tab, item === billingType && styles.activeTab]}
                  onPress={() =>
                    onBillingChange &&
                    onBillingChange(item as "Monthly" | "Yearly")
                  }
                >
                  <Text
                    style={[
                      styles.tabTxt,
                      item === billingType && styles.activeTabTxt,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Show discount badge only on Yearly */}
          {discount > 0 && billingType === "Yearly" && (
            <View style={styles.discountBox}>
              <Text style={styles.discountBoxTxt}>{discount}% Off</Text>
            </View>
          )}
        </View>

        {/* Features */}
        {features.map((item, i) => (
          <View style={styles.list} key={i}>
            <WithLocalSvg asset={Images.check2} style={styles.listIcon} />
            <Text style={styles.listTxt}>{item}</Text>
          </View>
        ))}

        <View style={styles.btn}>
          <Button
            preset="reversed"
            text="Subscribe"
            textStyle={styles.btnTxt}
            style={{ height: adjustSize(49) }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {["Landlord", "Agent", "Facility Manager"].map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.5}
            style={[styles.tab, item === activeTab && styles.activeTab]}
            onPress={() => setActiveTab(item)}
          >
            <Text
              style={[styles.tabTxt, item === activeTab && styles.activeTabTxt]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🔹 Basic Plan → FREE */}
      <PlanBox
        title="Basic Plan"
        price={0}
        billingType="Monthly"
        features={
          activeTab === "Facility Manager"
            ? [
                "Add/Create property group",
                "Create work request",
                "Create work order",
                "Send Bulk email",
                "Register/Invite Tenant",
                "Generate visitor request",
                "Revoke request",
                "Emergency alarm (alert security)",
                "Security app",
                "Weekly Analytics",
              ]
            : activeTab === "Agent"
            ? [
                "Boost property",
                "Landlord can add registered agents to property",
                "Add 2 secondary agent to Property Portfolio",
                "Weekly Analytics",
              ]
            : [
                "Listing",
                "Assign Primary Agents to Properties",
                "Onboard 1 FACILITY MANAGER for entire portfolio",
                "Weekly Analytics",
              ]
        }
        free
      />

      {/* 🔹 Professional Plan */}
      <PlanBox
        title="Professional Plan"
        price={16670}
        billingType={professionalPlanSelectedTab}
        onBillingChange={setProfessionalPlanSelectedTab}
        discount={40}
        features={
          activeTab === "Facility Manager"
            ? [
                "FREE +",
                "Add FM administrator (FM team)",
                "Stores Check-in & Check-out data of Visitors",
                "Monthly and Annually Analytics",
                "14-Days Free with First Subscription",
              ]
            : activeTab === "Agent"
            ? [
                "FREE +",
                "Add a maximum of 5 secondary agent on platform",
                "Monthly and Annually Analytics",
                "14-Days Free with First Subscription",
              ]
            : [
                "FREE +",
                "RENT REMINDERS (Long Lease)",
                "Add ADDITIONAL 2 FACILITY MANAGER",
                "ONBOARD 2 sub landlord max",
                "Store CHECK-IN CHECK-OUT Data",
                "Monthly and Annually Analytics",
                "14-Days Free with First Subscription",
              ]
        }
        showTabs
      />

      {/* 🔹 Enterprise Plan */}
      <PlanBox
        title="Enterprise Plan"
        price={30000}
        billingType={enterpriseplanSelectedTab}
        onBillingChange={setEnterpriseplanSelectedTab}
        discount={40}
        features={
          activeTab === "Facility Manager"
            ? [
                "PROFESSIONAL +",
                "Common Area Request",
                "Send bulk SMS",
                "Utilities",
              ]
            : activeTab === "Agent"
            ? ["PROFESSIONAL +", "Add unlimited secondary agents"]
            : [
                "PLUS +",
                "RENT REMINDERS (Long Lease)",
                "ONBOARD UNLIMITED FACILITY MANAGER",
                "ONBOARD 5 sublandlord max",
              ]
        }
        showTabs
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#F2F3FF",
    borderWidth: adjustSize(0.5),
    borderColor: "#6369A4",
    height: adjustSize(41),
    borderRadius: adjustSize(10),
    marginTop: adjustSize(35),
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
    marginTop: adjustSize(35),
  },
  boxHeader: {
    backgroundColor: colors.primary,
    borderTopRightRadius: adjustSize(12),
    borderTopLeftRadius: adjustSize(12),
    height: adjustSize(91),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: adjustSize(15),
    position: "relative",
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
    width: adjustSize(90),
    borderRadius: 100,
    marginLeft: 3,
  },
  lineMain: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: adjustSize(3),
  },
  boxTitle: {
    fontSize: adjustSize(12),
    color: "#F2F3FF",
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

  btnTxt: {
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(15),
  },
  btn: {
    margin: adjustSize(10),
    marginTop: adjustSize(25),
    marginBottom: adjustSize(15),
  },
  list: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: adjustSize(10),
    marginVertical: adjustSize(6),
  },
  listTxt: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    lineHeight: adjustSize(20),
    marginLeft: adjustSize(5),
  },
  listIcon: {
    marginTop: adjustSize(3),
  },
  planTabs: {
    flexDirection: "row",
    backgroundColor: "#F2F3FF",
    borderWidth: adjustSize(0.5),
    borderColor: "#6369A4",
    height: adjustSize(41),
    borderRadius: adjustSize(10),
    marginTop: adjustSize(35),
    position: "absolute",
    bottom: adjustSize(-20.5),
    borderStartColor: "red",
    width: "90%",
  },
  discountBox: {
    backgroundColor: colors.white,
    position: "absolute",
    top: 0,
    right: 0,
    borderRadius: adjustSize(12),
    paddingHorizontal: adjustSize(15),
    paddingVertical: adjustSize(2),
  },
  discountBoxTxt: {
    fontSize: adjustSize(12),
    color: "green",
    fontFamily: typography.fonts.poppins.semiBold,
  },
  discountPrice: {
    fontSize: adjustSize(16),
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
    marginRight: adjustSize(5),
    textDecorationLine: "line-through",
  },
});
