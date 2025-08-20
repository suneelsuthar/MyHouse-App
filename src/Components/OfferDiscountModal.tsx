import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Text, TextField, Button } from "./index";
import { adjustSize, colors, typography } from "../theme";
import CustomModal from "./CustomModal";
import AntDesign from "@expo/vector-icons/AntDesign";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";
import DropdownComponent from "./DropDown";

export type DiscountConfig = {
  // Top rows
  weeklyNights?: string; // e.g. "For 7 Nights"
  monthlyNights?: string; // e.g. "For 29 Nights"
  moreEnabled?: boolean;

  // Early Bird
  earlyBirdEnabled?: boolean;
  earlyBirdMonths?: string; // number of months
  earlyBirdPercent?: string; // 0-100

  // Last Minute
  lastMinuteEnabled?: boolean;
  lastMinuteDays?: string; // number of days
  lastMinutePercent?: string; // 0-100

  // Trip Length
  tripLengthEnabled?: boolean;
  tripLengthDurations?: string[]; // list of tags e.g. ["4 Days", "5 Weeks"]
  tripLengthPercent?: string; // 0-100
};

interface Props {
  visible: boolean;
  onClose: () => void;
  onSubmit: (config: DiscountConfig) => void;
  title?: string;
  basePrice?: number; // optional, for future preview use
  initialConfig?: DiscountConfig;
}

type DetailKind = "earlyBird" | "lastMinute" | "tripLength" | null;

const OfferDiscountModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  title = "Offer a Discount",
  initialConfig,
}) => {
  const [cfg, setCfg] = useState<DiscountConfig>(initialConfig || {});
  const [showMoreRows, setShowMoreRows] = useState<boolean>(
    !!initialConfig?.moreEnabled
  );
  const [detailOpen, setDetailOpen] = useState<DetailKind>(null);
  // controlled value just to trigger visual state; we reset to null after selection so it looks like placeholder
  const [tripSelectValue, setTripSelectValue] = useState<string | null>(null);

  const durationOptions = useMemo(
    () => ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days"],
    []
  );

  // Helpers
  const toggle = (key: keyof DiscountConfig, v: boolean) =>
    setCfg((c) => ({ ...c, [key]: v } as DiscountConfig));

  const canSaveSub = useMemo(() => {
    if (detailOpen === "earlyBird")
      return !!cfg.earlyBirdPercent && !!cfg.earlyBirdMonths;
    if (detailOpen === "lastMinute")
      return !!cfg.lastMinutePercent && !!cfg.lastMinuteDays;
    if (detailOpen === "tripLength") return !!cfg.tripLengthPercent; // durations optional
    return true;
  }, [detailOpen, cfg]);

  const saveAndClose = () => {
    onSubmit({ ...cfg, moreEnabled: showMoreRows });
  };

  return (
    <CustomModal visible={visible} onClose={onClose} title={title}>
      {/* Top rows */}
      <ScrollView style={{ height: Dimensions.get("window").height * 0.8 }}>
        <RowWithAction
          label="Weekly Discount"
          placeholder="For 7 Nights"
          value={cfg.weeklyNights || ""}
          enabled={!!cfg.weeklyNights}
          onPress={() =>
            setCfg((c) => ({
              ...c,
              weeklyNights: c.weeklyNights ? undefined : "For 7 Nights",
            }))
          }
          onChangeText={(t) => setCfg((c) => ({ ...c, weeklyNights: t }))}
        />

        <RowWithAction
          label="Monthly Discount"
          placeholder="For 29 Nights"
          value={cfg.monthlyNights || ""}
          enabled={!!cfg.monthlyNights}
          onPress={() =>
            setCfg((c) => ({
              ...c,
              monthlyNights: c.monthlyNights ? undefined : "For 29 Nights",
            }))
          }
          onChangeText={(t) => setCfg((c) => ({ ...c, monthlyNights: t }))}
        />

        {/* More Discount row - non-editable field, but with add/remove action */}
        <RowWithAction
          label="More Discount"
          placeholder="Early Bird, Last Minute, Trip Length"
          value={showMoreRows ? "Early Bird, Last Minute, Trip Length" : ""}
          enabled={showMoreRows}
          editable={false}
          onPress={() => {
            const next = !showMoreRows;
            setShowMoreRows(next);
            toggle("moreEnabled", next);
            if (!next) {
              // collapse all sub-configs
              setCfg((c) => ({
                ...c,
                earlyBirdEnabled: false,
                earlyBirdMonths: undefined,
                earlyBirdPercent: undefined,
                lastMinuteEnabled: false,
                lastMinuteDays: undefined,
                lastMinutePercent: undefined,
                tripLengthEnabled: false,
                tripLengthDurations: undefined,
                tripLengthPercent: undefined,
              }));
              setDetailOpen(null);
            }
          }}
          onChangeText={() => {}}
        />

        {/* CTA to reveal advanced discounts */}
        {!showMoreRows && (
          <View style={{ marginTop: adjustSize(10) }}>
            <Button
              text="Add Another Charge"
              preset="reversed"
              onPress={() => {
                setShowMoreRows(true);
                toggle("moreEnabled", true);
              }}
            />
          </View>
        )}

        {/* Expanded rows with inline detail cards */}
        {showMoreRows && (
          <View>
            <RowWithAction
              label="Early Bird Discount"
              placeholder="Add Discount"
              value={cfg.earlyBirdEnabled ? "Added" : ""}
              enabled={!!cfg.earlyBirdEnabled}
              editable={false}
              onPress={() => {
                const next = !cfg.earlyBirdEnabled;
                toggle("earlyBirdEnabled", next);
                if (next) setDetailOpen("earlyBird");
                else if (detailOpen === "earlyBird") setDetailOpen(null);
              }}
              onChangeText={() => {}}
            />
            {detailOpen === "earlyBird" && (
              <DetailCard
                title="Early Bird Discount"
                subtitle="Attract early bookings by offering discounts when guests book far in advance."
              >
                <Text style={styles.detailLabel}>Number of Months</Text>
                <TextField
                  placeholder="0"
                  keyboardType="numeric"
                  value={cfg.earlyBirdMonths || ""}
                  onChangeText={(t) =>
                    setCfg((c) => ({ ...c, earlyBirdMonths: t }))
                  }
                />
                <Text style={styles.detailLabel}>Discount Percentage</Text>
                <TextField
                  placeholder="Enter Discount"
                  keyboardType="numeric"
                  value={cfg.earlyBirdPercent || ""}
                  onChangeText={(t) =>
                    setCfg((c) => ({ ...c, earlyBirdPercent: t }))
                  }
                />
                <ActionRow
                  onCancel={onClose}
                  onSave={saveAndClose}
                  saveText="Save Discount"
                  disabled={!canSaveSub}
                />
              </DetailCard>
            )}

            <RowWithAction
              label="Last Minute Discount"
              editable={false}
              placeholder="Add Discount"
              value={cfg.lastMinuteEnabled ? "Added" : ""}
              enabled={!!cfg.lastMinuteEnabled}
              onPress={() => {
                const next = !cfg.lastMinuteEnabled;
                toggle("lastMinuteEnabled", next);
                if (next) setDetailOpen("lastMinute");
                else if (detailOpen === "lastMinute") setDetailOpen(null);
              }}
              onChangeText={() => {}}
            />
            {detailOpen === "lastMinute" && (
              <DetailCard
                title="Last Minute Discount"
                subtitle="Fill your calendar by offering discounts when guests book closer to their arrival date."
              >
                <Text style={styles.detailLabel}>Number of Days</Text>
                <TextField
                  placeholder="0"
                  keyboardType="numeric"
                  value={cfg.lastMinuteDays || ""}
                  onChangeText={(t) =>
                    setCfg((c) => ({ ...c, lastMinuteDays: t }))
                  }
                />
                <Text style={styles.detailLabel}>Discount Percentage</Text>
                <TextField
                  placeholder="Enter Discount"
                  keyboardType="numeric"
                  value={cfg.lastMinutePercent || ""}
                  onChangeText={(t) =>
                    setCfg((c) => ({ ...c, lastMinutePercent: t }))
                  }
                />
                <ActionRow
                  onCancel={onClose}
                  onSave={saveAndClose}
                  saveText="Save Discount"
                  disabled={!canSaveSub}
                />
              </DetailCard>
            )}

            <RowWithAction
              label="Trip Length Discount"
              editable={false}
              placeholder="Add Discount"
              value={cfg.tripLengthEnabled ? "Added" : ""}
              enabled={!!cfg.tripLengthEnabled}
              onPress={() => {
                const next = !cfg.tripLengthEnabled;
                toggle("tripLengthEnabled", next);
                if (next) setDetailOpen("tripLength");
                else if (detailOpen === "tripLength") setDetailOpen(null);
              }}
              onChangeText={() => {}}
            />
            {detailOpen === "tripLength" && (
              <DetailCard
                title="Trip Length Discount"
                subtitle="Offer discounts based on the length of a booking."
              >
                <Text style={styles.detailLabel}>
                  Select Duration (Days and/or Weeks)
                </Text>
                <DropdownComponent
                  data={durationOptions.map((d) => ({ label: d, value: d }))}
                  placeholder="Select Duration"
                  value={tripSelectValue}
                  onChangeValue={(v) => {
                    setCfg((c) => {
                      const list = new Set(c.tripLengthDurations || []);
                      if (list.has(v)) list.delete(v);
                      else list.add(v);
                      return { ...c, tripLengthDurations: Array.from(list) };
                    });
                    // clear selection so field shows placeholder and dropdown closes
                    setTripSelectValue(null);
                  }}
                  dropdownStyle={{
                    backgroundColor: colors.fill,
                    shadowColor: "#000000",
                    shadowOpacity: 0.15,
                    shadowOffset: { width: 0, height: 2 },
                    shadowRadius: 3,
                    elevation: 3,
                  }}
                  selectedTextStyle={{ color: colors.primary }}
                  placeholderStyle={{
                    color: colors.grey,
                    fontSize: adjustSize(12),
                    fontFamily: typography.fonts.poppins.normal,
                  }}
                  rightIconColor={colors.primary}
                />

                {/* Selected chips */}
                {cfg.tripLengthDurations &&
                cfg.tripLengthDurations.length > 0 ? (
                  <View style={styles.chipsRow}>
                    {cfg.tripLengthDurations.map((tag) => (
                      <View
                        key={tag}
                        style={[styles.chip, styles.chipSelectedRow]}
                      >
                        <Text style={{ color: colors.white }}>{tag}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            setCfg((c) => ({
                              ...c,
                              tripLengthDurations: (
                                c.tripLengthDurations || []
                              ).filter((t) => t !== tag),
                            }))
                          }
                          style={styles.chipCloseBtn}
                        >
                          <AntDesign
                            name="close"
                            size={12}
                            color={colors.white}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                ) : null}
                <Text style={styles.detailLabel}>Discount Percentage</Text>
                <TextField
                  placeholder="Enter Discount"
                  keyboardType="numeric"
                  value={cfg.tripLengthPercent || ""}
                  onChangeText={(t) =>
                    setCfg((c) => ({ ...c, tripLengthPercent: t }))
                  }
                />
                <ActionRow
                  onCancel={onClose}
                  onSave={saveAndClose}
                  saveText="Save Discount"
                  disabled={!canSaveSub}
                />
              </DetailCard>
            )}
          </View>
        )}

        {/* Detail cards moved inline above with their rows */}
      </ScrollView>
    </CustomModal>
  );
};

const RowWithAction = ({
  label,
  placeholder,
  value,
  enabled,
  onPress,
  onChangeText,
  actionMode = "plusMinus",
  editable = true,
}: {
  label: string;
  placeholder: string;
  value: string;
  enabled: boolean;
  onPress: () => void;
  onChangeText: (t: string) => void;
  actionMode?: "plusMinus" | "none";
  editable?: boolean;
}) => (
  <View style={{ marginBottom: adjustSize(10) }}>
    <Text weight="normal" style={styles.inputLabel}>
      {label}
    </Text>
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <TextField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
        />
      </View>
      {actionMode === "plusMinus" ? (
        <TouchableOpacity
          style={[
            styles.iconBtn,
            enabled ? styles.iconBtnDanger : styles.iconBtnPrimary,
          ]}
          onPress={onPress}
        >
          {enabled ? (
            label === "More Discount" ? (
              <AntDesign name="closecircleo" size={24} color={colors.white} />
            ) : (
              <WithLocalSvg asset={Images.remove} />
            )
          ) : (
            <WithLocalSvg asset={Images.addprop} />
          )}
        </TouchableOpacity>
      ) : null}
    </View>
  </View>
);

const DetailCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <View style={styles.detailCard}>
    <Text weight="semiBold" style={styles.detailTitle}>
      {title}
    </Text>
    <Text style={styles.detailSubtitle}>{subtitle}</Text>
    {children}
  </View>
);

const ActionRow = ({
  onCancel,
  onSave,
  saveText,
  disabled,
}: {
  onCancel: () => void;
  onSave: () => void;
  saveText: string;
  disabled?: boolean;
}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: adjustSize(10),
      marginTop: adjustSize(14),
    }}
  >
    <View style={{ flex: 1 }}>
      <Button
        text="Cancel"
        onPress={onCancel}
        style={{
          borderColor: colors.primary,
          borderWidth: 1,
          backgroundColor: colors.fill,
        }}
      />
    </View>
    <View style={{ flex: 1 }}>
      <Button
        text={saveText}
        preset="reversed"
        onPress={onSave}
        disabled={disabled}
      />
    </View>
  </View>
);

