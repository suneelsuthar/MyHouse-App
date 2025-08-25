import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Screen, Text, Button, TextField } from "../../../../Components";
import { Header } from "../../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../../theme";

export function AdminTenantDetails({ navigation }: any) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Tenant Details" />
      <View style={styles.dataMain}>
        <View>
          <View style={styles.profileMain}>
            <Text style={styles.profileName}>J</Text>
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>abdfgc12345@gmail.com</Text>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Date Added</Text>
            <Text style={styles.listVal}>lorem ipsum</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Tenant Code/ID</Text>
            <Text style={styles.listVal}>lorem ipsum</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Property </Text>
            <Text style={styles.listVal}>lorem ipsum</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.listTitle}>Property Group</Text>
            <Text style={styles.listVal}>lorem ipsum</Text>
          </View>
        </View>
        <Button
          text={"Back"}
          preset="reversed"
          // style={styles.generateBtn}
          // textStyle={styles.generateText}
          onPress={() => navigation.goBack()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  dataMain: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: adjustSize(25),
    paddingHorizontal: adjustSize(10),
  },
  profileMain: {
    backgroundColor: colors.white,
    elevation: 2,
    width: adjustSize(130),
    height: adjustSize(130),
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    color: "#7E7E7E",
    fontSize: adjustSize(91),
    lineHeight: adjustSize(140),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  name: {
    textAlign: "center",
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(24),
    lineHeight: adjustSize(34),
    marginTop: adjustSize(10),
  },
  email: {
    textAlign: "center",
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(12),
    marginBottom: adjustSize(30),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(5),
  },
  listTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(12),
  },
  listVal: {
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(12),
  },
});
