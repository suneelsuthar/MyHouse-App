import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Header, Screen, Text } from "../../../Components";
import { colors, adjustSize } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const PinInput = ({
  value,
  setValue,
}: {
  value: string[];
  setValue: (val: string[]) => void;
}) => {
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d?$/.test(text)) return;

    const updated = [...value];
    updated[index] = text;
    setValue(updated);

    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.pinContainer}>
      {value.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref!)}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="number-pad"
          maxLength={1}
          secureTextEntry
          style={styles.pinBox}
        />
      ))}
    </View>
  );
};

export const CreateNewPin = () => {
  const navigation = useNavigation();

  const [isResetMode, setIsResetMode] = useState(false);

  const [currentPin, setCurrentPin] = useState(["", "", "", ""]);
  const [newPin, setNewPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const isComplete = (pin: string[]) => pin.every((d) => d !== "");

  const isValid = isResetMode
    ? isComplete(currentPin) &&
      isComplete(newPin) &&
      isComplete(confirmPin) &&
      newPin.join("") === confirmPin.join("")
    : isComplete(newPin) &&
      isComplete(confirmPin) &&
      newPin.join("") === confirmPin.join("");

  const handleSubmit = () => {
    if (!isValid) {
      setError("PINs do not match or incomplete.");
      return;
    }

    setError("");
    setIsResetMode(false);
    setConfirmPin(["", "", "", ""]);
    setNewPin(["", "", "", ""]);
    setCurrentPin(["", "", "", ""]);

    Alert.alert(
      "Success",
      isResetMode ? "PIN reset successfully!" : "New PIN created successfully!",
    );
  };

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={styles.container}
    >
      {/* Header */}

      <Header title={isResetMode ? "Change/Reset PIN" : "Create New Pin"} />
      <View style={{ padding: 20, flex: 1 }}>
        {/* Current PIN (only in reset mode) */}
        {isResetMode && (
          <>
            <Text weight="semiBold" style={styles.label}>
              Current PIN
            </Text>
            <PinInput value={currentPin} setValue={setCurrentPin} />
          </>
        )}

        {/* Enter New PIN */}
        <Text
          weight="semiBold"
          style={[styles.label, { marginTop: isResetMode ? 25 : 10 }]}
        >
          Enter New PIN
        </Text>
        <PinInput value={newPin} setValue={setNewPin} />

        {/* Confirm PIN */}
        <Text weight="semiBold" style={[styles.label, { marginTop: 25 }]}>
          Confirm New PIN
        </Text>
        <PinInput value={confirmPin} setValue={setConfirmPin} />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* Button */}

        {/* Toggle Reset Mode */}
      </View>
      <TouchableOpacity
        disabled={!isValid}
        onPress={handleSubmit}
        style={[styles.button]}
      >
        <Text weight="semiBold" style={styles.buttonText}>
          {isResetMode ? "Save PIN" : "Submit"}
        </Text>
      </TouchableOpacity>
      {!isResetMode && (
        <View style={styles.resetRow}>
          <Text>
            <Text
              style={{ color: "#D51E1E" }}
              onPress={() => {
                setIsResetMode(true);
                setConfirmPin(["", "", "", ""]);
                setNewPin(["", "", "", ""]);
                setCurrentPin(["", "", "", ""]);
              }}
            >
              Forget PIN?
            </Text>{" "}
            <Text
              style={{ color: colors.primary }}
              onPress={() => setIsResetMode(true)}
            >
              Reset PIN
            </Text>
          </Text>
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: adjustSize(30),
  },
  headerTitle: {
    fontSize: adjustSize(18),
    marginLeft: adjustSize(15),
    color: colors.primary,
  },
  label: {
    fontSize: adjustSize(12),
    color: colors.primary,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: adjustSize(12),
  },
  pinBox: {
    width: adjustSize(49),
    height: adjustSize(49),
    borderRadius: adjustSize(15),
    backgroundColor: colors.white,
    textAlign: "center",
    fontSize: adjustSize(18),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: adjustSize(15),
    marginTop: adjustSize(40),
    alignItems: "center",
    width: "95%",
    alignSelf: "center",
    height: adjustSize(49),
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: adjustSize(15),
  },
  error: {
    color: "red",
    marginTop: adjustSize(10),
  },
  resetRow: {
    marginTop: adjustSize(10),
    alignItems: "center",
    marginBottom: 20,
  },
});
