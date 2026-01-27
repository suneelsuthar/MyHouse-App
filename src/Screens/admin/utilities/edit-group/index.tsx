import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import {
  Screen,
  Text,
  Header,
  TextField,
  Button,
} from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { colors, typography, adjustSize, spacing } from "../../../../theme";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { AdminStackParamList } from "../../../../utils/interfaces";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";

type GroupType = {
  id?: string;
  title: string;
  groupId: string;
  noOfProp?: string;
  noOfTenents?: string;
  noOfMeters?: string;
  date?: string;
};

type NavigationProp = NativeStackNavigationProp<
  AdminStackParamList,
  "EditGroup"
>;
type RoutePropType = RouteProp<AdminStackParamList, "EditGroup">;

export const EditGroup: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { group } = route.params || {};

  const [formData, setFormData] = useState({
    estate: (group as GroupType)?.title || "",
    properties: (group as GroupType)?.noOfProp
      ? Number((group as GroupType).noOfProp)
      : 0,
    residents: (group as GroupType)?.noOfTenents
      ? Number((group as GroupType).noOfTenents)
      : 0,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [propertiesList, setPropertiesList] = useState<
    { name: string; type: string }[]
  >([
    { name: "Property 1", type: "Semi detached" },
    { name: "Property 1", type: "Semi detached" },
    { name: "Property 1", type: "Semi detached" },
    { name: "Property 1", type: "Semi detached" },
    { name: "Property 1", type: "Semi detached" },
    { name: "Property 1", type: "Semi detached" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [propName, setPropName] = useState("");
  const [propType, setPropType] = useState("");

  // Contextual menu + delete confirm
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const openAddModal = () => {
    setModalMode("add");
    setPropName("");
    setPropType("");
    setEditingIndex(null);
    setModalVisible(true);
    setMenuIndex(null);
  };

  const openEditModal = (index: number) => {
    setModalMode("edit");
    setEditingIndex(index);
    setPropName(propertiesList[index].name);
    setPropType(propertiesList[index].type);
    setModalVisible(true);
    setMenuIndex(null);
  };

  const openDeleteModal = (index: number) => {
    setDeleteIndex(index);
    setDeleteVisible(true);
    setMenuIndex(null);
  };

  const handleSaveProperty = () => {
    if (!propName) return;
    if (modalMode === "add") {
      setPropertiesList((prev) => [
        ...prev,
        { name: propName, type: propType || "Semi detached" },
      ]);
    } else if (modalMode === "edit" && editingIndex !== null) {
      setPropertiesList((prev) =>
        prev.map((p, i) =>
          i === editingIndex ? { name: propName, type: propType } : p,
        ),
      );
    }
    setModalVisible(false);
  };

  const handleSubmit = () => {
    // TODO: wire to API
    navigation.goBack();
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header title={"Edit Estate"} />

      <ScrollView style={styles.content}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Estate*</Text>
          <TextField
            placeholder="lorem ipsum"
            value={formData.estate}
            onChangeText={(text) => handleInputChange("estate", text)}
            inputWrapperStyle={styles.inputWhite}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Properties</Text>
          <TextField
            placeholder="0"
            value={String(formData.properties)}
            onChangeText={(text) =>
              handleInputChange("properties", Number(text))
            }
            inputWrapperStyle={styles.inputWhite}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Residents</Text>
          <TextField
            placeholder="0"
            value={String(formData.residents)}
            onChangeText={(text) =>
              handleInputChange("residents", Number(text))
            }
            inputWrapperStyle={styles.inputWhite}
            keyboardType="number-pad"
          />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              Properties Management
            </Text>
            <TouchableOpacity style={styles.addBtn} onPress={openAddModal}>
              {/* <Text style={styles.addBtnText}>+</Text> */}
              <WithLocalSvg asset={Images.addmore} />
            </TouchableOpacity>
          </View>

          {propertiesList.map((item, idx) => (
            <View key={`${item.name}-${idx}`} style={styles.propertyCard}>
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" style={styles.propertyName}>
                  {item.name}
                </Text>
                <Text style={styles.propertyType}>{item.type}</Text>
              </View>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => setMenuIndex(menuIndex === idx ? null : idx)}
                activeOpacity={0.7}
              >
                <Text style={styles.menuDots}>⋮</Text>
              </TouchableOpacity>

              {menuIndex === idx && (
                <View style={styles.menuBox}>
                  <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => openEditModal(idx)}
                  >
                    <Text style={styles.menuText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.menuItem, styles.menuItemLast]}
                    onPress={() => openDeleteModal(idx)}
                  >
                    <Text style={[styles.menuText, { color: "#D62828" }]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>

        <Button
          text={"Update Estate"}
          onPress={handleSubmit}
          style={styles.primaryCta}
          preset="reversed"
        />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.cancelWrap}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add/Edit modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text
                weight="semiBold"
                style={[
                  styles.modalTitle,
                  { fontSize: adjustSize(15), textAlign: "center" },
                ]}
              >
                {modalMode === "add"
                  ? "Add Property to Estate"
                  : "Edit Property"}
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeCircle}
              >
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Property Name</Text>
              <TextField
                placeholder="Property 1"
                value={propName}
                onChangeText={setPropName}
                inputWrapperStyle={styles.inputWhite}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Property Type</Text>
              <DropdownComponent
                data={[
                  { label: "Detached", value: "Detached" },
                  { label: "Semi detached", value: "Semi detached" },
                  { label: "Apartment", value: "Apartment" },
                ]}
                label="Select"
                placeholder="Select"
                value={propType}
                onChangeValue={(v: string) => setPropType(v)}
                dropdownStyle={styles.dropdownInput}
                placeholderStyle={{ color: colors.grey }}
                selectedTextStyle={styles.dropdownText}
                rightIconColor={colors.primary}
              />
            </View>

            <Button
              text={modalMode === "add" ? "Add" : "Update"}
              onPress={handleSaveProperty}
              style={[
                styles.primaryCta,
                {
                  marginVertical: spacing.lg,
                  marginTop: 40,
                  minHeight: adjustSize(41),
                },
              ]}
              preset="reversed"
            />
          </View>
        </View>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal transparent visible={deleteVisible} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setDeleteVisible(false)}
              style={{
                alignSelf: "flex-end",
                borderWidth: 1,
                height: 30,
                width: 30,
                borderRadius: 100,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "#D62828",
              }}
            >
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
            <View style={styles.modalHeader}>
              <Text
                weight="semiBold"
                style={[
                  styles.modalTitle,
                  {
                    fontSize: adjustSize(18),
                    marginTop: 40,
                    flex: 1,
                    textAlign: "center",
                  },
                ]}
              >
                Are you Sure?
              </Text>
            </View>
            <Text style={styles.confirmMsg}>
              Are you sure you want to Delete this Property?
            </Text>

            <View style={styles.confirmRow}>
              <TouchableOpacity
                style={styles.cancelOutlineBtn}
                onPress={() => setDeleteVisible(false)}
              >
                <Text style={styles.cancelOutlineText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  if (deleteIndex !== null) {
                    setPropertiesList((prev) =>
                      prev.filter((_, i) => i !== deleteIndex),
                    );
                  }
                  setDeleteVisible(false);
                  setDeleteIndex(null);
                }}
              >
                <Text style={styles.deleteBtnText}>Delete</Text>
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
  content: {
    flex: 1,
    padding: spacing.md,
  },
  formGroup: {},
  label: {
    fontSize: adjustSize(12),
    color: colors.primary,
    marginBottom: spacing.xs,
    fontFamily: typography.fonts.poppins.medium,
  },
  inputWhite: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
  },
  sectionCard: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    padding: adjustSize(12),
    marginTop: adjustSize(8),
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: adjustSize(10),
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  addBtn: {
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(6),
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    color: colors.primary,
    fontSize: adjustSize(16),
    marginTop: -2,
  },
  propertyCard: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    padding: adjustSize(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: adjustSize(10),
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 1,
    position: "relative",
    borderWidth: 0.2,
    borderColor: colors.grey,
  },
  propertyName: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  propertyType: {
    color: colors.primary,
    fontSize: adjustSize(10),
    opacity: 0.7,
  },
  menuButton: {
    paddingHorizontal: adjustSize(6),
    paddingVertical: adjustSize(4),
  },
  menuDots: {
    color: colors.primary,
    fontSize: adjustSize(18),
  },
  menuBox: {
    position: "absolute",
    right: 40,
    top: adjustSize(10),
    backgroundColor: colors.white,
    borderRadius: 8,
    // paddingVertical: 5,
    width: 100,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    zIndex: 2000,
    borderWidth: 0.4,
    borderColor: "#E5E7EB",
  },
  menuItem: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderBottomWidth: 0.4,
    borderBottomColor: "#E5E7EB",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  primaryCta: {
    marginTop: spacing.lg,
    borderRadius: adjustSize(10),
  },
  cancelWrap: {
    paddingVertical: adjustSize(10),
    alignItems: "center",
  },
  cancelText: {
    color: "#D62828",
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
    padding: adjustSize(16),
  },
  modalContent: {
    width: "92%",
    backgroundColor: colors.fill,
    borderRadius: adjustSize(16),
    padding: adjustSize(16),
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: adjustSize(12),
    // flex: 1,
  },
  modalTitle: {
    color: colors.primary,
    fontSize: adjustSize(14),
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  modalClose: {
    color: "#D62828",
    fontSize: adjustSize(14),
  },
  confirmMsg: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginBottom: adjustSize(16),
    textAlign: "center",
  },
  confirmRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: adjustSize(12),
  },
  cancelOutlineBtn: {
    flex: 1,
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.fill,
  },
  cancelOutlineText: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  deleteBtn: {
    flex: 1,
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    backgroundColor: "#D62828",
    alignItems: "center",
    justifyContent: "center",
  },
  closeCircle: {
    alignSelf: "flex-end",
    borderWidth: 1,
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D62828",
    position: "absolute",
    right: 10,
    top: 0,
    zIndex: 100,
  },
  deleteBtnText: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownInput: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  dropdownText: {
    color: colors.primary,
    // fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
});

export default EditGroup;
