import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { adjustSize, colors, typography } from "../../../../theme";
import { Text } from "../../../../Components";
import Entypo from "@expo/vector-icons/Entypo";
import { IFacilityManagement } from "./../../../../utils/data";
import { useAppSelector } from "../../../../store/hooks";
import { RootState } from "../../../../store";
interface FacilityManagementCardProps {
  activeTab: string;
  property: IFacilityManagement;
  onPress?: () => void;
  onAction?: (action: string, property: IFacilityManagement) => void;
  style?: object; // ✅ custom styling (red/blue bg)
}
export const AmenitiesCard: React.FC<FacilityManagementCardProps> = ({
  property,
  onAction,
  style,
}) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [menuVisible, setMenuVisible] = useState(false);
  const thumb = property?.images?.[0];

  const items = [
    "View",
    "Edit",
    "Make reservations",
    "Manage Calendar",
    "Delete",
  ];

  user?.role === "tenant" && items.splice(items.indexOf("Delete"), 1);
  user?.role === "tenant" && items.splice(items.indexOf("Edit"), 1);
  user?.role === "tenant" && items.splice(items.indexOf("Manage Calendar"), 1);
  return (
    <View style={{ position: "relative" }}>
      <View style={[styles.container, style]}>
        <View style={styles.left}>
          <Image source={{ uri: thumb }} style={styles.thumbnail} />
        </View>
        <View style={styles.data}>
          <Text style={styles.title} numberOfLines={1}>
            {property?.title}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.reqNoBox}>
              <Text style={styles.workReqNoTitle}>Group ID: </Text>
              <Text style={styles.workReqNo} numberOfLines={1}>
                {property?.groupId}
              </Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Property Group name:
            </Text>
            <Text style={[styles.cardTitleVal]} numberOfLines={1}>
              {property?.propertyGroupName}
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Amenity:
            </Text>
            <Text style={[styles.cardTitleVal]} numberOfLines={1}>
              {property?.amenity}
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Capacity:
            </Text>
            <Text style={[styles.cardTitleVal]} numberOfLines={1}>
              {property?.capacity}
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Date Added:
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
              {property?.dateAdded}
            </Text>
          </View>
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
            {items.map((a) => (
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
    height: adjustSize(94),
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

  title: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(5),
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
    fontFamily: typography.fonts.poppins.medium,
  },
  cardTitleVal: {
    color: "#7E7E7E",
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
