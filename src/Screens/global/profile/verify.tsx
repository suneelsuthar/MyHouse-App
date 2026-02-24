import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Screen, Text } from "../../../Components";
import { colors, adjustSize } from "../../../theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";

export const Verify: React.FC = () => {
    const { user } = useAppSelector((state: RootState) => state.auth);
  
  const navigation = useNavigation();
    const routeToDrawerMap: Record<string, string> = {
    tenant: "TenantDrawer",
    admin: "AdminDrawer",
    agent: "AgentDrawer",
    landlord: "LandlordDrawer",
    subLandlord: "SubLandlordDrawer",
    security: "SecurityDrawer",
    facilityManager: "FacilityManagerDrawer",
  };

  const getDrawerName = () => {
    // This is a simplified example - you should replace this with your actual role detection logic
    // For example, you might get this from your auth context or global state
    const path = (navigation as any).getState()?.routes?.[0]?.name || "";
    console.log(path);
    // Default to AdminDrawer if no match found
    return routeToDrawerMap[user?.role as string] || "AdminDrawer";
  };
  const handleDrawerOpen = () => {
    const drawerName = getDrawerName();

    (navigation as any)
      .getParent?.(drawerName)
      ?.dispatch(DrawerActions.openDrawer());
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
          onPress={() => handleDrawerOpen()}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: adjustSize(50),
        }}
      >
        <Text
          weight="semiBold"
          text="Know Your Customer (KYC)"
          style={styles.title}
        />
        {/* Tier 1 */}
        <View style={styles.box}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text weight="semiBold" text="Tier 1" style={styles._heading} />
            <View style={styles._row}>
              <Text style={styles.lable}>Email </Text>
              <Text style={styles.lablevalue}>Verified </Text>
            </View>
            <View style={styles._row}>
              <Text style={styles.lable}>Phone Number </Text>
              <Text style={styles.lablevalue}>Verified </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Tier 2 */}
        <View style={styles.box}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text weight="semiBold" text="Tier 2" style={styles._heading} />
            <View style={styles._row}>
              <Text style={styles.lable}>Bank Verification Number </Text>
              <Text style={styles.lablevalue}>Verified </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Tier 3 */}
        <View style={styles.box}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text weight="semiBold" text="Tier 3" style={styles._heading} />
            <View style={styles._row}>
              <Text style={styles.lable}>NIN Verification </Text>
              <Text style={styles.lablevalue}>Verified </Text>
            </View>
            <View style={styles._row}>
              <Text style={styles.lable}>Next of Kin</Text>
              <Text style={styles.lablevalue}>Verified </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Tier 4 */}
        <View style={styles.box}>
          <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
            <Text weight="semiBold" text="Tier 4" style={styles._heading} />
            <View style={styles._row}>
              <Text style={styles.lable}>Indemnity </Text>
              <Text style={styles.lablevalue}>Verified </Text>
            </View>
            <View style={styles._row}>
              <Text style={styles.lable}>Proof of address</Text>
              <Text style={styles.lablevalue}>
                <TouchableOpacity activeOpacity={0.5}>
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </Text>
            </View>
          </TouchableOpacity>
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
  box: {
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(20),
    borderColor: "#B0B0B0",
  },

  btn: {
    padding: adjustSize(20),
    backgroundColor: colors.white,
    borderRadius: adjustSize(20),
  },

  title: {
    fontSize: adjustSize(14),
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(25),
    color: colors.primary,
  },
  _heading: {
    fontSize: adjustSize(15),
    textAlign: "center",
    marginBottom: adjustSize(10),
    color: colors.primary,
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: adjustSize(4),
  },
  lable: {
    fontSize: adjustSize(12),
    color: "#7E7E7E",
  },
  lablevalue: {
    color: "#0AD029",
    fontSize: adjustSize(12),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(15),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    marginBottom: adjustSize(15),
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
    color: "#737373",
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
