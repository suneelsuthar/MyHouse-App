import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Screen, Text, Button, TextField } from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import DropdownComponent from "../../../Components/DropDown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AppStackScreenProps } from "../../../utils/interfaces";
import { rentalProperties } from "../../../utils/data";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
type Props = AppStackScreenProps<"AdminGenerateWorkRequests">;

export function AdminTenantDetails({ navigation }: Props) {
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

  const fmtDate = (d: Date | null) =>
    d ? d.toLocaleDateString() : "Choose date";

  const canGenerate =
    title.trim().length > 0 &&
    !!category &&
    !!issueDate &&
    !!priority &&
    !!propertyId &&
    desc.trim().length > 0;

  const onGenerate = () => {
    if (!canGenerate) return;
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

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Generate Work Request" />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image placeholder */}
        <View style={styles.heroImg}>
          <Image
            source={require("../../../assets/dummyimages/toprated2.jpg")}
            style={{
              width: "100%",
              height: "100%",
            }}
            resizeMode="cover"
          />
        </View>

        <View style={{ padding: adjustSize(10) }}>
          {/* Upload and thumbnails row */}
          <View style={styles.mediaRow}>
            <Pressable style={styles.uploadTile} onPress={pickImages}>
              <Feather name="upload" size={30} color={colors.white} />
            </Pressable>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedImages.length > 0
                ? selectedImages.map((uri, i) => (
                    <Image
                      key={uri + i}
                      source={{ uri }}
                      style={styles.thumb}
                      resizeMode="cover"
                    />
                  ))
                : [0, 1, 2, 3].map((i) => (
                    <Image
                      key={i}
                      source={require("../../../assets/dummyimages/foryou1.jpg")}
                      style={styles.thumb}
                      resizeMode="cover"
                    />
                  ))}
            </ScrollView>
          </View>

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

          {/* Issue date */}
          <Text style={styles.label} weight="medium">
            Issue date
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

          <View style={{ height: spacing.xl }} />
          <Button
            text={loading ? "Generating..." : "Generate"}
            preset="reversed"
            style={styles.generateBtn}
            textStyle={styles.generateText}
            onPress={onGenerate}
            disabled={!canGenerate || loading}
          />
        </View>
      </ScrollView>

      {/* Date Picker Modal */}
      <Modal
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
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {},
  heroImg: {
    height: adjustSize(228),
    borderRadius: adjustSize(0),
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
