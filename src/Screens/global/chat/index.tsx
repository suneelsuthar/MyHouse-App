import React, { useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Screen, Text, Header2, SearchBar } from "../../../Components";
import { colors, adjustSize, typography } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import DropdownComponent from "../../../Components/DropDown";

export function Chat() {
  const navigation: any = useNavigation();

  /** ---------- STATES ---------- */
  const [activeTab, setActiveTab] = useState<"New message" | "History">(
    "New message"
  );

  // form fields
  const [fromEmail, setFromEmail] = useState("facilitymanager@gmail.com");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  // toggles
  const [sendEmail, setSendEmail] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);

  // State for search and filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // history dummy data with types
  const usersData = Array.from({ length: 20 }, (_, i) => {
    const types = ["property", "support", "all"];
    const type = types[i % types.length];
    const names = [
      "Amelia Greene",
      "John Doe",
      "Jane Smith",
      "Robert Johnson",
      "Sarah Wilson",
    ];
    const messages = [
      "Hello! I want to talk about 2 bedroom apartments",
      "I have a question about my recent support ticket",
      "When will the maintenance be completed?",
      "I'm interested in viewing the property tomorrow",
      "Can you provide more details about the amenities?",
    ];

    return {
      id: i + 1,
      name: names[i % names.length],
      avatar: `https://i.pravatar.cc/100?img=${i + 1}`,
      message: messages[i % messages.length],
      date: new Date(
        2024,
        5,
        24 - (i % 10),
        10 + (i % 12),
        i % 60
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      type: type,
    };
  });

  // Filter users based on search query and selected type
  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || user.type === selectedType;
    return matchesSearch && matchesType;
  });

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
          style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
        />
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Message")}
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
    </TouchableOpacity>
  );

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Chat" />
      <DropdownComponent
        placeholder="Filter by type"
        data={[
          { label: "All", value: "all" },
          { label: "Property", value: "property" },
          { label: "Support", value: "support" },
        ]}
        dropdownStyle={{
          marginHorizontal: adjustSize(10),
          backgroundColor: colors.primary,
          marginTop: adjustSize(10),
        }}
        onChangeValue={(value) => setSelectedType(value)}
        value={selectedType}
      />
      <SearchBar
        placeholder="Search by name or message"
        hideBtn
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.container}>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No matching conversations found
              </Text>
            </View>
          }
        />

        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.messageBtn}
          onPress={() => navigation.navigate("Message")}
        >
          <WithLocalSvg asset={Images.messageIcon} />
        </TouchableOpacity>
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
  btn: {
    marginVertical: adjustSize(25),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
});
