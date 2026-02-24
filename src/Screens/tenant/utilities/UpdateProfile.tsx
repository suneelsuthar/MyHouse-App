import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Screen, Header, CustomTabs } from "../../../Components";
import { colors } from "../../../theme";
import { ReservationsIcon } from "../../../assets/svg";
import { UpdateProfileTab } from "./Components/UpdateProfileTab";
import { SettingsTab } from "./Components/SettingsTab";
import { VerifyIdentityTab } from "./Components/VerifyIdentityTab";
import { Images } from "../../../assets/Images";
export const TenantUtilitiesUpdateProfile: React.FC = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState("Update Profile"); // 🔹 string state
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title={"Profile"} />
      <CustomTabs
        tabs={[
          {
            label: "Update Profile",
            activeIcon: <Image style={{height:20,width:20,tintColor:colors.white}} source={Images.updates} tintColor="#fff" />,
            inactiveIcon: <Image style={{height:20,width:20,tintColor:colors.white}} source={Images.updates} />,
          },
          {
            label: "Settings",
            activeIcon: <Image style={{height:20,width:20,tintColor:"#fff"}} source={Images.setting} />,
            inactiveIcon: <Image style={{height:20,width:20,tintColor:colors.white}} source={Images.setting} />,
          },
          // {
          //   label: "Verify Identity",
          //   activeIcon: <ReservationsIcon color="#fff" />,
          //   inactiveIcon: <ReservationsIcon color="#fff" />,
          // },
        ]}
        activeTab={activeTab}
        onTabChange={(label) => setActiveTab(label)}
      >
        {activeTab === "Update Profile" ? (
          <UpdateProfileTab
            handleVerifyIdentity={() => setActiveTab("Verify Identity")}
          />
        ) : activeTab === "Settings" ? (
          <SettingsTab />
        ) : (
          <VerifyIdentityTab />
        )}
      </CustomTabs>
    </Screen>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
});
