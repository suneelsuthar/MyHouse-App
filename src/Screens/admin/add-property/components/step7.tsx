import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Text } from "../../../../Components";
import { adjustSize, colors, typography } from "../../../../theme";
import { MaterialIcons } from "@expo/vector-icons";

interface Step7Props {
  mode: "add" | "edit";
}

const Step7: React.FC<Step7Props> = ({ mode }) => {
  const [unifyListing, setUnifyListing] = useState<boolean>(false);
  const [urls, setUrls] = useState<string[]>([""]);
  const [bookingDuration, setBookingDuration] = useState<number>(1);

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index: number) => {
    if (urls.length > 1) {
      const newUrls = [...urls];
      newUrls.splice(index, 1);
      setUrls(newUrls);
    }
  };

  const updateUrl = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  return (
    <ScrollView style={styles.container}>
      <Text weight="semiBold" style={styles.title}>
        Calendar Management
      </Text>

      <View style={styles.section}>
        <Text
          weight="semiBold"
          style={[styles.label, { fontSize: adjustSize(16) }]}
        >
          Set Minimum Booking Duration Per Booking
        </Text>
        <Text
          weight="semiBold"
          style={[
            styles.label,
            { fontSize: adjustSize(12), color: colors.primary },
          ]}
        >
          Number of Nights
        </Text>
        <View style={styles.numberInputContainer}>
          <TouchableOpacity
            style={styles.numberButton}
            onPress={() => setBookingDuration((prev) => Math.max(1, prev - 1))}
          >
            <Text style={styles.numberButtonText}>-</Text>
          </TouchableOpacity>
          <TextInput
            editable={false}
            style={styles.numberInput}
            value={bookingDuration.toString()}
            onChangeText={(text) => {
              const num = parseInt(text, 10) || 0;
              setBookingDuration(Math.max(1, num));
            }}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.numberButton}
            onPress={() => setBookingDuration((prev) => prev + 1)}
          >
            <Text style={styles.numberButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.section}>
        {/* <Text style={styles.label}>Unify Property Listing</Text> */}
        <Text
          weight="semiBold"
          style={[styles.label, { fontSize: adjustSize(16) }]}
        >
          Unify Property Listing
        </Text>
        <Text
          weight="semiBold"
          style={[
            styles.label,
            { fontSize: adjustSize(12), color: colors.primary },
          ]}
        >
          Is this property listed on other platforms?
        </Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setUnifyListing(true)}
          >
            <View
              style={[
                styles.radioCircle,
                unifyListing && styles.radioCircleSelected,
              ]}
            >
              {unifyListing && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioLabel}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioButton}
            onPress={() => setUnifyListing(false)}
          >
            <View
              style={[
                styles.radioCircle,
                !unifyListing && styles.radioCircleSelected,
              ]}
            >
              {!unifyListing && <View style={styles.radioInnerCircle} />}
            </View>
            <Text style={styles.radioLabel}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {unifyListing && (
        <View style={styles.urlSection}>
          <Text
            weight="semiBold"
            style={[styles.label, { fontSize: adjustSize(16) }]}
          >
            Import Your Property Link With ICAL
          </Text>
          <Text
            weight="semiBold"
            style={[
              styles.label,
              { fontSize: adjustSize(12), color: colors.primary },
            ]}
          >
            Import URL ℹ️
          </Text>
          {urls.map((url, index) => (
            <View key={index} style={styles.urlInputContainer}>
              <TextInput
                style={styles.input}
                value={url}
                onChangeText={(text) => updateUrl(index, text)}
                placeholder="Enter Import URL"
                placeholderTextColor={colors.grey}
              />
              {urls.length > 1 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeUrlField(index)}
                >
                  <MaterialIcons
                    name="remove-circle"
                    size={24}
                    color={colors.error}
                  />
                </TouchableOpacity>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addUrlField}>
            <MaterialIcons name="add-circle" size={24} color={colors.primary} />
            <Text style={styles.addButtonText}>Add Another URL</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: adjustSize(16),
  },
  title: {
    fontSize: adjustSize(18),
    color: colors.primary,
    marginBottom: adjustSize(20),
  },
  section: {
    marginBottom: adjustSize(20),
  },
  label: {
    fontSize: adjustSize(14),
    color: colors.primary,
    marginTop: adjustSize(10),
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: adjustSize(10),
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: adjustSize(20),
  },
  radioCircle: {
    width: adjustSize(20),
    height: adjustSize(20),
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: adjustSize(8),
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: {
    borderColor: colors.primary,
  },
  radioInnerCircle: {
    width: adjustSize(12),
    height: adjustSize(12),
    borderRadius: adjustSize(6),
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: adjustSize(14),
    color: colors.text,
  },
  urlSection: {},
  urlInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: adjustSize(10),
  },
  input: {
    flex: 1,
    height: adjustSize(40),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: adjustSize(8),
    paddingHorizontal: adjustSize(12),
    marginRight: adjustSize(10),
    color: colors.text,
    backgroundColor: colors.white,
    marginVertical: adjustSize(5),
  },
  removeButton: {
    padding: adjustSize(5),
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: adjustSize(10),
  },
  addButtonText: {
    marginLeft: adjustSize(8),
    color: colors.primary,
  },
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberInput: {
    width: adjustSize(30),
    height: adjustSize(40),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: adjustSize(8),
    textAlign: "center",
    marginHorizontal: adjustSize(10),
    color: colors.text,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  numberButton: {
    width: adjustSize(30),
    height: adjustSize(30),
    borderRadius: adjustSize(5),
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  numberButtonText: {
    fontSize: adjustSize(16),
    color: colors.white,
  },
});

export default Step7;
