import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
  Switch,
  Image,
  ImageSourcePropType
} from "react-native";
import { Text } from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { adjustSize, colors, typography } from "../../../../theme";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../../assets/Images";
type Step3Props = {
  initialServices?: string[];
  initialSelectedServices?: string[];
  initialRestrictions?: string[];
  mode?: string;
};


interface ServiceItem {
  label: string;
  value: string;
}



const DEFAULT_FEATURES: ServiceItem[] = [
  { label: "Balcony", value: "Balcony"},
  { label: "Swimming Pool", value: "Swimming Pool"},
  { label: "Garden", value: "Garden"},
  { label: "Elevator", value: "Elevator"},
  { label: "Security", value: "Security"},
  { label: "Parking Space", value: "Parking Space"},
];

const DEFAULT_SERVICES: ServiceItem[] = [
  { label: "Wardrobe", value: "Wardrobe", image: Images.logo_1 },
  { label: "Air conditioner", value: "Air conditioner", image: Images.logo_1 },
  { label: "Wifi", value: "Wifi", image: Images.logo_1 },
  { label: "Heater", value: "Heater", image: Images.logo_1 },
  { label: "TV", value: "TV", image: Images.logo_1 },
  { label: "Kitchen", value: "Kitchen", image: Images.logo_1 },
  { label: "Parking", value: "Parking", image: Images.logo_1 },
  { label: "Washer", value: "Washer", image: Images.logo_1 },
  { label: "Dryer", value: "Dryer", image: Images.logo_1 },
  { label: "Microwave", value: "Microwave", image: Images.logo_1 },
  { label: "Refrigerator", value: "Refrigerator", image: Images.logo_1 },
  { label: "Gym", value: "Gym", image: Images.logo_1 },
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
  const [allServices] = useState<ServiceItem[]>(DEFAULT_SERVICES);
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
      {/* Features */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        Do you have any Features?
      </Text>

      <DropdownComponent
        data={DEFAULT_FEATURES}
        value={null}
        onChangeValue={() => {}}
        placeholder="Search Features"
        dropdownStyle={
          {
            marginHorizontal: 1,
            backgroundColor: colors.white,
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

      {/* Services */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        What about services?
      </Text>

      <DropdownComponent
        data={allServices}
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
            backgroundColor: colors.white,
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
          {selectedServices.map((serviceValue) => {
            const service = allServices.find(s => s.value === serviceValue);
            if (!service) return null;
            
            return (
              <View key={service.value} style={styles.chip}>
                <View style={styles.chipContent}>
                 
                  <Text style={styles.chipText}>{service.label}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setSelectedServices((prev) => prev.filter((x) => x !== service.value))
                  }
                  style={styles.chipClose}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={{ color: colors.white, fontSize: adjustSize(12) }}>
                    ×
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
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
              type: "primary-agent",
              title: "Assign Agent",
            } as never)
          }
          style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
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
          style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
        />
      </View>

      {/* Facility Managers */}
      <Text weight="semiBold" style={styles.sectionTitle}>
        Facility Managers
      </Text>
     
      <View style={styles.toggleRow}>
        <Text weight="normal" style={styles.toggleLabel}>
          Assign Facility Manager
        </Text>
        <Switch
          value={assignFacilityManager}
          onValueChange={setAssignFacilityManager}
          trackColor={{ false: colors.greylight, true: colors.primary }}
          thumbColor={colors.white}
          style={{ transform: [{ scaleX: 1 }, { scaleY: 1}] }}
          onChange={() => {
            if (!assignFacilityManager) {
              setAllowFacilityManagerRequest(false);
            }
          }}
        />
      </View>

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
          style={{ transform: [{ scaleX: 1 }, { scaleY: 1}] }}
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    height:adjustSize(40)
  },
  chipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceImage: {
    width: 20,
    height: 20,
    marginRight: 6,
    borderRadius:5
    // tintColor: colors.white,
  },
  chipText: {
    color: colors.white,
    fontSize: adjustSize(14),
  },
  chipClose: {
    marginLeft: 4,
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
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    height:adjustSize(49),
    justifyContent:"center",
    alignItems:"center"
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
