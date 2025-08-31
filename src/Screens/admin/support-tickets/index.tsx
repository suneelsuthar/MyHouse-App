import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import {
  Screen,
  Text,
  Button,
  CustomTabs,
  TextField,
} from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { colors, spacing, adjustSize, typography } from "../../../theme";
import { NewMessageIcon, HistoryIcon2 } from "../../../assets/svg";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";

interface CommuicationProps
  extends AppStackScreenProps<"Commuication"> {}

export function Commuication(props: CommuicationProps) {
  const navigation = useNavigation();

  /** ---------- STATES ---------- */
  const [activeTab, setActiveTab] = useState<"New message" | "History">("New message");

  // form fields
  const [fromEmail, setFromEmail] = useState("facilitymanager@gmail.com");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  // toggles
  const [sendEmail, setSendEmail] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);

  // history dummy data
  const usersData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Amelia Greene`,
    avatar: `https://i.pravatar.cc/100?img=${i + 1}`,
    message: "Hello Amelia! I want to talk about 2 bedroom apartments",
    date: "24 June, 2024",
  }));

  /** ---------- COMPONENTS ---------- */
  const ToggleRow = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: boolean;
    onChange: (v: boolean) => void;
  }) => {
    return (
      <View style={styles.toggleRow}>
        <Text weight="semiBold" style={styles.toggleLabel}>
          {label}
        </Text>
        <Switch
          value={value}
          onValueChange={onChange}
          trackColor={{ false: colors.greylight, true: colors.primary }}
          thumbColor={colors.white}
        />
      </View>
    );
  };

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.chatItem,
        {
          backgroundColor: index % 2 === 0 ? "transparent" : "#dedff0",
        },
      ]}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.itemHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text
            style={[
              styles.date,
              {
                color: index % 2 === 0 ? "#B0B0B0" : "#FFFFFF",
              },
            ]}
          >
            {item.date}
          </Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  /** ---------- HANDLERS ---------- */
  const handleSend = () => {
    console.log({
      fromEmail,
      toEmail,
      subject,
      messageBody,
      sendEmail,
      sendMessage,
    });
    // TODO: API integration here
  };

  /** ---------- UI ---------- */
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      {activeTab === "History" ? (
        <View style={styles.header}>
          <Text style={styles.headerHeading}>Chat</Text>
        </View>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              (navigation as any)
                .getParent?.("AdminDrawer")
                ?.dispatch(DrawerActions.openDrawer())
            }
          >
            <WithLocalSvg asset={Images.user} style={styles.profile} />
          </TouchableOpacity>
          <View style={styles.headerinfo}>
            <Text weight="semiBold" style={styles.username}>
              Amelia Greene
            </Text>
            <Text style={styles.role}>Online</Text>
          </View>
        </View>
      )}

      <View style={styles.container}>
        <CustomTabs
          tabs={[
            {
              label: "New message",
              activeIcon: <NewMessageIcon color={colors.primary} />,
              inactiveIcon: <NewMessageIcon color={colors.white} />,
            },
            {
              label: "History",
              activeIcon: <HistoryIcon2 color={colors.primary} />,
              inactiveIcon: <HistoryIcon2 color={colors.white} />,
            },
          ]}
          activeTab={activeTab}
          onTabChange={(label) => setActiveTab(label as "New message" | "History")}
        >
          {activeTab === "New message" ? (
            <ScrollView contentContainerStyle={{ paddingHorizontal: adjustSize(10) }}>
              <Text style={[styles.title, { marginTop: adjustSize(30) }]}>From:</Text>
              <TextField
                placeholder="Enter sender email"
                value={fromEmail}
                onChangeText={setFromEmail}
                placeholderTextColor={colors.primaryLight}
              />

              <Text style={styles.title}>To:</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1, marginRight: adjustSize(10) }}>
                  <TextField
                    placeholder="Recipient email"
                    value={toEmail}
                    onChangeText={setToEmail}
                    placeholderTextColor={colors.primaryLight}
                  />
                </View>
                <TouchableOpacity activeOpacity={0.8} style={styles.addBtn}>
                  <WithLocalSvg asset={Images.plusIcon} />
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Subject:</Text>
              <TextField
                placeholder="Subject"
                value={subject}
                onChangeText={setSubject}
                placeholderTextColor={colors.primaryLight}
              />

              <Text style={styles.title}>Message Body:</Text>
              <TextField
                placeholder="Write message"
                value={messageBody}
                onChangeText={setMessageBody}
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={[
                  { height: adjustSize(120), alignItems: "flex-start" },
                ]}
                style={[{ height: adjustSize(110) }]}
                multiline
              />

              <ToggleRow label="Send Email:" value={sendEmail} onChange={setSendEmail} />
              <ToggleRow label="Send Message:" value={sendMessage} onChange={setSendMessage} />

              <Button text={"Send"} preset="reversed" style={styles.btn} onPress={handleSend} />
            </ScrollView>
          ) : (
            <FlatList
              data={usersData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          )}
        </CustomTabs>

        {activeTab === "History" && (
          <TouchableOpacity activeOpacity={0.6} style={styles.messageBtn}>
            <WithLocalSvg asset={Images.messageIcon} />
          </TouchableOpacity>
        )}
      </View>
    </Screen>
  );
}

/** ---------- STYLES ---------- */
const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    paddingHorizontal: adjustSize(10),
    height: adjustSize(80),
  },
  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  username: {
    fontSize: adjustSize(12),
    color: colors.primary,
    lineHeight: adjustSize(20),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  profile: {
    height: adjustSize(44),
    width: adjustSize(44),
    borderRadius: 100,
    backgroundColor: colors.fill,
  },
  headerHeading: {
    fontSize: adjustSize(24),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    flex: 1,
    lineHeight: adjustSize(50),
  },
  avatar: {
    height: adjustSize(62),
    width: adjustSize(62),
    borderRadius: adjustSize(62 / 2),
  },
  chatItem: {
    flexDirection: "row",
    paddingHorizontal: adjustSize(10),
    paddingVertical: adjustSize(20),
  },
  info: {
    flex: 1,
    marginLeft: adjustSize(15),
  },
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  date: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  message: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
    lineHeight: adjustSize(20),
  },
  messageBtn: {
    position: "absolute",
    right: adjustSize(15),
    bottom: adjustSize(15),
  },
  title: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(3),
    marginTop: adjustSize(5),
  },
  addBtn: {
    backgroundColor: colors.primary,
    height: adjustSize(54),
    width: adjustSize(49),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  btn: {
    marginVertical: adjustSize(25),
  },
});
