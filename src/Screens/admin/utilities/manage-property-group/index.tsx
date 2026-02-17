import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Share,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { adjustSize, colors, spacing, typography } from "../../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";
import {
  Text,
  Screen,
  TextField,
  Header,
  Button,
} from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { AppStackScreenProps } from "../../../../utils/interfaces";
import Entypo from "@expo/vector-icons/Entypo";
import { AdminStackParamList } from "../../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type NavigationProp = {
  navigate: (screen: keyof AdminStackParamList, params?: any) => void;
  goBack: () => void;
};

type GroupsData = {
  id: string;
  title: string;
  groupId: string;
  noOfProp: string;
  noOfTenents: string;
  noOfMeters: string;
  date: string;
};

const groupsData = [
  {
    id: "1",
    title: "G.T Road Properties",
    groupId: "GRP1234",
    noOfProp: "5",
    noOfTenents: "3",
    noOfMeters: "5",
    date: "22 feb , 2025",
    status:"Pending"
  },
  {
    id: "2",
    title: "G.T Road Properties",
    groupId: "GRP1234",
    noOfProp: "5",
    noOfTenents: "3",
    noOfMeters: "5",
    date: "22 feb , 2025",
    status:"Approved"
  },
  {
    id: "3",
    title: "G.T Road Properties",
    groupId: "GRP1234",
    noOfProp: "5",
    noOfTenents: "3",
    noOfMeters: "5",
    date: "22 feb , 2025",
    status:"Approved"
  },
  {
    id: "4",
    title: "G.T Road Properties",
    groupId: "GRP1234",
    noOfProp: "5",
    noOfTenents: "3",
    noOfMeters: "5",
    date: "22 feb , 2025",
    status:"Approved"

  },
  {
    id: "5",
    title: "G.T Road Properties",
    groupId: "GRP1234",
    noOfProp: "5",
    noOfTenents: "3",
    noOfMeters: "5",
    date: "22 feb , 2025",
    status:"Approved"

  },
];

interface AdminPropertyManagementProps extends NativeStackScreenProps<
  AdminStackParamList,
  "AdminManagePropertyGroup"
