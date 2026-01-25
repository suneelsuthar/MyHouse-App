import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { adjustSize, colors, typography } from "../theme";
import { Text } from "./Text";
import Entypo from "@expo/vector-icons/Entypo";
import { IFacilityManagement } from "../utils/data";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store";
interface FacilityManagementCardProps {
  activeTab: string;
  property: IFacilityManagement;
  onPress?: () => void;
  onAction?: (action: string, property: IFacilityManagement) => void;
  style?: object; // ✅ custom styling (red/blue bg)
}

const OrderAction = ["View", "Add Update", "Export", "Chat"];
const CompletedAction = ["View", "Export", "Chat"];
export const FacilityManagementCard: React.FC<FacilityManagementCardProps> = ({
  activeTab,
  property,
  onPress,
  onAction,
  style,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const thumb = property?.images?.[0];
  const navigation = useNavigation();

  const { user } = useAppSelector((state: RootState) => state.auth);

  // user?.role === "tenant" && OrderAction.splice(2, 2);

  const AdminWorkRequestsAction = [
    "View Details",
    "Edit",
    "Generate work order",
    "View work order",
  ];

  user?.role === "tenant" && AdminWorkRequestsAction.splice(2, 1);

  // user?.role === "tenant" && AdminWorkRequestsAction.splice(2, 1);

  let ACTIONS: string[] = [];
  if (activeTab?.toLowerCase() === "work requests") {
    ACTIONS = AdminWorkRequestsAction;
  } else if (activeTab?.toLowerCase() === "orders") {
    ACTIONS = OrderAction;
  } else if (activeTab?.toLowerCase() === "completed") {
    ACTIONS = CompletedAction;
  }

  return (
    <View style={{ position: "relative" }}>
      <View style={[styles.card, style]}>
        {/* Image header */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: thumb }} style={styles.image} />
          {/* Status chip */}
          <View style={[styles.chip, styles.statusChip]}>
            <Text style={styles.chipText} weight="medium">
              {property?.status === "Work requests"
                ? "In progress"
                : property?.status}
            </Text>
          </View>
          {/* Menu 
          button */}
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.moreBtn}
            onPress={() => setMenuVisible((v) => !v)}
          >
            <Entypo name="dots-three-vertical" size={16} color={colors.white} />
          </TouchableOpacity>
          {/* Priority chip */}
          <View style={[styles.chip, styles.priorityChip]}>
            <Text
              style={[styles.chipText, { color: colors.white }]}
              weight="medium"
            >
              {property?.priority || "High Priority"}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View
              style={{
                flex: 1,
                paddingRight: adjustSize(6),
                flexDirection: "row",
                gap: 10,
              }}
            >
              <Text style={styles.footerTitle} numberOfLines={1}>
                {property?.title}
              </Text>
              <Text style={styles.codeText} numberOfLines={1}>
                (WR {property?.workReqNo})
              </Text>
            </View>
            <Text style={styles.footerDate} numberOfLines={1}>
              {property?.issueDate}
            </Text>
          </View>
          <View
            style={[
              styles.codeRow,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <Text style={styles.desc} numberOfLines={1}>
              {property?.text}
            </Text>
            {
              activeTab?.toLowerCase() !== "work requests" && (
                <Text style={styles.footerDate} numberOfLines={1}>
                  <Text text="Due:" style={{ color: "#D51E1E" }} />{" "}
                  {property?.issueDate}
                </Text>
              )
            }
           
          </View>
        </View>
      </View>

      {menuVisible && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />
          <View style={styles.menuBox}>
            {ACTIONS.map((a) => (
              <TouchableOpacity
                key={a}
                onPress={() => {
                  setMenuVisible(false);
                  onAction?.(a, property);
                }}
                style={styles.menuItem}
                activeOpacity={0.6}
              >
                <Text style={styles.menuText}>
                  {a === "Update" ? "Add Update" : a}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    backgroundColor: colors.white,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: adjustSize(16),
  },
  imageWrap: {
    position: "relative",
    width: "100%",
    height: adjustSize(188),
    borderRadius: 15,
    marginBottom: -10,
    zIndex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  chip: {
    position: "absolute",
    paddingHorizontal: adjustSize(12),
    // height: adjustSize(26),
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    height: adjustSize(20),
    // padding:adjustSize(5),
  },
  statusChip: {
    left: adjustSize(14),
    top: adjustSize(12),
    backgroundColor: "#0AD029",
    justifyContent: "center",
    alignItems: "center",
  },
  priorityChip: {
    left: adjustSize(14),
    bottom: adjustSize(12),
    backgroundColor: "#D51E1E",
    justifyContent: "center",
    alignItems: "center",
  },
  chipText: {
    color: colors.white,
    fontSize: adjustSize(10),
    // lineHeight:adjustSize(10)
  },
  moreBtn: {
    position: "absolute",
    right: adjustSize(12),
    top: adjustSize(12),
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.28)",
  },
  footer: {
    backgroundColor: colors.primary,
    paddingHorizontal: adjustSize(16),
    paddingVertical: adjustSize(14),
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footerTitle: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  footerDate: {
    color: colors.white,
    fontSize: adjustSize(12),
  },
  codeRow: {
    marginTop: 2,
    marginBottom: adjustSize(6),
  },
  codeText: {
    color: "#BFD0FF",
    fontSize: adjustSize(12),
  },
  desc: {
    color: colors.white,
    fontSize: adjustSize(10),
  },
  _morebutton: {
    marginRight: adjustSize(10),
  },
  menuBox: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(36),
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    elevation: 4,
    width: adjustSize(190),
    paddingVertical: adjustSize(6),
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: adjustSize(5),
    paddingHorizontal: adjustSize(12),
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent", // invisible but catch taps
    zIndex: 5,
  },
});
