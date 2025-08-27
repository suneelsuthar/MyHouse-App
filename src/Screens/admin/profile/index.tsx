import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Screen, Text, Header2 } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
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
export const AdminProfile: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Profile" onNotificationPress={() => {}} />
      <View style={styles.box}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() =>
            (navigation as any).navigate("AdminEditProfile", {
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
            (navigation as any).navigate("AdminProfileSettings", {
              data: profileData,
            })
          }
        >
          <Text style={styles.btnTxt}>Settings </Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  box: {
    backgroundColor: colors.white,
    marginHorizontal: adjustSize(10),
    borderRadius: adjustSize(10),
    marginTop: adjustSize(20),
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
});
