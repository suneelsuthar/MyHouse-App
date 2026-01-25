import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Text, InspectionTimeModal } from "../../../../Components";
import { adjustSize, colors } from "../../../../theme";

type Step4Props = {
  initialServices?: string[];
  initialSelectedServices?: string[];
  initialRestrictions?: string[];
  mode?: string;
};

const DEFAULT_SERVICES = [
  "Wardrobe",
  "Air conditioner",
  "Wifi",
  "Heater",
  "TV",
  "Kitchen",
  "Parking",
  "Washer",
  "Dryer",
  "Microwave",
  "Refrigerator",
  "Gym",
];

const DEFAULT_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Step4: React.FC<Step4Props> = ({
  initialServices = DEFAULT_SERVICES,
  initialSelectedServices = [],
  initialRestrictions = DEFAULT_DAYS,
}) => {
  // Services
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialSelectedServices
  );
  // Restrictions
  const [restrictionOptions] = useState<string[]>(initialRestrictions);
  const [selectedRestrictions, setSelectedRestrictions] = useState<Set<string>>(
    new Set(["No Smoking", "No Parties"]) // as per screenshots demo
  );
  // Time selection modal state
  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [schedule, setSchedule] = useState<any>(null);
  console.log("schedule", schedule);
  return (
    <View style={{ flex: 1 }}>
      {/* Services */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        When are you available for property inspections?
      </Text>

      {selectedServices.length > 0 && (
        <View style={styles.chipsRow}>
          {selectedServices.map((s) => (
            <View key={s} style={styles.chip}>
              <Text style={styles.chipText}>{s}</Text>
              <TouchableOpacity
                onPress={() =>
                  setSelectedServices((prev) => prev.filter((x) => x !== s))
                }
                style={styles.chipClose}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                {/* Using a simple X since AntDesign import was removed */}
                <Text style={{ color: colors.white, fontSize: adjustSize(12) }}>
                  ×
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Restrictions */}
      <Text
        weight="semiBold"
        style={[styles.sectionTitle, { fontSize: adjustSize(12) }]}
      >
        Choose day(s)
      </Text>
      <View style={styles.restrictionsWrap}>
        {restrictionOptions.map((r) => {
          const active = selectedRestrictions.has(r);
          return (
            <TouchableOpacity
              key={r}
              style={[
                styles.restrictionChip,
                active && styles.restrictionActive,
              ]}
              onPress={() => setTimeModalVisible(true)}
              activeOpacity={0.8}
            >
              <Text
                weight="medium"
                style={[
                  styles.restrictionText,
                  active && styles.restrictionTextActive,
                ]}
              >
                {r}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* Modal */}
      <InspectionTimeModal
        visible={timeModalVisible}
        onClose={() => setTimeModalVisible(false)}
        onDone={(s) => setSchedule(s)}
        title="Choose time of the day"
        selectedDays={Array.from(selectedRestrictions) as any}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    marginVertical: adjustSize(20),
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: adjustSize(8),
    marginTop: adjustSize(8),
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: adjustSize(20),
    paddingVertical: adjustSize(6),
    paddingLeft: adjustSize(12),
    paddingRight: adjustSize(8),
  },
  chipText: {
    color: colors.white,
    fontSize: adjustSize(12),
  } as TextStyle,
  chipClose: {
    marginLeft: adjustSize(8),
    width: adjustSize(16),
    height: adjustSize(16),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
  },

  restrictionsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: adjustSize(8),
    marginBottom: adjustSize(16),
    flex: 1,
    justifyContent: "space-between",
  },

  restrictionChip: {
    paddingHorizontal: adjustSize(14),
    paddingVertical: adjustSize(10),
    borderRadius: adjustSize(10),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    width: adjustSize(105),
    backgroundColor:colors.white,
    height:adjustSize(40)

  } as ViewStyle,
  restrictionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    elevation: 2,
  },
  restrictionText: {
    color: colors.primary,
    fontSize: adjustSize(12),
    textAlign: "center",
  } as TextStyle,
  restrictionTextActive: {
    color: colors.white,
  } as TextStyle,
});

export default Step4;
