// import React, { useEffect, useMemo, useRef, useState } from "react";
// import {
//   View,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Dimensions,
//   NativeSyntheticEvent,
//   NativeScrollEvent,
//   ImageBackground,
//   LayoutChangeEvent,
// } from "react-native";
// import { Text } from "./Text";
// import { colors, adjustSize, typography } from "../theme";
// import { Images } from "../assets/Images";

// interface TabItem {
//   key: string;
//   label: string;
//   activeIcon: React.ReactNode;
//   inactiveIcon: React.ReactNode;
//   content?: React.ReactNode; // optional: real content per tab
// }

// interface CustomTabsProps {
//   tabs: TabItem[];
//   activeTab: string; // controlled by parent
//   onTabChange: (label: string) => void;
// }

// export function CustomTabs({ tabs, activeTab, onTabChange }: CustomTabsProps) {
//   const scrollRef = useRef<ScrollView>(null);
//   const programmaticScrollRef = useRef(false);
//   const [containerWidth, setContainerWidth] = useState(
//     Dimensions.get("window").width
//   );
//   const [didLayout, setDidLayout] = useState(false);

//   const activeIndex = useMemo(
//     () =>
//       Math.max(
//         0,
//         tabs.findIndex((t) => t.label === activeTab)
//       ),
//     [tabs, activeTab]
//   );

//   // Measure width so paging works even if parent width != window width
//   const onContainerLayout = (e: LayoutChangeEvent) => {
//     const w = Math.max(1, Math.round(e.nativeEvent.layout.width));
//     setContainerWidth(w);
//     setDidLayout(true);
//   };

//   // Sync scroll position when parent changes activeTab
//   useEffect(() => {
//     if (!didLayout) return;
//     const x = activeIndex * containerWidth;
//     programmaticScrollRef.current = true;
//     requestAnimationFrame(() => {
//       scrollRef.current?.scrollTo({ x, animated: true });
//     });
//   }, [activeIndex, containerWidth, didLayout]);

//   const handleTabPress = (label: string, index: number) => {
//     if (label !== activeTab) onTabChange(label); // update parent first
//     const x = index * containerWidth;
//     programmaticScrollRef.current = true;
//     requestAnimationFrame(() => {
//       scrollRef.current?.scrollTo({ x, animated: true });
//     });
//   };

//   // Only update active tab when user finishes swiping (avoids fighting)
//   const handleMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
//     const index = Math.round(e.nativeEvent.contentOffset.x / containerWidth);
//     if (programmaticScrollRef.current) {
//       // This was triggered by our own scrollTo; don't echo back
//       programmaticScrollRef.current = false;
//       return;
//     }
//     const newLabel = tabs[index]?.label;
//     if (newLabel && newLabel !== activeTab) onTabChange(newLabel);
//   };

//   return (
//     <View style={{ flex: 1 }} onLayout={onContainerLayout}>
//       {/* Tab Bar */}
//       <ImageBackground source={Images.tabsBgImage} style={styles.tabBgImage}>
//         <View style={styles.tabBar}>
//           {tabs.map((tab, index) => {
//             const isActive = activeTab === tab.label;
//             return (
//               <TouchableOpacity
//                 key={tab.label}
//                 activeOpacity={0.6}
//                 onPress={() => handleTabPress(tab.label, index)}
//                 style={[styles.tabButton, isActive && styles.activeTab]}
//               >
//                 <View style={styles.iconWrapper}>
//                   {isActive ? tab.activeIcon : tab.inactiveIcon}
//                 </View>
//                 <Text
//                   style={[
//                     styles.label,
//                     {
//                       fontFamily: isActive
//                         ? typography.fonts.poppins.semiBold
//                         : typography.fonts.poppins.normal,
//                       color: isActive ? colors.primary : colors.white,
//                     },
//                   ]}
//                 >
//                   {tab.label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </ImageBackground>

//       {/* Pages */}
//       <ScrollView
//         ref={scrollRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         scrollEventThrottle={16}
//         onMomentumScrollEnd={handleMomentumEnd}
//         // Improve snap consistency on Android
//         disableIntervalMomentum
//         decelerationRate="fast"
//         snapToInterval={containerWidth}
//         snapToAlignment="start"
//         contentOffset={{ x: activeIndex * containerWidth, y: 0 }} // correct initial position
//       >
//         {tabs.map((tab) => (
//           <View
//             key={tab.label}
//             style={[styles.page, { width: containerWidth }]}
//           >
//             {tab.content ?? (
//               <Text weight="semiBold" style={styles.contentText}>
//                 {tab.label} Content
//               </Text>
//             )}
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: "center",
//     height: "100%",
//     justifyContent: "center",
//     borderBottomWidth: adjustSize(2),
//     borderColor: "transparent",
//   },
//   activeTab: {
//     borderColor: colors.primary,
//   },
//   iconWrapper: { marginBottom: adjustSize(3) },
//   label: { fontSize: adjustSize(12) },
//   contentText: {
//     fontSize: adjustSize(16),
//     color: colors.primary,
//     marginTop: adjustSize(20),
//   },
//   tabBgImage: { height: adjustSize(62) },
//   page: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: adjustSize(16),
//   },
// });

