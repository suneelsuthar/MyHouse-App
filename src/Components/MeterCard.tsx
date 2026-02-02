import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { adjustSize, colors, typography } from "../theme";
import { Text } from "./Text";
import Entypo from "@expo/vector-icons/Entypo";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store";

type MeterData = {
  id: string;
  meterName: string;
  tenent: string;
  status: string;
  manufacturer: string | number;
  meterType: string;
  groupId: string;
  propertyId: string;
  meterId: string;
};

type MeterMode = "view" | "edit" | "add";

interface MeterCardProps {
  data: MeterData;
  onPress?: (mode: string, meter: any) => void;
  onEdit?: (mode: string, meter: any) => void;
  onClearTember?: (meter: MeterData) => void;
}

type RootStackParamList = {
  MeterDetail: {
    mode: MeterMode;
    meterData?: MeterData;
    onSave?: (data: MeterData) => void;
  };
};

type NavigationProp = {
  navigate: (
    screen: "MeterDetail",
    params: {
      mode: "view" | "edit" | "add";
      meterData?: MeterData;
      onSave?: (data: MeterData) => void;
    },
  ) => void;
};

export const MeterCard: React.FC<MeterCardProps> = ({
  data,
  onPress,
  onEdit,
  onClearTember,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  const menuAnchorRef = useRef<any>(null);
  const [menuAnchor, setMenuAnchor] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const { user } = useAppSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    const unsubscribe = (navigation as any)?.addListener?.("blur", () => {
      setMenuVisible(false);
      menuAnimation.setValue(0);
    });
    return unsubscribe;
  }, [navigation, menuAnimation]);

  const menuScale = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const menuOpacity = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const closeMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: 0,
      duration: 150,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setMenuVisible(false);
    });
  };

  const openMenu = () => {
    menuAnchorRef.current?.measureInWindow?.(
      (x: number, y: number, width: number, height: number) => {
        setMenuAnchor({ x, y, width, height });
        setMenuVisible(true);
        Animated.timing(menuAnimation, {
          toValue: 1,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start();
      },
    );
  };

  const handleView = () => {
    navigation.navigate("MeterDetail", {
      mode: "view",
      meterData: data,
    });
  };

  const handleEdit = () => {
    closeMenu();
    navigation.navigate("MeterDetail", {
      mode: "edit",
      meterData: data,
      onSave: (updatedMeter: MeterData) => {
        onEdit?.(updatedMeter);
      },
    });
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={() => {
          closeMenu();
          onPress?.(data);
        }}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text weight="semiBold" style={styles.meterName} numberOfLines={1}>
              {data.meterName}
            </Text>
          </View>

          <View ref={menuAnchorRef} collapsable={false}>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                if (menuVisible) closeMenu();
                else openMenu();
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Entypo
                name="dots-three-vertical"
                size={adjustSize(18)}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabelvalue}>
              <Text weight="medium" style={styles.detailLabel}>
                Resident:{" "}
              </Text>
              {data?.tenent}
            </Text>
            <Text style={[styles.detailValue, { color: "#4CAF50" }]}>
              {data?.status}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabelvalue}>
              <Text weight="medium" style={styles.detailLabel}>
                Manufacturer:{" "}
              </Text>
              {data?.manufacturer}
            </Text>

            <Text style={styles.detailLabelvalue}>
              <Text weight="medium" style={styles.detailLabel}>
                Meter Number:{" "}
              </Text>
              50
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabelvalue}>
              <Text weight="medium" style={styles.detailLabel}>
                Property ID:{" "}
              </Text>
              {data?.propertyId}
            </Text>
            <Text style={styles.detailLabelvalue}>
              <Text weight="medium" style={styles.detailLabel}>
                Estate ID:{" "}
              </Text>
              {data?.groupId}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable style={styles.menuOverlay} onPress={closeMenu}>
          <Animated.View
            style={[
              styles.menuContainer,
              {
                opacity: menuOpacity,
                transform: [{ scale: menuScale }],
              },
              (() => {
                const { width: screenWidth, height: screenHeight } =
                  Dimensions.get("window");
                const MENU_W = 160;
                const MENU_H = user?.role !== "facility_manager" ? 140 : 60;
                const safePad = 12;

                const x = menuAnchor?.x ?? safePad;
                const y = menuAnchor?.y ?? safePad;
                const w = menuAnchor?.width ?? 0;
                const h = menuAnchor?.height ?? 0;

                const left = Math.max(
                  safePad,
                  Math.min(x + w - MENU_W, screenWidth - MENU_W - safePad),
                );
                const top = Math.max(
                  safePad,
                  Math.min(y + h + 6, screenHeight - MENU_H - safePad),
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
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                closeMenu();
                onPress?.("view", data);
              }}
            >
              <Text style={styles.menuText}>View</Text>
            </TouchableOpacity>

            {user?.role !== "facility_manager" && (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  closeMenu();
                  onEdit?.("edit", data);
                }}
              >
                <Text style={styles.menuText}>Update</Text>
              </TouchableOpacity>
            )}

            {user?.role !== "facility_manager" && (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  closeMenu();
                  onClearTember?.(data);
                }}
              >
                <Text style={styles.menuText}>Clear Tamper</Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    backgroundColor: colors.white,
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  container: {
    padding: adjustSize(15),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  meterName: {
    fontSize: adjustSize(14),
    color: colors.primary,
    marginRight: 8,
  },
  meterTypeBadge: {
    backgroundColor: "#E8E8E8",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  meterTypeText: {
    fontSize: adjustSize(10),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
  },
  detailsContainer: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  detailLabelvalue: {
    fontSize: adjustSize(12),
    color: "#7E7E7E",
    fontFamily: typography.fonts.poppins.normal,
  },
  detailValue: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  readingValue: {
    fontSize: adjustSize(14),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  menuText: {
    fontSize: adjustSize(12),
    color: colors.primary,
    // fontFamily: typography.fonts.poppins.medium,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 4,
  },
});
