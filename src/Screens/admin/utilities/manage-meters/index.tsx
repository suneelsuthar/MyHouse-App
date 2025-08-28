import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
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
import { MeterCard } from "../../../../Components/MeterCard";
import { rentalProperties } from "../../../../utils/data";
import Entypo from "@expo/vector-icons/Entypo";
import { AdminStackParamList } from "../../../../utils/interfaces";
import { Ionicons } from "@expo/vector-icons";
import Clipboard from "@react-native-clipboard/clipboard";
type NavigationProp = {
  navigate: (screen: keyof AdminStackParamList, params?: any) => void;
  goBack: () => void;
};

type MeterData = {
  id: string;
  meterName: string;
  tenent: string;
  status: string;
  manufacturer: string | number;
  meterType: string;
  groupId: string;
  propertyId: string;
  meterId: string;
};

const meterData = [
  {
    id: "1",
    meterName: "Meter ID",
    tenent: "John Doe",
    status: "Active",
    manufacturer: 50,
    meterType: "Water",
    groupId: "334656",
    propertyId: "3",
    meterId: "MTR-001",
  },
  {
    id: "2",
    meterName: "Meter ID",
    tenent: "John Doe",
    status: "Active",
    manufacturer: 50,
    meterType: "Water",
    groupId: "334656",
    propertyId: "3",
    meterId: "MTR-001",
  },
  {
    id: "3",
    meterName: "Meter ID",
    tenent: "John Doe",
    status: "Active",
    manufacturer: 50,
    meterType: "Water",
    groupId: "334656",
    propertyId: "3",
    meterId: "MTR-001",
  },
  {
    id: "4",
    meterName: "Meter ID",
    tenent: "John Doe",
    status: "Active",
    manufacturer: 50,
    meterType: "Water",
    groupId: "334656",
    propertyId: "3",
    meterId: "MTR-001",
  },
  {
    id: "5",
    meterName: "Meter ID",
    tenent: "John Doe",
    status: "Active",
    manufacturer: 50,
    meterType: "Water",
    groupId: "334656",
    propertyId: "3",
    meterId: "MTR-001",
  },
];

interface AdminPropertyManagementProps
  extends AppStackScreenProps<"AdminPropertyManagement"> {}
export const AdminManageMeters = ({ route }: AdminPropertyManagementProps) => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");
  const [meterList, setMeterList] = useState<MeterData[]>(meterData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeter, setSelectedMeter] = useState<MeterData | null>(null);
  const [temperToken, setTemperToken] = useState("1234 5678 9101 1121"); // Dummy token

  const copyToClipboard = () => {
    // Clipboard.setString(temperToken);
    setIsModalVisible(false);
  };

  // Handle search functionality
  const filteredMeters = meterList.filter(
    (meter) =>
      meter.meterName.toLowerCase().includes(search.toLowerCase()) ||
      (meter.meterId &&
        meter.meterId.toLowerCase().includes(search.toLowerCase())) ||
      (meter.tenent &&
        meter.tenent.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddMeter = () => {
    navigation.navigate("EditCreateMeter", { mode: "add" });
  };

  const handleViewMeter = (meter: MeterData) => {
    navigation.navigate("ViewMeterDetails", { meter });
  };

  const handleEditMeter = (meter: MeterData) => {
    navigation.navigate("EditCreateMeter", { mode: "edit", meterId: meter.id });
  };

  const handleClearTember = (meter: MeterData) => {
    setSelectedMeter(meter);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMeter(null);
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
            text="Utilities"
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

      {/* Recent Notifications */}
      <View style={styles.section}>
        <View style={styles._seciton_row}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Manage Meters
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
            // inputWrapperStyle={{ backgroundColor: colors.white }}
            placeholder="Search"
            style={styles._input}
            value={search}
            onChangeText={(text) => setSearch(text as string)}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles._addbtn}
          onPress={handleAddMeter}
        >
          <WithLocalSvg asset={Images.addprop} />
        </TouchableOpacity>
      </View>

      {/* Meters List */}
      <FlatList
        data={filteredMeters}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <MeterCard
            data={item}
            onPress={(mode) => handleViewMeter(item)}
            onEdit={(mode) => handleEditMeter(item)}
            onClearTember={() => handleClearTember(item)}
          />
        )}
      />
      <Modal
        animationType="slide"
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
              <Ionicons name="close-circle" size={24} color={colors.error} />
            </TouchableOpacity>
            <Text style={styles.modalText}>Clear Temper</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={temperToken}
                editable={false}
              />
              <TouchableOpacity onPress={copyToClipboard}>
                <Ionicons
                  name="copy-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </View>
            <Button
              text="Copy"
              preset="reversed"
              onPress={copyToClipboard}
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
    marginBottom: 24,
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
    marginTop: adjustSize(20),
    marginBottom: adjustSize(5),
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
    gap: adjustSize(10),
    marginHorizontal: adjustSize(10),
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
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: adjustSize(18),
    fontFamily: typography.fonts.poppins.bold,
    color: colors.primary,
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
    width: "100%",
  },
});
