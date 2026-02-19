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
interface CommuicationProps extends NativeStackScreenProps<
  AdminStackParamList,
  "Commuication"
> {}

export function Commuication(props: CommuicationProps) {
  const navigation = useNavigation();

  console.log(props.route.params.tab);
  /** ---------- STATES ---------- */
  const [activeTab, setActiveTab] = useState<
    "New message" | "History" | "Archive"
  >("New message");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [archivedMessages, setArchivedMessages] = useState<any[]>([]);
  const lastPress = useRef(0);

  // Initialize messages with dummy data
  React.useEffect(() => {
    setActiveTab(props.route.params.tab);
    console.log("wooo");
    const dummyData = Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `Amelia Greene`,
      avatar: `https://i.pravatar.cc/100?img=${i + 1}`,
      message:
        "Dear Client, we have received your request and our team is currently working on it. You will be updated with the progress shortly. Thank you for your patience.",
      date: "24 June, 2024",
    }));
    setMessages(dummyData);
  }, [props.route.params.tab]);

  // form fields
  const [fromEmail, setFromEmail] = useState("facilitymanager@gmail.com");
  const [toEmail, setToEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  // toggles
  const [sendEmail, setSendEmail] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const [enableRepeat, setenableRepeat] = useState(false);

  // repeat message fields
  const [startPeriod, setStartPeriod] = useState<Date | null>(null);
  const [endPeriod, setEndPeriod] = useState<Date | null>(null);
  const [repeatInterval, setRepeatInterval] = useState<string>("");
  const [startPickerVisible, setStartPickerVisible] = useState(false);
  const [endPickerVisible, setEndPickerVisible] = useState(false);

  // Recipient selection
  const [isRecipientModalVisible, setIsRecipientModalVisible] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<
    Array<{ id: string; name: string; type: "tenant" | "property_group" }>
  >([]);
  const [activeRecipientTab, setActiveRecipientTab] = useState<
    "tenants" | "property_groups"
  >("tenants");

  // Mock data - replace with your actual data
  const [searchQuery, setSearchQuery] = useState("");
  const [tenants, setTenants] = useState([
    { id: "1", name: "John Doe", avatar: "https://i.pravatar.cc/100?img=1" },
    { id: "2", name: "Jane Smith", avatar: "https://i.pravatar.cc/100?img=2" },
    {
      id: "3",
      name: "Robert Johnson",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    { id: "4", name: "Emily Davis", avatar: "https://i.pravatar.cc/100?img=4" },
    {
      id: "5",
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
  ]);

  const propertyGroups = [
    { id: "pg1", name: "Group One" },
    { id: "pg2", name: "Group Two" },
    { id: "pg3", name: "Group Three" },
    { id: "pg4", name: "Group Four" },
  ];

  const filteredTenants = tenants.filter((tenant) =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Handle message press with double tap detection
  const handleMessagePress = (item: any) => {
    const now = new Date().getTime();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastPress.current && now - lastPress.current < DOUBLE_PRESS_DELAY) {
      setSelectedMessage(item);
    }
    lastPress.current = now;
  };

  const closeModal = () => setSelectedMessage(null);

  const handleArchiveMessage = (message: any) => {
    // Remove from current messages
    setMessages((prev) => prev.filter((m) => m.id !== message.id));
    // Add to archived messages
    setArchivedMessages((prev) => [...prev, message]);
    closeModal();
  };

  const handleRestoreMessage = (message: any) => {
    // Remove from archived messages
    setArchivedMessages((prev) => prev.filter((m) => m.id !== message.id));
    // Add back to messages
    setMessages((prev) => [...prev, message]);
    closeModal();
  };

  const toggleRecipientSelection = (
    recipient: { id: string; name: string },
    type: "tenant" | "property_group",
  ) => {
    setSelectedRecipients((prev) => {
      const exists = prev.some((r) => r.id === recipient.id && r.type === type);
      if (exists) {
        return prev.filter((r) => !(r.id === recipient.id && r.type === type));
      }
      return [...prev, { ...recipient, type }];
    });
  };

  const removeRecipient = (id: string) => {
    setSelectedRecipients((prev) => prev.filter((r) => r.id !== id));
  };

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
          style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
        />
      </View>
    );
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      //  onPress={ () =>
      //     navigation.navigate("Admin", {
      //       screen: "Home",
      //       params: {
      //         screen: "Commuication",
      //         params: { tab: "Archive" },
      //       }
      //     }
      // },
      onPress={() => 
        navigation.navigate("Home", {
          screen: "TicketDetails",
          params: {
            screen: "TicketDetails",
          },
        })
      }
      // onPress={() => navigation.navigate("TicketDetails")}
      style={[
        styles.chatItem,
        {
          backgroundColor: colors.white,
        },
      ]}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.itemHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={[styles.date]}>{item.date}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
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
      enableRepeat,
      startPeriod,
      endPeriod,
      repeatInterval,
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
          <Text style={styles.headerHeading}>Communication</Text>
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
              activeIcon: <NewMessageIcon color={colors.white} />,
              inactiveIcon: <NewMessageIcon color={colors.white} />,
            },
            {
              label: "History",
              activeIcon: <HistoryIcon2 color={colors.white} />,
              inactiveIcon: <HistoryIcon2 color={colors.white} />,
            },
            {
              label: "Archive",
              activeIcon: (
                <Feather name="archive" size={24} color={colors.white} />
              ),
              inactiveIcon: (
                <Feather name="archive" size={24} color={colors.white} />
              ),
            },
          ]}
          activeTab={activeTab}
          onTabChange={(label) =>
            setActiveTab(label as "New message" | "History" | "Archive")
          }
        >
          {activeTab === "New message" ? (
            <ScrollView
              contentContainerStyle={{ paddingHorizontal: adjustSize(10) }}
            >
              <Text style={[styles.title, { marginTop: adjustSize(30) }]}>
                From:
              </Text>
              <TextField
                placeholder="Enter sender email"
                value={fromEmail}
                onChangeText={setFromEmail}
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={{ backgroundColor: colors.white }}
              />

              <Text style={styles.title}>To:</Text>
              <View style={styles.recipientInputContainer}>
                <View style={styles.inputView}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {selectedRecipients.length > 0 ? (
                      selectedRecipients.map((recipient) => (
                        <View
                          key={`${recipient.type}-${recipient.id}`}
                          style={styles.recipientChip}
                        >
                          <Text style={styles.recipientChipText}>
                            {recipient.name}
                          </Text>
                          <TouchableOpacity
                            onPress={() => removeRecipient(recipient.id)}
                            style={styles.chipCloseButton}
                          >
                            <Text style={{ color: colors.white }}>×</Text>
                          </TouchableOpacity>
                        </View>
                      ))
                    ) : (
                      <Text
                        text="Search"
                        style={{ color: colors.primaryLight }}
                      />
                    )}
                  </ScrollView>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.addBtn,
                    {
                      height: adjustSize(47),
                      width: adjustSize(47),
                    },
                  ]}
                  onPress={() => setIsRecipientModalVisible(true)}
                >
                  <WithLocalSvg asset={Images.plusIcon} />
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>Subject:</Text>
              <TextField
                placeholder="Subject"
                value={subject}
                onChangeText={setSubject}
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={{ backgroundColor: colors.white }}
              />

              <Text style={styles.title}>Message Body:</Text>
              <TextField
                placeholder="Write message"
                value={messageBody}
                onChangeText={setMessageBody}
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={[
                  {
                    height: adjustSize(120),
                    alignItems: "flex-start",
                    backgroundColor: colors.white,
                  },
                ]}
                style={[{ height: adjustSize(110) }]}
                multiline
              />

              <ToggleRow
                label="Send Email:"
                value={sendEmail}
                onChange={setSendEmail}
              />
              <ToggleRow
                label="Send SMS:"
                value={sendMessage}
                onChange={setSendMessage}
              />

              <ToggleRow
                label="Enable Repreat Message:"
                value={enableRepeat}
                onChange={setenableRepeat}
              />

              {enableRepeat && (
                <View style={styles.repeatFieldsContainer}>
                  <View style={styles.dateFieldContainer}>
                    <Text style={styles.fieldLabel}>Start Period:</Text>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setStartPickerVisible(true)}
                    >
                      <Text
                        style={[
                          styles.dateText,
                          {
                            color: startPeriod
                              ? colors.black
                              : colors.primaryLight,
                          },
                        ]}
                      >
                        {startPeriod
                          ? startPeriod.toLocaleDateString()
                          : "Select Start Date"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.dateFieldContainer}>
                    <Text style={styles.fieldLabel}>End Period:</Text>
                    <TouchableOpacity
                      style={styles.datePickerButton}
                      onPress={() => setEndPickerVisible(true)}
                    >
                      <Text
                        style={[
                          styles.dateText,
                          {
                            color: endPeriod
                              ? colors.black
                              : colors.primaryLight,
                          },
                        ]}
                      >
                        {endPeriod
                          ? endPeriod.toLocaleDateString()
                          : "Select End Date"}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.intervalFieldContainer}>
                    <Text style={styles.fieldLabel}>Repeat Interval:</Text>
                    <DropdownComponent
                      data={[
                        { label: "Daily", value: "Daily" },
                        { label: "Weekly", value: "Weekly" },
                        { label: "Monthly", value: "Monthly" },
                        { label: "Annually", value: "Annually" },
                      ]}
                      label="Choose interval"
                      placeholder="Select interval"
                      value={repeatInterval}
                      onChangeValue={(v: any) => setRepeatInterval(v)}
                      dropdownStyle={styles.dropdown}
                      placeholderStyle={styles.dropdownPlaceholder}
                      selectedTextStyle={styles.dropdownSelected}
                      rightIconColor={colors.primary}
                    />
                  </View>
                </View>
              )}

              <Button
                text={"Send"}
                preset="reversed"
                style={styles.btn}
                onPress={handleSend}
              />
            </ScrollView>
          ) : (
            <FlatList
              data={activeTab === "History" ? messages : archivedMessages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>
                    {activeTab === "History"
                      ? "No messages found"
                      : "No archived messages"}
                  </Text>
                </View>
              }
            />
          )}
        </CustomTabs>

        {/* Start Period Date Picker Modal */}
        <CustomDateTimePicker
          mode="date"
          value={startPeriod}
          visible={startPickerVisible}
          onChange={setStartPeriod}
          onCancel={() => setStartPickerVisible(false)}
          onConfirm={() => setStartPickerVisible(false)}
        />

        {/* Start Period Date Picker Modal */}
        <CustomDateTimePicker
          mode="date"
          value={startPeriod}
          visible={startPickerVisible}
          onChange={setStartPeriod}
          onCancel={() => setStartPickerVisible(false)}
          onConfirm={() => setStartPickerVisible(false)}
        />

        {/* End Period Date Picker Modal */}
        <CustomDateTimePicker
          mode="date"
          value={endPeriod}
          visible={endPickerVisible}
          onChange={setEndPeriod}
          onCancel={() => setEndPickerVisible(false)}
          onConfirm={() => setEndPickerVisible(false)}
        />

        {activeTab === "History" && (
          <TouchableOpacity activeOpacity={0.6} style={styles.messageBtn}>
            <WithLocalSvg asset={Images.messageIcon} />
          </TouchableOpacity>
        )}

        {/* Message Details Modal */}
        <Modal
          visible={!!selectedMessage}
          transparent
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text weight="semiBold" style={styles.modalTitle}>
                  Message Details
                </Text>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.modalBody}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>To:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                      paddingHorizontal: 10,
                    }}
                  >
                    <View style={styles._badge}>
                      <Text
                        text="Dacket"
                        style={{ fontSize: adjustSize(12) }}
                      />
                    </View>

                    <View style={styles._badge}>
                      <Text
                        text="John Doe"
                        style={{ fontSize: adjustSize(12) }}
                      />
                    </View>

                    <View style={styles._badge}>
                      <Text
                        text="Jane Smith"
                        style={{ fontSize: adjustSize(12) }}
                      />
                    </View>
                  </View>
                  {/* <Text style={styles.detailValue}>Public Holiday</Text> */}
                </View>

                <Text style={styles.detailLabel}>
                  Subject:
                  <Text style={styles.detailValue}> Public Holiday</Text>
                </Text>

                <View style={styles.messageContainer}>
                  <Text weight="semiBold" style={styles.messageLabel}>
                    Message:
                  </Text>
                  <Text style={styles.messageText}>
                    {selectedMessage?.message || "No content available"}
                  </Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailValue}>
                    {selectedMessage?.date || "N/A"}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>SMS:</Text>
                  <Text style={styles.detailValue}>Some Dummy SMS</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Email:</Text>
                  <Text style={styles.detailValue}>john@gmail.com</Text>
                </View>
              </ScrollView>

              <View style={styles.modalFooter}>
                {activeTab === "Archive" ? (
                  <Button
                    text="Restore"
                    preset="reversed"
                    onPress={() => handleRestoreMessage(selectedMessage)}
                    style={[styles.modalButton, { marginRight: 10 }]}
                  />
                ) : (
                  <Button
                    text="Archive"
                    preset="reversed"
                    onPress={() => handleArchiveMessage(selectedMessage)}
                    style={[styles.modalButton, { marginRight: 10 }]}
                  />
                )}
                <Button
                  text="Close"
                  preset="reversed"
                  onPress={closeModal}
                  style={[styles.modalButton]}
                />
              </View>
            </View>
          </View>
        </Modal>

        {/* Recipient Selection Modal */}
        <Modal
          visible={isRecipientModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsRecipientModalVisible(false)}
        >
          <View style={styles.recipientModalContainer}>
            <View style={styles.recipientModalContent}>
              <View style={styles.modalHeader}>
                <Text weight="semiBold" style={styles.modalTitle}>
                  Select Recipients
                </Text>
                <TouchableOpacity
                  onPress={() => setIsRecipientModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Feather name="x" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.searchContainer}>
                <Feather
                  name="search"
                  size={20}
                  color="#9CA3AF"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search tenants..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#9CA3AF"
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearchQuery("")}
                    style={styles.clearSearchButton}
                  >
                    <Feather name="x" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.recipientTabs}>
                <TouchableOpacity
                  style={[
                    styles.recipientTab,
                    activeRecipientTab === "tenants" &&
                      styles.activeRecipientTab,
                  ]}
                  onPress={() => setActiveRecipientTab("tenants")}
                >
                  <Text
                    weight="semiBold"
                    style={[
                      styles.tabText,
                      activeRecipientTab === "tenants" && styles.activeTabText,
                    ]}
                  >
                    Tenants
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.recipientTab,
                    activeRecipientTab === "property_groups" &&
                      styles.activeRecipientTab,
                  ]}
                  onPress={() => setActiveRecipientTab("property_groups")}
                >
                  <Text
                    weight="semiBold"
                    style={[
                      styles.tabText,
                      activeRecipientTab === "property_groups" &&
                        styles.activeTabText,
                    ]}
                  >
                    Property Groups
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={
                  activeRecipientTab === "tenants"
                    ? filteredTenants
                    : propertyGroups
                }
                keyExtractor={(item) => item.id}
                style={styles.recipientList}
                renderItem={({ item }) => {
                  const isSelected = selectedRecipients.some(
                    (r) =>
                      r.id === item.id &&
                      r.type === (activeRecipientTab.slice(0, -1) as any),
                  );
                  return (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={styles.recipientItem}
                      onPress={() =>
                        toggleRecipientSelection(
                          item,
                          activeRecipientTab === "tenants"
                            ? "tenant"
                            : "property_group",
                        )
                      }
                    >
                      {activeRecipientTab === "tenants" && (
                        <WithLocalSvg
                          asset={Images.user}
                          style={{ height: 40, width: 40 }}
                        />
                      )}
                      <View style={styles.recipientInfo}>
                        <Text weight="medium" style={styles.recipientName}>
                          {item.name}
                        </Text>
                        <Text
                          weight="medium"
                          style={{ color: "#808282", fontSize: adjustSize(12) }}
                        >
                          T12312
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.checkbox,
                          isSelected && styles.checkboxSelected,
                        ]}
                      >
                        {isSelected && (
                          <Feather name="check" size={16} color="#fff" />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
                ListEmptyComponent={
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyStateText}>
                      No {activeRecipientTab} found
                    </Text>
                  </View>
                }
              />

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsRecipientModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setIsRecipientModalVisible(false)}
                >
                  <Text style={styles.addButtonText}>Add Recipients</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 7,
    elevation: 2,
    marginHorizontal: 10,
    height: adjustSize(96),
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
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.primary,
  },
  message: {
    fontSize: adjustSize(12),
    color: "#737373",
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
    paddingBottom: adjustSize(10),
  },
  toggleLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  btn: {
    marginVertical: adjustSize(25),
  },
  // Repeat Message Fields Styles
  repeatFieldsContainer: {
    marginTop: 15,
    // backgroundColor: colors.white,
    // marginHorizontal: adjustSize(10),
    // padding: adjustSize(15),
    // borderRadius: adjustSize(10),
    // marginBottom: adjustSize(20),
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    // elevation: 2,
  },
  dateFieldContainer: {
    marginBottom: adjustSize(15),
  },
  fieldLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(8),
  },
  datePickerButton: {
    backgroundColor: colors.white,
    // borderWidth: 1,
    // borderColor: colors.greylight,
    // borderRadius: adjustSize(8),
    paddingHorizontal: adjustSize(12),
    // paddingVertical: adjustSize(10),
    // justifyContent: "center",
    // alignItems: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    height: adjustSize(49),
    borderColor: "#F0F0F0",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    // marginHorizontal: 3,
    marginBottom: spacing.md,
    borderWidth: 0.5,
  },
  dateText: {
    flex: 1,
    alignSelf: "center",
    fontFamily: "medium",
    color: colors.black,
    // marginHorizontal: spacing.sm,
    fontSize: adjustSize(12),
  },
  intervalFieldContainer: {
    marginBottom: adjustSize(15),
  },
  intervalInput: {
    backgroundColor: colors.white,
  },
  // Dropdown Styles
  dropdown: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(8),
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(10),
    marginBottom: adjustSize(10),
    height: adjustSize(49),
    borderColor: "#F0F0F0",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  dropdownPlaceholder: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownSelected: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    color: "#666",
  },
  modalBody: {
    padding: 15,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  detailLabel: {
    color: "#555",
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  detailValue: {
    flex: 1,
    color: "#333",
  },
  messageContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginBottom: 20,
  },
  messageLabel: {
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  messageText: {
    color: "#333",
    lineHeight: 22,
  },

  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  modalFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    color: colors.grey,
    fontSize: 16,
    textAlign: "center",
  },
  recipientInputContainer: {
    padding: 5,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputView: {
    // borderWidth: 1,
    // borderColor: colors.greylight,
    borderRadius: 8,
    // height: adjustSize(47),
    flex: 1,
    // padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    backgroundColor: colors.white,
    height: adjustSize(49),
    borderColor: "#F0F0F0",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    paddingHorizontal: 10,
  },
  chipsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    paddingVertical: 5,
  },
  recipientChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  recipientChipText: {
    fontSize: adjustSize(11),
    marginRight: 5,
    color: colors.white,
  },
  chipCloseButton: {
    padding: 2,
    color: colors.white,
  },
  recipientModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  recipientModalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: "80%",
    overflow: "hidden",
  },
  recipientTabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.greylight,
  },
  recipientTab: {
    flex: 1,
    padding: 15,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeRecipientTab: {
    borderBottomColor: colors.primary,
  },
  recipientList: {
    maxHeight: 300,
  },
  recipientItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#e9e9f0",
    margin: adjustSize(5),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    margin: 16,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: "#111827",
    fontSize: 16,
  },
  clearSearchButton: {
    padding: 4,
  },
  tabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  activeTabText: {
    color: colors.primary,
  },

  recipientName: {
    flex: 1,
    fontSize: adjustSize(12),
    color: "#111827",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  emptyState: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyStateText: {
    color: "#6B7280",
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginRight: 8,
  },
  cancelButtonText: {
    color: "#4B5563",
    fontWeight: "600",
    fontSize: 16,
  },
  addButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginLeft: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  selectedRecipientItem: {
    backgroundColor: "#f0f7ff",
  },
  _badge: {
    backgroundColor: "#e5e7eb",
    borderRadius: 100,
    paddingHorizontal: adjustSize(10),
  },
  recipientInfo: {
    flex: 1,
  },
});
