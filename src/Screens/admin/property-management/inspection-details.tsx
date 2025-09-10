import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Screen, Text, Header, Button } from "../../../Components";
import { colors, spacing, adjustSize, typography } from "../../../theme";
// Mock inspection details (replace with API data later)
const inspectionDetails = {
  id: "P001",
  propertyName: "Greenwood Villa",
  status: "Pending",
  city: "Abia",
  state: "Aba",
  country: "Nigeria",
  address: "lorem ipsum is a dummy text",
  days: "Monday, Thursday, Sunday",
  dateTime: [
    "Mon (2:00 PM – 6:00 PM)",
    "Thu (2:00 AM – 5:00 PM)",
    "Sun (2:00 PM – 6:00 PM)",
    "Sun (2:00 PM – 6:00 PM)",
    "Sun (2:00 PM – 6:00 PM)",
    "Sun (2:00 PM – 6:00 PM)",
  ],
};
export default function InspectionDetails(props: any) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      {/* Header */}
      <Header title="Inspection Property Details" />

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      >
        {/* Property ID */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            Property ID:
          </Text>
          <Text style={styles.value}>{inspectionDetails.id}</Text>
        </View>

        {/* Property Name */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            Property Name:
          </Text>
          <Text style={styles.value}>{inspectionDetails.propertyName}</Text>
        </View>

        {/* Status */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            Status:
          </Text>
          <Text style={[styles.value, styles.pending]}>
            {inspectionDetails.status}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* City */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            City:
          </Text>
          <Text style={styles.value}>{inspectionDetails.city}</Text>
        </View>

        {/* State */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            State:
          </Text>
          <Text style={styles.value}>{inspectionDetails.state}</Text>
        </View>

        {/* Country */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            Country:
          </Text>
          <Text style={styles.value}>{inspectionDetails.country}</Text>
        </View>

        {/* Address */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            Address:
          </Text>
          <Text style={styles.value}>{inspectionDetails.address}</Text>
        </View>

        <View style={styles.divider} />

        {/* Days */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            Days:
          </Text>
          <Text style={styles.value}>{inspectionDetails.days}</Text>
        </View>

        {/* Date & Time (multiple lines) */}
        <View style={styles.row}>
          <Text weight="medium" style={styles.label}>
            Date & Time:
          </Text>
          <View style={{ flex: 1 }}>
            {inspectionDetails.dateTime.map((item, index) => (
              <Text key={index} style={styles.value}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        {props.route.params.type === "Download" && (
          <View style={styles._footerrow}>
            <Button text="Share" style={styles._btn} />
            <Button preset="reversed" text="Download" style={styles._btn} />
          </View>
        )}

        {props.route.params.type === "Details" && (
          <>
        <View style={styles.divider} />


          <View style={styles._footerrow}>

            <Button preset="reversed" text="Mark As Approved" style={styles._btn} />
            <Button preset="default" text="Reject"
            textStyle={{
              color:"#fd0d0d"
            }}
            style={[styles._btn,{
              // backgroundColor:colors.error,
              borderColor:"#fd0d0d",
              marginRight:8

            }]} />
          </View>
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: spacing.lg,
    paddingHorizontal: adjustSize(10),
  },

  row: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  label: {
    width: 120,
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  value: {
    flex: 1,
    fontSize: adjustSize(12),
    color: colors.primary,
  },
  pending: {
    color: colors.error, // red color for "Pending"
  },
  divider: {
    borderColor: colors.grey,
    marginVertical: spacing.md,
    borderWidth: 0.5,
  },
  _footerrow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 30,
  },
  _btn: {
    borderWidth: 1,
    borderColor: colors.primary,
    flex: 1,
  },
});
