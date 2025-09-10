import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "../../../../Components";
import { colors, adjustSize, typography } from "../../../../theme";
import { useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";
export const SubscriptionPlans: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.subPlanHeading}>Subscription Plans</Text>
      <View style={styles.box}>
        <View style={styles.boxHeader}>
          <Text style={styles.boxHeaderTxt}>Basic Plan</Text>
        </View>
        <WithLocalSvg
          asset={Images.userIcon3}
          style={{ alignSelf: "center" }}
        />
        <Text style={styles.levelTitle}>Level</Text>
        <Text style={styles.levelVal}>Enterprise</Text>
        <View style={styles.dataBox}>
          <Text style={styles.dataBoxTitle}>Start Date:</Text>
          <Text style={styles.dataBoxVal}>2024-01-01</Text>
        </View>
        <View style={styles.dataBox}>
          <Text style={styles.dataBoxTitle}>End Date:</Text>
          <Text style={styles.dataBoxVal}>2024-12-31</Text>
        </View>
        <View style={styles.dataBox}>
          <Text style={styles.dataBoxTitle}>Assign Facility Manager:</Text>
          <Text style={styles.dataBoxVal}>0/1</Text>
        </View>
      </View>
      <Button
        preset="reversed"
        text="Change Subscription Plan"
        style={styles.SubscriptionBTn}
        onPress={() => navigation.navigate("SelectSubscriptionplans" as any)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subPlanHeading: {
    fontSize: adjustSize(24),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    textAlign: "center",
    marginTop: adjustSize(25),
    lineHeight: adjustSize(30),
  },
  box: {
    borderWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    borderRadius: adjustSize(12),
    marginTop: adjustSize(25),
  },
  boxHeader: {
    backgroundColor: "#6369A4",
    height: adjustSize(68),
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: adjustSize(12),
    borderTopRightRadius: adjustSize(12),
    marginBottom: adjustSize(15),
  },
  boxHeaderTxt: {
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.white,
  },
  levelTitle: {
    fontSize: adjustSize(14),
    lineHeight: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    color: "#7E7E7E",
    textAlign: "center",
    marginTop: adjustSize(10),
  },
  levelVal: {
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    textAlign: "center",
    marginBottom: adjustSize(20),
  },
  dataBox: {
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: "#F2F3FF",
    marginHorizontal: adjustSize(10),
    borderRadius: adjustSize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: adjustSize(49),
    paddingHorizontal: adjustSize(10),
    marginBottom: adjustSize(15),
  },
  dataBoxTitle: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    color: "#7E7E7E",
  },
  dataBoxVal: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.primary,
  },
  SubscriptionBTn: {
    marginVertical: adjustSize(40),
  },
});