> {}
export const AdminManagePropertyGroup = ({
  route,
}: AdminPropertyManagementProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const [transactionList, setTransactionList] =
    useState<GroupsData[]>(groupsData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const [signupLink, setSignupLink] = useState<string>("");

  // Handle search functionality
  const filteredGroups = transactionList.filter(
    (transaction) =>
      transaction.date.toLowerCase().includes(search.toLowerCase()) ||
      (transaction.title &&
        transaction.title.toLowerCase().includes(search.toLowerCase())) ||
      (transaction.groupId &&
        transaction.groupId.toLowerCase().includes(search.toLowerCase())),
  );

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const openSignupModal = (group: GroupsData) => {
    // Build a shareable link; adjust domain/path to your backend route if needed
    const link = `https://myhomes.app/resident-signup?estate=${group.groupId}`;
    setSignupLink(link);
    setIsModalVisible(true);
  };

  const copyLink = async () => {
    try {
      await Clipboard.setStringAsync(signupLink);
    } catch {}
  };

  const shareLink = async () => {
    try {
      await Share.share({ message: signupLink });
    } catch {}
  };

  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      <Header
        leftAccessory={
          <TouchableOpacity
            onPress={() =>
              (navigation as any)
                .getParent?.("AdminDrawer")
                ?.dispatch(DrawerActions.openDrawer())
            }
          >
            <WithLocalSvg asset={Images.user} />
          </TouchableOpacity>
        }
        centerAccessory={
          <Text
            text="Estates"
            weight="semiBold"
            style={{ fontSize: adjustSize(15), color: colors.primary }}
          />
        }
 rightAccessory={
          <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        }
      />

      {/* Resident Signup Link Modal */}
      <Modal transparent visible={isModalVisible} animationType="fade">
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { backgroundColor: colors.fill, paddingBottom: adjustSize(20) }] }>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={{
                position: "absolute",
                right: 12,
                top: 12,
                width: 30,
                height: 30,
                borderRadius: 100,
                borderWidth: 1,
                borderColor: "#D62828",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
              }}
            >
              <Text style={{ color: "#D62828", fontSize: adjustSize(14) }}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalText}>Resident Signup Link</Text>

              <TextField
                // style={[styles.input,{
                // }]}
                inputWrapperStyle={{
                  backgroundColor: colors.white,
                  marginHorizontal: 20,
                }}
                value={signupLink}
                editable={false}
                placeholder="https://..."
                placeholderTextColor={colors.grey}
              />

            <TouchableOpacity
              onPress={copyLink}
              style={{ alignSelf: "flex-end", marginRight: adjustSize(20), marginTop: -10 }}
            >
              <Ionicons name="copy-outline" size={18} color={colors.primary} />
            </TouchableOpacity>

            <Button
              text="Share"
              onPress={shareLink}
              style={styles.copyButton}
              preset="reversed"
            />
          </View>
        </View>
      </Modal>
        }
       
      {/* Search Bar */}
      <View style={styles._searchrow}>
        <View style={styles._inputview}>
          <TextField
            placeholderTextColor={colors.primaryLight}
            placeholder="Search"
            style={styles._input}
            value={search}
            onChangeText={(text) => setSearch(text as string)}
            inputWrapperStyle={{ backgroundColor: colors.white }}
          />
        </View>
        <TouchableOpacity
          style={styles._addbtn}
          onPress={() => navigation.navigate("AddGroup", { mode: "add" })}
        >
          <WithLocalSvg asset={Images.addprop} />
        </TouchableOpacity>
      </View>
      {/* Recent Notifications */}
      <View style={styles.section}>
        <View style={styles._seciton_row}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Manage Estates
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

      {/* Transaction List */}
      <FlatList
        data={filteredGroups}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles._card}>
            <View style={styles._cardinfo}>
              <Text weight="semiBold" text={item.title} style={styles._name} />
              <Text style={styles._label}>
                Estate Id:
                <Text style={styles._labelValue}>
                  {` `}
                  {item.groupId}
                </Text>
                <TouchableOpacity onPress={() => null}>
                  <Ionicons
                    name="copy-outline"
                    size={12}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </Text>
              <View style={styles._row}>
                <Text style={styles._label}>
                  No. of Properties:
                  <Text style={styles._labelValue}>
                    {` `}
                    {item.noOfProp}
                  </Text>
                </Text>
                {console.log(item.status)}

                <View style={[styles.statusPill,{
                  backgroundColor:item.status === "Approved" ? "#0AD029":"#F26938"
                }]}>
                  <Text text={item.status} style={styles.statusPillText} />
                </View>
              </View>

              <View style={styles._row}>
                <Text style={styles._label}>
                  No. of Residents:
                  <Text style={styles._labelValue}>
                    {` `}
                    {item.noOfTenents}
                  </Text>
                </Text>

                <Text style={[styles._label, { color: colors.primary }]}>
                  Date Created:
                  <Text style={styles._labelValue}>
                    {` `}
                    22 feb , 2025
                  </Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() =>
                setDropdownVisible(
                  dropdownVisible === parseInt(item.id)
                    ? null
                    : parseInt(item.id),
                )
              }
            >
              <Entypo
                name="dots-three-vertical"
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>
            {dropdownVisible === parseInt(item.id) && (
              <View style={styles.menuBox}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setDropdownVisible(null);
                    navigation.navigate("ViewPropertiesGroups", {
                      group: item,
                    });
                  }}
                >
                  <Text style={styles.menuText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setDropdownVisible(null);
                    navigation.navigate("EditGroup", {
                      mode: "edit",
                      group: item,
                    });
                  }}
                >
                  <Text style={[styles.menuText]}>Edit</Text>
                </TouchableOpacity>
                 <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => {
                    setDropdownVisible(null);
                    openSignupModal(item);
                  }}
                >
                  <Text style={[styles.menuText]}>Generate Resident Sign-up Link</Text>
                </TouchableOpacity>


                
              </View>
            )}
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(15),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    marginBottom: adjustSize(3),
    paddingHorizontal: adjustSize(10),
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginRight: 16,
  },

  section: {
    marginHorizontal: adjustSize(10),
    marginBottom: adjustSize(15),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
  },

  headerinfo: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  _welcomtext: {
    color: colors.grey,
    fontSize: adjustSize(10),
    lineHeight: adjustSize(12),
  },

  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownContainer: {
    width: adjustSize(120),
  },
  customDropdownStyle: {
    height: adjustSize(33),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
  },
  customPlaceholderStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  customSelectedTextStyle: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  _searchrow: {
    flexDirection: "row",
    marginHorizontal: adjustSize(10),
    marginVertical: adjustSize(15),
    alignItems: "center",
  },
  _addbtn: {
    backgroundColor: colors.primary,
    width: adjustSize(45),
    height: adjustSize(45),
    borderRadius: adjustSize(8),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: adjustSize(10),
    marginBottom: 25,
  },
  _input: {
    margin: 0,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(14),
  },
  _inputview: {
    flex: 1,
  },
  list: {
    marginTop: adjustSize(12),
  },
  listContent: {
    paddingBottom: 50,
  },
  card: {
    backgroundColor: colors.fill,
    padding: adjustSize(10),
    minHeight: adjustSize(96),
    zIndex: 1,
    shadowColor: "#000",
    borderBottomWidth: 0.4,
    borderColor: colors.grey,
    paddingVertical: adjustSize(15),
  },
  cardWithDropdown: {
    zIndex: 9999,
    elevation: 0,
    shadowOpacity: 0,
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 1,
  },
  cardTitle: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(15),
  },
  subtitle: {
    color: colors.grey,
    fontSize: adjustSize(10),
  },

  label: {
    color: colors.primary,
    fontSize: adjustSize(10),
    zIndex: -1,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: spacing.sm,
    zIndex: -1,
  },
  labelValue: {
    color: colors.primary,
    fontSize: adjustSize(10),
    zIndex: -1,
  },
  dropdown: {
    minWidth: adjustSize(120),
    height: adjustSize(33),
    borderRadius: 100,
    backgroundColor: colors.primaryLight,
  },
  dropdownMenu: {
    position: "absolute",
    top: adjustSize(25),
    shadowColor: "transparent",
    right: 0,
    backgroundColor: colors.white,
    borderRadius: adjustSize(8),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
    zIndex: 10000,
    minWidth: adjustSize(160),
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(10),
  },
  dropdownText: {
    marginLeft: adjustSize(8),
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  address: {
    color: colors.primaryLight,
  },
  statusContainer: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  statusText: {
    fontSize: adjustSize(10),
    color: "#FF6B35",
    fontFamily: typography.fonts.poppins.medium,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalText: {
    textAlign: "center",
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    padding: adjustSize(20),
    marginTop: adjustSize(30),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: adjustSize(16),
    color: colors.text,
    height: adjustSize(47),
  },
  copyButton: {
    width: "90%",
    margin: adjustSize(20),
    alignSelf: "center",
  },
  _card: {
    padding: adjustSize(10),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: adjustSize(8),
    marginBottom: adjustSize(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 12,
  },
  _cardinfo: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
  },
  _date: {
    color: "#7E7E7E",
    fontSize: adjustSize(10),
  },
  _price: {
    color: "#292766",
    paddingVertical: adjustSize(5),
    fontSize: adjustSize(14),
  },
  _type: {
    color: colors.primary,
    fontSize: adjustSize(10),
  },
  menuButton: {
    padding: adjustSize(4),
    position:"absolute",
    top:10,
    right:10
  },
  menuBox: {
    position: "absolute",
    right: 30,
    top: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 3000,
    minWidth: 180,
    borderWidth:0.4,
    borderColor:colors.border ,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
  },
  _subtitle: {
    color: "#4CAF50",
    fontSize: adjustSize(12),
    textAlign: "center",
  },
  _divider: {
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
    marginVertical: adjustSize(20),
  },
  _label: {
    color: colors.primary,
    fontSize: adjustSize(11),
    fontFamily: typography.fonts.poppins.medium,
  },
  _labelValue: {
    color: colors.textDim,
    fontSize: adjustSize(11),
    paddingVertical: adjustSize(5),
  },
  amount: {
    textAlign: "center",
    fontSize: adjustSize(20),
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: adjustSize(20),
  },
  _rowlabel: {
    color: colors.primary,
    fontSize: adjustSize(10),
    textAlign: "center",
    paddingVertical: adjustSize(5),
  },
  _rowvalue: {
    color: "#7E7E7E",
    fontSize: adjustSize(10),
    textAlign: "center",
    paddingVertical: adjustSize(5),
  },
  _name: {
    fontSize: adjustSize(14),
    marginBottom: 4,
    color: colors.primary,
  },
  statusPill: {
    borderRadius: adjustSize(100),
    paddingHorizontal: spacing.md,
    paddingVertical: 2,
    marginBottom:5
  },
  statusPillText: {
    color: colors.white,
    fontSize: adjustSize(11),
    fontFamily: typography.fonts.poppins.medium,
  },
});
