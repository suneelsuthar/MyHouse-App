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

const OrderAction = ["View", "Update", "Export", "Chat"];
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
      <View style={[styles.container, style]}>
        <View style={styles.left}>
          <Image source={{ uri: thumb }} style={styles.thumbnail} />
          <Text style={styles.requestedBy}>Requested by</Text>
          <Text style={styles.requestedByVal} numberOfLines={1}>
            {property?.requestedBy}
          </Text>
          {property?.status !== "Work requests" && (
            <Text style={styles.progress}>Completed</Text>
          )}
        </View>
        <View style={styles.data}>
          {property?.status === "Work requests" && (
            <Text style={styles.progress}>In progress</Text>
          )}

          <Text style={styles.title} numberOfLines={1}>
            {property?.title}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {property?.text}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.reqNoBox}>
              <Text style={styles.workReqNoTitle}>Work Req No: </Text>
              <Text style={styles.workReqNo} numberOfLines={1}>
                {property?.workReqNo}
              </Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Category:
            </Text>
            <Text style={[styles.cardTitleVal]} numberOfLines={1}>
              {property?.category}
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Priority:
            </Text>
            <Text
              style={[styles.cardTitleVal, { color: "#D51E1E" }]}
              numberOfLines={1}
            >
              {property?.priority}
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Issue Date:
            </Text>
            <Text
              style={[
                styles.cardTitleVal,
                {
                  color:
                    property?.status === "Work requests"
                      ? "#D51E1E"
                      : "#7E7E7E",
                },
              ]}
              numberOfLines={1}
            >
              {property?.issueDate}
            </Text>
          </View>
          {property?.status !== "Work requests" && (
            <View style={[styles.row]}>
              <Text style={[styles.cardTitle]} numberOfLines={1}>
                Due Date
              </Text>
              <Text
                style={[
                  styles.cardTitleVal,
                  {
                    color: "#D51E1E",
                  },
                ]}
                numberOfLines={1}
              >
                {property?.dueDate}
              </Text>
            </View>
          )}
        </View>

        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles._morebutton}
            onPress={() => setMenuVisible((v) => !v)}
          >
            <Entypo
              name="dots-three-vertical"
              size={16}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      {menuVisible && (
        <>
          {/* Transparent overlay behind the menu */}
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />

          {/* Menu box */}
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
                <Text style={styles.menuText}>{a}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: adjustSize(15),
  },
  thumbnail: {
    height: adjustSize(102),
    width: adjustSize(95),
    borderRadius: adjustSize(10),
    backgroundColor: colors.border,
    elevation: 1,
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
  data: {
    flex: 1,
    marginRight: adjustSize(10),
    marginLeft: adjustSize(7),
  },
  left: {
    width: adjustSize(115),
    alignItems: "center",
  },
  requestedBy: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    textAlign: "center",
    marginTop: adjustSize(10),
    paddingVertical: 0,
    lineHeight: adjustSize(15),
  },
  requestedByVal: {
    color: "#7E7E7E",
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    lineHeight: adjustSize(12),
    marginTop: adjustSize(3),
  },
  progress: {
    color: "#0AD029",
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  title: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  text: {
    color: "#7E7E7E",
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  reqNoBox: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    height: adjustSize(25),
    borderRadius: 100,
    justifyContent: "center",
    paddingHorizontal: adjustSize(10),
    marginVertical: adjustSize(5),
  },
  workReqNoTitle: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  workReqNo: {
    color: colors.white,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    color: colors.primary,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.bold,
  },
  cardTitleVal: {
    color: colors.primary,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
    marginLeft: 2,
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
