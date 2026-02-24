import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ViewStyle,
} from "react-native";
import Slider from "@react-native-community/slider";
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

type DetailKind =
  | "weekly"
  | "monthly"
  | "earlyBird"
  | "lastMinute"
  | "tripLength"
  | null;

const OfferDiscountModal: React.FC<Props> = ({
  visible,
  onClose,
  onSubmit,
  title = "Offer a Discount",
  initialConfig,
}) => {
  const [cfg, setCfg] = useState<DiscountConfig>(initialConfig || {});
  const [tempConfig, setTempConfig] = useState<Partial<DiscountConfig>>({});
  const [showMoreRows, setShowMoreRows] = useState<boolean>(
    !!initialConfig?.moreEnabled,
  );
  const [detailOpen, setDetailOpen] = useState<DetailKind>(null);
  const [tripSelectValue, setTripSelectValue] = useState<string | null>(null);
  const [basePrice, setBasePrice] = useState(100); // Default base price, can be passed as prop

  const durationOptions = useMemo(
    () => ["1 Day", "2 Days", "3 Days", "4 Days", "5 Days"],
    [],
  );

  // Helpers
  const toggle = (key: keyof DiscountConfig, v: boolean) =>
    setCfg((c) => ({ ...c, [key]: v }) as DiscountConfig);

  const canSaveSub = useMemo(() => {
    if (detailOpen === "weekly") return !!cfg.weeklyNights;
    if (detailOpen === "monthly") return !!cfg.monthlyNights;
    if (detailOpen === "earlyBird")
      return !!cfg.earlyBirdPercent && !!cfg.earlyBirdMonths;
    if (detailOpen === "lastMinute")
      return !!cfg.lastMinutePercent && !!cfg.lastMinuteDays;
    if (detailOpen === "tripLength") return !!cfg.tripLengthPercent; // durations optional
    return true;
  }, [detailOpen, cfg]);

  const saveAndClose = () => {
    if (detailOpen === "weekly") {
      setCfg((c) => ({
        ...c,
        weeklyNights: tempConfig.weeklyNights || c.weeklyNights || "",
      }));
    } else if (detailOpen === "monthly") {
      setCfg((c) => ({
        ...c,
        monthlyNights: tempConfig.monthlyNights || c.monthlyNights || "",
      }));
    } else if (detailOpen === "earlyBird") {
      setCfg((c) => ({
        ...c,
        earlyBirdEnabled: true,
        earlyBirdPercent:
          tempConfig.earlyBirdPercent || c.earlyBirdPercent || "10",
        earlyBirdMonths: tempConfig.earlyBirdMonths || c.earlyBirdMonths || "1",
      }));
    } else if (detailOpen === "lastMinute") {
      setCfg((c) => ({
        ...c,
        lastMinuteEnabled: true,
        lastMinutePercent:
          tempConfig.lastMinutePercent || c.lastMinutePercent || "",
        lastMinuteDays: tempConfig.lastMinuteDays || c.lastMinuteDays || "",
      }));
    } else if (detailOpen === "tripLength") {
      setCfg((c) => ({
        ...c,
        tripLengthEnabled: true,
        tripLengthPercent:
          tempConfig.tripLengthPercent || c.tripLengthPercent || "",
        tripLengthDurations: tempConfig.tripLengthDurations ||
          c.tripLengthDurations || ["7 Days"],
      }));
    }
    setTempConfig({});
    setDetailOpen(null);
  };

  const handleCancel = () => {
    setTempConfig({});
    setDetailOpen(null);
  };

  return (
    <CustomModal visible={visible} onClose={onClose} title={title}>
      {/* Top rows */}
      <ScrollView >
        <View>
          <RowWithAction
            label="Weekly Discount"
            placeholder="For 7 Nights"
            value={
              cfg.weeklyNights
                ? `${cfg.weeklyNights}% Discount For 7 Nights `
                : ""
            }
            enabled={!!cfg.weeklyNights}
            onPress={() => {
              const isEnabled = !!cfg.weeklyNights;
              if (isEnabled) {
                setCfg((c) => ({ ...c, weeklyNights: undefined }));
              } else {
                setDetailOpen("weekly");
              }
            }}
            onChangeText={() => {}}
          />
          {detailOpen === "weekly" && (
            <DetailCard
              title="Weekly Discount"
              subtitle="Offer a discount for weekly stays"
            >
              <View style={styles.discountContainer}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Discounted price:</Text>
                  <Text style={styles.discountedPrice}>
                    ₦
                    {(
                      basePrice *
                      (1 - (Number(tempConfig.weeklyNights) || 0) / 100)
                    ).toFixed(2)}
                  </Text>
                </View>
                <Text
                  weight="medium"
                  text="Set Discount"
                  style={{ color: colors.primary, marginBottom: adjustSize(8) }}
                />
                <View style={styles.sliderContainer}>
                  <Text style={styles.discountLabel}>0%</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={Number(
                      detailOpen === "weekly"
                        ? tempConfig.weeklyNights !== undefined
                          ? tempConfig.weeklyNights
                          : cfg.weeklyNights || 0
                        : cfg.weeklyNights || 0,
                    )}
                    onValueChange={(value) =>
                      setTempConfig((t) => ({
                        ...t,
                        weeklyNights: String(Math.round(value)),
                      }))
                    }
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={"#B0B0B0"}
                    thumbTintColor={colors.primary}
                    tapToSeek={true}
                  />
                  <Text style={styles.discountLabel}>100%</Text>
                  <View style={[styles.discountLabels, { marginLeft: 10 }]}>
                    <Text style={styles.discountValue}>
                      {tempConfig.weeklyNights || 0}%
                    </Text>
                  </View>
                </View>
                <View style={styles.amountPill}>
                  <Text style={styles.amountPillText}>
                    Discounted Amount: ₦
                    {(
                      basePrice *
                      (1 - (Number(tempConfig.weeklyNights) || 0) / 100)
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
              <ActionRow
                onCancel={handleCancel}
                onSave={saveAndClose}
                saveText="Save Discount"
                disabled={false}
              />
            </DetailCard>
          )}
        </View>

        <View>
          <RowWithAction
            label="Monthly Discount"
            placeholder="For 29 Nights"
            value={
              cfg.monthlyNights
                ? `${cfg.monthlyNights}% Discount For 29 Nights`
                : ""
            }
            enabled={!!cfg.monthlyNights}
            onPress={() => {
              const isEnabled = !!cfg.monthlyNights;
              if (isEnabled) {
                setCfg((c) => ({ ...c, monthlyNights: undefined }));
              } else {
                setDetailOpen("monthly");
              }
            }}
            onChangeText={() => {}}
          />
          {detailOpen === "monthly" && (
            <DetailCard
              title="Monthly Discount"
              subtitle="Offer a discount for monthly stays"
            >
              <View style={styles.discountContainer}>
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>Discounted price:</Text>
                  <Text style={styles.discountedPrice}>
                    ₦
                    {(
                      basePrice *
                      (1 - (Number(tempConfig.monthlyNights) || 0) / 100)
                    ).toFixed(2)}
                  </Text>
                </View>
                <Text
                  weight="medium"
                  text="Set Discount"
                  style={{ color: colors.primary, marginBottom: adjustSize(8) }}
                />
                <View style={styles.sliderContainer}>
                  <Text style={styles.discountLabel}>0%</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={1}
                    value={Number(
                      detailOpen === "monthly"
                        ? tempConfig.monthlyNights !== undefined
                          ? tempConfig.monthlyNights
                          : cfg.monthlyNights || 0
                        : cfg.monthlyNights || 0,
                    )}
                    onValueChange={(value) =>
                      setTempConfig((t) => ({
                        ...t,
                        monthlyNights: String(Math.round(value)),
                      }))
                    }
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={"#B0B0B0"}
                    thumbTintColor={colors.primary}
                    tapToSeek={true}
                  />
                  <Text style={styles.discountLabel}>100%</Text>
                  <View style={[styles.discountLabels, { marginLeft: 10 }]}>
                    <Text style={styles.discountValue}>
                      {tempConfig.monthlyNights || 0}%
                    </Text>
                  </View>
                </View>
                <View style={styles.amountPill}>
                  <Text style={styles.amountPillText}>
                    Discounted Amount: ₦
                    {(
                      basePrice *
                      (1 - (Number(tempConfig.monthlyNights) || 0) / 100)
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
              <ActionRow
                onCancel={handleCancel}
                onSave={saveAndClose}
                saveText="Save Discount"
                disabled={false}
              />
            </DetailCard>
          )}
        </View>

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
          <View style={{borderWidth:1,borderBottomColor:"#B0B0B0",marginTop:-60,
            paddingTop:86,
            borderRadius:8,
            borderColor:"#A1A1A1",
            padding:5
          }}>
            <RowWithAction
              label="Early Bird Discount"
              placeholder="Add Discount"
              value={
                cfg.earlyBirdEnabled &&
                cfg.earlyBirdPercent &&
                cfg.earlyBirdMonths
                  ? `Early Bird Discount (${cfg.earlyBirdPercent}% for ${
                      cfg.earlyBirdMonths
                    } ${
                      parseInt(cfg.earlyBirdMonths) === 1 ? "Month" : "Months"
                    })`
                  : ""
              }
              enabled={!!cfg.earlyBirdEnabled}
              editable={false}
              onPress={() => {
                if (cfg.earlyBirdEnabled) {
                  setCfg((c) => ({
                    ...c,
                    earlyBirdEnabled: false,
                    earlyBirdPercent: undefined,
                    earlyBirdMonths: undefined,
                  }));
                } else {
                  setTempConfig({
                    earlyBirdPercent: cfg.earlyBirdPercent || "",
                    earlyBirdMonths: cfg.earlyBirdMonths || "",
                  });
                  setDetailOpen("earlyBird");
                }
              }}
              onChangeText={() => {}}
            />
            {detailOpen === "earlyBird" && (

              <View>

              <DetailCard
                title="Early Bird Discount"
                subtitle="Attract early bookings by offering discounts when guests book far in advance."
                style={{padding:0,borderWidth:0}}
              >
                <View style={{backgroundColor:"white",padding:10,borderRadius:8,paddingBottom:50}}>

                <Text
                  weight="semiBold"
                  style={{ textAlign: "center", paddingVertical: 4 }}
                >
                  Early Bird Discount
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginBottom: 10,
                    color: colors.primary,
                    opacity:0.6
                  }}
                >
                  Attract early bookings by offering discounts when guests book
                  far in advance.
                </Text>
                <Text style={styles.detailLabel}>Number of Months</Text>
                <TextField
                  placeholder="0"
                  keyboardType="numeric"
                  inputWrapperStyle={{ backgroundColor: "white" }}
                  value={tempConfig.earlyBirdMonths || ""}
                  onChangeText={(t) =>
                    setTempConfig((prev) => ({ ...prev, earlyBirdMonths: t }))
                  }
                />
                <Text style={styles.detailLabel}>Discount Percentage</Text>
                <TextField
                  placeholder="Enter Discount"
                  keyboardType="numeric"
                  inputWrapperStyle={{ backgroundColor: "white" }}
                  value={tempConfig.earlyBirdPercent || ""}
                  onChangeText={(t) =>
                    setTempConfig((prev) => ({ ...prev, earlyBirdPercent: t }))
                  }
                />
                <ActionRow
                  onCancel={handleCancel}
                  onSave={saveAndClose}
                  saveText="Save Discount"
                  disabled={false}
                />
                </View>

              </DetailCard>
              </View>
            )}

            <RowWithAction
              label="Last Minute Discount"
              editable={false}
              placeholder="Add Discount"
              value={
                cfg.lastMinuteEnabled &&
                cfg.lastMinutePercent &&
                cfg.lastMinuteDays
                  ? `Last Minute Discount (${cfg.lastMinutePercent}% for ${
                      cfg.lastMinuteDays
                    } ${parseInt(cfg.lastMinuteDays) === 1 ? "Day" : "Days"})`
                  : ""
              }
              enabled={!!cfg.lastMinuteEnabled}
              onPress={() => {
                if (cfg.lastMinuteEnabled) {
                  setCfg((c) => ({
                    ...c,
                    lastMinuteEnabled: false,
                    lastMinutePercent: undefined,
                    lastMinuteDays: undefined,
                  }));
                } else {
                  setTempConfig({
                    lastMinutePercent: cfg.lastMinutePercent || "",
                    lastMinuteDays: cfg.lastMinuteDays || "",
                  });
                  setDetailOpen("lastMinute");
                }
              }}
              onChangeText={() => {}}
            />
            {detailOpen === "lastMinute" && (
              <DetailCard
                title="Last Minute Discount"
                subtitle="Fill your calendar by offering discounts when guests book closer to their arrival date."
                style={{padding:0,borderWidth:0}}
              >
                <View style={{backgroundColor:"white",padding:10,borderRadius:8,paddingBottom:50}}>
                <Text
                  weight="semiBold"
                  style={{ textAlign: "center", paddingVertical: 4, }}
                >
                  Last Minute Discount
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginBottom: 10,
                    color: colors.primary,
                    opacity:0.6
                  }}
                >
                  Fill your calendar by offering discounts when guests book
                  closer to their arrival date.
                </Text>
                <Text style={styles.detailLabel}>Number of Days</Text>
                <TextField
                  placeholder="0"
                  keyboardType="numeric"
                  value={tempConfig.lastMinuteDays || ""}
                  inputWrapperStyle={{ backgroundColor: "white" }}
                  onChangeText={(t) =>
                    setTempConfig((prev) => ({ ...prev, lastMinuteDays: t }))
                  }
                />
                <Text style={styles.detailLabel}>Discount Percentage</Text>
                <TextField
                  placeholder="Enter Discount"
                  keyboardType="numeric"
                  inputWrapperStyle={{ backgroundColor: "white" }}
                  value={tempConfig.lastMinutePercent || ""}
                  onChangeText={(t) =>
                    setTempConfig((prev) => ({ ...prev, lastMinutePercent: t }))
                  }
                />
                <ActionRow
                  onCancel={handleCancel}
                  onSave={saveAndClose}
                  saveText="Save Discount"
                  disabled={false}
                />
                </View>
              </DetailCard>
            )}

            <RowWithAction
              label="Trip Length Discount"
              editable={false}
              placeholder="Add Discount"
              value={
                cfg.tripLengthEnabled &&
                cfg.tripLengthPercent &&
                cfg.tripLengthDurations?.length
                  ? `Trip Length Discount (${
                      cfg.tripLengthPercent
                    }% for ${cfg.tripLengthDurations.join(", ")} ${
                      cfg.tripLengthDurations.length === 1 ? "Night" : "Nights"
                    })`
                  : ""
              }
              enabled={!!cfg.tripLengthEnabled}
              onPress={() => {
                if (cfg.tripLengthEnabled) {
                  setCfg((c) => ({
                    ...c,
                    tripLengthEnabled: false,
                    tripLengthPercent: undefined,
                    tripLengthDurations: undefined,
                  }));
                } else {
                  setTempConfig({
                    tripLengthPercent: cfg.tripLengthPercent || "",
                    tripLengthDurations: cfg.tripLengthDurations || ["7 Days"],
                  });
                  setDetailOpen("tripLength");
                }
              }}
              onChangeText={() => {}}
            />
            {detailOpen === "tripLength" && (
              <DetailCard
                title="Trip Length Discount"
                subtitle="Offer discounts based on the length of a booking."
                style={{padding:0,borderWidth:0}}
              >
                <View style={{backgroundColor:"white",padding:10,borderRadius:8,paddingBottom:50}}>
                <Text 
                  weight="semiBold"
                  style={{ textAlign: "center", paddingVertical: 4 }}
                >
                  Trip Length Discount
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "grey",
                    marginBottom: 10,
                  }}
                >
                  Offer discounts based on the length of a booking.
                </Text>
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
                  // style={{backgroundColor:"white"}}
                  dropdownStyle={{
                    backgroundColor: colors.white,
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
                <Text style={[styles.detailLabel,{marginTop:30}]}>Discount Percentage</Text>
                <TextField
                  placeholder="Enter Discount"
                  keyboardType="numeric"
                  value={cfg.tripLengthPercent || ""}
                  inputWrapperStyle={{ backgroundColor: "white" }}
                  onChangeText={(t) =>
                    setCfg((c) => ({ ...c, tripLengthPercent: t }))
                  }
                />
                <ActionRow
                  onCancel={onClose}
                  onSave={saveAndClose}
                  saveText="Save Discount"
                  disabled={false}
                />
                </View>
              </DetailCard>
            )}
          </View>
        )}

        <View style={{height:50}} />

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
  <View style={{ marginBottom: adjustSize(0) }}>
    <Text weight="normal" style={styles.inputLabel}>
      {label}
    </Text>
    <View style={styles.row}>
      <View style={{ flex: 1}}>
        <TextField
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={false}
          inputWrapperStyle={{ backgroundColor: "white",marginBottom:0 }}
          style={{
            color: colors.primary,
            fontSize: adjustSize(12),
            opacity: 0.7,
          }}
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
  style,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  style?: ViewStyle;
}) => <View style={[styles.detailCard, style]}>{children}</View>;

