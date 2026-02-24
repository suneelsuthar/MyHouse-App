import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { adjustSize, colors, typography } from "../theme";
import { Text } from "./Text";
import { IRentalProperty } from "../utils/data";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import SmallCustomModal from "./SmallCustomModal";
interface RentalCardProps {
  property: IRentalProperty;
  onPress?: () => void;
  onAction?: (action: string, property: IRentalProperty) => void;
  type: string;
}

const RENTAL_ACTIONS = [
  "View",
  "Edit",
  "Manage Calendar",
  "Assign to agent",
  "Assign to Secondary Agent",
  "Assign to FM",

  // "Register Tenant",
  // "Generate work request",
  // "Create Visitor request",
];

const ACTIONS_MANAGE = [
  "View",
  // "Assign to FM",
  "Register Resident",
  "Remove Resident",
  // "Generate work request",
];

const ACTIONS_GROUP = [
  "View",
  "Assign to FM",
  "Add Resident",
  "Remove Resident",
  "Delete",
];

export const RentalCard: React.FC<RentalCardProps> = ({
  property,
  onPress,
  onAction,
  type,
}) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const moreBtnRef = useRef<View>(null);
  const [menuAnchor, setMenuAnchor] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [removeResidentModal, setRemoveResidentModal] = useState(false);
  const thumb = property.images?.[0];
  const ACTIONS =
    type === "rental"
      ? RENTAL_ACTIONS
      : type === "manage"
        ? ACTIONS_MANAGE
        : ACTIONS_GROUP;

  useEffect(() => {
    const unsubscribe = (navigation as any)?.addListener?.("blur", () => {
      setMenuVisible(false);
    });
    return unsubscribe;
  }, [navigation]);

  const openMenu = () => {
    if (!moreBtnRef.current) {
      setMenuAnchor(null);
      setMenuVisible(true);
      return;
    }

    moreBtnRef.current.measureInWindow((x, y) => {
      setMenuAnchor({ x, y });
      setMenuVisible(true);
    });
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={[styles.status, statusLabelColor(property.status)]}>
        <Text text={property.status} style={styles.statusText} />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.container}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles._morebutton}
          onPress={() => {
            if (menuVisible) {
              setMenuVisible(false);
              return;
            }
            openMenu();
          }}
        >
          <View ref={moreBtnRef} collapsable={false}>
            <Entypo name="dots-three-vertical" size={16} color={colors.white} />
          </View>
        </TouchableOpacity>
        <Image source={{ uri: thumb }} style={styles.thumbnail} />
        {/* Footer overlay */}
        <View style={styles.footerOverlay}>
          {type === "group" && (
            <View style={styles.greenCurve}>
              <Text text="GRP1234" style={styles.greenCurveText} />
            </View>
          )}
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                weight="semiBold"
                style={styles.footerTitle}
                numberOfLines={1}
              >
                {property.name}
              </Text>
              <Text style={styles.footerRight} numberOfLines={1}>
                Property ID: {property.propertyId}
              </Text>
            </View>

            <Text style={styles.footerSubtitle} numberOfLines={1}>
              Shortlet -{property.location}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setMenuVisible(false)}
        />
        <View
          style={[
            styles.menuBox,
            menuAnchor
              ? {
                  top: menuAnchor.y + adjustSize(22),
                  right: undefined,
                  left: Math.max(
                    adjustSize(10),
                    menuAnchor.x - adjustSize(200),
                  ),
                }
              : null,
          ]}
        >
          {ACTIONS.map((a) => (
            <TouchableOpacity
              key={a}
              onPress={() => {
                setMenuVisible(false);
                if (a === "Remove Resident") {
                  setRemoveResidentModal(true);
                  return;
                }
                onAction?.(a, property);
              }}
              style={styles.menuItem}
              activeOpacity={0.6}
            >
              <Text style={styles.menuText}>{a}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <SmallCustomModal
        visible={removeResidentModal}
        heading="Are you Sure?"
        text="Are you sure you want to remove this Resident?"
        modalType={1}
        leftBtnTitle="Cancel"
        rightBtnTitle="Remove"
        onClose={() => setRemoveResidentModal(false)}
        leftOnPress={() => setRemoveResidentModal(false)}
        rightOnPress={() => {
          setRemoveResidentModal(false);
          onAction?.("Remove Resident", property);
        }}
      />
    </View>
  );
};

const statusLabelColor = (status: string) => {
  switch (status) {
    case "Rejected":
      return { backgroundColor: "#D51E1E", color: "#fff" };
    case "Approved":
      return { backgroundColor: "#0AD029", color: "#fff" };
    case "Cancelled":
      return { backgroundColor: "#A1A1A1", color: "#fff" };
    case "Pending":
      return { backgroundColor: "#F26938", color: "#fff" };
    case "Reserved":
      return { backgroundColor: "#D51E1E", color: "#fff" };
  }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: adjustSize(16),
    overflow: "hidden",
    marginBottom: adjustSize(12),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    zIndex: -1,
  },
  thumbnail: {
    height: adjustSize(190),
    width: "100%",
    backgroundColor: colors.border,
    marginBottom: -15,
  },
  footerOverlay: {
    // position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    paddingHorizontal: adjustSize(14),
    paddingVertical: adjustSize(12),
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(10),
    borderTopLeftRadius: adjustSize(16),
    borderTopRightRadius: adjustSize(16),
  },
  greenCurve: {
    position: "absolute",
    left: 10,
    // right: 10,
    bottom: adjustSize(60),
    // height: adjustSize(10),
    backgroundColor: colors.white,
    // bottom:0,

    alignSelf: "flex-start",
    width: 100,
    zIndex: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 2,
  },
  greenCurveText: {},
  footerTitle: {
    fontSize: adjustSize(16),
    color: colors.white,
  },
  footerSubtitle: {
    marginTop: adjustSize(4),
    fontSize: adjustSize(12),
    color: "#B0B0B0",
  },
  footerRight: {
    fontSize: adjustSize(12),
    color: colors.white,
    // marginLeft: adjustSize(10),
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
    right: adjustSize(30),
    top: adjustSize(36),
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 10,
    width: adjustSize(220),
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
    zIndex: 100,
    backgroundColor: colors.primary,
    borderRadius: 100,
    padding: 5,
  },
  status: {
    backgroundColor: "#D51E1E",
    paddingHorizontal: adjustSize(12),
    height: adjustSize(26),
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: adjustSize(10),
    position: "absolute",
    margin: 10,
  },

  statusText: {
    color: colors.white,
    fontSize: adjustSize(10),
    fontFamily: typography.fonts.poppins.medium,
  },
});
