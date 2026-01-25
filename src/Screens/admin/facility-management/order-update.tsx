import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Screen,
  Text,
  Button,
  TextField,
  CustomTabs,
} from "../../../Components";
import { Header } from "../../../Components/Header";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { AdminStackParamList } from "../../../utils/interfaces";
import * as ImagePicker from "expo-image-picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CustomDateTimePicker } from "../../../Components/DateTimePickerModal";
import {
  WorkRequestsIcon,
  OrdersIcon,
  CompletedIcon,
} from "../../../assets/svg";

type Props = NativeStackScreenProps<AdminStackParamList, "FMOrderUpdate">;

export function FMOrderUpdate({ navigation }: Props) {
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
  const [showPicker, setShowPicker] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(null);
  // compute start of today once per render
  const todayStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const fmtDate = (d: Date | null) => (d ? d.toLocaleDateString() : "Date");

  const canGenerate =
    title.trim().length > 0 &&
    !!category &&
    !!issueDate &&
    !!priority &&
    !!propertyId &&
    desc.trim().length > 0;

  const onGenerate = () => {
    // if (!canGenerate) {
    //   Alert.alert("All fields are required", "Please fill all the fields");
    //   return;
    // }
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
    setShowPicker(true);
  };

  const handleDateChange = (date: Date) => {
    // clamp to today if somehow earlier
    // const finalDate = date < todayStart ? todayStart : date;
    // setIssueDate(finalDate);
    setTempDate(date);
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
    return [Images.slide1, Images.slide2, Images.slide3];
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
      <Header title="Update Work Order" />
      <CustomTabs
        tabs={[
          {
            label: "Work Requests",
            activeIcon: <WorkRequestsIcon color={colors.white} />,
            inactiveIcon: <WorkRequestsIcon color={colors.white} />,
          },
          {
            label: "Orders",
            activeIcon: <OrdersIcon color={colors.white} />,
            inactiveIcon: <OrdersIcon color={colors.white} />,
          },
          {
            label: "Completed",
            activeIcon: <CompletedIcon color={colors.white} />,
            inactiveIcon: <CompletedIcon color={colors.white} />,
          },
        ]}
        activeTab={"Orders"}
        onTabChange={(label) => console.log(label)}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ padding: adjustSize(10) }}>
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

            <Text style={[styles.label,{marginTop:0}]} weight="semiBold">
              Work Order No.*
            </Text>
            <TextField
              placeholder="Order Number"
              value={"Aba1klj23"}
              editable={false}
              onChangeText={setTitle}
              inputWrapperStyle={styles.inputWrapper}
              style={styles.input}
              placeholderTextColor={colors.primaryLight}
            />
            {/* Issue date */}
            <Text style={[styles.label,{marginTop:0}]} weight="medium">
              Update Date*
            </Text>
            <Pressable onPress={openIssuePicker} style={styles.dtButton}>
              <Text
                style={[
                  styles.dtText,
                  { color: tempDate ? colors.primary : colors.primaryLight },
                ]}
              >
                {fmtDate(tempDate)}
              </Text>
              <WithLocalSvg asset={Images.calendar} />
            </Pressable>

            {/* Description */}
            <Text style={[styles.label,{marginTop:25}]} weight="semiBold">
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

            {/* Issue date */}
            <Text style={[styles.label,{marginTop:0}]} weight="medium">
              Upload attachments
            </Text>
            <Pressable
              onPress={() => pickImages()}
              style={[styles.dtButton, { marginBottom: 20 }]}
            >
              <Text
                style={[
                  styles.dtText,
                  { color: issueDate ? colors.primary : colors.primaryLight },
                ]}
              >
                {gallery.length === 0 ? "No file choosen" : "Upload File"}
              </Text>
              <WithLocalSvg asset={Images.upload} />
            </Pressable>

            <View style={styles.mediaRow}>
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

            <View style={{ height: spacing.xl }} />
            <Button
              text={loading ? "Adding Update..." : "Add Update"}
              preset="reversed"
              style={styles.generateBtn}
              textStyle={styles.generateText}
              onPress={onGenerate}
            />
          </View>
        </ScrollView>
      </CustomTabs>
      {/* Custom Date Picker */}
      <CustomDateTimePicker
        mode="date"
        value={tempDate}
        visible={showPicker}
        minimumDate={todayStart}
        onCancel={() => setShowPicker(false)}
        onConfirm={handleDateChange}
      />
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
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    fontFamily: typography.fonts.poppins.medium,
    fontSize:adjustSize(12)
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
    marginBottom: adjustSize(30),
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
