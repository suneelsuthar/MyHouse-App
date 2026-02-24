import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Screen, Text, CustomTabs } from "../../../Components";
import { colors, adjustSize, typography } from "../../../theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { MembershipPlans } from "./components/MembershipPlans";
import { SubscriptionPlans } from "./components/SubscriptionPlans";
import {
  MembershipPlansIcon,
  SubscriptionPlansIcon,
} from "../../../assets/svg";
export const Subscription: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Subscription Plans"); // 🔹 string state
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
      <CustomTabs
        tabs={[
          {
            label: "Subscription Plans",
            activeIcon: <SubscriptionPlansIcon color={colors.primary} />,
            inactiveIcon: <SubscriptionPlansIcon color={colors.white} />,
          },
          {
            label: "Membership Plans",
            activeIcon: <MembershipPlansIcon color={colors.primary} />,
            inactiveIcon: <MembershipPlansIcon color={colors.white} />,
          },
        ]}
        activeTab={activeTab}
        onTabChange={(label) => setActiveTab(label)}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: adjustSize(10),
            paddingBottom: 25,
          }}
        >
          {activeTab === "Subscription Plans" ? (
            <SubscriptionPlans />
          ) : (
            <MembershipPlans />
          )}
        </ScrollView>
      </CustomTabs>
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
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
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
});
