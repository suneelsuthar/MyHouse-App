import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Alert } from "react-native";
import { Screen, Text, Header2 } from "../../../Components";
import { colors, typography, adjustSize, spacing } from "../../../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const PanicEmergency: React.FC = () => {
  const navigation = useNavigation();

  const [options, setOptions] = useState([
    { name: "Fire", isSelected: false },
    { name: "Medical", isSelected: false },
    { name: "Burglary", isSelected: false },
    { name: "Kidnap", isSelected: false },
    { name: "Other", isSelected: false },
  ]);

  const handleSelect = (index: number) => {
    const updated = options.map((item, i) => ({
      ...item,
      isSelected: i === index,
    }));
    setOptions(updated);
  };

  const handleCancel = () => {
    navigation.goBack(); // 👈 go back to previous screen
  };

  const handleAlert = () => {
    const selected = options.find((item) => item.isSelected);
    if (!selected) {
      Alert.alert("No selection", "Please select an emergency type.");
      return;
    }

    Alert.alert("🚨 Emergency Alert", `Alert triggered for: ${selected.name}`, [
      {
        text: "OK",
        onPress: () => navigation.goBack(), // 👈 go back after pressing OK
      },
    ]);
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Emergency" onNotificationPress={() => {}} />
      <View style={styles.containeInner}>
        <View>
          <Text style={styles.text}>
            What are you trying to alert for? Select one of the options below:
          </Text>
          {options.map((val, index) => (
            <TouchableOpacity
              key={index}
              style={styles.list}
              activeOpacity={0.8}
              onPress={() => handleSelect(index)}
            >
              <Text style={styles.name}>{val.name}</Text>
              <View
                style={[
                  styles.box,
                  {
                    borderColor: val.isSelected ? colors.primary : "#B0B0B0",
                    backgroundColor: val.isSelected
                      ? colors.primary
                      : colors.white,
                  },
                ]}
              >
                {val.isSelected && (
                  <Ionicons
                    name="checkmark"
                    size={adjustSize(15)}
                    color="white"
                  />
                )}
              </View>
            </TouchableOpacity>
          ))}
        <Text text="Please make sure you have an Emergency that requires Urgent Attention" 
        style={{
          color:"#D62828",
          fontSize:adjustSize(14),
          fontFamily:typography.fonts.poppins.normal,
          marginTop:adjustSize(10)
        }}
        />
        </View>

        {/* Footer buttons */}
        <View style={styles.footerRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cancelBtn}
            onPress={handleCancel}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.alertBtn}
            onPress={handleAlert}
          >
            <Text style={styles.alertBtnText}>Alert</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  containeInner: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: adjustSize(10),
  },
  text: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    marginTop: adjustSize(20),
    marginBottom: adjustSize(25),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(12),
  },
  name: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  box: {
    borderWidth: adjustSize(0.5),
    width: adjustSize(20),
    height: adjustSize(20),
    borderRadius: adjustSize(2),
    alignItems: "center",
    justifyContent: "center",
  },
  footerRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginVertical: adjustSize(20),
    backgroundColor: colors.fill,
    marginBottom:50
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(41),
  },
  cancelBtnText: {
    color: colors.white,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  alertBtn: {
    flex: 1,
    backgroundColor: "#D62828",
    borderRadius: adjustSize(10),
    alignItems: "center",
    height: adjustSize(41),
    justifyContent: "center",
  },
  alertBtnText: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
});
