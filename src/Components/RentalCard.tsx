import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { adjustSize, colors, typography } from "../theme";
import { Text } from "./Text";
import { IRentalProperty } from "../utils/data";
import Entypo from "@expo/vector-icons/Entypo";
interface RentalCardProps {
  property: IRentalProperty;
  onPress?: () => void;
  onAction?: (action: string, property: IRentalProperty) => void;
}

const ACTIONS = [
  "View Details",
  "Edit",
  "Manage Calendar",
  "Assign to agent",
  "Assign to FM",
  "Register Tenant",
  "Generate work request",
  "Create Visitor request",
];

export const RentalCard: React.FC<RentalCardProps> = ({
  property,
  onPress,
  onAction,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const thumb = property.images?.[0];
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles._morebutton}
          onPress={() => setMenuVisible((v) => !v)}
        >
          <Entypo name="dots-three-vertical" size={16} color={colors.primary} />
        </TouchableOpacity>
        <Image source={{ uri: thumb }} style={styles.thumbnail} />
        <View style={styles.content}>
          <View style={styles.rowBetween}>
            <Text weight="semiBold" style={styles.title} numberOfLines={1}>
              {property.name}
            </Text>
            <Text style={styles.group} numberOfLines={1}>
              ({property.group})
            </Text>
            {/* <TouchableOpacity
              onPress={() => setMenuVisible((v) => !v)}
              style={styles.dotMenu}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            /> */}
          </View>

          <Text style={styles.location} numberOfLines={1}>
            Shortlet - {property.location}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Status:</Text>
            <Text style={[styles.status, statusColor(property.status)]}>
              {property.status}
            </Text>
            <Text style={styles.metaLabel}>Tenant:</Text>
            <Text style={styles.metaValue} numberOfLines={1}>
              {property.tenantName}
            </Text>
          </View>
          <View style={[styles.metaRow, { justifyContent: "space-between" }]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.metaLabel}>Property ID:</Text>
              <Text style={styles.metaValue}>{property.propertyId}asfaf</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.metaLabel}>Added by:</Text>
              <Text style={styles.metaValue}>{property.addedBy}</Text>
            </View>
          </View>
        </View>
      </View>
      {menuVisible && (
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
      )}
    </View>
  );
};

const statusColor = (status: IRentalProperty["status"]) => ({
  color:
    status === "Approved"
      ? "#0AD029"
      : status === "Pending"
      ? "#F5A524"
      : "#D62828",
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#F2F3FF",
    borderRadius: adjustSize(12),
    padding: adjustSize(10),
    marginBottom: adjustSize(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    zIndex: -1,
    alignItems: "center",
    borderWidth: 0.3,
    borderColor: "#00000040",
  },
  thumbnail: {
    height: adjustSize(106),
    width: adjustSize(99),
    borderRadius: adjustSize(8),
    marginRight: adjustSize(10),
    backgroundColor: colors.border,
  },
  content: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: "row",
    gap: adjustSize(2),
    // justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontSize: adjustSize(13),
    color: colors.primary,
  },
  group: {
    fontSize: adjustSize(11),
    color: colors.primaryLight,
  },
  location: {
    fontSize: adjustSize(11),
    color: "#B0B0B0",
    marginTop: adjustSize(3),
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: adjustSize(6),
    marginTop: adjustSize(6),
    overflow: "hidden",
  },
  metaLabel: {
    fontSize: adjustSize(10),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  metaValue: {
    fontSize: adjustSize(10),
    color: "#7E7E7E",
  },
  status: {
    fontSize: adjustSize(10),
    marginRight: adjustSize(6),
  },
  dotMenu: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 5,
  },
  menuBox: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(36),
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
    width: adjustSize(190),
    paddingVertical: adjustSize(6),
    paddingBottom: adjustSize(15),
  },
  menuItem: {
    paddingVertical: adjustSize(5),
    paddingHorizontal: adjustSize(12),
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
  },
  _morebutton: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(10),
  },
});
