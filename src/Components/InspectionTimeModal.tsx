import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
  Dimensions,
} from "react-native";
import { Text, Button } from "./index";
import { adjustSize, colors, typography } from "../theme";
import CustomModal from "./CustomModal";
import DropdownComponent from "./DropDown";
import TimeInlinePicker from "./TimeInlinePicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";
export type TimeRange = { start: Date; end: Date };
export type DayKey =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type SameTimeSchedule = { type: "same"; times: TimeRange[] };
export type DifferentTimeSchedule = {
  type: "different";
  byDay: Record<DayKey, TimeRange[]>;
};
export type Schedule = SameTimeSchedule | DifferentTimeSchedule;

interface Props {
  visible: boolean;
  onClose: () => void;
  onDone: (schedule: Schedule) => void;
  title?: string;
  selectedDays?: DayKey[]; // used as context in Step 4
}

const DAY_LIST: DayKey[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_OPTIONS = [
  { label: "Same time everyday", value: "same" },
  { label: "Different time for each day", value: "different" },
];

const formatTime = (d?: Date) =>
  d
    ? d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "--:--";

const blankRange = () => {
  const start = new Date();
  start.setHours(9, 0, 0, 0);
  const end = new Date();
  end.setHours(17, 0, 0, 0);
  return { start, end } as TimeRange;
};

const InspectionTimeModal: React.FC<Props> = ({
  visible,
  onClose,
  onDone,
  title = "Choose date & time",
  selectedDays,
}) => {
  const [mode, setMode] = useState<"same" | "different" | null>(null);

  // same-time data
  const [sameTimes, setSameTimes] = useState<TimeRange[]>([blankRange()]);

  // different-time data
  const initByDay = useMemo(() => {
    const obj: Record<DayKey, TimeRange[]> = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };
    return obj;
  }, []);
  const [byDay, setByDay] = useState<Record<DayKey, TimeRange[]>>(initByDay);

  const [pickerOpen, setPickerOpen] = useState<{
    which: "start" | "end";
    index: number;
    day?: DayKey;
  } | null>(null);

  const handleDone = () => {
    if (mode === "same") {
      onDone({ type: "same", times: sameTimes });
    } else if (mode === "different") {
      onDone({ type: "different", byDay });
    }
    onClose();
  };

  const addSame = () => setSameTimes((arr) => [...arr, blankRange()]);
  const removeSame = (idx: number) =>
    setSameTimes((arr) => arr.filter((_, i) => i !== idx));

  const addForDay = (day: DayKey) =>
    setByDay((prev) => ({ ...prev, [day]: [...prev[day], blankRange()] }));

  const updateRange = (
    where: { type: "same" } | { type: "different"; day: DayKey },
    idx: number,
    field: "start" | "end",
    value: Date,
  ) => {
    if (where.type === "same") {
      setSameTimes((arr) => {
        const next = [...arr];
        const r = { ...next[idx], [field]: value } as TimeRange;
        next[idx] = r;
        return next;
      });
    } else {
      setByDay((prev) => {
        const list = prev[where.day];
        const nextList = [...list];
        const r = { ...nextList[idx], [field]: value } as TimeRange;
        nextList[idx] = r;
        return { ...prev, [where.day]: nextList };
      });
    }
  };

  const showEmptyContent = mode === null;
  const showSame = mode === "same";
  const showDifferent = mode === "different";

  // Close the picker if the parent modal is hidden
  useEffect(() => {
    if (!visible && pickerOpen) setPickerOpen(null);
  }, [visible, pickerOpen]);

  return (
    <>
      <CustomModal visible={visible} onClose={onClose} title={title}>
        {/* Select time option */}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: Dimensions.get("window").height / 1.4 }}
        >
          <Text style={[styles.label, { marginTop: adjustSize(20) }]}>
            Select time
          </Text>
          <DropdownComponent
            data={TIME_OPTIONS}
            value={mode}
            onChangeValue={(val) => setMode(val as any)}
            placeholder="Select time option"
            rightIconColor={colors.primary}
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
              color: colors.primaryLight,
              fontSize: adjustSize(12),
              fontFamily: typography.fonts.poppins.normal,
            }}
          />

          {showEmptyContent && <View style={styles.spacer} />}

          {showDifferent && (
            <View style={{ marginTop: adjustSize(12) }}>
              <Text weight="semiBold" style={styles.subTitle}>
                Set different time for each day
              </Text>

              {DAY_LIST.map((day) => (
                <View key={day} style={{ marginBottom: adjustSize(12) }}>
                  {/* Header row: day + + button */}
                  <View style={styles.dayRow}>
                    <Text style={styles.dayText}>{day}</Text>
                    <TouchableOpacity
                      onPress={() => addForDay(day as DayKey)}
                      activeOpacity={0.8}
                      style={[
                        styles.addBtn,
                        { alignSelf: "flex-start", marginTop: adjustSize(4) },
                      ]}
                    >
                      <WithLocalSvg asset={Images.addmore} />
                    </TouchableOpacity>
                  </View>

                  {/* Ranges list below header */}
                  {byDay[day as DayKey]?.map((r, idx) => (
                    <View
                      key={idx}
                      style={[styles.rangeRow, { marginTop: adjustSize(8) }]}
                    >
                      <View style={{ flex: 1 }}>
                        <Text text="Start time" style={styles._timelable} />
                        <TouchableOpacity
                          style={[
                            styles.timeBox,
                            { marginRight: adjustSize(8) },
                          ]}
                          onPress={() =>
                            setPickerOpen({
                              which: "start",
                              index: idx,
                              day: day as DayKey,
                            })
                          }
                        >
                          <Text style={styles.timePlaceholder}>
                            {formatTime(r.start)}
                          </Text>
                          <WithLocalSvg asset={Images.clock} />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text text="End time" style={styles._timelable} />
                        <TouchableOpacity
                          style={styles.timeBox}
                          onPress={() =>
                            setPickerOpen({
                              which: "end",
                              index: idx,
                              day: day as DayKey,
                            })
                          }
                        >
                          <Text style={styles.timePlaceholder}>
                            {formatTime(r.end)}
                          </Text>
                          <WithLocalSvg asset={Images.clock} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}

          {showSame && (
            <View style={{ marginTop: adjustSize(12) }}>
              <Text
                weight="semiBold"
                style={[
                  styles.subTitle,
                  { fontSize: adjustSize(15), marginVertical: 30 },
                ]}
              >
                All selected days
              </Text>
              {sameTimes.map((r, idx) => (
                <View
                  key={idx}
                  style={[styles.rangeRow, { marginBottom: adjustSize(8) }]}
                >
                  <View style={{ flex: 1 }}>
                    <Text text="Start time" style={styles._timelable} />

                    <TouchableOpacity
                      style={[styles.timeBox, { marginRight: adjustSize(8) }]}
                      onPress={() =>
                        setPickerOpen({ which: "start", index: idx })
                      }
                    >
                      <Text style={styles.timePlaceholder}>
                        {formatTime(r.start)}
                      </Text>
                      <WithLocalSvg asset={Images.clock} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text text="End time" style={styles._timelable} />

                    <TouchableOpacity
                      style={styles.timeBox}
                      onPress={() =>
                        setPickerOpen({ which: "end", index: idx })
                      }
                    >
                      <Text style={styles.timePlaceholder}>
                        {formatTime(r.end)}
                      </Text>
                      <WithLocalSvg asset={Images.clock} />
                    </TouchableOpacity>
                  </View>

                  {sameTimes.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeSame(idx)}
                      style={styles.removeIcon}
                    >
                      <AntDesign name="close" size={14} color={colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: adjustSize(10),
                }}
              >
                <Text
                  text="Add more time (Optional)"
                  style={{ color: colors.primary }}
                />
                <TouchableOpacity
                  onPress={addSame}
                  style={[
                    styles.addBtn,
                    { alignSelf: "flex-start", marginTop: adjustSize(4) },
                  ]}
                >
                  <WithLocalSvg asset={Images.addmore} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          <View style={{ paddingVertical: adjustSize(12) }}>
            <Button
              preset="default"
              text="Done"
              disabled={!mode}
              onPress={handleDone}
              style={{
                backgroundColor: colors.fill,
                borderWidth: 1,
                borderColor: colors.grey,
                marginTop: 40,
              }}
            />
          </View>
          {pickerOpen && (
            <TimeInlinePicker
              initialDate={(() => {
                if (!pickerOpen) return new Date();
                if (pickerOpen.day) {
                  return (
                    byDay[pickerOpen.day][pickerOpen.index]?.[
                      pickerOpen.which
                    ] ?? new Date()
                  );
                }
                return (
                  sameTimes[pickerOpen.index]?.[pickerOpen.which] ?? new Date()
                );
              })()}
              onCancel={() => setPickerOpen(null)}
              onConfirm={(d) => {
                if (!pickerOpen) return;
                if (pickerOpen.day) {
                  updateRange(
                    { type: "different", day: pickerOpen.day },
                    pickerOpen.index,
                    pickerOpen.which,
                    d,
                  );
                } else {
                  updateRange(
                    { type: "same" },
                    pickerOpen.index,
                    pickerOpen.which,
                    d,
                  );
                }
                setPickerOpen(null);
              }}
            />
          )}
        </ScrollView>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.primary,
    fontSize: adjustSize(14),
    marginTop: adjustSize(8),
    marginBottom: adjustSize(6),
  },
  dropdown: {
    marginBottom: adjustSize(6),
    backgroundColor: colors.fill,
  } as ViewStyle,
  subTitle: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginBottom: adjustSize(8),
  },
  spacer: { height: adjustSize(80) },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(8),
  },
  dayText: {
    width: adjustSize(80),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(12),
  } as TextStyle,
  addBtn: {},
  rangeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeBox: {
    // flex: 1,
    height: adjustSize(49),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: adjustSize(10),
  } as ViewStyle,
  timePlaceholder: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
    fontSize: adjustSize(12),
  } as TextStyle,
  removeIcon: {
    marginLeft: adjustSize(8),
    width: adjustSize(28),
    height: adjustSize(28),
    borderRadius: adjustSize(14),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.error,
    marginTop: adjustSize(20),
  },
  _timelable: {
    fontSize: adjustSize(12),
    color: colors.primary,
  },
});

export default InspectionTimeModal;
