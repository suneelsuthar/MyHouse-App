import React, { useState, useMemo } from "react";
import { Screen, Text, Button, Header } from "../../../Components";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
} from "react-native";
import { colors, spacing, typography, adjustSize } from "../../../theme";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/Images";

export const FMViewDetails = () => {
  const navigation = useNavigation();
  const slides = [Images.slide1, Images.slide2, Images.slide3];
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([
    Images.slide1,
    Images.slide2,
    Images.slide3,
  ]);

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
      statusBarStyle="dark"
    >
      {/* Header */}
      <Header title="View Work Requests" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroImg}>
          <Image
            source={selectedImages[activeSlide] as any}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
          {/* Dots */}
          <View style={styles.dotsRow}>
            {selectedImages.map((_, i) => (
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

        {/* Thumbs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbRow}
        >
          {selectedImages.map((src, i) => (
            <Pressable key={i} onPress={() => setActiveSlide(i)}>
              <Image
                source={src}
                style={[styles.thumb, i === activeSlide && styles.thumbActive]}
              />
            </Pressable>
          ))}
        </ScrollView>
        {/* Details Card */}
        <View style={[styles.card, { marginTop: spacing.lg }]}>
          <Text weight="semiBold" style={styles.sectionHeading}>
            Work Request(Id):
          </Text>

          <View style={{ height: spacing.md }} />

          {(
            [
              ["Title:", "Lorem ipsum"],
              ["Category:", "Lorem ipsum"],
              ["Issue Date:", "Lorem ipsum"],
              ["Priority:", "Lorem ipsum"],
              ["Facility Manager:", "Lorem ipsum"],
              ["Work Request No:", "Lorem ipsum"],
              ["Property:", "Lorem ipsum"],
            ] as const
          ).map(([k, v]) => (
            <View key={k} style={styles.kvRow}>
              <Text weight="semiBold" style={styles.kvKey}>
                {k}
              </Text>
              <Text style={styles.kvVal}>{v}</Text>
            </View>
          ))}

          <View style={{ height: spacing.lg }} />

          <Text weight="semiBold" style={styles.sectionHeading}>
            Description:
          </Text>
          <View style={{ height: spacing.xs }} />
          <Text style={styles.descText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets.
          </Text>
        </View>

        {/* Close Button */}
        <Button
          text="Close"
          preset="reversed"
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
          textStyle={styles.closeBtnText}
        />

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  backBtn: {
    width: adjustSize(36),
    height: adjustSize(36),
    borderRadius: adjustSize(18),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  title: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
  },
  heroWrap: {
    // borderRadius: adjustSize(12),
  },
  heroImg: {
    width: "100%",
    height: adjustSize(304),
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
  card: {
    borderRadius: adjustSize(12),
    padding: spacing.lg,
  },
  sectionHeading: {
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    fontSize: adjustSize(16),
  },
  kvRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
  kvKey: {
    color: colors.primary,
    fontSize: adjustSize(12),
    flex: 1,
  },
  kvVal: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    flex: 1,
    textAlign: "right",
  },
  descText: {
    color: colors.primaryLight,
    lineHeight: adjustSize(18),
    fontSize: adjustSize(12),
  },
  closeBtn: {
    marginTop: spacing.lg,
    borderRadius: adjustSize(12),
    backgroundColor: colors.primary,
    margin: adjustSize(10),
    width: "95%",
    alignSelf: "center",
  },
  closeBtnText: {
    color: colors.white,
    fontFamily: typography.fonts.poppins.semiBold,
  },
  thumbRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  thumb: {
    width: adjustSize(60),
    height: adjustSize(60),
    borderRadius: adjustSize(8),
    marginRight: spacing.sm,
  },
  thumbActive: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
});
