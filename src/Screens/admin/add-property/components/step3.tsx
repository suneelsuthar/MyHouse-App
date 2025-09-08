import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
  Switch,
} from "react-native";
import { Text } from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { adjustSize, colors, typography } from "../../../../theme";
import { useNavigation } from "@react-navigation/native";
type Step3Props = {
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

const DEFAULT_RESTRICTIONS = [
  "No kids",
  "No Smoking",
  "No Filming",
  "No Parties",
  "No Pet",
];

const Step3: React.FC<Step3Props> = ({
  initialServices = DEFAULT_SERVICES,
  initialSelectedServices = [],
  initialRestrictions = DEFAULT_RESTRICTIONS,
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

  const navigation: any = useNavigation();
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

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingBottom: adjustSize(24) }}
      showsVerticalScrollIndicator={false}
    >
      {/* Services */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        What about services?
      </Text>

      <DropdownComponent
        data={allServices.map((s) => ({ label: s, value: s }))}
        value={serviceValue}
        onChangeValue={(val) => {
          setServiceValue(null);
          if (!selectedServices.includes(val)) {
            setSelectedServices((prev) => [...prev, val]);
          }
        }}
        placeholder="Search Services"
        dropdownStyle={
          {
            marginHorizontal: 1,
            // marginBottom: adjustSize(8),
            backgroundColor: colors.fill,
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
            marginBottom: adjustSize(10),
          } as ViewStyle
        }
        rightIconColor={colors.primary}
        placeholderStyle={{
          color: colors.grey,
          fontSize: adjustSize(12),
          fontFamily: typography.fonts.poppins.normal,
        }}
        selectedTextStyle={{
          color: "#292766",
          fontFamily: typography.fonts.poppins.normal,
          fontSize: adjustSize(12),
        }}
      />

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
      <Text weight="semiBold" style={styles.sectionTitle}>
        Restrictions
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
              onPress={() => toggleRestriction(r)}
              activeOpacity={0.8}
            >
              <Text
                weight="semiBold"
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

      {/* Agents */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        Agents
      </Text>
      <View style={styles.toggleRow}>
        <Text weight="normal" style={styles.toggleLabel}>
          Assign Primary Agent
        </Text>
        <Switch
          value={assignPrimaryAgent}
          onValueChange={setAssignPrimaryAgent}
          trackColor={{ false: colors.greylight, true: colors.primary }}
          thumbColor={colors.white}
          onChange={() =>
            !assignPrimaryAgent &&
            navigation.navigate("AdminAssignProperties", {
              type: "agent",
              title: "Assign Agent",
            } as never)
          }
        />
      </View>
      <View style={styles.toggleRow}>
        <Text weight="normal" style={styles.toggleLabel}>
          Allow Primary Agent Request
        </Text>
        <Switch
          value={allowPrimaryAgentRequest}
          onValueChange={setAllowPrimaryAgentRequest}
          trackColor={{ false: colors.greylight, true: colors.primary }}
          thumbColor={colors.white}
          onChange={() => {
            if (!allowPrimaryAgentRequest) {
              setAssignPrimaryAgent(false);
            }
          }}
        />
      </View>

      {/* Facility Managers */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        Facility Managers
      </Text>
      <View style={styles.toggleRow}>
        <Text weight="normal" style={styles.toggleLabel}>
          Allow Facility Manager Request
        </Text>
        <Switch
          value={allowFacilityManagerRequest}
          onValueChange={setAllowFacilityManagerRequest}
          trackColor={{ false: colors.greylight, true: colors.primary }}
          thumbColor={colors.white}
          onChange={() =>
            !allowFacilityManagerRequest &&
            navigation.navigate("AdminAssignProperties", {
              type: "fm",
              title: "Assign Facility Manager",
            } as never)
          }
        />
      </View>
      <View style={styles.toggleRow}>
        <Text weight="normal" style={styles.toggleLabel}>
          Assign Facility Manager
        </Text>
        <Switch
          value={assignFacilityManager}
          onValueChange={setAssignFacilityManager}
          trackColor={{ false: colors.greylight, true: colors.primary }}
          thumbColor={colors.white}
          onChange={() => {
            if (!assignFacilityManager) {
              setAllowFacilityManagerRequest(false);
            }
          }}
        />
      </View>

      {/* Footer is handled by parent (Back/Next) */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: adjustSize(15),
    lineHeight: adjustSize(18),

    color: colors.primary,
    marginTop: adjustSize(12),
    marginBottom: adjustSize(10),
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
    gap: adjustSize(12),
    marginBottom: adjustSize(16),
  },

  restrictionChip: {
    paddingHorizontal: adjustSize(14),
    paddingVertical: adjustSize(10),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
  } as ViewStyle,
  restrictionActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    elevation: 2,
  },
  restrictionText: {
    color: colors.primary,
    fontSize: adjustSize(12),
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
});

export default Step3;
