import React, { useMemo, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  Linking,
  Dimensions,
  Animated,
  Platform,
  FlatList,
} from "react-native";
import { Screen, Text, Button, Header } from "../../../Components";
import { adjustSize, colors, spacing, typography } from "../../../theme";
import { Images } from "../../../assets/Images";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

type TabKey = "summary" | "updates";

export const FMOrderView = (props:any) => {
  const [activeTab, setActiveTab] = useState<TabKey>("summary");
  // gallery for banner
  const slides = [Images.slide1, Images.slide2, Images.slide3];
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');
  const gallery = slides; // could be dynamic later

  const details: Array<[string, string]> = useMemo(
    () => [
      ["Title:", "Toilet leakage"],
      ["Work Order No:", "26"],
      ["Priority:", "High"],
      ["Due Date:", "April 5, 2024"],
      ["Work Request No:", "1234"],
      ["Category:", "Plumbing"],
      ["Status:", "Ongoing"],
    ],
    []
  );

  const updates = useMemo(
    () =>
      new Array(10).fill(0).map((_, i) => ({
        id: i + 1,
        title: "Gate was broken and Now Fixed",
        desc: "It was reported that the main gate was broken from the top ...",
        date: "24 feb , 2025",
        img: slides[i % slides.length],
      })),
    []
  );

  // Handle scroll animation for the banner
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );

  // Handle scroll end to update active slide
  const onScrollEnd = (e: any) => {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveSlide(slide);
  };

  // Handle dot press to navigate to specific slide
  const goToSlide = (index: number) => {
    setActiveSlide(index);
    flatListRef.current?.scrollToIndex({ 
      index, 
      animated: true,
      viewPosition: 0.5 // Center the item in the view
    });
  };

  // Create a ref for the FlatList
  const flatListRef = useRef<FlatList>(null);

  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screen}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header title="Work Order (ID)" />

      {/* Tabs header */}
      <View style={styles.tabsHeader}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === "summary" && styles.tabActive]}
          onPress={() => setActiveTab("summary")}
        >
          <Image
            source={Images.ordersummary}
            style={{
              tintColor:
                activeTab === "summary" ? colors.primary : colors.white,
              height: 23,
              width: 18,
            }}
          />
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "summary" ? colors.primary : colors.white,
              },
            ]}
            weight={activeTab === "summary" ? "semiBold" : "medium"}
          >
            Summary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === "updates" && styles.tabActive]}
          onPress={() => setActiveTab("updates")}
        >
          {/* <Ionicons
            name="sync-outline"
            size={20}
            color={
              activeTab === "updates" ? colors.primary : colors.primaryLight
            }
          /> */}
          <Image
            source={Images.ordersummary}
            style={{
              tintColor:
                activeTab === "updates" ? colors.primary : colors.white,
              height: 23,
              width: 18,
            }}
          />
          <Text
            style={[
              styles.tabText,
              {
                color: activeTab === "updates" ? colors.primary : colors.white,
              },
            ]}
            weight={activeTab === "updates" ? "semiBold" : "medium"}
          >
            Updates
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "summary" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Banner with Swipeable Carousel */}
          <View style={styles.bannerContainer}>
            <Animated.FlatList
              ref={flatListRef}
              data={gallery}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={onScroll}
              onMomentumScrollEnd={onScrollEnd}
              keyExtractor={(_, index) => index.toString()}
              initialScrollIndex={activeSlide}
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              renderItem={({ item }) => (
                <Image 
                  source={item} 
                  style={[styles.bannerImage, { width }]} 
                  resizeMode="cover"
                />
              )}
            />
            
            {/* Dot Indicators */}
            {gallery.length > 1 && (
              <View style={styles.dotsContainer}>
                {gallery.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dot,
                      index === activeSlide ? styles.activeDot : styles.inactiveDot,
                    ]}
                    onPress={() => goToSlide(index)}
                    activeOpacity={0.7}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Thumbs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbRow}
          >
            {gallery.map((src, i) => (
              <Pressable 
                key={i} 
                onPress={() => {
                  setActiveSlide(i);
                  flatListRef.current?.scrollToIndex({
                    index: i,
                    animated: true,
                    viewPosition: 0.5 // Center the item in the view
                  });
                }}>
                <Image
                  source={src}
                  style={[
                    styles.thumb,
                    i === activeSlide && styles.thumbActive,
                  ]}
                />
              </Pressable>
            ))}
          </ScrollView>

          <View style={{ paddingHorizontal: spacing.lg }}>
            <Text weight="semiBold" style={styles.sectionTitle}>
              Brume Villa
            </Text>

            {/* Details */}
            <View style={styles.detailsCard}>
              {details.map(([k, v], idx) => (
                <View key={k}>
                  <View style={styles.kvRow}>
                    <Text style={styles.kvKey} weight="semiBold">
                      {k}
                    </Text>
                    <Text style={styles.kvVal}>{v}</Text>
                  </View>
                  {idx === 3 || idx === 6 ? <View style={styles.hr} /> : null}
                </View>
              ))}
            </View>

            {/* Description */}
            <Text weight="semiBold" style={styles.sectionTitle}>
              Description
            </Text>
            <Text style={styles.desc}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </Text>
          </View>

          <View style={{ height: spacing.xl }} />
          <Button
            text="Export"
            preset="reversed"
            style={styles.primaryBtn}
            textStyle={styles.primaryBtnText}
            onPress={() => {
              Linking.openURL(
                "https://firebasestorage.googleapis.com/v0/b/cityportal-84540.appspot.com/o/WorkOrder_WO294841.pdf?alt=media&token=7e9a5838-6133-4aa2-8527-550aa0d6939d"
              );
            }}
          />
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: spacing.lg }}>
            <Text
              weight="semiBold"
              style={[
                styles.sectionTitle,
                { marginTop: adjustSize(30), marginBottom: 0 },
              ]}
            >
              Brume Villa
            </Text>
          </View>

          {/* Updates list */}
          <View style={{ padding: spacing.lg, paddingTop: spacing.md }}>
            {updates.map((u) => (
              <View key={u.id} style={styles.updateRow}>
                <Image source={u.img} style={styles.updateImg} />
                <View style={{ flex: 1 }}>
                  <Text
                    weight="semiBold"
                    numberOfLines={1}
                    style={styles.updateTitle}
                  >
                    {u.title}
                  </Text>
                  <Text numberOfLines={1} style={styles.updateDesc}>
                    {u.desc}
                  </Text>
                </View>
                <Text style={styles.updateDate}>{u.date}</Text>
              </View>
            ))}
          </View>

          <Button
            text="Add Update"
            preset="reversed"
            style={[styles.primaryBtn, { marginTop: spacing.none }]}
            textStyle={styles.primaryBtnText}
            onPress={() => {}}
          />
        </ScrollView>
      )}

      {/* Floating chat button */}
      <Pressable style={styles.fab}
        onPress={()=>{
          props.navigation.navigate("Chat",{
            params:{
              type:"Work Order",
              id:"1"
            }
          })
        }}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={22}
          color={colors.white}
        />
      </Pressable>
    </Screen>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  tabsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.primary + "15",
  },
  tabBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: adjustSize(56),
    flex: 1,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    marginTop: spacing.xs,
    fontSize: adjustSize(12),
  },
  bannerContainer: {
    height: 220,
    width: '100%',
    position: 'relative',
    backgroundColor: colors.background,
  },
  bannerImage: {
    height: 220,
    width: '100%',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: adjustSize(6),
  },
  dot: {
    width: adjustSize(8),
    height: adjustSize(8),
    borderRadius: adjustSize(4),
  },
  activeDot: {
    backgroundColor: colors.white,
    width: 20,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dotInactive: {
    backgroundColor: colors.white,
    opacity: 0.9,
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
  sectionTitle: {
    color: colors.primary,
    fontSize: adjustSize(16),
    marginVertical: spacing.md,
  },
  detailsCard: {
    borderRadius: adjustSize(12),
    // marginTop: adjustSize(40),
    // marginBottom: spacing.lg,
  },
  kvRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    textAlign: "right",
    flex: 1,
  },
  hr: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.primary + "33",
    marginVertical: spacing.md,
  },
  desc: {
    color: colors.primaryLight,
    fontSize: adjustSize(12),
    lineHeight: adjustSize(18),
    marginBottom: spacing.xl,
  },
  updateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  updateImg: {
    width: adjustSize(50),
    height: adjustSize(50),
    borderRadius: adjustSize(6),
  },
  updateTitle: {
    color: colors.primary,
    fontSize: adjustSize(12),
    marginBottom: 2,
  },
  updateDesc: {
    color: colors.primaryLight,
    fontSize: adjustSize(10),
  },
  updateDate: {
    color: "#4CAF50",
    fontSize: adjustSize(10),
    marginLeft: spacing.sm,
  },
  primaryBtn: {
    marginHorizontal: spacing.lg,
    marginBottom: adjustSize(30),
    borderRadius: adjustSize(12),
    backgroundColor: colors.primary,
    width: "90%",
    alignSelf: "center",
  },
  primaryBtnText: {
    fontFamily: typography.fonts.poppins.semiBold,
  },
  fab: {
    position: "absolute",
    right: spacing.lg,
    bottom: adjustSize(90),
    width: adjustSize(48),
    height: adjustSize(48),
    borderRadius: adjustSize(24),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    elevation: 4,
  },
});
