import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { adjustSize, colors, typography } from "../../../../theme";
import { Text } from "../../../../Components";
import Entypo from "@expo/vector-icons/Entypo";
import { IFacilityManagement } from "./../../../../utils/data";

interface FacilityManagementCardProps {
  activeTab: string;
  property: any;
  onPress?: () => void;
  onAction?: (action: string, property: IFacilityManagement) => void;
  style?: object; 
}
export const ReservationsCard: React.FC<FacilityManagementCardProps> = ({
  activeTab,
  property,
  onPress,
  onAction,
  style,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const thumb = property?.images?.[0];
  return (
    <View style={{ position: "relative" }}>
      <View style={[styles.container, style]}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Text style={styles.swimmingPool} numberOfLines={1}>
              {property?.title || "Swimming Pool"}
            </Text>
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>Reserved</Text>
            </View>
          </View>
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
        <Text
          style={{
            fontSize: adjustSize(12),
            color: "#7E7E7E",
            fontFamily: typography.fonts.poppins.normal,
            marginTop: adjustSize(8),
          }}
          numberOfLines={1}
        >
          {(property as any)?.reservationDate || (property as any)?.dateCreated}
        </Text>
        <View style={styles.rowMain}>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Reservation ID:
            </Text>
            <Text style={[styles.cardTitleVal]} numberOfLines={1}>
              {property?.reservationID}
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.cardTitle]} numberOfLines={1}>
              Reservation date:
            </Text>
            <Text
              style={[styles.cardTitleVal, { color: "#4CAF50" }]}
              numberOfLines={1}
            >
              {property?.reservationDate}
            </Text>
          </View>
        </View>
        <View style={styles.rowMain}>
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
              Date Created:
            </Text>
            <Text
              style={[styles.cardTitleVal, { color: "#D51E1E" }]}
              numberOfLines={1}
            >
              {property?.dateCreated}
            </Text>
          </View>
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
            {["View", "Confirm", "Reject", "Delete"].map((a) => (
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
    paddingVertical: adjustSize(14),
    paddingHorizontal: adjustSize(14),
    backgroundColor: colors.white,
    borderRadius: adjustSize(14),
    marginHorizontal: adjustSize(10),
    marginBottom: adjustSize(12),
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  _morebutton: {
    // marginRight: adjustSize(10),
  },
  menuBox: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(40),
    backgroundColor: colors.white,
    borderRadius: adjustSize(14),
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
    paddingVertical: adjustSize(5),
    paddingHorizontal: adjustSize(12),
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },

  swimmingPool: {
    color: colors.primary,
    fontSize: adjustSize(16),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  statusPill: {
    backgroundColor: "#D51E1E",
    paddingHorizontal: adjustSize(12),
    height: adjustSize(26),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: adjustSize(10),
  },
  statusText: {
    color: colors.white,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
  },

  nameBox: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    height: adjustSize(25),
    borderRadius: 100,
    justifyContent: "center",
    paddingHorizontal: adjustSize(15),
    marginVertical: adjustSize(5),
  },
  nameTitle: {
    color: colors.white,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  name: {
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
    marginLeft: 5,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  status: {
    color: "#4CAF50",
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.normal,
    marginLeft: adjustSize(10),
  },
  rowMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    display: "none",
  },
});
