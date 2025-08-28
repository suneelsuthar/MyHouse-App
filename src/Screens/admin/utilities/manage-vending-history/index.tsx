import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
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
type NavigationProp = {
  navigate: (screen: keyof AdminStackParamList, params?: any) => void;
  goBack: () => void;
};

type TrnasData = {
  id: string;
  date: string;
  amount: string;
  type: string;
  status: string;
  token: string;
  units: string;
};

const transactionData = [
  {
    id: "1",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "2",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "3",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "4",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
  {
    id: "5",
    date: "20 Feb , 2025",
    amount: "₦ 15,00,000",
    type: "Utility Bill Payment",
    status: "Active",
    token: "T0001",
    units: "250Kwh",
  },
];

interface AdminPropertyManagementProps
  extends AppStackScreenProps<"AdminPropertyManagement"> {}
export const AdminManageVendingHistory = ({
  route,
}: AdminPropertyManagementProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const [transactionList, setTransactionList] =
    useState<TrnasData[]>(transactionData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  // Handle search functionality
  const filteredTransactions = transactionList.filter(
    (transaction) =>
      transaction.date.toLowerCase().includes(search.toLowerCase()) ||
      (transaction.amount &&
        transaction.amount.toLowerCase().includes(search.toLowerCase())) ||
      (transaction.type &&
        transaction.type.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCloseModal = () => {
    setIsModalVisible(false);
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
            text="Vending History"
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles._topdropdown}>
          <DropdownComponent
            data={[
              { label: "102", value: "102" },
              { label: "103", value: "103" },
              { label: "104", value: "104" },
            ]}
            label="Select Period"
            placeholder="Sort by"
            dropdownStyle={{ backgroundColor: "#6369A4" }}
          />
        </View>

        {/* Recent Notifications */}
        <View style={styles.section}>
          <View style={styles._seciton_row}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              Vending History
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
        </View>

        {/* Transaction List */}
        <FlatList
          data={filteredTransactions}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles._card}>
              <WithLocalSvg asset={Images.thistory} />
              <View style={styles._cardinfo}>
                <Text text="20 Feb , 2025" style={styles._date} />
                <Text
                  weight="semiBold"
                  text="15,00,000"
                  style={styles._price}
                />
                <Text text="Utility Bill Payment" style={styles._type} />
              </View>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() =>
                  setDropdownVisible(
                    dropdownVisible === parseInt(item.id)
                      ? null
                      : parseInt(item.id)
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
                      setIsModalVisible(true);
                    }}
                  >
                    <Text style={styles.menuText}>View Details</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => {
                      setDropdownVisible(null);
                      setIsModalVisible(true);
                    }}
                  >
                    <Text style={[styles.menuText]}>Download</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Ionicons
                name="close-circle"
                size={adjustSize(40)}
                color={colors.error}
              />
            </TouchableOpacity>
            <Text style={styles.modalText}>Vending Information</Text>
            <Text
              text="On February 20, 2025 at 09:06 am"
              style={styles._subtitle}
            />
            <View style={styles._divider} />
            <Text text="Amount" style={styles._label} />
            <Text
              weight="semiBold"
              text="₦ 15,00,000"
              style={[styles.amount, { lineHeight: 26 }]}
            />

            <View style={styles._divider} />
            <View style={styles._row}>
              <Text text="Token: " style={styles._rowlabel} />
              <Text text="T0001" style={styles._rowvalue} />
            </View>
            <View style={styles._row}>
              <Text text="Units: " style={styles._rowlabel} />
              <Text text="250Kwh" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Utility Type:" style={styles._rowlabel} />
              <Text text="Electric" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Tenant:" style={styles._rowlabel} />
              <Text text="John Doe" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Property Group:" style={styles._rowlabel} />
              <Text text="Apartment" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Property Name/ ID:" style={styles._rowlabel} />
              <Text text="B1234556" style={styles._rowvalue} />
            </View>

            <View style={styles._row}>
              <Text text="Meter Number:" style={styles._rowlabel} />
              <Text text="MTR34556" style={styles._rowvalue} />
            </View>

            <Button
              text="Download Receipt"
              preset="reversed"
              style={styles.copyButton}
            />
          </View>
        </View>
      </Modal>
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
  },
  _addbtn: {
    backgroundColor: colors.primary,
    width: adjustSize(40),
    height: adjustSize(40),
    borderRadius: adjustSize(8),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: adjustSize(10),
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
    fontSize: adjustSize(15),
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
    borderBottomWidth: 0.6,
    borderColor: colors.grey,
    padding: adjustSize(10),
    flexDirection: "row",
    alignItems: "center",
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
  },
  menuBox: {
    position: "absolute",
    right: 10,
    top: 40,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing.xs,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 180,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: adjustSize(14),
    color: colors.text,
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
    color: "#7E7E7E",
    fontSize: adjustSize(12),
    textAlign: "center",
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
    paddingHorizontal: adjustSize(20),
  },
  _rowlabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    textAlign: "center",
    paddingVertical: adjustSize(5),
  },
  _rowvalue: {
    color: "#7E7E7E",
    fontSize: adjustSize(12),
    textAlign: "center",
    paddingVertical: adjustSize(5),
  },
  _topdropdown: {
    padding: adjustSize(10),
  },
});
