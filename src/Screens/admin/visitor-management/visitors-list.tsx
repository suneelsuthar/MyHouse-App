// import React, { useState } from "react";
// import {
//   StyleSheet,
//   View,
//   ScrollView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { Screen, Text, Header, TextField } from "../../../Components";
// import { colors, spacing, typography, adjustSize } from "../../../theme";
// import DropdownComponent from "../../../Components/DropDown";
// import { WithLocalSvg } from "react-native-svg/css";
// import { Images } from "../../../assets/Images";
// import { DrawerActions, useNavigation } from "@react-navigation/native";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { AdminStackParamList } from "../../../utils/interfaces";
// type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;
// type TabType = "Active" | "History";

// const propertyGroupOptions = [
//   { label: "All Properties", value: "all" },
//   { label: "Farm House", value: "farm_house" },
//   { label: "Town House", value: "town_house" },
//   { label: "Villa", value: "villa" },
// ];

// const sortOptions = [
//   { label: "Name A-Z", value: "name_asc" },
//   { label: "Name Z-A", value: "name_desc" },
//   { label: "Date Added", value: "date_added" },
//   { label: "Status", value: "status" },
// ];

// const visitorData = [
//   {
//     id: 1,
//     name: "Ethan Baker",
//     property: "Farm House",
//     status: "Pending",
//     avatar: "E",
//     backgroundColor: "#E8E8E8",
//     textColor: "#333",
//   },
//   {
//     id: 2,
//     name: "Brume Djbah",
//     property: "Farm House",
//     status: "Pending",
//     avatar: "B",
//     backgroundColor: "#292766",
//     textColor: "#FFF",
//   },
//   {
//     id: 3,
//     name: "Ethan Baker",
//     property: "Farm House",
//     status: "Pending",
//     avatar: "E",
//     backgroundColor: "#E8E8E8",
//     textColor: "#333",
//   },
//   {
//     id: 4,
//     name: "Brume Djbah",
//     property: "Farm House",
//     status: "Pending",
//     avatar: "B",
//     backgroundColor: "#292766",
//     textColor: "#FFF",
//   },
//   {
//     id: 5,
//     name: "Ethan Baker",
//     property: "Farm House",
//     status: "Pending",
//     avatar: "E",
//     backgroundColor: "#E8E8E8",
//     textColor: "#333",
//   },
//   {
//     id: 6,
//     name: "Brume Djbah",
//     property: "Farm House",
//     status: "Pending",
//     avatar: "B",
//     backgroundColor: "#292766",
//     textColor: "#FFF",
//   },
// ];

// export const AdminVisitorsList: React.FC = () => {
//   const navigation = useNavigation<NavigationProp>();
//   const [activeTab, setActiveTab] = useState<TabType>("Active");
//   const [propertyGroup, setPropertyGroup] = useState<string>("all");
//   const [sortBy, setSortBy] = useState<string>("name_asc");
//   const handleVisitorPress = (visitorId: number) => {
//     navigation.navigate("AdminVisitorDetails", {
//       visitorId: visitorId.toString(),
//     });
//   };

//   return (
//     <Screen
//       preset="fixed"
//       safeAreaEdges={["top"]}
//       contentContainerStyle={styles.container}
//     >
//       <Header
//         leftAccessory={
//           <TouchableOpacity
//             activeOpacity={0.5}
//             onPress={() =>
//               (navigation as any)
//                 .getParent?.("AdminDrawer")
//                 ?.dispatch(DrawerActions.openDrawer())
//             }
//           >
//             <WithLocalSvg asset={Images.user} />
//           </TouchableOpacity>
//         }
//         centerAccessory={
//           <Text
//             weight="semiBold"
//             style={{ fontSize: adjustSize(15), color: colors.primary }}
//           >
//             Visitor Management
//           </Text>
//         }
//         rightAccessory={
//           <View style={styles.headerRightContainer}>
//             <TouchableOpacity activeOpacity={0.5}>
//               <WithLocalSvg asset={Images.notofication} />
//             </TouchableOpacity>
//           </View>
//         }
//       />

