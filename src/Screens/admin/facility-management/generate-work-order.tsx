import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Screen, Text, Button, TextField } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import DropdownComponent from "../../../Components/DropDown";
import { AdminStackParamList } from "../../../utils/interfaces";
import { rentalProperties } from "../../../utils/data";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CustomDateTimePicker } from "../../../Components/CustomDateTimePicker";
type Props = NativeStackScreenProps<AdminStackParamList, "FMGenerateWorkOrder">;

export function FMGenerateWorkOrder({ navigation }: Props) {
  // form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [priority, setPriority] = useState<string | null>(null);
  const [propertyId, setPropertyId] = useState<string | null>(null);
  const [fm, setFm] = useState<string | null>(null);
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  // date modal
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());
  // compute start of today once per render
  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const categoryOptions = useMemo(
    () => [
      { label: "Electrical", value: "electrical" },
      { label: "Plumbing", value: "plumbing" },
      { label: "HVAC", value: "hvac" },
      { label: "Other", value: "other" },
    ],
    []
  );
  const priorityOptions = useMemo(
    () => [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
    ],
    []
  );
  const propertyOptions = useMemo(
    () => rentalProperties.map((p) => ({ label: p.name, value: p.propertyId })),
    []
  );
  const fmOptions = useMemo(
    () => [
      { label: "John Doe", value: "john" },
      { label: "Jane Smith", value: "jane" },
    ],
    []
  );

  const fmtDate = (d: Date | null) => (d ? d.toLocaleDateString() : "Date");

  const canGenerate =
    title.trim().length > 0 &&
    !!category &&
    !!issueDate &&
    !!priority &&
    !!propertyId &&
    desc.trim().length > 0;

  const onGenerate = () => {
    if (!canGenerate) {
      Alert.alert("All fields are required", "Please fill all the fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 1000);
  };

  const openIssuePicker = () => {
    const base = issueDate ?? new Date();
    // ensure not earlier than today
    const clamped = base < todayStart ? todayStart : base;
    setTempDate(clamped);
    setPickerVisible(true);
  };

  const cancelPicker = () => setPickerVisible(false);
  const confirmPicker = () => {
    // clamp to today if somehow earlier
    const finalDate = tempDate < todayStart ? todayStart : tempDate;
    setIssueDate(finalDate);
    setPickerVisible(false);
  };

  const pickImages = async () => {
    // Request permission first
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
      allowsMultipleSelection: true,
      selectionLimit: 8,
    });

    if (result.canceled) return;

    // result.assets is an array
    const uris = (result.assets || [])
      .map((a) => a.uri)
      .filter(Boolean) as string[];
    setSelectedImages((prev) => {
      const combined = [...prev, ...uris];
      // Dedup by URI and cap at 12 thumbs
      return Array.from(new Set(combined)).slice(0, 12);
    });
  };

  // Build gallery: prefer user-selected images, else fallback slides
  const gallery: any[] = useMemo(() => {
    if (selectedImages.length > 0) {
      return selectedImages.map((uri) => ({ uri }));
    }
    return [];
  }, [selectedImages]);

  // Active hero image index
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Generate Work Order" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image with dots */}

        {gallery.length === 0 && (
          <Text
            style={[
              styles.label,
              { marginBottom: -4, paddingHorizontal: adjustSize(10) },
            ]}
            weight="semiBold"
          >
            Upload Attachments
          </Text>
        )}
        {gallery[0] && (
          <View style={styles.heroImg}>
            <Image
              source={
                gallery[Math.min(activeSlide, Math.max(gallery.length - 1, 0))]
              }
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />

            {/* Dots */}
            <View style={styles.dotsRow}>
              {gallery.map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setActiveSlide(i)}>
                  <View
                    style={[
                      styles.dot,
                      i === activeSlide ? styles.dotActive : styles.dotInactive,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={{ padding: adjustSize(10) }}>
          {/* Upload and thumbnails row */}
          <View style={styles.mediaRow}>
            <Pressable style={styles.uploadTile} onPress={pickImages}>
              <Feather name="upload" size={30} color={colors.white} />
            </Pressable>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {gallery.map((src, i) => (
                <Pressable key={i} onPress={() => setActiveSlide(i)}>
                  <Image
                    source={src}
                    style={[
                      styles.thumb,
                      i === activeSlide && styles.thumbActive,
                    ]}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </ScrollView>
          </View>

          {/* <Text
            style={[styles.label, { fontSize: adjustSize(15) }]}
            weight="semiBold"
          >
            Edit Work Request:
          </Text> */}

          {/* Title */}
          <Text style={styles.label} weight="semiBold">
            Title
          </Text>
          <TextField
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            inputWrapperStyle={styles.inputWrapper}
            style={styles.input}
            placeholderTextColor={colors.primaryLight}
          />
          {/* Issue date */}
          <Text style={styles.label} weight="medium">
            Issue date
          </Text>
          <Pressable disabled  style={[styles.dtButton,{opacity: 0.8}]}>
            <Text
              style={[
                styles.dtText,
                { color: issueDate ? colors.primary : colors.primaryLight },
              ]}
            >
              {fmtDate(new Date())}
            </Text>
            <WithLocalSvg asset={Images.calendar} />
          </Pressable>

            {/* Issue date */}
           

          {/* Priority */}
          <Text style={styles.label} weight="semiBold">
            Priority
          </Text>
          
          <DropdownComponent
            data={priorityOptions}
            placeholder="Select"
            value={priority ?? undefined}
            onChangeValue={(v: string) => setPriority(v)}
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />

<Text style={styles.label} weight="medium">
            Due date
          </Text>
          <Pressable onPress={openIssuePicker} style={styles.dtButton}>
            <Text
              style={[
                styles.dtText,
                { color: issueDate ? colors.primary : colors.primaryLight },
              ]}
            >
              {fmtDate(issueDate)}
            </Text>
            <WithLocalSvg asset={Images.calendar} />
          </Pressable>

          {/* Category */}
          <Text style={styles.label} weight="semiBold">
            Category
          </Text>
          <DropdownComponent
            data={categoryOptions}
            placeholder="Select"
            value={category ?? undefined}
            onChangeValue={(v: string) => setCategory(v)}
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />

          {/* Facility Manager */}
          <Text style={styles.label} weight="semiBold">
            Facility Manager
          </Text>
          <DropdownComponent
            data={fmOptions}
            placeholder="Select"
            value={fm ?? undefined}
            onChangeValue={(v: string) => setFm(v)}
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />

          {/* Property */}
          <Text style={styles.label} weight="semiBold">
            Property*
          </Text>
          <DropdownComponent
            data={propertyOptions}
            placeholder="Select property"
            value={propertyId ?? undefined}
            onChangeValue={(v: string) => setPropertyId(v)}
            dropdownStyle={styles.dropdown}
            placeholderStyle={styles.dropdownPlaceholder}
            selectedTextStyle={styles.dropdownSelected}
            rightIconColor={colors.primary}
          />

          {/* Description */}
          <Text style={styles.label} weight="semiBold">
            Description*
          </Text>
          <TextField
            placeholder="Write a detailed description"
            value={desc}
            onChangeText={setDesc}
            placeholderTextColor={colors.primaryLight}
            inputWrapperStyle={[
              styles.inputWrapper,
              { height: adjustSize(120), alignItems: "flex-start" },
            ]}
            style={[styles.input, { height: adjustSize(110) }]}
            multiline
          />

          {/* <View style={{ height: spacing.xl }} /> */}
          <Button
            text={loading ? "Saving..." : "Save Changes"}
            preset="reversed"
            style={styles.generateBtn}
            textStyle={styles.generateText}
            onPress={onGenerate}
            // disabled={!canGenerate || loading}
          />
        </View>
      </ScrollView>

      <CustomDateTimePicker
        mode="date"
        value={issueDate}
        visible={pickerVisible}
        onChange={setIssueDate}
        onCancel={() => setPickerVisible(false)}
        onConfirm={() => setPickerVisible(false)}
      />

      {/* Date Picker Modal */}
      {/* <Modal
        visible={pickerVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelPicker}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text weight="semiBold" style={styles.modalTitle}>
              Select Date
            </Text>
            <View style={styles.modalPickerWrap}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                minimumDate={todayStart}
                onChange={(_, d) => d && setTempDate(d)}
              />
            </View>
            <View style={styles.modalActions}>
              <Button
                text="Cancel"
                preset="default"
                style={styles.modalBtn}
                onPress={cancelPicker}
              />
              <Button
                text="Done"
                preset="reversed"
                style={styles.modalBtn}
                onPress={confirmPicker}
              />
            </View>
          </View>
        </View>
      </Modal> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    paddingBottom: 50,
    flexGrow: 1,
  },
  heroImg: {
    height: adjustSize(228),
    borderRadius: adjustSize(0),
    position: "relative",
  },
  dotsRow: {
    position: "absolute",
    bottom: adjustSize(10),
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: adjustSize(6),
  },
  dot: {
    width: adjustSize(8),
    height: adjustSize(8),
    borderRadius: adjustSize(4),
  },
  dotActive: {
    backgroundColor: colors.primary,
  },
  dotInactive: {
    backgroundColor: colors.white,
    opacity: 0.9,
  },
  mediaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  uploadTile: {
    width: adjustSize(60),
    height: adjustSize(60),
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: spacing.sm,
  },
  thumb: {
    width: adjustSize(60),
    height: adjustSize(60),
    borderRadius: adjustSize(10),
    marginRight: spacing.sm,
    backgroundColor: colors.fill,
  },
  thumbActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    color: colors.primary,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  inputWrapper: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(10),
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    fontFamily: typography.fonts.poppins.medium,
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
  },
  dropdownPlaceholder: {
    fontSize: adjustSize(12),
    color: colors.primaryLight,
    fontFamily: typography.fonts.poppins.medium,
  },
  dropdownSelected: {
    fontSize: adjustSize(12),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.medium,
  },
  dtButton: {
    height: adjustSize(48),
    borderRadius: adjustSize(10),
    backgroundColor: colors.fill,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  dtText: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.medium,
  },
  generateBtn: {
    height: adjustSize(48),
    borderRadius: adjustSize(12),
    backgroundColor: colors.primary,
    marginBottom: adjustSize(20),
  },
  generateText: {
    fontFamily: typography.fonts.poppins.semiBold,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalCard: {
    width: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: adjustSize(16),
    borderTopRightRadius: adjustSize(16),
    padding: spacing.lg,
  },
  modalTitle: {
    fontSize: adjustSize(16),
    color: colors.primary,
    marginBottom: spacing.md,
  },
  modalPickerWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.md,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.sm,
  },
  modalBtn: {
    minWidth: 110,
  },
});
