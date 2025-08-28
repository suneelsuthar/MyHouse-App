import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Screen,
  Text,
  Header2,
  CustomTabs,
  SearchBar,
  FacilityManagementCard,
} from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import { AppStackScreenProps } from "../../../utils/interfaces";
import {
  WorkRequestsIcon,
  OrdersIcon,
  CompletedIcon,
} from "../../../assets/svg";
import DropdownComponent from "../../../Components/DropDown";
import { useNavigation } from "@react-navigation/native";
type Props = AppStackScreenProps<"AdminFacilityManagement">;
export function AdminFacilityManagement({ route }: Props) {
  const navigation = useNavigation();
  const status = route?.params?.status ?? "work_requests";
  const titleMap: Record<string, string> = {
    work_requests: "Work Requests",
    work_orders: "Orders",
    completed: "Completed",
  };
  const [activeTab, setActiveTab] = useState(titleMap[status]); // 🔹 string state
  const [search, setSearch] = useState<string>("");
  useEffect(() => {
    setActiveTab(titleMap[status]);
  }, [status]);
  const data = [
    {
      id: "1",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      requestedBy: "Brume Djbah",
      status: "Work requests",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "2",
      images: [
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      requestedBy: "Brume Djbah",
      status: "Orders",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "3",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
      ],
      requestedBy: "Completed",
      status: "Completed",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "4",
      images: [
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      requestedBy: "Brume Djbah",
      status: "Work requests",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "5",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      requestedBy: "Brume Djbah",
      status: "Orders",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "6",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
      ],
      requestedBy: "Completed",
      status: "Orders",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "7",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      requestedBy: "Brume Djbah",
      status: "Work requests",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "8",
      images: [
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      requestedBy: "Brume Djbah",
      status: "Completed",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "9",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
      ],
      requestedBy: "Completed",
      status: "Completed",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "10",
      images: [
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      requestedBy: "Brume Djbah",
      status: "Work requests",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "11",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      requestedBy: "Brume Djbah",
      status: "Orders",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
    {
      id: "12",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
      ],
      requestedBy: "Completed",
      status: "Orders",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
  ];

  const filteredData = data?.filter(
    (item) => item?.status?.toLowerCase() === activeTab?.toLowerCase()
  );
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Facility Management" onNotificationPress={() => {}} />
      <CustomTabs
        tabs={[
          {
            label: "Work Requests",
            activeIcon: <WorkRequestsIcon color={colors.primary} />,
            inactiveIcon: <WorkRequestsIcon color={colors.white} />,
          },
          {
            label: "Orders",
            activeIcon: <OrdersIcon color={colors.primary} />,
            inactiveIcon: <OrdersIcon color={colors.white} />,
          },
          {
            label: "Completed",
            activeIcon: <CompletedIcon color={colors.primary} />,
            inactiveIcon: <CompletedIcon color={colors.white} />,
          },
        ]}
        activeTab={activeTab}
        onTabChange={(label) => setActiveTab(label)}
      >
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          hideBtn={activeTab === "Completed" ? true : false}
          onAddPress={() =>
            (navigation as any).navigate("AdminAddProperty" as never)
          }
        />
        <View style={styles.section}>
          <View style={styles._seciton_row}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              {activeTab === "Completed"
                ? "Manage Work Orders"
                : activeTab === "Orders"
                ? "Work Orders"
                : "Work Requests"}
            </Text>
            {activeTab === "Work Requests" && (
              <View style={styles.dropdownContainer}>
                <DropdownComponent
                  data={[
                    { label: "A", value: "A" },
                    { label: "B", value: "B" },
                    { label: "C", value: "C" },
                  ]}
                  label="Select Period"
                  placeholder="Last 7 days"
                  dropdownStyle={styles.customDropdownStyle}
                  placeholderStyle={styles.customPlaceholderStyle}
                  selectedTextStyle={styles.customSelectedTextStyle}
                />
              </View>
            )}
          </View>
          {/* ÷÷ */}
        </View>

        {/* List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <FacilityManagementCard
              property={item as any}
              activeTab={activeTab}
              onAction={(action, property) => {
                // Navigate to corresponding dummy pages for Work Requests actions
                if (action === "View Details") {
                  (navigation as any).navigate("AdminFMViewDetails" as never);
                } else if (action === "Edit") {
                  (navigation as any).navigate("AdminFMEdit" as never);
                } else if (action === "Generate work order") {
                  (navigation as any).navigate(
                    "AdminFMGenerateWorkOrder" as never
                  );
                } else if (action === "View work order") {
                  (navigation as any).navigate("AdminFMViewWorkOrder" as never);
                } else if (action === "View") {
                  // Orders tab: View
                  (navigation as any).navigate("AdminFMOrderView" as never);
                } else if (action === "Update") {
                  // Orders tab: Update
                  (navigation as any).navigate("AdminFMOrderUpdate" as never);
                } else if (action === "Export") {
                  // Orders tab: Export
                  (navigation as any).navigate("AdminFMOrderExport" as never);
                } else if (action === "Chat") {
                  // Orders/Completed tab: go to Chat bottom tab and pass context
                  (navigation as any).navigate(
                    "Chat" as never,
                    {
                      from: "AdminFacilityManagementOrders",
                      user: property?.requestedBy,
                      workReqNo: property?.workReqNo,
                    } as never
                  );
                }
              }}
              style={{
                backgroundColor: index % 2 === 0 ? "#dedff0" : "transparent",
              }}
            />
          )}
          //  style={styles.list}
        />
      </CustomTabs>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  section: {
    marginHorizontal: adjustSize(10),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
  },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
    marginBottom: adjustSize(20),
  },
  dropdownContainer: {
    width: adjustSize(120),
  },
  customDropdownStyle: {
    height: adjustSize(33),
    borderRadius: adjustSize(100),
    backgroundColor: "#6369A4",
  },
  customPlaceholderStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  listContent: {
    // paddingHorizontal: adjustSize(10),
    paddingBottom: adjustSize(20),
  },
});
