import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../../../../Components";
import { adjustSize, colors } from "../../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";
import { MaterialIcons } from "@expo/vector-icons";

type ResidentialSubtype = "shortlet" | "medium" | "long";
type CommercialSubtype = "retail" | "office";

export type ListingCategory =
  | { kind: "residential"; subTypes: ResidentialSubtype[] }
  | { kind: "commercial"; subTypes: CommercialSubtype[] };

type SelectedValue =
  | { kind: "residential"; subType: ResidentialSubtype }
  | { kind: "commercial"; subType: CommercialSubtype }
  | null;

export interface Step1Props {
  mode: "add" | "edit";
  value?: SelectedValue; // single selected option
  onChange?: (value: SelectedValue) => void;
}

export const Step1: React.FC<Step1Props> = ({ mode, value, onChange }) => {
  const [expanded, setExpanded] = useState<{ res: boolean; com: boolean }>({
    res: true,
    com: true,
  });
  const [selected, setSelected] = useState<SelectedValue>(value ?? null);

  const selectResidential = (subType: ResidentialSubtype) => {
    const next: SelectedValue = { kind: "residential", subType };
    setSelected(next);
    onChange?.(next);
  };

  const selectCommercial = (subType: CommercialSubtype) => {
    const next: SelectedValue = { kind: "commercial", subType };
    setSelected(next);
    onChange?.(next);
  };

  return (
    <View>
      <Text weight="semiBold" style={styles.title}>
        What Category is your listing?
      </Text>

      {/* Residential */}
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setExpanded((e) => ({ res: !e.res, com: false }))}
          style={styles.cardHeader}
        >
          <View style={styles.headerLeft}>
            <WithLocalSvg asset={Images.residentialsIcon} />
            <Text weight="medium" style={styles.cardTitle}>
              Residential
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={expanded.res ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color={colors.primary}
            />
          </View>
        </TouchableOpacity>
        {expanded.res && (
          <View style={styles.checkRow}>
            {[
              { label: "Shortlet", key: "shortlet" as ResidentialSubtype },
              { label: "Medium Lease", key: "medium" as ResidentialSubtype },
              { label: "Long lease", key: "long" as ResidentialSubtype },
            ].map((opt) => {
              const isSelected =
                selected?.kind === "residential" &&
                selected.subType === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  style={styles.checkItem}
                  activeOpacity={0.7}
                  onPress={() => selectResidential(opt.key)}
                >
                  <View
                    style={[styles.radio, isSelected && styles.radioChecked]}
                  >
                    {isSelected ? <View style={styles.radioDot} /> : null}
                  </View>
                  <Text style={styles.checkboxLabel}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* Commercial */}
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setExpanded((e) => ({ res: false, com: !e.com }))}
          style={styles.cardHeader}
        >
          <View style={styles.headerLeft}>
            <WithLocalSvg asset={Images.commercialIcon} />
            <Text weight="medium" style={styles.cardTitle}>
              Commercial
            </Text>
          </View>
          <Text style={styles.chevron}>
            <MaterialIcons
              name={expanded.com ? "keyboard-arrow-up" : "keyboard-arrow-down"}
              size={24}
              color={colors.primary}
            />
          </Text>
        </TouchableOpacity>
        {expanded.com && (
          <View style={styles.checkRow}>
            {[
              { label: "Retail", key: "retail" as CommercialSubtype },
              { label: "Office", key: "office" as CommercialSubtype },
            ].map((opt) => {
              const isSelected =
                selected?.kind === "commercial" && selected.subType === opt.key;
              return (
                <TouchableOpacity
                  key={opt.key}
                  style={styles.checkItem}
                  activeOpacity={0.7}
                  onPress={() => selectCommercial(opt.key)}
                >
                  <View
                    style={[styles.radio, isSelected && styles.radioChecked]}
                  >
                    {isSelected ? <View style={styles.radioDot} /> : null}
                  </View>
                  <Text style={styles.checkboxLabel}>{opt.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: adjustSize(15),
    color: colors.primary,
    marginVertical: adjustSize(20),
  },
  card: {},
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
    elevation: 2,
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    borderWidth: 0.2,
    borderColor: colors.greylight,
    padding: adjustSize(12),
    marginVertical: adjustSize(10),
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(8),
  },
  cardTitle: {
    color: colors.primary,
    fontSize: adjustSize(14),
    alignSelf: "flex-start",
  },
  chevron: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },
  checkRow: {
    paddingHorizontal: adjustSize(10),
  },
  checkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: adjustSize(8),
  },
  radio: {
    width: adjustSize(16),
    height: adjustSize(16),
    borderRadius: adjustSize(2),
    borderWidth: 1.6,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: adjustSize(10),
  },
  radioChecked: {
    borderColor: colors.primary,
  },
  radioDot: {
    width: adjustSize(10),
    height: adjustSize(10),
    borderRadius: adjustSize(1),
    backgroundColor: colors.primary,
  },
  checkbox: {
    width: adjustSize(18),
    height: adjustSize(18),
    borderRadius: 4,
    borderWidth: 1.6,
    borderColor: colors.primary,
    marginRight: adjustSize(10),
  },

  checkboxLabel: {
    color: colors.primary,
    fontSize: adjustSize(13),
  },
});

export default Step1;
