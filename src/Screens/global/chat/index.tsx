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
 

export function Chat(props:any) {
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
      "Booking #1234",
      "Work Order #124",
      "Booking #1349",
      "Work Order #11224",
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
  console.log("===__==>",props?.route?.params?.fromTab)

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate("Message",{
        params:{
          type:props?.route?.params?.type,
          id:item.id,
          fromTab:props?.route?.params?.fromTab
        }
      })}
      style={styles.chatCard}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.itemHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text
            style={[
              styles.date,
              { color: "#737373" },
            ]}
          >
            {item.date}
          </Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </TouchableOpacity>
  );


  // console.log("=====__====+>",props.route.params)
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Chat"  />
      <View style={styles.tabsRow}>
        {[
          { label: "All", value: "all" },
          { label: "Property", value: "property" },
          { label: "Support", value: "support" },
        ].map((t) => (
          <TouchableOpacity
            key={t.value}
            onPress={() => setSelectedType(t.value)}
            style={[styles.tabBtn, selectedType === t.value && styles.tabActive]}
            activeOpacity={0.7}
          >
            <Text
              weight={selectedType === t.value ? "semiBold" : "medium"}
              style={[styles.tabText, selectedType === t.value && styles.tabTextActive]}
            >
              {t.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <SearchBar
        placeholder="Search"
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
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    // marginHorizontal: adjustSize(10),
    // marginTop: adjustSize(10),
    backgroundColor: colors.white,
    // borderRadius: adjustSize(10),
    // overflow: "hidden",
  },
  tabBtn: {
    flex: 1,
    height: adjustSize(44),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  tabTextActive: {
    color: colors.white,
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
  chatCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(12),
    borderRadius: adjustSize(12),
    padding: adjustSize(12),
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
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
