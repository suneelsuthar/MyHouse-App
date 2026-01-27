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
  rightText?: string; // e.g., date or meta shown on footer right
}
export const AmenitiesCard: React.FC<FacilityManagementCardProps> = ({
  property,
  onAction,
  style,
  rightText,
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
    <View style={[styles.cardWrapper, style]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: thumb }} style={styles.image} />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.menuButton}
          onPress={() => setMenuVisible((v) => !v)}
        >
          <Entypo name="dots-three-vertical" size={16} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.footerBar}>
        <Text style={styles.footerTitle} numberOfLines={1}>
          {property?.title}
        </Text>
        {rightText ? (
          <Text style={styles.footerDate} numberOfLines={1}>
            {rightText}
          </Text>
        ) : null}
      </View>

      {menuVisible && (
        <>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />
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
  cardWrapper: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(14),
    marginHorizontal: adjustSize(10),
    marginBottom: adjustSize(12),
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    overflow: "hidden",
    position: "relative",
  },
  imageContainer: {
    position: "relative",
    height:adjustSize(175),
    borderRadius:10,
    overflow:"hidden",
    marginBottom:-8,
    // zIndex:20
    // borderWidth:1
  },
  image: {
    width: "100%",
    height: adjustSize(175),
  },
  menuButton: {
    position: "absolute",
    top: adjustSize(10),
    right: adjustSize(10),
    backgroundColor: "rgba(0,0,0,0.35)",
    height: adjustSize(28),
    width: adjustSize(28),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
    zIndex:3000
  },
  footerBar: {
    backgroundColor: colors.primary,
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(20),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop:adjustSize(25),
    zIndex:-1
  },
  footerTitle: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.semiBold,
    flex: 1,
    marginRight: adjustSize(10),
  },
  footerDate: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  menuBox: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(45),
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    elevation: 6,
    width: adjustSize(200),
    paddingVertical: adjustSize(8),
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  menuItem: {
    paddingVertical: adjustSize(4),
    paddingHorizontal: adjustSize(14),
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
    backgroundColor: "transparent",
    zIndex: 5,
  },
});
