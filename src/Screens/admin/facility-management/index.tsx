import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from "react-native";
import {
  Screen,
  Text,
  Header2,
  CustomTabs,
  SearchBar,
  FacilityManagementCard,
  Button,
} from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import {
  WorkRequestsIcon,
  OrdersIcon,
  CompletedIcon,
} from "../../../assets/svg";
import DropdownComponent from "../../../Components/DropDown";
import { useNavigation } from "@react-navigation/native";
import {
  AdminStackParamList,
  TenantStackParamList,
} from "../../../utils/interfaces";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
export type FacilityManagementProps =
  | NativeStackScreenProps<AdminStackParamList, "FacilityManagement">
  | NativeStackScreenProps<TenantStackParamList, "FacilityManagement">;

export function FacilityManagement({ route }: FacilityManagementProps) {
  const navigation = useNavigation();
  const status = route?.params?.status ?? "work_requests";
  const { user } = useAppSelector((state: RootState) => state.auth);

  const titleMap: Record<string, string> = {
    work_requests: "Work Requests",
    work_orders: "Orders",
    completed: "Completed",
  };
  const [activeTab, setActiveTab] = useState(titleMap[status]); // 🔹 string state
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "priorityHigh" | "priorityLow" | "title"
  >("newest");
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
      priority: "High Priority",
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
      priority: "High Priority",
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
      requestedBy: "Brume Djbah",
      status: "Completed",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High Priority",
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
      priority: "High Priority",
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
      priority: "High Priority",
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
      requestedBy: "Brume Djbah",
      status: "Orders",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High Priority",
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
      priority: "High Priority",
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
      priority: "High Priority",
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
      requestedBy: "Brume Djbah",
      status: "Completed",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High Priority",
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
      priority: "High Priority",
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
      priority: "High Priority",
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
      requestedBy: "Brume Djbah",
      status: "Orders",
      title: "The oak Court",
      text: "Leaking toilet in master drawing room",
      workReqNo: "WR12345",
      category: "Plumbing",
      priority: "High Priority",
      issueDate: "15, Sep 2024",
      dueDate: "15, Sep 2024",
    },
  ];

  const filteredData = data?.filter(
    (item) => item?.status?.toLowerCase() === activeTab?.toLowerCase()
  );
  const priorityRank: Record<string, number> = { high: 3, medium: 2, low: 1 };
  const parseDate = (s?: string) => (s ? new Date(s) : new Date(0));
  const sortedData = React.useMemo(() => {
    const arr = [...(filteredData ?? [])];
    switch (sortBy) {
      case "oldest":
        return arr.sort(
          (a, b) => parseDate(a.issueDate).getTime() - parseDate(b.issueDate).getTime()
        );
      case "priorityHigh":
        return arr.sort(
          (a, b) =>
            (priorityRank[(b.priority || "").toLowerCase()] || 0) -
            (priorityRank[(a.priority || "").toLowerCase()] || 0)
        );
      case "priorityLow":
        return arr.sort(
          (a, b) =>
            (priorityRank[(a.priority || "").toLowerCase()] || 0) -
            (priorityRank[(b.priority || "").toLowerCase()] || 0)
        );
      case "title":
        return arr.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
      case "newest":
      default:
        return arr.sort(
          (a, b) => parseDate(b.issueDate).getTime() - parseDate(a.issueDate).getTime()
        );
    }
  }, [filteredData, sortBy]);
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
            activeIcon: <WorkRequestsIcon color={colors.white} />,
            inactiveIcon: <WorkRequestsIcon color={colors.white} />,
          },
          {
            label: "Orders",
            activeIcon: <OrdersIcon color={colors.white} />,
            inactiveIcon: <OrdersIcon color={colors.white} />,
          },
          {
            label: "Completed",
            activeIcon: <CompletedIcon color={colors.white} />,
            inactiveIcon: <CompletedIcon color={colors.white} />,
          },
        ]}
        activeTab={activeTab}
        onTabChange={(label) => setActiveTab(label)}
      >
        {user?.role === "admin" && (
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            hideBtn={
              user?.role === "admin" && activeTab === "Completed" // Hide for admin on "Completed" tab
                ? true
                : false

              // Hide for non-admin unless on "Work Requests" tab
            }
            onAddPress={() =>
              (navigation as any).navigate("FMGenerateWorkOrder" as never)
            }
          />
        )}

        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
          {user?.role !== "admin" && activeTab === "Work Requests" && (
            <View style={styles.dropdownContainer}>
              <View style={{ flex: 1 }}>
                <DropdownComponent
                  data={[
                    { label: "Property 1", value: "property_1" },
                    { label: "Property 2", value: "property_2" },
                    { label: "Property 3", value: "property_3" },
                  ]}
                  label="Select Period"
                  placeholder="Select Properties"
                  dropdownStyle={styles.customDropdownStyle}
                  placeholderStyle={styles.customPlaceholderStyle}
                  selectedTextStyle={styles.customSelectedTextStyle}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.addBtn}
                onPress={
                  () => navigation.navigate("FMGenerateWorkOrder" as never)
                  // navigation.navigate({  "FMGenerateWorkOrder" as never})
                }
                // onPress={onAddPress}
              >
                <WithLocalSvg asset={Images.addprop} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles._seciton_row}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              {activeTab === "Completed"
                ? "Manage Work Orders"
                : activeTab === "Orders"
                ? "Work Orders"
                : "Work Requests"}
            </Text>
            <View style={{ width: 150 }}>
              <DropdownComponent
                data={[
                  { label: "High Priority", value: "highpriority" },
                  { label: "In Progress", value: "inprogress" },
                ]}
                placeholder="Sort by"
                value={sortBy}
                onChangeValue={(v) =>
                  setSortBy(
                    (v as "newest" | "oldest" | "priorityHigh" | "priorityLow" | "title")
                  )
                }
                dropdownStyle={{
                  height: adjustSize(36),
                  borderRadius: adjustSize(50),
                  paddingHorizontal: adjustSize(12),
                  backgroundColor: colors.primary,
                }}
                placeholderStyle={{ color: colors.white, fontSize: adjustSize(12) }}
                selectedTextStyle={{ color: colors.white, fontSize: adjustSize(12) }}
                rightIconColor={colors.white}
              />
            </View>
            {/* 
            {user?.role === "tenant" && activeTab === "Work Requests" && (
              <Button
                preset="reversed"
                text="Generate"
                onPress={() => {
                  console.log("Generate");
                }}
                style={styles._generate_btn}
              />
            )}

            {user?.role === "admin" && activeTab !== "Completed" && (
              <Button
                preset="reversed"
                text="Generate"
                onPress={() => {
                  console.log("Generate");
                }}
                style={styles._generate_btn}
              />
            )} */}
          </View>
          {/* ÷÷ */}
        </View>

        {/* List */}
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <FacilityManagementCard
              property={item as any}
              activeTab={activeTab}
              onAction={(action, property) => {
                // Navigate to corresponding dummy pages for Work Requests actions
                if (action === "View Details") {
                  (navigation as any).navigate("FMViewDetails" as never);
                } else if (action === "Edit") {
                  (navigation as any).navigate("FMEdit" as never);
                } else if (action === "Generate work order") {
                  (navigation as any).navigate("FMGenerateWorkOrder" as never);
                } else if (action === "View work order") {
                  (navigation as any).navigate("FMViewWorkOrder" as never);
                } else if (action === "View") {
                  // Orders tab: View
                  (navigation as any).navigate("FMViewWorkOrder" as never);
                } else if (action === "Add Update") {
                  // Orders tab: Update
                  (navigation as any).navigate("FMOrderUpdate" as never);
                } else if (action === "Export") {
                  // Orders tab: Export
                  (navigation as any).navigate("FMOrderExport" as never);
                } else if (action === "Chat") {
                  // Orders/Completed tab: go to Chat bottom tab and pass context
                  (navigation as any).navigate(
                    "Chat" as never,
                    {
                      from: "FacilityManagementOrders",
                      user: property?.requestedBy,
                      workReqNo: property?.workReqNo,
                    } as never
                  );
                }
              }}
              style={{
                backgroundColor: index % 2 === 0 ? "#dedfef" : "transparent",
              }}
            />
          )}

        />
        </ScrollView>
      </CustomTabs>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.fill,
  },
  section: {
    marginHorizontal: adjustSize(10),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.black,
  },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
    marginBottom: adjustSize(20),
  },
  sortBtn: {
    backgroundColor: colors.primary,
    minWidth: adjustSize(110),
    height: adjustSize(36),
    borderRadius: adjustSize(50),
    paddingHorizontal: adjustSize(14),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sortBtnText: {
    color: colors.white,
    fontSize: adjustSize(12),
    marginRight: adjustSize(6),
  },
  sortCaret: {
    color: colors.white,
    fontSize: adjustSize(14),
  },
  sortMenu: {
    marginTop: adjustSize(8),
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    paddingVertical: adjustSize(6),
    paddingHorizontal: adjustSize(8),
    alignSelf: "flex-end",
  },
  sortOption: {
    paddingVertical: adjustSize(6),
    paddingHorizontal: adjustSize(6),
  },
  sortOptionText: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    gap: 10,
  },
  customDropdownStyle: {
    borderRadius: adjustSize(10),
    backgroundColor: "#6369A4",
    // marginTop: adjustSize(20),
    // marginHorizontal: adjustSize(10),
  },
  customPlaceholderStyle: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  listContent: {
    paddingHorizontal: adjustSize(10),
    paddingBottom: adjustSize(20),
  },
  _generate_btn: {
    width: adjustSize(120),
    minHeight: adjustSize(33),
  },
  addBtn: {
    backgroundColor: colors.primary,
    height: adjustSize(47),
    width: adjustSize(47),
    borderRadius: adjustSize(10),
    justifyContent: "center",
    alignItems: "center",
  },
});
