import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
  Switch,
} from "react-native";
import { Text, Button, InspectionTimeModal } from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { adjustSize, colors, typography } from "../../../../theme";

type Step4Props = {
  // Back/Next handled by parent; nothing needed here
  initialServices?: string[];
  initialSelectedServices?: string[];
  initialRestrictions?: string[];
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
  const [allServices] = useState<string[]>(initialServices);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialSelectedServices
  );
  const [serviceValue, setServiceValue] = useState<string | null>(null);
  // MultiSelectDropdown manages query/open internally; we just pass/set values

  // Restrictions
  const [restrictionOptions] = useState<string[]>(initialRestrictions);
  const [selectedRestrictions, setSelectedRestrictions] = useState<Set<string>>(
    new Set(["No Smoking", "No Parties"]) // as per screenshots demo
  );

  const toggleRestriction = (r: string) => {
    setSelectedRestrictions((prev) => {
      const next = new Set(prev);
      if (next.has(r)) next.delete(r);
      else next.add(r);
      return next;
    });
  };

  // Agents / Facility Managers
  const [assignPrimaryAgent, setAssignPrimaryAgent] = useState<boolean>(false);
  const [allowPrimaryAgentRequest, setAllowPrimaryAgentRequest] =
    useState<boolean>(false);
  const [allowFacilityManagerRequest, setAllowFacilityManagerRequest] =
    useState<boolean>(false);
  const [assignFacilityManager, setAssignFacilityManager] =
    useState<boolean>(false);

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

      {/* Footer is handled by parent (Back/Next) */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginTop: adjustSize(16),
    marginBottom: adjustSize(10),
  },

  stepperRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: adjustSize(16),
    opacity: 0.6,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepCircle: {
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(14),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  stepCircleActive: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
  },
  stepCircleInactive: {
    backgroundColor: colors.fill,
    borderColor: colors.greylight,
  },
  stepText: {
    fontSize: adjustSize(12),
  } as TextStyle,
  stepTextActive: {
    color: colors.primary,
  } as TextStyle,
  stepTextInactive: {
    color: colors.primary,
    opacity: 0.6,
  } as TextStyle,
  stepLine: {
    width: adjustSize(28),
    height: 1,
    backgroundColor: colors.greylight,
    marginHorizontal: adjustSize(6),
  },

  sectionTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    marginVertical: adjustSize(20),
  },

  card: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    padding: adjustSize(12),
    marginBottom: adjustSize(16),
  },

  fieldGap: {
    marginBottom: adjustSize(8),
  },

  inputIcon: {
    position: "absolute",
    right: adjustSize(12),
    top: adjustSize(16),
    width: adjustSize(24),
    height: adjustSize(24),
    alignItems: "center",
    justifyContent: "center",
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

  dropdownPanel: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    marginTop: adjustSize(8),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    maxHeight: adjustSize(180),
    overflow: "hidden",
  },
  dropdownRow: {
    paddingVertical: adjustSize(10),
    paddingHorizontal: adjustSize(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.greylight,
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
    backgroundColor: colors.fill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    width: adjustSize(105),
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

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(5),
  },
  toggleLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flexShrink: 1,
    paddingRight: adjustSize(10),
  },

  miniDropdown: {
    width: adjustSize(110),
    backgroundColor: colors.fill,
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
  } as ViewStyle,
  miniDropdownText: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  } as TextStyle,
});

export default Step4;
