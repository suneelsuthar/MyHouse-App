import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { Screen, Text, Header2, TextField } from "../../../../Components";
import { colors, typography, adjustSize } from "../../../../theme";
import DropdownComponent from "../../../../Components/DropDown";
import { TenantUtilitiesTabs } from "./../../../tenant/utilities/Components/TenantUtilitiesTabs";
import { Images } from "../../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { CustomModal } from "../../../tenant/utilities/Components/CustomModal";
// import { UtilitiesChargesList } from "./../../tenant/utilities/Components/TenantUtilitiesChargesList";
// 🔹 Static dropdown data
const typeOptions = [
  { label: "Property", value: "Property" },
  { label: "Property Group", value: "Property Group" },
];

const sortOptions = [
  { label: "Name A-Z", value: "Name A-Z" },
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
];

type ChargeItem = {
  title: string;
  user: string;
  amount?: string; // formatted string for list right side
  status: "Paid" | "Partially paid" | "Pending" | "Overdue";
  totalAmount: number;
  amountPaid: number;
  createdDate: string; // ISO
  dueDate: string; // ISO
  comment: string;
};

const sampleCharges: ChargeItem[] = Array.from({ length: 8 }, (_, i) => {
  const totalAmount = 1500000 - i * 25000;
  const statuses: ("Paid" | "Partially paid" | "Pending" | "Overdue")[] = [
    "Paid",
    "Partially paid",
    "Pending",
    "Overdue",
  ];
  const status = statuses[i % 4];
  const amountPaid =
    status === "Paid"
      ? totalAmount
      : status === "Partially paid"
        ? Math.floor(totalAmount * 0.6)
        : status === "Pending"
          ? 0
          : Math.floor(totalAmount * 0.3);
  const titles = [
    "Utility Overuse",
    "Maintenance Fee",
    "repair cost",
    "Late fee",
    "repair cost",
    "Late fee",
    "Maintenance Fee",
    "Utility Overuse",
  ];
  return {
    title: titles[i],
    user: "John Doe",
    amount: i % 2 === 0 ? undefined : "₦ 15,00,000",
    status,
    totalAmount,
    amountPaid,
    createdDate: moment().subtract(i, "days").toISOString(),
    dueDate: moment()
      .add(i + 1, "days")
      .toISOString(),
    comment: `This is a test comment for ${i + 1}`,
  } as ChargeItem;
});

