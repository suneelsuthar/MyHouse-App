import React from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Screen, Text, Header2, Button } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import { useAppSelector } from "../../../store/hooks";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
const profileData = {
  name: "Brume Djbah",
  email: "brume.djbah@example.com",
  phone: "+1 (555) 123-4567",
  role: "Admin",
  department: "Property Management",
  joinDate: "January 15, 2023",
  employeeId: "EMP001",
  address: "123 Main Street, City, State 12345",
};

// Verify
export const Profile: React.FC = () => {
  const userRole = useAppSelector((state) => state?.auth?.user?.role);
  const navigation = useNavigation();
  console.log("=====>", userRole);
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      {userRole === "facility_manager" ? (
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
          <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
            <Text style={styles.basic}>Basic</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Header2 title="Profile" onNotificationPress={() => {}} />
      )}

      <View style={styles.box}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() =>
            (navigation as any).navigate("EditProfile", {
              data: profileData,
            })
          }
        >
          <Text style={styles.btnTxt}>Profile </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() =>
            (navigation as any).navigate("ProfileSettings", {
              data: profileData,
            })
          }
        >
          <Text style={styles.btnTxt}>Settings </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        {userRole === "facility_manager" && (
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => (navigation as any).navigate("Subscription")}
          >
            <Text style={styles.btnTxt}>Subscription </Text>
          </TouchableOpacity>
        )}
        <View style={styles.line} />
        {userRole === "tenant" ||
          (userRole === "facility_manager" && (
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.8}
              onPress={() => (navigation as any).navigate("Verify")}
            >
              <Text style={styles.btnTxt}>Verify </Text>
            </TouchableOpacity>
          ))}
        <View style={styles.line} />
        {userRole === "facility_manager" && (
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => (navigation as any).navigate("Reviews")}
          >
            <Text style={styles.btnTxt}>Reviews </Text>
          </TouchableOpacity>
        )}
    
      </View>
      <Button
        preset="reversed"
        text="Upgrade Subscription Plan"
        style={styles._upgradebtn}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  _upgradebtn: {
    position: "absolute",
    bottom: 10,
    width: "95%",
    alignSelf: "center",
  },
  box: {
    backgroundColor: colors.white,
    marginHorizontal: adjustSize(10),
    borderRadius: adjustSize(10),
    marginTop: adjustSize(20),
    // flex: 1,
  },
  line: {
    height: adjustSize(0.5),
    backgroundColor: colors.fill,
  },
  btn: {
    padding: adjustSize(20),
  },
  btnTxt: {
    color: "#7E7E7E",
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.light,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(7),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    marginBottom: adjustSize(15),
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(5),
  },
  headerIcons: {
    height: "100%",
    alignItems: "flex-end",
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
    fontFamily: typography.fonts.poppins.normal,
    color: "#6369A4",
  },
  basic: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    marginTop: adjustSize(30),
  },
});
