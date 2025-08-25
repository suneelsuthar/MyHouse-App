import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import {
  Screen,
  Text,
  Header2,
  CustomTabs,
  TextField,
} from "../../../Components";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { useNavigation } from "@react-navigation/native";
import { AmenitiesIcon, ReservationsIcon } from "../../../assets/svg";
import { WithLocalSvg } from "react-native-svg/css";
import DropdownComponent from "../../../Components/DropDown";
import { Images } from "../../../assets/Images";
import GroupDropdown from "../../../Components/GroupDropdwon";
import { AmenitiesCard } from "./components/AmenitiesCard";
import { ReservationsCard } from "./components/ReservationsCard";
import SmallCustomModal from "../../../Components/SmallCustomModal";
type Props = AppStackScreenProps<"AdminCommunityArea">;
export function AdminCommunityArea({ route }: Props) {
  const navigation = useNavigation();
  const status = route?.params?.tab;
  const titleMap: Record<string, string> = {
    amenities: "Amenities",
    reservations: "Reservations",
  };
  const [activeTab, setActiveTab] = useState(titleMap[status]); // 🔹 string state
  const [search, setSearch] = useState<string>("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [amenityDeleteModal, setAmenityDeleteModal] = useState(false);
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
      title: "Swimming pool",
      groupId: "WR12345",
      propertyGroupName: "Brume Villa",
      amenity: "lorem ipsum",
      capacity: "Apartment",
      dateAdded: "15, Sep 2024",
    },
    {
      id: "2",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      title: "Swimming pool",
      groupId: "WR12345",
      propertyGroupName: "Brume Villa",
      amenity: "lorem ipsum",
      capacity: "Apartment",
      dateAdded: "15, Sep 2024",
    },
    {
      id: "3",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOTPx6TYdaoXzzjyDEf-ewcFcp5jSDci_UKA&s",
        "https://s3-blog.homelane.com/design-ideas-pre/wp-content/uploads/2022/11/bungalow-interiors.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzVqHZTNS6QQZP8BbaSMAdFQWJSX-WFKy_5w&s",
      ],
      title: "Swimming pool",
      groupId: "WR12345",
      propertyGroupName: "Brume Villa",
      amenity: "lorem ipsum",
      capacity: "Apartment",
      dateAdded: "15, Sep 2024",
    },
  ];
  const ReservationsCardData = [
    {
      name: "John Doe",
      swimmingPool: "Shortlet",
      reservationID: "RES123456",
      amenity: "lorem ipsum",
      reservationDate: "15, Sep 2024",
      dateCreated: "15, Sep 2024",
    },
    {
      name: "John Doe",
      swimmingPool: "Shortlet",
      reservationID: "RES123456",
      amenity: "lorem ipsum",
      reservationDate: "15, Sep 2024",
      dateCreated: "15, Sep 2024",
    },
    {
      name: "John Doe",
      swimmingPool: "Shortlet",
      reservationID: "RES123456",
      amenity: "lorem ipsum",
      reservationDate: "15, Sep 2024",
      dateCreated: "15, Sep 2024",
    },
    {
      name: "John Doe",
      swimmingPool: "Shortlet",
      reservationID: "RES123456",
      amenity: "lorem ipsum",
      reservationDate: "15, Sep 2024",
      dateCreated: "15, Sep 2024",
    },
    {
      name: "John Doe",
      swimmingPool: "Shortlet",
      reservationID: "RES123456",
      amenity: "lorem ipsum",
      reservationDate: "15, Sep 2024",
      dateCreated: "15, Sep 2024",
    },
  ];
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Community Area" onNotificationPress={() => {}} />
      <CustomTabs
        tabs={[
          {
            label: "Amenities",
            activeIcon: <AmenitiesIcon color={colors.primary} />,
            inactiveIcon: <AmenitiesIcon color={colors.white} />,
          },
          {
            label: "Reservations",
            activeIcon: <ReservationsIcon color={colors.primary} />,
            inactiveIcon: <ReservationsIcon color={colors.white} />,
          },
        ]}
        activeTab={activeTab}
        onTabChange={(label) => setActiveTab(label)}
      >
        <View style={[styles._searchrow, { marginTop: adjustSize(15) }]}>
          <View style={styles._inputview}>
            {activeTab === "Amenities" ? (
              <GroupDropdown />
            ) : (
              <TextField
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={{ backgroundColor: colors.fill }}
                placeholder="Search"
                style={styles._input}
              />
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles._addbtn}
            onPress={() =>
              (navigation as any).navigate("AdminAddProperty" as never)
            }
          >
            <WithLocalSvg asset={Images.addprop} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <View style={styles._seciton_row}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              {activeTab === "Amenities" ? "Manage Amenities" : "Reservations"}
            </Text>
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                data={[
                  { label: "A", value: "A" },
                  { label: "B", value: "B" },
                  { label: "C", value: "C" },
                ]}
                label="Select Period"
                placeholder="Sort by"
                dropdownStyle={styles.customDropdownStyle}
                placeholderStyle={styles.customPlaceholderStyle}
                selectedTextStyle={styles.customSelectedTextStyle}
              />
            </View>
          </View>
          {/* ÷÷ */}
        </View>

        {activeTab === "Amenities" && (
          <View style={styles._searchrow}>
            <View style={styles._inputview}>
              <TextField
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={{ backgroundColor: colors.white }}
                placeholder="Search"
                style={styles._input}
              />
            </View>
          </View>
        )}
        {/* List */}
        <FlatList
          data={activeTab === "Amenities" ? data : ReservationsCardData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) =>
            activeTab === "Amenities" ? (
              <AmenitiesCard
                property={item}
                activeTab={activeTab}
                onAction={(action, property) => {
                  if (action === "Delete") {
                    setAmenityDeleteModal(true);
                  } else if (action === "View") {
                    (navigation as any).navigate("AdminAmenityView");
                  } else if (action === "Edit") {
                    (navigation as any).navigate("AdminAmenityEdit");
                  } else if (action === "Make reservations") {
                    (navigation as any).navigate("AdminAmenityMakeReservation");
                  } else if (action === "Manage Calendar") {
                    (navigation as any).navigate("AdminAmenityManageCalendar");
                  }
                }}
                style={{
                  backgroundColor: index % 2 === 0 ? "#dedff0" : "transparent",
                }}
              />
            ) : (
              <ReservationsCard
                property={item}
                activeTab={activeTab}
                onAction={(action, property) => {
                  if (action === "View") {
                    (navigation as any).navigate("AdminReservationView");
                  } else if (action === "Confirm") {
                    setConfirmModal(true);
                  } else if (action === "Reject") {
                    setRejectModal(true);
                  } else if (action === "Delete") {
                    setDeleteModal(true);
                  }
                }}
                style={{
                  backgroundColor: index % 2 === 0 ? "#dedff0" : "transparent",
                }}
              />
            )
          }
          //  style={styles.list}
        />
      </CustomTabs>

      {/* Amenities Modal */}
      <SmallCustomModal
        visible={amenityDeleteModal}
        heading="Are you Sure?"
        text={`Are you sure You want to delete this \ Amenity?`}
        modalType={1}
        onClose={() => setAmenityDeleteModal(false)}
        leftOnPress={() => setAmenityDeleteModal(false)}
        rightOnPress={() => setAmenityDeleteModal(false)}
      />
      {/* Reservations Modal */}
      <SmallCustomModal
        visible={confirmModal}
        heading="Are you Sure?"
        text="Are you sure you want to Confirm this Reservation?"
        modalType={1}
        onClose={() => setConfirmModal(false)}
        leftOnPress={() => setConfirmModal(false)}
        rightOnPress={() => setConfirmModal(false)}
      />
      <SmallCustomModal
        visible={rejectModal}
        heading="Are you Sure?"
        text="Are you sure you want to Reject this Reservation?"
        modalType={2}
        onClose={() => setRejectModal(false)}
        leftOnPress={() => setRejectModal(false)}
        rightOnPress={() => setRejectModal(false)}
      />
      <SmallCustomModal
        visible={deleteModal}
        heading="Are you Sure?"
        text="Are you sure you want to Delete this Reservation?"
        modalType={2}
        onClose={() => setDeleteModal(false)}
        leftOnPress={() => setDeleteModal(false)}
        rightOnPress={() => setDeleteModal(false)}
      />
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
    marginTop: adjustSize(10),
    marginBottom: adjustSize(15),
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
  _searchrow: {
    flexDirection: "row",
    gap: adjustSize(10),
    marginHorizontal: adjustSize(10),
    // marginTop: adjustSize(15),
  },
  _addbtn: {
    backgroundColor: colors.primary,
    height: adjustSize(47),
    width: adjustSize(50),
    borderRadius: adjustSize(10),
    justifyContent: "center",
    alignItems: "center",
  },

  _input: {
    margin: 0,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(14),
  },
  _inputview: {
    flex: 1,
    padding: 0,
  },
});
