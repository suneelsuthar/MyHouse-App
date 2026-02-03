import React, { useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Text } from "../../../../Components";
import DropdownComponent from "../../../../Components/DropDown";
import { adjustSize, colors, typography } from "../../../../theme";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";

type Step6Props = {
  mode?: "add" | "edit" | string;
};

const DOC_TYPES = [
  {
    label: "Document or Power of Attorney",
    value: "Document or Power of Attorney",
  },
  { label: "Tenancy Agreement", value: "Tenancy Agreement" },
  { label: "Certificate of Occupancy", value: "Certificate of Occupancy" },
];

const MAX_IMAGES = 16;

const Step6: React.FC<Step6Props> = () => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [docType, setDocType] = useState<string | null>(null);
  const [docFileName, setDocFileName] = useState<string | null>(null);
  const [coverWidth, setCoverWidth] = useState<number>(0);
  const coverListRef = useRef<FlatList<string> | null>(null);

  const ensureMediaPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return false;
    }
    return true;
  };

  const pickCoverImage = async () => {
    try {
      const ok = await ensureMediaPermissions();
      if (!ok) return;
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: MAX_IMAGES,
      });
      if (!res.canceled && res.assets?.length) {
        const pickedUris = res.assets.map((a) => a.uri);
        if (!coverImage) {
          // first becomes cover, rest into images
          const [first, ...rest] = pickedUris;
          setCoverImage(first);
          setImages((prev) => [...rest, ...prev].slice(0, MAX_IMAGES));
          setActiveIndex(0);
        } else {
          // append all to images
          setImages((prev) => [...prev, ...pickedUris].slice(0, MAX_IMAGES));
        }
      }
    } catch (e) {
      // fallback
    }
  };

  const pickMoreImages = async () => {
    try {
      const ok = await ensureMediaPermissions();
      if (!ok) return;
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: MAX_IMAGES,
      });
      if (!res.canceled && res.assets?.length) {
        const newUris = res.assets.map((a) => a.uri);
        const next = [...images, ...newUris].slice(0, MAX_IMAGES);
        setImages(next);
      }
    } catch (e) {
      // fallback
    }
  };

  const removeImage = (idx: number) => {
    const next = [...images];
    next.splice(idx, 1);
    setImages(next);
    const nextAll = (coverImage ? [coverImage, ...next] : next).filter(Boolean);
    const maxIndex = Math.max(0, nextAll.length - 1);
    setActiveIndex((prev) => Math.min(prev, maxIndex));
  };

  const allUris = useMemo(() => {
    const list = (coverImage ? [coverImage, ...images] : images).filter(
      Boolean,
    );
    return list as string[];
  }, [coverImage, images]);

  const totalImages = allUris.length;
  const currentCoverUri = allUris[activeIndex] || null;

  const scrollToIndex = (idx: number) => {
    setActiveIndex(idx);
    if (!coverWidth) return;
    coverListRef.current?.scrollToOffset({
      offset: idx * coverWidth,
      animated: true,
    });
  };

  const handleCoverScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!coverWidth) return;
    const nextIndex = Math.round(e.nativeEvent.contentOffset.x / coverWidth);
    if (!Number.isNaN(nextIndex)) setActiveIndex(nextIndex);
  };

  const pickDocument = async () => {
    try {
      const res: any = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
      });
      if (res.type === "success") {
        setDocFileName(res.name ?? "document");
      }
    } catch (e) {
      // fallback
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: adjustSize(24) }}
      showsVerticalScrollIndicator={false}
    >
      <Text weight="semiBold" style={styles.headerTitle}>
        Add Documents & Images
      </Text>

      {/* Featured Cover Image */}
      <Text weight="medium" style={styles.label}>
        Featured Cover Image
      </Text>

      {currentCoverUri ? (
        <View style={styles.coverWrap}>
          <View
            onLayout={(evt) => {
              const w = evt.nativeEvent.layout.width;
              if (w && w !== coverWidth) setCoverWidth(w);
            }}
          >
            <FlatList
              ref={(r) => {
                coverListRef.current = r;
              }}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={allUris}
              keyExtractor={(uri, idx) => `${uri}-${idx}`}
              onMomentumScrollEnd={handleCoverScrollEnd}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={[
                    styles.coverImage,
                    coverWidth ? { width: coverWidth } : null,
                  ]}
                />
              )}
            />
          </View>
          {/* top-left upload action (replace) */}
          <View style={styles.coverOverlayLeft}>
            <TouchableOpacity
              onPress={pickCoverImage}
              style={styles.coverAction}
              activeOpacity={0.8}
            >
              <AntDesign name="upload" color={colors.white} size={20} />
            </TouchableOpacity>
          </View>
          {/* top-right remove cover (optional) */}
          <View style={styles.coverOverlayRight}>
            <TouchableOpacity
              onPress={() => {
                if (!allUris.length) return;
                // if cover exists and we're on index 0 => remove cover
                if (coverImage && activeIndex === 0) {
                  setCoverImage(null);
                  setActiveIndex(0);
                  return;
                }
                // otherwise remove from images list
                const imageIdx = coverImage ? activeIndex - 1 : activeIndex;
                if (imageIdx >= 0) removeImage(imageIdx);
              }}
              style={styles.coverRemove}
              activeOpacity={0.8}
            >
              <AntDesign name="delete" size={24} color={colors.error} />
            </TouchableOpacity>
          </View>
          {/* bottom-center dots */}
          <View style={styles.dotsWrap}>
            {Array.from({ length: totalImages }).map((_, i) => (
              <TouchableOpacity
                key={`dot-${i}`}
                onPress={() => scrollToIndex(i)}
                activeOpacity={0.8}
              >
                <View
                  style={[styles.dot, i === activeIndex && styles.dotActive]}
                />
              </TouchableOpacity>
            ))}
          </View>
          {/* bottom-right count */}
          <View style={styles.carouselIndicators}>
            <Text style={styles.carouselCount}>
              {Math.max(1, activeIndex + 1)}/{totalImages}
            </Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          onPress={pickCoverImage}
          activeOpacity={0.8}
          style={styles.uploadTile}
        >
          <Text style={styles.placeholderText}>Upload Image</Text>
          <View style={styles.uploadIcon}>
            <AntDesign name="upload" size={20} color={colors.primary} />
          </View>
        </TouchableOpacity>
      )}

      {/* Other Images */}
      <Text
        weight="medium"
        style={[styles.label, { marginTop: adjustSize(16) }]}
      >
        Other Images
      </Text>

      {images.length === 0 ? (
        <TouchableOpacity
          onPress={pickMoreImages}
          activeOpacity={0.8}
          style={styles.uploadTile}
        >
          <Text style={styles.placeholderText}>Browse images</Text>
          <View style={styles.uploadIcon}>
            <AntDesign name="upload" size={20} color={colors.primary} />
          </View>
        </TouchableOpacity>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: adjustSize(10) }}
          contentContainerStyle={{
            gap: adjustSize(10),
            paddingRight: adjustSize(6),
          }}
        >
          {/* small square add tile */}
          <TouchableOpacity
            onPress={pickMoreImages}
            activeOpacity={0.8}
            style={styles.addThumb}
          >
            <AntDesign name="upload" color={colors.white} size={22} />
          </TouchableOpacity>

          {images.map((uri, idx) => (
            <TouchableOpacity
              key={`${uri}-${idx}`}
              style={styles.thumbWrap}
              activeOpacity={0.8}
              onPress={() => setActiveIndex(idx + 1)}
            >
              <Image source={{ uri }} style={styles.thumb} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => removeImage(idx)}
                style={styles.thumbRemove}
              >
                <Text style={{ color: colors.white, fontSize: adjustSize(12) }}>
                  ×
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Document upload */}
      <Text
        weight="medium"
        style={[styles.label, { marginTop: adjustSize(18) }]}
      >
        Upload document (optional)
      </Text>

      <DropdownComponent
        data={DOC_TYPES}
        value={docType}
        onChangeValue={setDocType}
        placeholder="Document type"
        dropdownStyle={
          {
            marginHorizontal: 1,
            backgroundColor: colors.white,
            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
            marginBottom: adjustSize(10),
            height: adjustSize(49),
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

      {/* Choose file */}
      <Text
        weight="medium"
        style={[styles.label, { marginTop: adjustSize(6) }]}
      >
        Choose file
      </Text>
      <TouchableOpacity
        onPress={pickDocument}
        activeOpacity={0.8}
        style={styles.uploadTile}
      >
        <Text style={styles.placeholderText}>
          {docFileName ? docFileName : "No file Chosen"}
        </Text>
        <View style={styles.uploadIcon}>
          <AntDesign name="upload" size={20} color={colors.primary} />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: adjustSize(15),
    color: colors.primary,
    marginTop: adjustSize(5),
    marginBottom: adjustSize(20),
  },

  label: {
    color: colors.primary,
    fontSize: adjustSize(12),
  },

  uploadTile: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    paddingVertical: adjustSize(14),
    paddingHorizontal: adjustSize(12),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(8),
    height: adjustSize(49),
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)",
    elevation: 1,
  } as ViewStyle,

  placeholderText: {
    color: colors.grey,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  } as TextStyle,

  uploadIcon: {
    width: adjustSize(36),
    height: adjustSize(36),
    borderRadius: adjustSize(10),
    backgroundColor: colors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.greylight,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  coverWrap: {
    borderRadius: adjustSize(10),
    overflow: "hidden",
    marginTop: adjustSize(8),
    backgroundColor: colors.fill,
  } as ViewStyle,

  coverImage: {
    width: "100%",
    height: adjustSize(303),
    resizeMode: "cover",
  },

  coverOverlayLeft: {
    position: "absolute",
    left: adjustSize(10),
    top: adjustSize(10),
  },

  coverOverlayRight: {
    position: "absolute",
    right: adjustSize(10),
    top: adjustSize(10),
  },

  coverAction: {
    width: adjustSize(44),
    height: adjustSize(44),
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,

  coverRemove: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 100,
    backgroundColor: colors.white,
    padding: 5,
  } as ViewStyle,

  dotsWrap: {
    position: "absolute",
    bottom: adjustSize(10),
    alignSelf: "center",
    flexDirection: "row",
    gap: adjustSize(6),
  } as ViewStyle,

  dot: {
    width: adjustSize(6),
    height: adjustSize(6),
    borderRadius: adjustSize(3),
    backgroundColor: "#D1D5DB",
    opacity: 0.8,
  } as ViewStyle,

  dotActive: {
    backgroundColor: colors.primary,
    opacity: 1,
  } as ViewStyle,

  carouselIndicators: {
    position: "absolute",
    right: adjustSize(10),
    bottom: adjustSize(8),
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: adjustSize(8),
    paddingVertical: adjustSize(4),
    borderRadius: adjustSize(8),
  } as ViewStyle,

  carouselCount: {
    color: colors.white,
    fontSize: adjustSize(11),
  },

  thumbWrap: {
    position: "relative",
    borderRadius: adjustSize(10),
    overflow: "hidden",
    width: adjustSize(76),
    height: adjustSize(76),
    backgroundColor: colors.fill,
  } as ViewStyle,

  addThumb: {
    width: adjustSize(76),
    height: adjustSize(76),
    borderRadius: adjustSize(10),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
  } as ViewStyle,

  thumb: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  thumbRemove: {
    position: "absolute",
    top: adjustSize(6),
    right: adjustSize(6),
    width: adjustSize(18),
    height: adjustSize(18),
    borderRadius: adjustSize(9),
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
});

export default Step6;
