import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from "react-native";
import { Screen, Text, TextField } from "../../../Components";
import { WithLocalSvg } from "react-native-svg/css";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";
import { adjustSize, colors, typography } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import * as ImagePicker from "expo-image-picker";
import { SERVICE_MOCK_DATA } from "../../../utils/data";

export default function AdminPropertyServices() {
  const navigation = useNavigation();
  const [services, setServices] = useState(SERVICE_MOCK_DATA);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [images, setImages] = useState<string>("");
  const [editingService, setEditingService] = useState<any>(null);
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages(selectedUris[0]);
      setSelectedIcon(selectedUris[0]);
    }
  };

  // open modal for add
  const openAddModal = () => {
    setEditingService(null);
    setServiceName("");
    setSelectedIcon(null);
    setImages("");
    setIsModalVisible(true);
  };

  // open modal for edit
  const openEditModal = (item: any) => {
    setEditingService(item);
    setServiceName(item.title);
    setSelectedIcon(item.image);
    setImages(item.image);
    setIsModalVisible(true);
  };

  // save handler
  const handleSave = () => {
    if (editingService) {
      // update service
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingService.id
            ? { ...s, title: serviceName, image: images || s.image }
            : s
        )
      );
    } else {
      // add new
      const newService = {
        id: services.length ? services[services.length - 1].id + 1 : 0,
        title: serviceName,
        image: images || Images.pool,
      };
      setServices((prev) => [...prev, newService]);
    }

    // reset
    setIsModalVisible(false);
    setServiceName("");
    setSelectedIcon(null);
    setImages("");
    setEditingService(null);
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

      {/* Section */}
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
      </View>

      {/* Search & Add */}
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
          onPress={openAddModal}
        >
          <WithLocalSvg asset={Images.addprop} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={services}
        numColumns={3}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.listItem}
            onLongPress={() => openEditModal(item)}
          >
            {typeof item.image === "string" ? (
              <Image
                source={{ uri: item.image }}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
              />
            ) : (
              <WithLocalSvg asset={item.image} />
            )}
            <Text text={item.title} style={styles._title} />
          </TouchableOpacity>
        )}
      />

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text weight="semiBold" style={styles.modalTitle}>
                {editingService ? "Edit Service" : "Add Service"}
              </Text>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <WithLocalSvg asset={Images.closeIcon} width={24} height={24} />
              </TouchableOpacity>
            </View>

            {/* Body */}
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
                  onPress={pickImage}
                >
                  {selectedIcon ? (
                    <View style={styles.uploadButton}>
                      <Text style={styles.uploadText}>
                        {images ? "Image Selected" : "No File Chosen"}
                      </Text>
                      <View style={{ position: "absolute", right: 10 }}>
                        <WithLocalSvg asset={Images.upload} />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.uploadButton}>
                      <Text style={styles.uploadText}>
                        {images ? "Image Selected" : "No File Chosen"}
                      </Text>
                      <View style={{ position: "absolute", right: 10 }}>
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
            </View>

            {/* Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>
                  {editingService ? "Update Service" : "Add Service"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: adjustSize(15),
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    marginBottom: adjustSize(3),
    paddingHorizontal: adjustSize(10),
  },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  headerinfo: { flex: 1, paddingHorizontal: 10, alignItems: "center" },
  username: { fontSize: adjustSize(15), color: colors.primary },
  section: { marginBottom: 24, marginHorizontal: adjustSize(10) },
  sectionTitle: { fontSize: adjustSize(15), color: colors.primary },
  _seciton_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(20),
  },
  dropdownContainer: { width: adjustSize(120) },
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
  _input: { fontSize: adjustSize(12) },
  _inputview: { flex: 1 },
  listContent: {
    paddingVertical: adjustSize(10),
    paddingHorizontal: adjustSize(10),
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
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
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
    marginBottom: adjustSize(20),
  },
  modalTitle: { fontSize: adjustSize(18), color: colors.primary, flex: 1 },
  modalBody: { paddingVertical: 10 },
  uploadContainer: {
    borderWidth: 0.5,
    borderColor: colors.grey,
    borderRadius: 8,
    height: adjustSize(47),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
  },
  uploadButton: { flexDirection: "row", flex: 1, paddingHorizontal: 10 },
  uploadText: { color: colors.grey, fontSize: adjustSize(12) },
  inputGroup: { marginBottom: adjustSize(15) },
  inputLabel: { fontSize: adjustSize(14), color: colors.primary },
  inputField: { borderRadius: adjustSize(8) },
  modalFooter: { flexDirection: "row", marginTop: adjustSize(20) },
  modalButton: {
    flex: 1,
    paddingVertical: adjustSize(12),
    borderRadius: adjustSize(8),
    alignItems: "center",
  },
  saveButton: { backgroundColor: colors.primary },
  saveButtonText: { color: colors.white, fontSize: adjustSize(14) },
  _title: { fontSize: adjustSize(10), color: colors.primary },
  modalImage: {
    height: adjustSize(80),
    width: adjustSize(80),
    borderRadius: adjustSize(10),
  },
});