//       {/* Tabs */}
//       <View style={styles.tabsContainer}>
//         <TouchableOpacity
//           style={[styles.tab, activeTab === "Active" && styles.activeTab]}
//           onPress={() => setActiveTab("Active")}
//         >
//           <Image
//             source={Images.activevisit}
//             style={{
//               height: adjustSize(24),
//               width: adjustSize(24),
//               tintColor: activeTab === "Active" ? colors.primary : colors.white,
//             }}
//           />
//           <Text
//             style={[
//               styles.tabText,
//               {
//                 color: activeTab === "Active" ? colors.primary : colors.white,
//               },
//             ]}
//             weight={activeTab === "Active" ? "semiBold" : "medium"}
//           >
//             Active
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.tab, activeTab === "History" && styles.activeTab]}
//           onPress={() => setActiveTab("History")}
//         >
//           <Image
//             source={Images.visithistory}
//             style={{
//               height: adjustSize(24),
//               width: adjustSize(24),
//               tintColor:
//                 activeTab === "History" ? colors.primary : colors.white,
//             }}
//           />
//           <Text
//             style={[
//               styles.tabText,
//               {
//                 color: activeTab === "History" ? colors.primary : colors.white,
//               },
//             ]}
//             weight={activeTab === "History" ? "semiBold" : "medium"}
//           >
//             History
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Search and Filters */}
//       <View style={styles.filtersContainer}>
//         <View style={styles.searchDropdownContainer}>
//           <DropdownComponent
//             data={propertyGroupOptions}
//             value={propertyGroup}
//             onChangeValue={setPropertyGroup}
//             placeholder="Search Property Group"
//             dropdownStyle={styles.searchDropdown}
//             placeholderStyle={styles.dropdownPlaceholder}
//             selectedTextStyle={styles.dropdownSelected}
//           />
//         </View>

//         <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => {
//             navigation.navigate("AdminGenerateVisitorRequest");
//           }}
//         >
//           <WithLocalSvg asset={Images.addprop} />
//         </TouchableOpacity>
//       </View>

//       {/* Property Group Label and Sort */}
//       <View style={styles.listHeader}>
//         <Text style={styles.propertyGroupLabel} weight="semiBold">
//           Visitor List
//         </Text>
//         <View style={styles.sortContainer}>
//           <DropdownComponent
//             data={sortOptions}
//             value={sortBy}
//             onChangeValue={setSortBy}
//             placeholder="Sort by"
//             dropdownStyle={styles.sortDropdown}
//             placeholderStyle={styles.sortPlaceholder}
//             selectedTextStyle={styles.sortSelected}
//           />
//         </View>
//       </View>

//       <TextField
//         placeholder="Search"
//         inputWrapperStyle={{
//           backgroundColor: colors.white,
//           margin: adjustSize(10),
//           width: "94%",
//           alignSelf: "center",
//         }}
//       />

//       {/* Visitor List */}
//       <ScrollView
//         style={styles.listContainer}
//         showsVerticalScrollIndicator={false}
//       >
//         {visitorData.map((visitor, index) => (
//           <TouchableOpacity
//             key={visitor.id}
//             style={[
//               styles.visitorItem,
//               {
//                 backgroundColor: index % 2 === 0 ? "#cacae0" : colors.fill,
//               },
//             ]}
//             onPress={() => handleVisitorPress(visitor.id)}
//           >
//             <View
//               style={[
//                 styles.visitorAvatar,
//                 { backgroundColor: visitor.backgroundColor },
//               ]}
//             >
//               <Text
//                 style={[styles.avatarText, { color: visitor.textColor }]}
//                 weight="semiBold"
//               >
//                 {visitor.avatar}
//               </Text>
//             </View>

//             <View style={styles.visitorInfo}>
//               <Text style={styles.statusText}>{visitor.status}</Text>

