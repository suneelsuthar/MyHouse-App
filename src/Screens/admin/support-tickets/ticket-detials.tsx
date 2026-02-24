import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  TextInput,
} from "react-native";
import {
  Screen,
  Text,
  Button,
  CustomTabs,
  TextField,
  CustomDateTimePicker,
  Header,
} from "../../../Components";
import DropdownComponent from "../../../Components/DropDown";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing, adjustSize, typography } from "../../../theme";
import { NewMessageIcon, HistoryIcon2 } from "../../../assets/svg";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../utils/interfaces";
import Feather from "@expo/vector-icons/Feather";

export function TicketDetials(props: any) {
  const navigation = useNavigation();

  /** ---------- UI ---------- */
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.container}
      safeAreaEdges={["top"]}
    >
      <Header title="Message Details" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: adjustSize(15) }}
      >
        {/* Title */}
        <Text style={styles.title} text="Public Holiday" />

        {/* Sender Row */}
        <View style={styles.senderRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.email}>abdfgc12345@gmail.com</Text>
            <Text style={styles.time}>06:24 AM - 12 June, 2024</Text>
          </View>

          <WithLocalSvg asset={Images.archive} />
          {/* <Feather name="trash-2" size={20} color={colors.primary} /> */}
        </View>

        {/* Message Label */}
        <Text style={styles.sectionLabel}>Message:</Text>

        {/* Message Box */}
        <View style={styles.messageBox}>
          <Text style={styles.messageText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            sollicitudin magna feugiat magna blandit porta. Phasellus ut auctor
            felis. Vivamus elementum commodo ultricies. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit. Sed sollicitudin magna feugiat
            magna blandit porta. Phasellus ut auctor felis. Vivamus elementum
            commodo ultricies. 
          </Text>
        </View>

        {/* SMS / Email Info */}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>SMS:</Text>
          <Text style={styles.infoValue}>Yes</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>No</Text>
        </View>

        {/* Undo Archive */}
      </ScrollView>
      <TouchableOpacity>
        <Text style={styles.undoText}>Undo Archive</Text>
      </TouchableOpacity>

      {/* Bottom Button */}
      <Button
        onPress={() => navigation.goBack()}
        preset="reversed"
        text="Back"
        style={styles.backButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },

  title: {
    fontSize: adjustSize(24),
    lineHeight: adjustSize(28),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    marginTop: 20,
    marginBottom: 20,
  },

  senderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    color: colors.white,
    fontSize: adjustSize(24),
    lineHeight: adjustSize(28),
    fontFamily: typography.fonts.poppins.semiBold,
  },

  email: {
    fontSize: 14,
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },

  time: {
    fontSize: 12,
    color: colors.primaryLight,
    marginTop: 4,
  },

  sectionLabel: {
    fontSize: 16,
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    marginBottom: 10,
  },

  messageBox: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },

  messageText: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 22,
  },

  infoRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  infoLabel: {
    fontSize: 16,
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    width: 80,
  },

  infoValue: {
    fontSize: 16,
    color: colors.primary,
  },

  undoText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },

  backButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
    minHeight: adjustSize(47),
  },
});
