import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AdminStackParamList } from "../navigation/types";
import { adjustSize, colors, typography } from "../theme";
import { Text } from "./Text";
import Entypo from "@expo/vector-icons/Entypo";
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
    }
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

  const menuScale = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const menuOpacity = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const toggleMenu = () => {
    Animated.timing(menuAnimation, {
      toValue: menuVisible ? 0 : 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    setMenuVisible(!menuVisible);
  };

  const handleView = () => {
    navigation.navigate("MeterDetail", {
      mode: "view",
      meterData: data,
    });
  };

  const handleEdit = () => {
    setMenuVisible(false);
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
          setMenuVisible(false);
          onPress?.(data);
        }}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text weight="semiBold" style={styles.meterName} numberOfLines={1}>
              {data.meterName}
            </Text>
          </View>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              toggleMenu();
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

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabelvalue}>
              <Text weight="medium" style={styles.detailLabel}>
                Tenant:{" "}
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
                Group ID:{" "}
              </Text>
              {data?.groupId}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {menuVisible && (
        <Animated.View
          style={[
            styles.menuContainer,
            {
              opacity: menuOpacity,
              transform: [{ scale: menuScale }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              onPress("view", data);
            }}
          >
            <Text style={styles.menuText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              onEdit("edit", data);
            }}
          >
            <Text style={styles.menuText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuVisible(false);
              onClearTember?.(data);
            }}
          >
            <Text style={[styles.menuText]}>
              Clear temper
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
  },
  container: {
    padding: adjustSize(15),
    borderBottomWidth: adjustSize(0.5),
    borderColor: "#B0B0B0",
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
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 4,
    width: 160,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 10,
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
