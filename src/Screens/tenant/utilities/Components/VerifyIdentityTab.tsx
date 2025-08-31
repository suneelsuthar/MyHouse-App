import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Text } from "../../../../Components";
import { colors, typography, adjustSize, spacing } from "../../../../theme";
import Octicons from "@expo/vector-icons/Octicons";

export const VerifyIdentityTab: React.FC = () => {
  // ✅ KYC Data
  const data = [
    {
      heading: "Tier 1",
      data: [
        { title: "Email", verified: true },
        { title: "Phone Number", verified: true },
      ],
    },
    {
      heading: "Tier 2",
      data: [{ title: "Bank Verification Number (BVN)", verified: true }],
    },
    {
      heading: "Tier 3",
      data: [{ title: "NIN Verification", verified: true }],
    },
    {
      heading: "Tier 3",
      data: [
        { title: "NIN Verification", verified: true },
        { title: "Next of Kin", verified: false },
      ],
    },
    {
      heading: "Tier 4",
      data: [{ title: "Indemnity", verified: false }],
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: adjustSize(20),
        }}
      >
        <Text style={styles.heading}>Know Your Customer (KYC)</Text>

        {data.map((tier, index) => (
          <View key={index} style={{ marginTop: adjustSize(15) }}>
            {/* Tier Heading */}
            <Text style={styles.inputTitle}>{tier.heading}</Text>

            {/* Tier Items */}
            {tier.data.map((item, idx) => (
              <View key={idx} style={styles.row}>
                <Text style={styles.itemText}>{item.title}</Text>
                {item.verified ? (
                  <Octicons name="verified" size={22} color="#4CAF50" />
                ) : (
                  <Octicons name="unverified" size={22} color="#D51E1E" />
                )}
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  heading: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(20),
  },
  inputTitle: {
    fontSize: adjustSize(13),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    paddingHorizontal: adjustSize(10),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: adjustSize(12),
    backgroundColor: "#dedff0",
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(10),
  },
  itemText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
  },
});