const ActionRow = ({
  onCancel,
  onSave,
  saveText,
  disabled,
  style,
}: {
  onCancel: () => void;
  onSave: () => void;
  saveText: string;
  disabled?: boolean;
  style?: ViewStyle;
}) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: adjustSize(10),
      marginTop: adjustSize(14),
      ...style,
    }}
  >
    <View style={{ flex: 1 }}>
      <Button
        text="Cancel"
        onPress={onCancel}
        style={{
          borderColor: "#D62828",
          borderWidth: 1,
          backgroundColor: colors.fill,
          minHeight: adjustSize(41),
        }}
        textStyle={{ color: "#D62828" }}
      />
    </View>
    <View style={{ flex: 1 }}>
      <Button
        text={saveText}
        preset="reversed"
        onPress={onSave}
        disabled={disabled}
        style={{
          minHeight: adjustSize(41),
        }}
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
    // gap: adjustSize(8),
  },
  iconBtn: {
    width: adjustSize(52),
    height: adjustSize(49),
    // marginBottom: 20,
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 3,
    top: 0,
    zIndex:1000
  },
  iconBtnPrimary: {
    backgroundColor: colors.primary,
  },
  iconBtnDanger: {
    backgroundColor: colors.error,
  },
  detailCard: {
    // backgroundColor: colors.fill,
    borderRadius: adjustSize(12),
    padding: adjustSize(14),
    marginTop: adjustSize(-60),
    borderWidth: 1,
    borderColor: colors.grey,
    paddingTop: 80,
    overflow:"hidden",
    zIndex:-100
  },
  detailTitle: {
    textAlign: "center",
    fontSize: adjustSize(14),
    color: colors.grey,
  },
  detailLabel: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginBottom: adjustSize(4),
  },
  detailSubtitle: {
    color: colors.grey,
    fontSize: adjustSize(12),
    textAlign: "center",
    marginBottom: adjustSize(16),
  },
  discountContainer: {
    marginVertical: adjustSize(16),
    paddingHorizontal: adjustSize(8),
    marginBottom: 40,
  },
  priceContainer: {
    backgroundColor: "#6369A4",
    borderRadius: 8,
    paddingHorizontal: adjustSize(10),
    paddingVertical: adjustSize(5),
    marginBottom: adjustSize(16),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: adjustSize(8),
  },
  priceLabel: {
    fontSize: adjustSize(13),
    color: colors.primary,
  },
  priceValue: {
    fontFamily: typography.fonts.poppins.semiBold,
    color: colors.primary,
    paddingLeft: 5,
  },
  discountedPrice: {
    fontFamily: typography.fonts.poppins.bold,
    color: colors.primary,
    paddingLeft: 5,
    fontSize: adjustSize(17),
  },
  slider: {
    // width: "100%",
    height: 48,
    flex: 1,
  },
  discountLabels: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: adjustSize(23),
    width: adjustSize(32),
    borderRadius: 5,
  },
  discountLabel: {
    fontSize: adjustSize(12),
    color: colors.grey,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(8),
    marginBottom: adjustSize(12),
  },
  amountPill: {
    backgroundColor: colors.primary,
    borderRadius: adjustSize(8),
    paddingVertical: adjustSize(10),
    paddingHorizontal: adjustSize(12),
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  amountPillText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  chip: {
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(6),
    borderRadius: 100,
    // borderWidth: 1,
    // borderColor: colors.primary,
    marginRight: adjustSize(8),
    marginBottom: adjustSize(8),
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop:10
    // marginVertical: adjustSize(16),
  },
  discountValue: {
    textAlign: "center",
    fontSize: adjustSize(12),
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
  },
  chipSelectedRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
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
