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

export function TenantDetails({ navigation }: any) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Resident Details" />
      <View style={styles.dataMain}>
        <View style={styles.profileMain}>
          <Text style={styles.profileName}>J</Text>
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>abdfgc12345@gmail.com</Text>
        <View style={styles.userinfo}>
          <View>
            <View style={styles.list}>
              <Text style={styles.listTitle}>Date Added</Text>
              <Text style={styles.listVal}>lorem ipsum</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.listTitle}>Resident Code/ID</Text>
              <Text style={styles.listVal}>lorem ipsum</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.listTitle}>Property </Text>
              <Text style={styles.listVal}>lorem ipsum</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.listTitle}>Estate</Text>
              <Text style={styles.listVal}>lorem ipsum</Text>
            </View>
          </View>
        </View>
      </View>

      <Button
        text={"Back"}
        preset="reversed"
        style={{ marginVertical: 20, width: "95%", alignSelf: "center" }}
        // style={styles.generateBtn}
        // textStyle={styles.generateText}
        onPress={() => navigation.goBack()}
      />
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
    // justifyContent: "space-between",
    paddingVertical: adjustSize(25),
    paddingHorizontal: adjustSize(10),
  },
  profileMain: {
    backgroundColor: colors.primary,
    elevation: 2,
    width: adjustSize(130),
    height: adjustSize(130),
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    color: colors.white,
    fontSize: adjustSize(50),
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
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(12),
    marginBottom: adjustSize(30),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: adjustSize(5),
  },
  listTitle: {
    color: colors.white,
    fontSize: adjustSize(14),
  },
  listVal: {
    color: colors.white,
    fontSize: adjustSize(14),
  },
  userinfo: {
    backgroundColor: colors.primary,
    borderRadius: 15,
    padding: 15,
    paddingVertical: 25,
  },
});
