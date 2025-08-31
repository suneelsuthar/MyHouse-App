import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Screen, Header, CustomTabs } from "../../../Components";
import { colors } from "../../../theme";
import { ReservationsIcon } from "../../../assets/svg";
import { UpdateProfileTab } from "./Components/UpdateProfileTab";
import { SettingsTab } from "./Components/SettingsTab";
import { VerifyIdentityTab } from "./Components/VerifyIdentityTab";
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
            activeIcon: <ReservationsIcon color="transparent" />,
            inactiveIcon: <ReservationsIcon color="transparent" />,
          },
          {
            label: "Settings",
            activeIcon: <ReservationsIcon color="transparent" />,
            inactiveIcon: <ReservationsIcon color="transparent" />,
          },
          {
            label: "Verify Identity",
            activeIcon: <ReservationsIcon color="transparent" />,
            inactiveIcon: <ReservationsIcon color="transparent" />,
          },
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