// import React from "react";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   ImageBackground,
// } from "react-native";
// import { Text } from "./Text";
// import { colors, adjustSize, typography } from "../theme";
// import { Images } from "../assets/Images";

// interface TabItem {
//   label: string;
//   activeIcon: React.ReactNode;
//   inactiveIcon: React.ReactNode;
//   content?: React.ReactNode;
// }

// interface CustomTabsProps {
//   tabs: TabItem[];
//   activeTab: string; // must be a label now
//   onTabChange: (label: string) => void;
// }

// export function CustomTabs({ tabs, activeTab, onTabChange }: CustomTabsProps) {
//   const activeIndex = tabs.findIndex((t) => t.label === activeTab);

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Tab Bar */}
//       <ImageBackground source={Images.tabsBgImage} style={styles.tabBgImage}>
//         <View style={styles.tabBar}>
//           {tabs.map((tab) => {
//             const isActive = activeTab === tab.label;
//             return (
//               <TouchableOpacity
//                 key={tab.label}
//                 activeOpacity={0.6}
//                 onPress={() => onTabChange(tab.label)}
//                 style={[styles.tabButton, isActive && styles.activeTab]}
//               >
//                 <View style={styles.iconWrapper}>
//                   {isActive ? tab.activeIcon : tab.inactiveIcon}
//                 </View>
//                 <Text
//                   style={[
//                     styles.label,
//                     {
//                       fontFamily: isActive
//                         ? typography.fonts.poppins.semiBold
//                         : typography.fonts.poppins.normal,
//                       color: isActive ? colors.primary : colors.white,
//                     },
//                   ]}
//                 >
//                   {tab.label}
//                 </Text>
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </ImageBackground>

//       {/* Active Page Only */}
//       <View style={styles.page}>
//         {tabs[activeIndex]?.content ?? (
//           <Text weight="semiBold" style={styles.contentText}>
//             {tabs[activeIndex]?.label} Content
//           </Text>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   tabButton: {
//     flex: 1,
//     alignItems: "center",
//     height: "100%",
//     justifyContent: "center",
//     borderBottomWidth: adjustSize(2),
//     borderColor: "transparent",
//   },
//   activeTab: {
//     borderColor: colors.primary,
//   },
//   iconWrapper: { marginBottom: adjustSize(3) },
//   label: { fontSize: adjustSize(12) },
//   contentText: {
//     fontSize: adjustSize(16),
//     color: colors.primary,
//     marginTop: adjustSize(20),
//   },
//   tabBgImage: { height: adjustSize(62) },
//   page: {
//     justifyContent: "center",
//     alignItems: "center",
//     padding: adjustSize(16),
//     flex: 1,
//   },
// });

import React, { ReactNode } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Text } from "./Text";
import { colors, adjustSize, typography } from "../theme";
import { Images } from "../assets/Images";

interface TabItem {
  label: string;
  activeIcon: ReactNode;
  inactiveIcon: ReactNode;
}

interface CustomTabsProps {
  tabs: TabItem[];
  activeTab: string; // label
  onTabChange: (label: string) => void;
  children: ReactNode[]; // tab contents as children
}

export function CustomTabs({
  tabs,
  activeTab,
  onTabChange,
  children,
}: CustomTabsProps) {
  const activeIndex = tabs.findIndex((t) => t.label === activeTab);

  return (
    <View style={{ flex: 1 }}>
      {/* Tab Bar */}
      <ImageBackground source={Images.tabsBgImage} style={styles.tabBgImage}>
        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label;
            return (
              <TouchableOpacity
                key={tab.label}
                activeOpacity={0.6}
                onPress={() => onTabChange(tab.label)}
                style={[styles.tabButton, isActive && styles.activeTab]}
              >
                <View style={styles.iconWrapper}>
                  {isActive ? tab.activeIcon : tab.inactiveIcon}
                </View>
                <Text
                  style={[
                    styles.label,
                    {
                      fontFamily: isActive
                        ? typography.fonts.poppins.semiBold
                        : typography.fonts.poppins.normal,
                      color: isActive ? colors.primary : colors.white,
                    },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ImageBackground>

      {/* Render children by active index */}
      <View style={styles.page}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    borderBottomWidth: adjustSize(2),
    borderColor: "transparent",
  },
  activeTab: {
    borderColor: colors.primary,
  },
  iconWrapper: { marginBottom: adjustSize(3) },
  label: { fontSize: adjustSize(12) },
  tabBgImage: { height: adjustSize(62) },
  page: {
    // justifyContent: "center",
    // alignItems: "center",
    // padding: adjustSize(16),
    flex: 1,
  },
});