export const AdminUtilitiesCharges: React.FC = ({ navigation }: any) => {
  // 🔹 Tabs
  const [activeTab] = useState("Charges");

  // 🔹 Dropdown States
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const menuAnchorsRef = useRef<Record<number, any>>({});
  const [menuAnchor, setMenuAnchor] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [visible, setVisible] = useState(false);
  const [selectedData, setSelectedData] = useState<ChargeItem | null>(null);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [toDelete, setToDelete] = useState<ChargeItem | null>(null);

  useEffect(() => {
    const unsub = navigation?.addListener?.("blur", () => {
      setMenuIndex(null);
      setMenuAnchor(null);
    });
    return unsub;
  }, [navigation]);

  const formatAmount = (num: number) =>
    new Intl.NumberFormat("en-IN").format(num);
  const outstanding =
    (selectedData?.totalAmount || 0) - (selectedData?.amountPaid || 0);

  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Manage Charges" onNotificationPress={() => {}} />
      <ScrollView>
        {/* First Dropdown (Property Type) */}
        {/* <DropdownComponent
            data={typeOptions}
            label="Choose type"
            placeholder="Select Properties"
            value={selectedType}
            onChangeValue={setSelectedType}
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.white}
          /> */}

        {/* Transaction History Section */}

        <View style={styles.section}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginHorizontal: adjustSize(10),
                flex: 1,
                //   flexDirection: "row",
              }}
            >
              <TextField
                placeholderTextColor={colors.primaryLight}
                inputWrapperStyle={{ backgroundColor: colors.white }}
                placeholder="Search"
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AdminAddEditCharges", {
                  mode: "add",
                })
              }
              style={{
                backgroundColor: colors.primary,
                height: adjustSize(45),
                width: adjustSize(45),
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <WithLocalSvg asset={Images.addprop} />
            </TouchableOpacity>
          </View>
          <View style={styles.sectionRow}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              Charges
            </Text>
            <View style={styles.dropdownContainer}>
              <DropdownComponent
                data={sortOptions}
                label="Select Period"
                placeholder="Sort by"
                value={selectedSort}
                onChangeValue={setSelectedSort}
                dropdownStyle={styles.customDropdownStyle}
                placeholderStyle={styles.customPlaceholderStyle}
                selectedTextStyle={styles.customSelectedTextStyle}
              />
            </View>
          </View>
        </View>

        {/* List */}
        <View style={{ paddingHorizontal: adjustSize(10) }}>
          {sampleCharges.map((item, idx) => {
            const getStatusStyle = () => {
              switch (item.status) {
                case "Paid":
                  return { backgroundColor: "#0AD029" };
                case "Partially paid":
                  return { backgroundColor: "#292766" };
                case "Pending":
                  return { backgroundColor: "#F26938" };
                case "Overdue":
                  return { backgroundColor: "#D62828" };
                default:
                  return { backgroundColor: "#F26938" };
              }
            };
            return (
              <View key={idx} style={styles.card}>
                <View style={styles.cardHeaderRow}>
                  <Text
                    weight="semiBold"
                    style={styles.cardTitle}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <View style={[styles.statusPill, getStatusStyle()]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      if (menuIndex === idx) {
                        setMenuIndex(null);
                        setMenuAnchor(null);
                        return;
                      }

                      const anchor = menuAnchorsRef.current[idx];
                      anchor?.measureInWindow?.(
                        (
                          x: number,
                          y: number,
                          width: number,
                          height: number,
                        ) => {
                          setMenuAnchor({ x, y, width, height });
                          setMenuIndex(idx);
                        },
                      );
                    }}
                    style={{ marginLeft: adjustSize(6) }}
                  >
                    <View
                      ref={(r) => {
                        if (r) menuAnchorsRef.current[idx] = r;
                      }}
                      collapsable={false}
                    >
                      <Entypo
                        name="dots-three-vertical"
                        size={16}
                        color={colors.primary}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.cardFooterRow}>
                  <Text style={styles.subtitle}>John Doe</Text>
                  {/* {!!item.amount && (
                    <Text style={styles.amount} numberOfLines={1}>
                      {item.amount}
                    </Text>
                  )} */}
                  <Text style={styles.amount} numberOfLines={1}>
                    ₦ {formatAmount(item.totalAmount)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <Modal
          visible={menuIndex !== null}
          transparent
          animationType="fade"
          onRequestClose={() => {
            setMenuIndex(null);
            setMenuAnchor(null);
          }}
        >
          <Pressable
            style={styles.menuOverlay}
            onPress={() => {
              setMenuIndex(null);
              setMenuAnchor(null);
            }}
          >
            {menuIndex !== null && (
              <View
                style={[
                  styles.menuBox,
                  (() => {
                    const MENU_W = adjustSize(140);
                    const MENU_H = adjustSize(120);
                    const safePad = adjustSize(10);
                    const { width: screenW, height: screenH } =
                      Dimensions.get("window");

                    const x = menuAnchor?.x ?? safePad;
                    const y = menuAnchor?.y ?? safePad;
                    const w = menuAnchor?.width ?? 0;
                    const h = menuAnchor?.height ?? 0;

                    const left = Math.max(
                      safePad,
                      Math.min(x + w - MENU_W, screenW - MENU_W - safePad),
                    );
                    const top = Math.max(
                      safePad,
                      Math.min(y + h + 6, screenH - MENU_H - safePad),
                    );

                    return {
                      position: "absolute" as const,
                      top,
                      left,
                      width: MENU_W,
                    };
                  })(),
                ]}
              >
                {(["View", "Update", "Delete"] as const).map((label) => (
                  <TouchableOpacity
                    key={label}
                    style={styles.menuItem}
                    onPress={() => {
                      const item = sampleCharges[menuIndex];
                      setMenuIndex(null);
                      setMenuAnchor(null);

                      if (!item) return;

                      if (label === "View") {
                        setSelectedData(item);
                        setVisible(true);
                      } else if (label === "Update") {
                        (navigation as any).navigate("AdminAddEditCharges", {
                          mode: "edit",
                          charge: {
                            title: item.title,
                            amount: item.totalAmount,
                            status: item.status,
                            createdDate: item.createdDate,
                            dueDate: item.dueDate,
                            comment: item.comment,
                          },
                        });
                      } else if (label === "Delete") {
                        setToDelete(item);
                        setDeleteVisible(true);
                      }
                    }}
                  >
                    <Text style={styles.menuText}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </Pressable>
        </Modal>

        {/* Receipt Modal */}
        <CustomModal
          visible={visible}
          onClose={() => {
            setSelectedData(null);
            setVisible(false);
          }}
        >
          <Text style={styles.modalHeading}>View Charge Details</Text>
          <Text style={[styles.modalTitle, { marginVertical: adjustSize(10) }]}>
            Status: {""}
            <Text
              style={{
                color:
                  selectedData?.status === "Paid"
                    ? "#0AD029"
                    : selectedData?.status === "Partially paid"
                      ? "#292766"
                      : selectedData?.status === "Pending"
                        ? "#F26938"
                        : selectedData?.status === "Overdue"
                          ? "#D62828"
                          : "#F26938",
              }}
            >
              {selectedData?.status}
            </Text>
          </Text>
          <Text style={styles.modalTitle}>
            Date Created: {""}
            <Text style={{ color: "#7E7E7E" }}>
              {selectedData
                ? moment(selectedData.createdDate).format("MMM DD YYYY")
                : ""}
            </Text>
          </Text>
          <Text style={styles.modalTitle}>
            Due Date: {""}
            <Text style={{ color: "#7E7E7E" }}>
              {selectedData
                ? moment(selectedData.dueDate).format("MMM DD YYYY")
                : ""}
            </Text>
          </Text>
          <View
            style={[styles.modalAmountMain, { marginVertical: adjustSize(15) }]}
          >
            <Text style={styles.modalTitle}>
              Charge type: {""}
              <Text style={{ color: "#7E7E7E" }}>{selectedData?.title}</Text>
            </Text>
            <Text style={styles.modalPrice}>
              ₦ {formatAmount(selectedData?.totalAmount || 0)}
            </Text>
            <Text style={styles.modalRemaningPayment}>
              Remaining Payment: ₦{formatAmount(outstanding)}
            </Text>
          </View>

          {selectedData && (
            <View style={styles.progressMain}>
              <View
                style={[
                  styles.doneProgress,
                  {
                    backgroundColor:
                      selectedData?.status === "Paid"
                        ? "#0AD029"
                        : selectedData?.status === "Partially paid"
                          ? "#292766"
                          : selectedData?.status === "Pending"
                            ? "#F26938"
                            : selectedData?.status === "Overdue"
                              ? "#D62828"
                              : "#F26938",
                    width: `${Math.round(((selectedData.amountPaid ?? 0) / (selectedData.totalAmount || 1)) * 100)}%`,
                  },
                ]}
              />
            </View>
          )}

          <Text
            style={[
              styles.modalTitle,
              {
                marginTop: adjustSize(10),
                textAlign: "left",
                marginHorizontal: adjustSize(10),
              },
            ]}
          >
            Comment: {""}
            <Text style={{ color: "#7E7E7E" }}>{selectedData?.comment}</Text>
          </Text>

          <View>
            <TouchableOpacity
              style={styles.btnMain}
              activeOpacity={0.7}
              onPress={() => setVisible(false)}
            >
              <Text
                weight="semiBold"
                style={[
                  {
                    textAlign: "center",
                    color: colors.white,
                    // lineHeight: adjustSize(12),
                  },
                ]}
                text="Close"
              />
            </TouchableOpacity>
          </View>
        </CustomModal>

        {/* Delete Confirmation Modal */}
        <CustomModal
          visible={deleteVisible}
          onClose={() => {
            setToDelete(null);
            setDeleteVisible(false);
          }}
        >
          <TouchableOpacity
            style={styles.closeDelete}
            onPress={() => {
              setToDelete(null);
              setDeleteVisible(false);
            }}
          >
            {/* <Ionicons name="close-circle" size={24} color={colors.error} /> */}
          </TouchableOpacity>
          <Text weight="semiBold" style={styles.confirmTitle}>
            Are you Sure?
          </Text>
          <Text style={styles.confirmText}>
            Are you sure you want to Delete this Item?
          </Text>
          <View style={styles.confirmActions}>
            <TouchableOpacity
              style={styles.cancelBtn}
              activeOpacity={0.8}
              onPress={() => {
                setToDelete(null);
                setDeleteVisible(false);
              }}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteBtnModal}
              activeOpacity={0.8}
              onPress={() => {
                // TODO: integrate actual deletion here
                setToDelete(null);
                setDeleteVisible(false);
              }}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      </ScrollView>
    </Screen>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  dropdown: {
    height: adjustSize(47),
    borderRadius: adjustSize(10),
    backgroundColor: "#6369A4",
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(25),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownContainer: { width: adjustSize(120) },
  customDropdownStyle: {
    height: adjustSize(33),
    borderRadius: adjustSize(100),
    backgroundColor: colors.primary,
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
  section: {
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(10),
    marginBottom: adjustSize(15),
  },
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
  },
  card: {
    position: "relative",
    backgroundColor: colors.white,
    marginHorizontal: adjustSize(10),
    borderRadius: adjustSize(10),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
    padding: adjustSize(12),
    marginBottom: adjustSize(12),
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    flex: 1,
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  subtitle: {
    color: colors.primary,
    opacity: 0.6,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  cardFooterRow: {
    marginTop: adjustSize(6),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  amount: {
    color: colors.primary,
    fontSize: adjustSize(13),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  statusPill: {
    height: adjustSize(22),
    paddingHorizontal: adjustSize(10),
    borderRadius: adjustSize(100),
    alignItems: "center",
    justifyContent: "center",
  },
  statusPaid: { backgroundColor: "#0AD029" },
  statusPartiallyPaid: { backgroundColor: "#292766" },
  statusPending: { backgroundColor: "#F26938" },
  statusOverdue: { backgroundColor: "#D62828" },
  statusText: {
    color: colors.white,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menuBox: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: adjustSize(120),
    paddingVertical: adjustSize(6),
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: adjustSize(6),
    paddingHorizontal: adjustSize(12),
  },
  menuText: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  modalHeading: {
    fontSize: adjustSize(15),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
  },
  modalAmountMain: {
    borderTopWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
    marginTop: adjustSize(15),
    paddingTop: adjustSize(15),
  },
  modalPrice: {
    fontSize: adjustSize(36),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.bold,
    textAlign: "center",
    lineHeight: adjustSize(50),
  },
  btnMain: {
    marginHorizontal: adjustSize(15),
    // paddingTop: adjustSize(20),
    // paddingBottom: adjustSize(10),
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: adjustSize(47),
    marginTop: 30,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  modalRemaningPayment: {
    textAlign: "center",
    fontSize: adjustSize(14),
    color: "#D62828",
    fontFamily: typography.fonts.poppins.normal,
  },
  progressMain: {
    backgroundColor: colors.grey,
    height: adjustSize(13),
    borderRadius: 100,
    marginHorizontal: adjustSize(10),
    marginTop: adjustSize(10),
  },
  doneProgress: { height: "100%", borderRadius: 100 },
  // Delete modal styles
  closeDelete: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(10),
  },
  confirmTitle: {
    textAlign: "center",
    fontSize: adjustSize(18),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(15),
  },
  confirmText: {
    textAlign: "center",
    fontSize: adjustSize(12),
    color: colors.primary,
    opacity: 0.7,
    fontFamily: typography.fonts.poppins.normal,
    marginTop: adjustSize(8),
  },
  confirmActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: adjustSize(30),
    gap: adjustSize(12),
    paddingHorizontal: adjustSize(10),
  },
  cancelBtn: {
    flex: 1,
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(13),
  },
  deleteBtnModal: {
    flex: 1,
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    backgroundColor: "#D62828",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(13),
  },
});
