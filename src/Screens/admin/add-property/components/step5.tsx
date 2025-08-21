import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Text, Button } from "../../../../Components";
import { adjustSize, colors, typography } from "../../../../theme";
import TimeInlinePicker from "../../../../Components/TimeInlinePicker";
import { AntDesign } from "@expo/vector-icons";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";

type Slot = { start: Date; end: Date };
type SlotsByDate = Record<string, Slot[]>;
type PickerOpen = { key: string; index: number; which: "start" | "end" } | null;

type Props = {
  onBack?: () => void;
  onNext?: (payload: {
    dates: string[];
    timeSlots: Record<string, { start: string; end: string }[]>;
  }) => void;
  mode?: string;
};

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const toKey = (d: Date) => {
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const fromKey = (key: string) => {
  const [y, m, d] = key.split("-").map((x) => parseInt(x, 10));
  return new Date(y, m - 1, d);
};

const displayDate = (d: Date) =>
  d.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (d: Date) => {
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
};

const Step5: React.FC<Props> = ({ onBack, onNext }) => {
  const [phase, setPhase] = useState<"calendar" | "times">("calendar");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selected, setSelected] = useState<string[]>([]);
  const [slots, setSlots] = useState<SlotsByDate>({});
  const [pickerOpen, setPickerOpen] = useState<PickerOpen>(null);
  const [combinedEdit, setCombinedEdit] = useState<{
    key: string;
    index: number;
  } | null>(null);

  // Calendar calculations (Monday-first)
  const monthMeta = useMemo(() => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();

    const firstOfMonth = new Date(y, m, 1);
    let startDay = firstOfMonth.getDay(); // 0 Sun ... 6 Sat
    if (startDay === 0) startDay = 7; // make Monday=1 ... Sunday=7

    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const boxesBefore = startDay - 1;

    const cells: (Date | null)[] = [];
    for (let i = 0; i < boxesBefore; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(y, m, d));
    }
    // Pad to complete last week
    while (cells.length % 7 !== 0) cells.push(null);

    const monthLabel = currentMonth.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });

    return { cells, monthLabel };
  }, [currentMonth]);

  const toggleDate = (d: Date) => {
    const key = toKey(d);
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const removeSelected = (key: string) => {
    setSelected((prev) => prev.filter((k) => k !== key));
    setSlots((prev) => {
      const clone = { ...prev };
      delete clone[key];
      return clone;
    });
  };

  const goPrevMonth = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    setCurrentMonth(new Date(y, m - 1, 1));
  };

  const goNextMonth = () => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    setCurrentMonth(new Date(y, m + 1, 1));
  };

  const ensureDefaultSlots = (keys: string[]) => {
    setSlots((prev) => {
      const next = { ...prev };
      keys.forEach((k) => {
        if (!next[k] || next[k].length === 0) {
          const base = fromKey(k);
          const start = new Date(base);
          start.setHours(10, 0, 0, 0);
          const end = new Date(base);
          end.setHours(11, 0, 0, 0);
          next[k] = [{ start, end }];
        }
      });
      return next;
    });
  };

  const onPressNext = () => {
    if (phase === "calendar") {
      if (selected.length === 0) return;
      // Do not create default slots; just switch to times phase
      setPhase("times");
      return;
    }
    // Phase times -> complete
    if (onNext) {
      const payload = selected.reduce<{
        dates: string[];
        timeSlots: Record<string, { start: string; end: string }[]>;
      }>(
        (acc, key) => {
          acc.dates.push(key);
          const daySlots =
            slots[key]?.map((s) => ({
              start: s.start.toISOString(),
              end: s.end.toISOString(),
            })) ?? [];
          acc.timeSlots[key] = daySlots;
          return acc;
        },
        { dates: [], timeSlots: {} }
      );
      onNext(payload);
    }
  };

  const onPressBack = () => {
    if (phase === "times") {
      setPhase("calendar");
      return;
    }
    onBack?.();
  };

  const addSlot = (key: string) => {
    let newIndex = 0;
    setSlots((prev) => {
      const list = prev[key] ?? [];
      newIndex = list.length;
      const base = fromKey(key);
      // seed with a minimal placeholder (start=end) – user will immediately choose both
      const start = new Date(base);
      start.setHours(10, 0, 0, 0);
      const end = new Date(base);
      end.setHours(10, 0, 0, 0);
      return { ...prev, [key]: [...list, { start, end }] };
    });
    // Immediately open combined picker for the newly added slot
    setCombinedEdit({ key, index: newIndex });
    setPickerOpen({ key, index: newIndex, which: "start" });
  };

  const removeSlot = (key: string, index: number) => {
    setSlots((prev) => {
      const list = prev[key] ?? [];
      const next = [...list];
      next.splice(index, 1);
      return { ...prev, [key]: next };
    });
  };

  const openPicker = (key: string, index: number, which: "start" | "end") => {
    setPickerOpen({ key, index, which });
  };

  const openCombinedPicker = (key: string, index: number) => {
    setCombinedEdit({ key, index });
    setPickerOpen({ key, index, which: "start" });
  };

  const confirmPicker = (d: Date) => {
    if (!pickerOpen) return;
    const { key, index, which } = pickerOpen;
    setSlots((prev) => {
      const daySlots = prev[key] ? [...prev[key]] : [];
      const slot = { ...daySlots[index] };
      slot[which] = d;

      // If start > end, auto-adjust the other bound by +/- 1 hour.
      if (slot.start > slot.end) {
        if (which === "start") {
          const end = new Date(d);
          end.setHours(end.getHours() + 1);
          slot.end = end;
        } else {
          const start = new Date(d);
          start.setHours(start.getHours() - 1);
          slot.start = start;
        }
      }

      daySlots[index] = slot;
      return { ...prev, [key]: daySlots };
    });
    // If we started from a combined edit and just set start, proceed to end
    if (
      combinedEdit &&
      combinedEdit.key === key &&
      combinedEdit.index === index
    ) {
      if (which === "start") {
        setPickerOpen({ key, index, which: "end" });
        return;
      } else {
        setCombinedEdit(null);
      }
    }
    setPickerOpen(null);
  };

  const initialPickerDate = useMemo(() => {
    if (!pickerOpen) return new Date();
    const { key, index, which } = pickerOpen;
    return slots[key]?.[index]?.[which] ?? new Date();
  }, [pickerOpen, slots]);

  // Sort selected keys ascending
  const orderedSelected = useMemo(
    () => [...selected].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)),
    [selected]
  );

  return (
    <View style={{ flex: 1 }}>
      {phase === "calendar" ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: adjustSize(90) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.infoText}>
            Please select the days when the property will not be available for
            booking. You can make future changes to your calendar on your
            dashboard.
          </Text>

          {/* Month header */}
          <View style={styles.monthHeader}>
            <TouchableOpacity
              onPress={goPrevMonth}
              style={[styles.navBtn, styles.navBtnLeft]}
              activeOpacity={0.8}
            >
              <Text style={styles.navBtnText}>{"<"}</Text>
            </TouchableOpacity>
            <Text weight="semiBold" style={styles.monthTitle}>
              {monthMeta.monthLabel}
            </Text>
            <TouchableOpacity
              onPress={goNextMonth}
              style={[styles.navBtn, styles.navBtnRight]}
              activeOpacity={0.8}
            >
              <Text style={styles.navBtnText}>{">"}</Text>
            </TouchableOpacity>
          </View>

          {/* Weekdays */}
          <View style={styles.weekRow}>
            {weekdays.map((w) => (
              <Text weight="medium" key={w} style={styles.weekLabel}>
                {w}
              </Text>
            ))}
          </View>

          {/* Grid */}
          <View style={styles.grid}>
            {monthMeta.cells.map((cell, idx) => {
              if (!cell) {
                return <View key={`empty-${idx}`} style={styles.cell} />;
              }
              const key = toKey(cell);
              const isSelected = selected.includes(key);
              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.cell]}
                  activeOpacity={0.8}
                  onPress={() => toggleDate(cell)}
                >
                  {/* <View
                    style={[
                      styles.dayDot,
                      isSelected && { backgroundColor: colors.primary },
                    ]}
                  /> */}
                  <View
                    style={[
                      isSelected && {
                        borderColor: colors.primary,
                        borderWidth: 1,
                        borderRadius: adjustSize(18),
                        backgroundColor: colors.primary,
                        height: adjustSize(30),
                        width: adjustSize(30),
                        justifyContent: "center",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayText,
                        isSelected && { color: colors.white },
                      ]}
                    >
                      {cell.getDate()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Selected list */}
          {orderedSelected.length > 0 && (
            <>
              <Text weight="semiBold" style={styles.subTitle}>
                Selected dates
              </Text>
              <View style={styles.selectedList}>
                {orderedSelected.map((k) => {
                  const d = fromKey(k);
                  return (
                    <View key={k} style={styles.selectedItem}>
                      <Text weight="medium" style={styles.selectedText}>
                        {displayDate(d)}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeSelected(k)}
                        style={styles.selectedRemove}
                        activeOpacity={0.8}
                      >
                        <AntDesign
                          name="close"
                          size={24}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </ScrollView>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: adjustSize(90) }}
          showsVerticalScrollIndicator={false}
        >
          <Text weight="semiBold" style={styles.subTitle}>
            Add time slots for selected dates
          </Text>

          {orderedSelected.map((k) => {
            const d = fromKey(k);
            const list = slots[k] ?? [];
            return (
              <View key={k} style={styles.dateBlock}>
                {/* Date header + add button */}
                <View style={styles.dateHeader}>
                  <Text style={styles.dateTitle}>{displayDate(d)}</Text>
                  <TouchableOpacity
                    style={styles.addBtn}
                    onPress={() => addSlot(k)}
                    activeOpacity={0.8}
                  >
                    <AntDesign
                      name="clockcircleo"
                      size={20}
                      color={colors.white}
                    />
                    <Text style={styles.addBtnText}>To</Text>
                    <AntDesign
                      name="clockcircleo"
                      size={20}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </View>

                {/* Slot rows */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 10,
                    justifyContent: "space-between",
                  }}
                >
                  {list.map((s, idx) => (
                    <View key={idx} style={styles.slotRow}>
                      <TouchableOpacity
                        style={styles.timeChip}
                        activeOpacity={0.8}
                        onPress={() => openCombinedPicker(k, idx)}
                      >
                        <Text style={styles.timeChipText}>
                          {`${formatTime(s.start)} - ${formatTime(s.end)}`}
                        </Text>
                        <TouchableOpacity
                          onPress={() => removeSlot(k, idx)}
                          style={styles.removeIcon}
                          activeOpacity={0.8}
                        >
                          <Text style={{ color: colors.error }}>×</Text>
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}

          {/* Reused single picker */}
          {pickerOpen && (
            <TimeInlinePicker
              initialDate={initialPickerDate}
              onCancel={() => {
                setPickerOpen(null);
                setCombinedEdit(null);
              }}
              onConfirm={confirmPicker}
            />
          )}
        </ScrollView>
      )}

      {/* Bottom bar */}
      {phase === "calendar" ? (
        <View style={styles.footerSingle}>
          <Button
            text="Select time for selected date"
            disabled={selected.length === 0}
            onPress={onPressNext}
            // preset="reversed"
            style={styles.selectTimeBtn}
          />
        </View>
      ) : (
        <View style={styles.footer}>
          <Button
            text="Choose another date"
            disabled={false}
            onPress={onPressBack}
            preset="default"
            style={styles.selectTimeBtn}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoText: {
    fontSize: adjustSize(12),
    color: colors.grey,
    marginVertical: adjustSize(30),
  },

  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: adjustSize(10),
    paddingHorizontal: adjustSize(12),
    paddingVertical: adjustSize(10),
    marginBottom: adjustSize(10),
    backgroundColor: colors.primary,
    height: adjustSize(49),
  },
  navBtn: {
    width: adjustSize(36),
    height: adjustSize(32),
    borderRadius: adjustSize(8),
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: colors.white,
    // borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.greylight,
  } as ViewStyle,
  navBtnLeft: {},
  navBtnRight: {},
  navBtnText: {
    color: colors.white,
    fontSize: adjustSize(20),
    lineHeight: adjustSize(28),
  },

  monthTitle: {
    color: colors.white,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
    marginBottom: adjustSize(4),
    paddingHorizontal: adjustSize(4),
  },
  weekLabel: {
    width: `${100 / 7}%`,
    textAlign: "center",
    color: colors.grey,
    fontSize: adjustSize(11),
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: adjustSize(20),
  },
  cell: {
    width: `${100 / 7}%`,
    paddingVertical: adjustSize(3),
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  dayDot: {
    width: adjustSize(6),
    height: adjustSize(6),
    borderRadius: adjustSize(3),
    backgroundColor: "transparent",
    marginBottom: adjustSize(6),
  },
  dayText: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },

  subTitle: {
    fontSize: adjustSize(14),
    color: colors.primary,
    marginVertical: adjustSize(16),
  },

  selectedList: {
    gap: adjustSize(10),
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.primaryLight,
    paddingHorizontal: adjustSize(12),
    borderRadius: 100,
    height: adjustSize(40),
  },
  selectedText: {
    color: colors.white,
  },
  selectedRemove: {},

  dateBlock: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    // padding: adjustSize(12),
    marginBottom: adjustSize(14),
  },
  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: adjustSize(10),
    backgroundColor: colors.primaryLight,
    height: adjustSize(45),
    borderRadius: adjustSize(7),
    paddingHorizontal: adjustSize(10),
  },
  dateTitle: {
    // color: colors.white,
    fontSize: adjustSize(13),
  },
  addBtn: {
    paddingHorizontal: adjustSize(10),
    flexDirection: "row",
    alignItems: "center",
  },
  addBtnText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.medium,
    paddingHorizontal: adjustSize(15),
  },

  slotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: adjustSize(8),
    width: "47%",
  },
  timeBox: {
    flex: 1,
    height: adjustSize(44),
    borderRadius: 100,
    backgroundColor: colors.white,
    borderWidth: 0.3,
    borderColor: colors.greylight,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  } as ViewStyle,
  timePlaceholder: {
    color: colors.primary,
    fontSize: adjustSize(12),
  } as TextStyle,
  timeChip: {
    // flex: 1,
    height: adjustSize(44),
    borderRadius: 100,
    backgroundColor: colors.white,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: adjustSize(10),
    flex: 1,
    // justifyContent: "space-between",
  } as ViewStyle,
  timeChipText: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flex: 1,
    textAlign: "center",
  } as TextStyle,
  toLabel: {
    color: colors.primary,
    marginHorizontal: adjustSize(6),
  },
  removeIcon: {
    width: adjustSize(20),
    height: adjustSize(20),
    borderRadius: adjustSize(14),
    borderWidth: 1,
    borderColor: colors.error,
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: adjustSize(16),
  },
  footerSingle: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: adjustSize(16),
  },
  backBtn: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.grey,
    width: "45%",
  },
  nextBtn: {
    backgroundColor: colors.primary,
    width: "45%",
  },
  selectTimeBtn: {
    width: "100%",
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default Step5;
