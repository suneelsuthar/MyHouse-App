import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { Screen, Text, Header, TextField } from "../../../Components";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import { adjustSize, colors, typography } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import * as ImagePicker from "expo-image-picker";
interface AdminPropertyServicesProps
  extends AppStackScreenProps<"AdminPropertyServices"> {}

const SERVICE_MOCK_DATA = [
  {
    id: 0,
    title: "Swimming pool",
    image: Images.pool,
  },
  {
    id: 1,
    title: "Tennis Court",
    image: Images.tennis,
  },
  {
    id: 2,
    title: "Gym",
    image: Images.gym,
  },
  {
    id: 3,
    title: "Playground",
    image: Images.playground,
  },
  {
    id: 4,
    title: "Basketball Court",
    image: Images.basketball,
  },
  {
    id: 5,
    title: "Swimming pool",
    image: Images.pool,
  },
  {
    id: 6,
    title: "Tennis Court",
    image: Images.tennis,
  },
  {
    id: 7,
    title: "Gym",
    image: Images.gym,
  },
  {
    id: 8,
    title: "Playground",
    image: Images.playground,
  },
  {
    id: 9,
    title: "Basketball Court",
    image: Images.basketball,
  },
  {
    id: 10,
    title: "Swimming pool",
    image: Images.pool,
  },
  {
    id: 11,
    title: "Tennis Court",
    image: Images.tennis,
  },
  {
    id: 12,
    title: "Gym",
    image: Images.gym,
  },
  {
    id: 13,
    title: "Playground",
    image: Images.playground,
  },
  {
    id: 14,
    title: "Basketball Court",
    image: Images.basketball,
  },
  {
    id: 15,
    title: "Swimming pool",
    image: Images.pool,
  },
  {
    id: 16,
    title: "Tennis Court",
    image: Images.tennis,
  },
  {
    id: 17,
    title: "Gym",
    image: Images.gym,
  },
];

