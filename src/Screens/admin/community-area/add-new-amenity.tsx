import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Screen, Text, TextField, Button } from "../../../Components";
import { Header } from "../../../Components";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import DropdownComponent from "../../../Components/DropDown";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import MultiSelect from "./components/MutliSelect";
type DayOption = "One-Time" | "Permanent" | "Event";
type TimeOption = "Same time everyday" | "Different time for each day";
const formatTime = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const minStr = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minStr} ${ampm}`;
};

export function AdminAddNewAmenity({ route, navigation }: any) {
  // 🔹 State variables with types
  const [propertyGroup, setPropertyGroup] = useState<string>("");
  const [amenityName, setAmenityName] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [durationPerSlot, setDurationPerSlot] = useState<string>("");
  const [maxDuration, setMaxDuration] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<DayOption | undefined>();
  const [selectedTime, setSelectedTime] = useState<TimeOption | undefined>();
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [images, setImages] = useState<string[]>([]); // array of image paths/urls
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"start" | "end">("start");
  const [tempDate, setTempDate] = useState<Date>(new Date());
  const [selected, setSelected] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [showDays, setShowDays] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [dayTimeSlots, setDayTimeSlots] = useState<
    { day: string; start: string; end: string }[]
  >([]);

  const [currentDay, setCurrentDay] = useState<string | null>(null);
  const [slotStep, setSlotStep] = useState<"start" | "end">("start");
  const [tempStart, setTempStart] = useState<string>("");
  const openDayPicker = (day: string, step: "start" | "end") => {
    setCurrentDay(day);
    setPickerMode(step === "start" ? "start" : "end");
    setTempDate(new Date());
    setSlotStep(step);
    setShowPicker(true);
  };

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate) {
      const formatted = formatTime(selectedDate);

      if (selectedTime === "Same time everyday") {
        if (pickerMode === "start") setStartTime(formatted);
        else setEndTime(formatted);
      } else if (selectedTime === "Different time for each day") {
        if (slotStep === "start") {
          setTempStart(formatted); // save temp start
          // next step → open end picker
          setSlotStep("end");
          setPickerMode("end");
          setTempDate(new Date());
          setShowPicker(true);
          return;
        } else {
          // end step → push slot to state
          if (currentDay) {
            setDayTimeSlots((prev) => [
              ...prev,
              { day: currentDay, start: tempStart, end: formatted },
            ]);
          }
        }
      }
    }

    if (Platform.OS === "android") setShowPicker(false);
  };
  const openPicker = (mode: "start" | "end") => {
    setPickerMode(mode);
    setTempDate(new Date());
    setShowPicker(true);
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // ✅ allow multiple images
      quality: 1,
    });

    if (!result.canceled) {
      // Add all selected images
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages((prev) => [...prev, ...selectedUris]);
    }
  };

  const handleChange = (next: string[]) => {
    // If "Everyday" is selected, replace with all weekdays
    if (next.includes("everyday")) {
      setSelectedDays([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ]);
    } else {
      setSelectedDays(next);
    }
  };

  const isFormValid =
    propertyGroup.trim() !== "" &&
    amenityName.trim() !== "" &&
    capacity.trim() !== "" &&
    maxDuration.trim() !== "" &&
    selectedDays.length > 0 &&
    (selectedTime
      ? selectedTime === "Same time everyday"
        ? startTime.trim() !== "" && endTime.trim() !== ""
        : true // if "Different time for each day", skip for now or handle individually
      : false);
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top", "bottom"]}
    >
      <Header title={"Add new Amenity"} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: adjustSize(0) }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Estate*</Text>

          <TextField
            placeholder="Estate"
            value={propertyGroup}
            onChangeText={setPropertyGroup}
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={[
              {
                backgroundColor: colors.white,
              },
            ]}
          />

          <Text style={styles.title}>Amenity Name*</Text>
          <TextField
            placeholder="Amenity Name"
            value={amenityName}
            onChangeText={setAmenityName}
            placeholderTextColor={colors.primaryLight}
             inputWrapperStyle={[
              {
                backgroundColor: colors.white,
              },
            ]}
          />

          <Text style={styles.title}>Capacity*</Text>
          <TextField
            placeholder="Capacity"
            value={capacity}
            onChangeText={setCapacity}
            placeholderTextColor={colors.primaryLight}
            keyboardType="numeric"
             inputWrapperStyle={[
              {
                backgroundColor: colors.white,
              },
            ]}
          />

          <Text style={styles.title}>Duration Per Slot (minutes)</Text>
          <TextField
            placeholder="Duration Per Slot (minutes)"
            value={durationPerSlot}
            onChangeText={setDurationPerSlot}
            placeholderTextColor={colors.primaryLight}
            keyboardType="numeric"
             inputWrapperStyle={[
              {
                backgroundColor: colors.white,
              },
            ]}
          />

          <Text style={styles.title}>
            Maximum duration per reservation (minutes)*
          </Text>
          <TextField
            placeholder="Maximum duration per reservation (minutes)"
            value={maxDuration}
            onChangeText={setMaxDuration}
            placeholderTextColor={colors.primaryLight}
            keyboardType="numeric"
             inputWrapperStyle={[
              {
                backgroundColor: colors.white,
              },
            ]}
          />

          <Text style={styles.title}>Choose days of the week</Text>
          <Pressable
            style={styles.dtButton}
            onPress={() => setShowDays(!showDays)}
          >
            <Text style={[styles.dtText]}>Choose</Text>
            <WithLocalSvg asset={Images.downIcon} />
          </Pressable>
          {showDays && (
            <MultiSelect
              data={[
                { label: "Monday", value: "monday" },
                { label: "Tuesday", value: "tuesday" },
                { label: "Wednesday", value: "wednesday" },
                { label: "Thursday", value: "thursday" },
                { label: "Friday", value: "friday" },
                { label: "Saturday", value: "saturday" },
                { label: "Sunday", value: "sunday" },
                { label: "Everyday", value: "Everyday" },
              ]}
              selectedValues={selectedDays}
              onChangeSelected={handleChange}
            />
          )}
          {selectedDays.length !== 0 && (
            <View>
              <Text style={styles.title}>Choose time of the day</Text>
              <DropdownComponent
                data={[
                  { label: "Same time everyday", value: "Same time everyday" },
                  {
                    label: "Different time for each day",
                    value: "Different time for each day",
                  },
                ]}
                label="Choose type"
                placeholder="Choose"
                value={selectedTime}
                onChangeValue={(v: any) => setSelectedTime(v)}
                dropdownStyle={styles.dropdown}
                placeholderStyle={styles.dropdownPlaceholder}
                selectedTextStyle={styles.dropdownSelected}
                rightIconColor={colors.primary}
              />
              {selectedTime === "Same time everyday" && (
                <View>
                  <Text style={styles.title}>Availability time:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Pressable
                      style={[styles.dtButton, { width: "48%" }]}
                      onPress={() => openPicker("start")}
                    >
                      <Text style={[styles.dtText]}>
                        {startTime || "Select"}
                      </Text>
                      <WithLocalSvg asset={Images.clock} />
                    </Pressable>
                    <Pressable
                      style={[styles.dtButton, { width: "48%" }]}
                      onPress={() => openPicker("end")}
                    >
                      <Text style={[styles.dtText]}>{endTime || "Select"}</Text>
                      <WithLocalSvg asset={Images.clock} />
                    </Pressable>
                  </View>
                </View>
              )}

              {selectedTime === "Different time for each day" && (
                <View>
                  {selectedDays.map((val, index) => {
                    const slotsForDay = dayTimeSlots.filter(
                      (slot) => slot.day === val,
                    );
                    return (
                      <View key={index}>
                        <View
                          style={[
                            styles.daysHeader,
                            {
                              marginBottom:
                                index === selectedDays.length - 1
                                  ? adjustSize(10)
                                  : 0,
                            },
                          ]}
                        >
                          <Text style={styles.daysName}>{val}</Text>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => openDayPicker(val, "start")}
                          >
                            <WithLocalSvg asset={Images.clockWhiteIcon} />
                          </TouchableOpacity>
                          <Text style={styles.toTxt}>To</Text>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => openDayPicker(val, "end")}
                          >
                            <WithLocalSvg asset={Images.clockWhiteIcon} />
                          </TouchableOpacity>
                        </View>

                        {/* Show added slots */}
                        <View style={styles.timeBoxMain}>
                          {slotsForDay.map((slot, idx) => (
                            <View key={idx} style={styles.timeBox}>
                              <Text style={styles.timeBoxVal}>
                                {slot.start} - {slot.end}
                              </Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          )}
          <Text style={styles.title}>Upload Images</Text>
          <Pressable style={styles.dtButton} onPress={pickImage}>
            <Text style={[styles.dtText]}>Choose Image</Text>
            <WithLocalSvg asset={Images.upload} />
          </Pressable>
          {images && (
            <View>
              <View style={styles.imageGrid}>
                {images.map((uri, index) => (
                  <View key={index} style={styles.imageWrapper}>
                    <Image source={{ uri }} style={styles.uploadedImage} />
                    <Pressable
                      style={styles.removeBtn}
                      onPress={() => {
                        setImages((prev) => prev.filter((_, i) => i !== index));
                      }}
                    >
                      <WithLocalSvg
                        asset={Images.closeIcon}
                        height={adjustSize(20)}
                        width={adjustSize(20)}
                      />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          )}
          <Button
            text={loading ? "Adding ..." : "Add Amenity"}
            preset="reversed"
            style={[styles.btn]}
            disabled={!isFormValid}
            onPress={() => {
              setLoading(true);

              setTimeout(() => {
                console.log({
                  propertyGroup,
                  amenityName,
                  capacity,
                  durationPerSlot,
                  maxDuration,
                  selectedDay,
                  selectedTime,
                  startTime,
                  endTime,
                  images,
                });

                setLoading(false);
                navigation.goBack(); // ✅ move back after 0.5s
              }, 500);
            }}
          />
          {showPicker && (
            <DateTimePicker
              value={tempDate}
              mode="time"
              display="spinner"
              is24Hour={false}
              onChange={onChange}
            />
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    flex: 1,
    paddingHorizontal: adjustSize(10),
    marginTop: adjustSize(15),
  },
  title: {
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
    marginBottom: adjustSize(3),
    marginTop: adjustSize(5),
  },
  dropdown: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginBottom: adjustSize(3),
    marginHorizontal: adjustSize(1),
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.normal,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.normal,
  },
  btn: {
    marginTop: adjustSize(50),
    marginBottom: adjustSize(20),
    height: adjustSize(49),
  },
  dtButton: {
    height: adjustSize(49),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: adjustSize(1),
    marginBottom: adjustSize(5),
  },
  dtText: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: adjustSize(15),
  },
  imageWrapper: {
    width: "31%", // 4 per row with spacing
    aspectRatio: 1, // keep square
    margin: "1%",
    borderRadius: adjustSize(8),
    overflow: "hidden",
    position: "relative",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: adjustSize(8),
    borderWidth: adjustSize(0.5),
    borderColor: colors.primaryLight,
  },
  removeBtn: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: colors.white,
    borderRadius: 100,
    marginHorizontal: 6,
    marginVertical: 2,
  },
  daysHeader: {
    backgroundColor: colors.primaryLight,
    height: adjustSize(47),
    borderRadius: adjustSize(7),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: adjustSize(15),
    marginTop: adjustSize(15),
  },
  daysName: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    flex: 1,
    textTransform: "capitalize",
  },
  toTxt: {
    color: colors.white,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    marginHorizontal: adjustSize(25),
  },
  timeBoxMain: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: adjustSize(5),
  },
  timeBox: {
    height: adjustSize(40),
    borderRadius: adjustSize(20),
    backgroundColor: colors.fill,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
    width: "48%",
    marginTop: adjustSize(10),
    marginHorizontal: adjustSize(1),
  },
  timeBoxVal: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
});
