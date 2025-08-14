import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Screen, Text, TextField } from "../../Components";
import { AppStackScreenProps } from "../../utils/interfaces";
import { colors, spacing } from "../../theme";
import { Images } from "../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ForYouCard from "../../Components/ForYouCard";
import {
  forYouList,
  topratedList,
  sepecialOfferList,
  trendingList,
} from "../../utils/data";
import TopRatedCard from "../../Components/TopRatedCard";
import SpecialOfferCard from "../../Components/OfferCard";
import TrendingCard from "../../Components/TrendingPropCard";
interface HomeScreenProps extends AppStackScreenProps<"Home"> {}

export function Home(props: HomeScreenProps) {
  return (
    <Screen
      preset="auto"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <View style={styles._bg}>
        {/* HEADER */}
        <View style={styles._header}>
          <View style={{ flex: 1 }}>
            <TextField
              inputWrapperStyle={{
                borderWidth: 0.5,
                borderColor: "#F0F1F3",
              }}
              placeholder="Search"
              placeholderTextColor={colors.primaryLight}
              style={styles._searcinput}
              RightAccessory={() => (
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.grey}
                />
              )}
            />
          </View>

          <TouchableOpacity activeOpacity={0.6} style={styles._filterbtn}>
            <WithLocalSvg asset={Images.filtericon} />
          </TouchableOpacity>
        </View>
        {/* BEST FOR YOU */}
        <View style={[styles._row, { marginTop: 10 }]}>
          <Text weight="semiBold" style={styles._subtitle}>
            Best for you
          </Text>
          <Text style={styles.viewall}>View All</Text>
        </View>
        <FlatList
          data={forYouList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            marginHorizontal: 15,
          }}
          renderItem={({ item }) => <ForYouCard data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* TOP RATED    */}
        <View style={styles._row}>
          <Text weight="semiBold" style={styles._subtitle}>
            Top Rated
          </Text>
          <Text style={styles.viewall}>View All</Text>
        </View>
        <FlatList
          data={topratedList}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{ gap: 10, marginHorizontal: 15 }}
          renderItem={({ item }) => <TopRatedCard data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />

        {/*  Top Rated    */}
        <View style={styles._row}>
          <Text weight="semiBold" style={styles._subtitle}>
            Special Offers
          </Text>
          <Text style={styles.viewall}>View All</Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={sepecialOfferList}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, marginHorizontal: 15 }}
          renderItem={({ item }) => <SpecialOfferCard data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* BEST FOR YOU */}
        <View style={styles._row}>
          <Text weight="semiBold" style={styles._subtitle}>
            Trending properties
          </Text>
          <Text style={styles.viewall}>View All</Text>
        </View>
        <FlatList
          data={trendingList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            gap: 10,
            marginHorizontal: 15,
          }}
          renderItem={({ item }) => <TrendingCard data={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    backgroundColor: colors.fill,
  },
  _bg: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  _header: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.md,
    justifyContent: "space-between",
    marginTop: 5,
    gap: 10,
  },
  _searcinput: {},
  _filterbtn: {
    width: 55,
    height: 55,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: spacing.md,
    marginBottom: 10,
    marginTop: 5,
  },
  viewall: {
    color: colors.greylight,
    fontSize: 12,
    lineHeight: 12,
    textAlign: "center",
  },
  _subtitle: {
    color: colors.primary,
    fontSize: 14,
    textAlign: "center",
  },
});