const Chip = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, selected && styles.chipSelected]}
  >
    <Text style={{ color: selected ? colors.white : colors.primary }}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  inputLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginTop: adjustSize(8),
    marginBottom: adjustSize(6),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(8),
  },
  iconBtn: {
    width: adjustSize(38),
    height: adjustSize(38),
    marginBottom: 10,
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnPrimary: {
    backgroundColor: colors.primary,
  },
  iconBtnDanger: {
    backgroundColor: colors.error,
  },
  detailCard: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(12),
    padding: adjustSize(14),
    marginTop: adjustSize(12),
    borderWidth: 1,
    borderColor: colors.grey,
  },
  detailTitle: {
    color: colors.primary,
    textAlign: "center",
    fontSize: adjustSize(14),
  },
  detailSubtitle: {
    color: colors.grey,
    textAlign: "center",
    marginTop: adjustSize(6),
    marginBottom: adjustSize(10),
    fontSize: adjustSize(12),
  },
  detailLabel: {
    color: colors.primary,
    marginTop: adjustSize(8),
    marginBottom: adjustSize(6),
    fontSize: adjustSize(14),
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: adjustSize(8),
    marginVertical: adjustSize(10),
  },
  chip: {
    paddingVertical: adjustSize(6),
    paddingHorizontal: adjustSize(10),
    borderRadius: adjustSize(16),
    backgroundColor: colors.fill,
  },
  chipSelected: {
    backgroundColor: colors.primaryLight,
  },
  chipSelectedRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    gap: adjustSize(6),
  },
  chipCloseBtn: {
    marginLeft: adjustSize(4),
    width: adjustSize(18),
    height: adjustSize(18),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: adjustSize(9),
  },
  dropdownField: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownPanel: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    marginTop: adjustSize(6),
    borderWidth: 1,
    borderColor: colors.grey,
    overflow: "hidden",
  },
  dropdownOption: {
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.fill,
  },
  dropdownOptionSelected: {
    backgroundColor: colors.primary,
  },
});

export default OfferDiscountModal;