//               <Text style={styles.visitorName} weight="semiBold">
//                 {visitor.name}
//               </Text>
//               <Text style={styles.visitorProperty} weight="medium">
//                 Property:
//                 <Text style={{ color: colors.white }}>
//                   {` `}
//                   {visitor.property}
//                 </Text>
//               </Text>
//             </View>

//             <View style={styles.statusContainer}></View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     </Screen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.fill,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.md,
//     backgroundColor: colors.fill,
//   },
//   profileSection: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   profileAvatar: {
//     width: adjustSize(40),
//     height: adjustSize(40),
//     borderRadius: adjustSize(20),
//     marginRight: spacing.sm,
//     overflow: "hidden",
//   },
//   avatarImage: {
//     width: "100%",
//     height: "100%",
//   },
//   headerTitle: {
//     fontSize: adjustSize(18),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.semiBold,
//   },
//   notificationIcon: {
//     padding: spacing.xs,
//   },
//   tabsContainer: {
//     flexDirection: "row",
//     backgroundColor: "#dedfef",
//   },
//   tab: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: spacing.sm,
//   },
//   activeTab: {
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     // elevation: 2,
//     borderBottomWidth: 3,
//     borderColor: colors.primary,
//     backgroundColor: "#dedfef",
    
//   },
//   tabText: {
//     fontSize: adjustSize(12),
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   filtersContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: adjustSize(10),
//     paddingVertical: spacing.md,
//     gap: spacing.sm,
//   },
//   searchDropdownContainer: {
//     flex: 1,
//   },
//   searchDropdown: {
//     height: adjustSize(48),
//     borderRadius: adjustSize(10),
//     backgroundColor: "#6369A4",
//     paddingHorizontal: spacing.sm,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   dropdownPlaceholder: {
//     fontSize: adjustSize(12),
//     color: colors.white,
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   dropdownSelected: {
//     fontSize: adjustSize(12),
//     color: colors.white,
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   addButton: {
//     width: adjustSize(48),
//     height: adjustSize(48),
//     borderRadius: adjustSize(10),
//     backgroundColor: colors.primary,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   listHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: spacing.lg,
//     paddingVertical: spacing.sm,
//   },
//   propertyGroupLabel: {
//     fontSize: adjustSize(16),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.semiBold,
//   },
//   sortContainer: {
//     minWidth: 120,
//   },
//   sortDropdown: {
//     height: adjustSize(35),
//     borderRadius: adjustSize(100),
//     backgroundColor: "#6369A4",
//   },
//   sortPlaceholder: {
//     fontSize: adjustSize(11),
//     color: colors.white,
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   sortSelected: {
//     fontSize: adjustSize(11),
//     color: colors.white,
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   listContainer: {
//     flex: 1,
//   },
//   visitorItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: colors.white,
//     padding: spacing.md,
//   },
//   visitorAvatar: {
//     width: adjustSize(50),
//     height: adjustSize(50),
//     borderRadius: adjustSize(25),
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: spacing.md,
//   },
//   avatarText: {
//     fontSize: adjustSize(18),
//     fontFamily: typography.fonts.poppins.semiBold,
//   },
//   visitorInfo: {
//     flex: 1,
//   },
//   visitorName: {
//     fontSize: adjustSize(14),
//     color: colors.primary,
//     fontFamily: typography.fonts.poppins.semiBold,
//     marginBottom: 2,
//   },
//   visitorProperty: {
//     fontSize: adjustSize(12),
//     color: colors.white,
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   statusContainer: {
//     paddingHorizontal: spacing.sm,
//     paddingVertical: spacing.xs,
//   },
//   statusText: {
//     fontSize: adjustSize(11),
//     color: "#FF6B35",
//     fontFamily: typography.fonts.poppins.medium,
//   },
//   headerinfo: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   _welcomtext: {
//     color: colors.grey,
//     fontSize: adjustSize(10),
//     lineHeight: adjustSize(12),
//   },
//   username: {
//     fontSize: adjustSize(15),
//     color: colors.primary,
//     lineHeight: adjustSize(20),
//   },
//   role: {
//     fontSize: adjustSize(10),
//     lineHeight: adjustSize(14),
//   },
//   headerIcons: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerIcon: {
//     marginRight: 16,
//   },
//   headerRightContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: spacing.sm,
//   },
//   generateButton: {
//     backgroundColor: colors.primary,
//     paddingHorizontal: spacing.sm,
//     paddingVertical: spacing.xs,
//     borderRadius: adjustSize(6),
//   },
//   generateButtonText: {
//     color: colors.white,
//     fontSize: adjustSize(12),
//     fontFamily: typography.fonts.poppins.medium,
//   },
// });
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert
} from "react-native";
import { Screen, Text, Header2, TextField } from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AdminStackParamList } from "../../../utils/interfaces";
import { Entypo } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";

type NavigationProp = NativeStackNavigationProp<AdminStackParamList>;
type TabType = "Active" | "History";

const propertyGroupOptions = [
  { label: "All Properties", value: "all" },
  { label: "Farm House", value: "farm_house" },
  { label: "Town House", value: "town_house" },
  { label: "Villa", value: "villa" },
];

const sortOptions = [
  { label: "Name A-Z", value: "name_asc" },
  { label: "Name Z-A", value: "name_desc" },
  { label: "Date Added", value: "date_added" },
  { label: "Status", value: "status" },
];

export const AdminVisitorsList: React.FC = () => {
  const navigation:any = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>("Active");
  const [propertyGroup, setPropertyGroup] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
    const [revokeModalVisible, setRevokeModalVisible] = useState(false);
    const [alertModalVisible, setAlertModalVisible] = useState(false);
  
  const [visitorData, setvisitorData] = useState([
    {
      id: 1,
      name: "Ethan Baker",
      property: "Farm House",
      status: "Pending",
      avatar: "E",
      backgroundColor: "#E8E8E8",
      textColor: "#333",
    },
    {
      id: 2,
      name: "Brume Djbah",
      property: "Farm House",
      status: "Pending",
      avatar: "B",
      backgroundColor: "#292766",
      textColor: "#FFF",
    },
    {
      id: 3,
      name: "Ethan Baker",
      property: "Farm House",
      status: "Pending",
      avatar: "E",
      backgroundColor: "#E8E8E8",
      textColor: "#333",
    },
    {
      id: 4,
      name: "Brume Djbah",
      property: "Farm House",
      status: "Pending",
      avatar: "B",
      backgroundColor: "#292766",
      textColor: "#FFF",
    },
    {
      id: 5,
      name: "Ethan Baker",
      property: "Farm House",
      status: "Pending",
      avatar: "E",
      backgroundColor: "#E8E8E8",
      textColor: "#333",
    },
    {
      id: 6,
      name: "Brume Djbah",
      property: "Farm House",
      status: "Pending",
      avatar: "B",
      backgroundColor: "#292766",
      textColor: "#FFF",
    },
  ]);
  const handleVisitorPress = (visitorId: number) => {
    navigation.navigate("AdminVisitorDetails", {
      visitorId: visitorId.toString(),
      type:"visitors"
    });
  };

  const filterData = visitorData.filter((item) => {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
const confirmAlertSecurity = () => {
    setAlertModalVisible(false);
    Alert.alert(
      "Security Alerted",
      "Security has been cancelled about this visitor.",
    );
  };

  const handleRevoke = () => {
    setRevokeModalVisible(true);
  };

  const confirmRevoke = () => {
    setRevokeModalVisible(false);
    Alert.alert("Access Revoked", "Visitor access has been revoked.");
    navigation.goBack();
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Visitor Management" />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Active" && styles.activeTab]}
          onPress={() => setActiveTab("Active")}
        >
          <Image
            source={Images.activevisit}
            style={{
              height: adjustSize(20),
              width: adjustSize(20),
              tintColor: activeTab === "Active" ? colors.white : colors.white,
            }}
          />
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "Active" ? colors.white : colors.white,
              },
            ]}
            weight={activeTab === "Active" ? "semiBold" : "medium"}
          >
            Active
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "History" && styles.activeTab]}
          onPress={() => setActiveTab("History")}
        >
          <Image
            source={Images.visithistory}
            style={{
              height: adjustSize(20),
              width: adjustSize(20),
              tintColor: activeTab === "History" ? colors.white : colors.white,
            }}
          />
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "History" ? colors.white : colors.white,
              },
            ]}
            weight={activeTab === "History" ? "semiBold" : "medium"}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        <View style={styles.searchDropdownContainer}>
          <DropdownComponent
            data={propertyGroupOptions}
            value={propertyGroup}
            onChangeValue={setPropertyGroup}
            placeholder="Search Property Group"
            dropdownStyle={styles.searchDropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />
        </View>
        {/* 
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("AdminGenerateVisitorRequest");
          }}
        >
          <WithLocalSvg asset={Images.addprop} />
        </TouchableOpacity> */}
      </View>

      {/* <TextField
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        inputWrapperStyle={{
          backgroundColor: colors.white,
          margin: adjustSize(10),
          width: "94%",
          alignSelf: "center",
        }}
      /> */}

      {/* Visitor List */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Property Group Label and Sort */}
        <View style={styles.listHeader}>
          <Text style={styles.propertyGroupLabel} weight="semiBold">
            Visitor List
          </Text>
          <View style={styles.sortContainer}>
            <DropdownComponent
              data={sortOptions}
              value={sortBy}
              onChangeValue={setSortBy}
              placeholder="Select Estate"
              dropdownStyle={styles.sortDropdown}
              placeholderStyle={styles.sortPlaceholder}
              selectedTextStyle={styles.sortSelected}
            />
          </View>
        </View>
        {filterData.map((visitor, index) => (
          <View
            key={visitor.id}
            style={[
              styles.visitorItem,
              menuOpenId === visitor.id && styles.itemRaised,
            ]}
          >
            <View
              style={[
                styles.visitorAvatar,
                // { backgroundColor: visitor.backgroundColor },
              ]}
            >
              <WithLocalSvg asset={Images.profile} />
            </View>

            <View style={styles.visitorInfo}>
              <Text style={styles.visitorName} weight="semiBold">
                {visitor.name}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.visitorProperty} weight="medium">
                  <Text style={styles.propLabel}>Property:</Text>
                  <Text style={styles.propValue}> {visitor.property}</Text>
                </Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>{visitor.status}</Text>
                </View>
              </View>
            </View>

            <View style={styles.rightCol}>
              <TouchableOpacity
                onPress={() =>
                  menuOpenId ? setMenuOpenId(null) : setMenuOpenId(visitor.id)
                }
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.moreBtn}
              >
                <Entypo
                  name="dots-three-vertical"
                  size={18}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>

            {menuOpenId === visitor.id && (
              <View style={styles.menuWrap}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuOpenId(null);
                    handleVisitorPress(visitor.id);
                  }}
                >
                  <Text style={styles.menuText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    handleRevoke(visitor.id);

                    setMenuOpenId(null);
                  }}
                >
                  <Text style={styles.menuText}>Revoke Invitation</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setMenuOpenId(null);
                  }}
                >
                  <Text style={[styles.menuText]}>
                    Alert Security
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
        {/* Revoke Modal */}
      <Modal
        visible={revokeModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRevokeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setRevokeModalVisible(false)}
            >
              <AntDesign name="closecircleo" size={24} color={"#D62828"} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Are you Sure?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to You want to revoke this invitation?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setRevokeModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Yes</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmRevoke}
              >
                <Text style={styles.confirmButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Alert Security Modal */}
      <Modal
        visible={alertModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAlertModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAlertModalVisible(false)}
            >
              <AntDesign name="closecircleo" size={24} color={"#D62828"} />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Are you Sure?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to You want to Alert Security?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setAlertModalVisible(false);
                  Alert.alert(
                    "Security Alerted",
                    "Security has been alerted about this visitor.",
                  );
                }}
              >
                <Text style={styles.alertCancelButtonText}>Alert</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmAlertSecurity}
              >
                <Text style={styles.confirmButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.fill,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: adjustSize(40),
    height: adjustSize(40),
    borderRadius: adjustSize(20),
    marginRight: spacing.sm,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  headerTitle: {
    fontSize: adjustSize(18),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  notificationIcon: {
    padding: spacing.xs,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: colors.primary,

    // padding: spacing.xs,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxs,
    // gap: spacing.xs,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderColor: colors.white,
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: adjustSize(10),
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchDropdownContainer: {
    flex: 1,
  },
  searchDropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    paddingHorizontal: spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.greylight,
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  addButton: {
    width: adjustSize(48),
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  propertyGroupLabel: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  sortContainer: {
    minWidth: 120,
  },
  sortDropdown: {
    height: adjustSize(35),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
  },
  sortPlaceholder: {
    fontSize: adjustSize(11),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  sortSelected: {
    fontSize: adjustSize(11),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  listContainer: {
    // flex: 1,
  },
  visitorItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    borderRadius: adjustSize(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    height: adjustSize(94),
    position: "relative",
  },
  itemRaised: {
    zIndex: 2000,
    elevation: 12,
  },
  visitorAvatar: {
    width: adjustSize(50),
    height: adjustSize(50),
    borderRadius: adjustSize(25),
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.md,
    backgroundColor: colors.primary,
  },
  avatarText: {
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.white,
  },
  visitorInfo: {
    flex: 1,
  },
  visitorName: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: 2,
  },
  visitorProperty: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    flex: 1,
  },
  propLabel: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  propValue: { color: colors.primary },
  statusContainer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusText: {
    fontSize: adjustSize(11),
    color: "#FF6B35",
    fontFamily: typography.fonts.poppins.medium,
  },
  rightCol: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacing.sm,
    position: "absolute",
    top: 10,
    right: 10,
  },
  moreBtn: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
  },
  moreBtnDot: {
    color: colors.primary,
    fontSize: adjustSize(18),
  },
  statusPill: {
    backgroundColor: "#F26938",
    borderRadius: adjustSize(100),
    paddingHorizontal: spacing.md,
    paddingVertical: 3,
  },
  statusPillText: {
    color: colors.white,
    fontSize: adjustSize(11),
    fontFamily: typography.fonts.poppins.medium,
  },
  menuWrap: {
    position: "absolute",
    right: spacing.md,
    top: 45,
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    paddingVertical: spacing.xs,
    minWidth: adjustSize(140),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 3000,
    borderWidth: 0.3,
    borderColor: colors.greylight,
  },
  menuItem: {
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.md,
  },
  menuText: {
    color: colors.primary,
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.normal,
  },
  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
  },
  username: {
    fontSize: adjustSize(15),
    color: colors.primary,
    lineHeight: adjustSize(20),
  },
  role: {
    fontSize: adjustSize(10),
    lineHeight: adjustSize(14),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  generateButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: adjustSize(6),
  },
  generateButtonText: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(16),
    padding: spacing.xl,
    marginHorizontal: spacing.lg,
    minWidth: adjustSize(300),
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: adjustSize(16),
    right: adjustSize(16),
    zIndex: 1,
  },
  modalTitle: {
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.md,
    marginTop: adjustSize(50),
  },
  modalMessage: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    color: colors.primary,
    textAlign: "center",
    marginBottom: spacing.xl,
    lineHeight: adjustSize(20),
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    height: adjustSize(47),
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#FF6B6B",
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
  },
  cancelButtonText: {
    fontSize: adjustSize(14),
    color: "#FF6B6B",
    fontFamily: typography.fonts.poppins.medium,
  },
  alertCancelButtonText: {
    fontSize: adjustSize(14),
    color: "#FF6B6B",
    fontFamily: typography.fonts.poppins.medium,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(47),
  },
  confirmButtonText: {
    fontSize: adjustSize(14),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
});