export default function AdminPropertyServices() {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [images, setImages] = useState<string>("");
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // ✅ allow multiple images
      quality: 1,
    });

    if (!result.canceled) {
      // Add all selected images
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages(selectedUris[0]);
    }
  };
  return (
    <Screen
      contentContainerStyle={styles.container}
      preset="fixed"
      safeAreaEdges={["top"]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            (navigation as any)
              .getParent?.("AdminDrawer")
              ?.dispatch(DrawerActions.openDrawer())
          }
        >
          <WithLocalSvg asset={Images.user} />
        </TouchableOpacity>
        <View style={styles.headerinfo}>
          <Text weight="semiBold" style={styles.username}>
            Manage Properties
          </Text>
        </View>
        <TouchableOpacity style={styles.headerIcons} activeOpacity={0.6}>
          <WithLocalSvg asset={Images.notofication} />
        </TouchableOpacity>
      </View>
      {/* Recent Notifications */}
      <View style={styles.section}>
        <View style={styles._seciton_row}>
          <Text weight="semiBold" style={styles.sectionTitle}>
            Manage Amenities
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
            inputWrapperStyle={{ backgroundColor: colors.white }}
            placeholder="Search property"
            style={styles._input}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles._addbtn}
          onPress={() => setIsModalVisible(true)}
        >
          <WithLocalSvg asset={Images.addprop} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={SERVICE_MOCK_DATA}
        numColumns={3}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.7} style={styles.listItem}>
            <WithLocalSvg asset={item.image} />
            <Text text={item.title} style={styles._title} />
          </TouchableOpacity>
        )}
      />

      {/* Add Service Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text weight="semiBold" style={styles.modalTitle}>
                Add Service
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <WithLocalSvg asset={Images.closeIcon} width={24} height={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name*</Text>
                <TextField
                  style={styles.inputField}
                  value={serviceName}
                  onChangeText={setServiceName}
                  placeholder="Enter service name"
                  placeholderTextColor={colors.grey}
                  inputWrapperStyle={{
                    backgroundColor: colors.white,
                    borderWidth: 0.5,
                    borderColor: colors.grey,
                  }}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Icon*</Text>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.uploadContainer}
                  onPress={() => {
                    pickImage();
                  }}
                >
                  {selectedIcon ? (
                    <View style={styles.iconPreview}>
                      <Image
                        source={{ uri: selectedIcon }}
                        style={styles.iconImage}
                        resizeMode="contain"
                      />
                    </View>
                  ) : (
                    <View style={styles.uploadButton}>
                      <Text style={styles.uploadText}>
                        {images ? "Image Selected" : "No File Choosen"}
                      </Text>
                      <View
                        style={{
                          position: "absolute",
                          right: 10,
                        }}
                      >
                        <WithLocalSvg asset={Images.upload} />
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.modalBody}>
                {images ? (
                  <Image source={{ uri: images }} style={styles.modalImage} />
                ) : null}
              </View>

              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.saveButton]}
                  onPress={() => {
                    console.log("Saving service:", {
                      name: serviceName,
                      icon: selectedIcon,
                    });
                    setIsModalVisible(false);
                    setServiceName("");
                    setSelectedIcon(null);
                  }}
                >
                  <Text style={styles.saveButtonText}>Add Service</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Services content will go here */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
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
  username: {
    fontSize: adjustSize(15),
    color: colors.primary,
    lineHeight: adjustSize(20),
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
    backgroundColor: "#6369A4",
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
    height: adjustSize(47),
    width: adjustSize(47),
    borderRadius: adjustSize(10),
    justifyContent: "center",
    alignItems: "center",
  },

  _input: {
    margin: 0,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(12),
  },
  _inputview: {
    flex: 1,
    padding: 0,
  },
  listContent: {
    paddingVertical: adjustSize(10),
    paddingHorizontal: adjustSize(10),
    gap: adjustSize(10),
  },
  listItem: {
    flex: 1,
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    margin: adjustSize(5),
    minHeight: adjustSize(100),
    alignItems: "center",
    justifyContent: "space-evenly",
    borderWidth: 0.3,
    borderColor: colors.grey,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: adjustSize(20),
    width: "100%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: adjustSize(20),
  },
  modalTitle: {
    fontSize: adjustSize(18),
    color: colors.primary,
    textAlign: "center",
    flex: 1,
  },
  modalBody: {
    paddingVertical: 10,
  },
  uploadContainer: {
    borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: 8,
    height: adjustSize(47),
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    elevation: 2,
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  uploadButton: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: adjustSize(10),
  },
  uploadText: {
    color: colors.grey,
    fontSize: adjustSize(12),
  },
  iconPreview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  inputGroup: {
    marginBottom: adjustSize(15),
  },
  inputLabel: {
    fontSize: adjustSize(14),
    color: colors.primary,
    marginBottom: adjustSize(5),
    fontFamily: typography.fonts.poppins.medium,
  },
  inputField: {
    borderRadius: adjustSize(8),
  },
  priceInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: adjustSize(8),
    borderWidth: 1,
    borderColor: colors.grey,
  },
  currencySymbol: {
    paddingHorizontal: adjustSize(12),
    color: colors.primary,
    fontSize: adjustSize(16),
    fontFamily: typography.fonts.poppins.medium,
  },
  priceInput: {
    flex: 1,
    borderLeftWidth: 1,
    paddingLeft: adjustSize(10),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  textArea: {
    minHeight: adjustSize(80),
    textAlignVertical: "top",
  },
  modalDropdown: {
    borderRadius: adjustSize(8),
    borderWidth: 1,
    borderColor: colors.grey,
    paddingHorizontal: 0,
    height: adjustSize(45),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelectedText: {
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: adjustSize(20),
  },
  modalButton: {
    flex: 1,
    paddingVertical: adjustSize(12),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grey,
    marginRight: adjustSize(10),
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(14),
  },
  saveButtonText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
    fontSize: adjustSize(14),
  },
  _title: {
    fontSize: adjustSize(10),
    color: colors.primary,
  },
  modalImage: {
    height: adjustSize(80),
    width: adjustSize(80),
    borderRadius: adjustSize(10),
  },
});
