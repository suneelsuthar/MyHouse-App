import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text } from "./Text";
import { colors, spacing } from "../theme";
import { ISpecialOffer } from "../utils/data";
import AntDesign from "@expo/vector-icons/AntDesign";
import { WithLocalSvg } from "react-native-svg/css";
import { LinearGradient } from "expo-linear-gradient";
import { Images } from "../assets/Images";

interface Props {
  data: ISpecialOffer;
}

export default function OfferCard({ data }: Props) {
  const navigation: any = useNavigation();
  const [fave, setfave] = useState(data.liked);
  return (
    <View
      //   onPress={() => navigation.navigate("UserProfile")}
      style={styles._card}
    >
      <View>
        <Image source={data.image} style={styles._image} />
        <TouchableOpacity
          style={styles._favbutton}
          activeOpacity={0.6}
          onPress={() => setfave(!fave)}
        >
          {fave ? (
            <MaterialIcons name="favorite" size={24} color={colors.primary} />
          ) : (
            <MaterialIcons
              name="favorite-border"
              size={24}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles._info}>
        <Text
          weight="medium"
          text={data.description}
          style={styles._title}
          numberOfLines={2}
        />
        <Text
          weight="semiBold"
          text={`(${data.subtitle})`}
          style={styles._subtitle}
        />

        <View style={styles._row}>
          <Text
            style={{ color: colors.primary, fontSize: 12 }}
            weight="medium"
            text={
              data.noOfBeds.toString() +
              " Beds , " +
              data.noOfguests.toString() +
              " Guests"
            }
          />
          <Text
            weight="semiBold"
            text={"$" + data.price.toString()}
            style={styles.price}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  _card: {
    borderRadius: 8,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  _user_image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  _name: {
    fontSize: 18,
  },
  _image: {
    height: 81,
    width: 119,
    resizeMode: "cover",
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    overflow: "hidden",
    borderRadius: 10,
  },
  companyName: {
    color: colors.grey,
    fontSize: 16,
  },
  _details: {
    color: "#333333",
    fontSize: 14,
  },
  _tags_row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  _tag: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 100,
    marginBottom: 10,
  },
  _tag_title: {
    color: colors.white,
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  _iconview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
    marginTop: -20,
  },
  _circle: {
    backgroundColor: "#F6F6F6",
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  _statusbtn: {
    height: 29,
    width: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  _statustext: {
    color: colors.white,
  },
  _label: {
    fontSize: 14,
    color: "#9E9E9E",
  },
  price: {
    color: colors.primary,
    fontSize: 15,
  },

  _iconbtn: {
    height: 27,
    width: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.fill,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 100,
  },
  _info: {
    paddingHorizontal: 12,
    paddingTop: 10,
    flex: 1,
  },
  _title: {
    color: colors.primary,
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
    // fontSize: 16,
  },
  _subtitle: {
    color: colors.grey,
    fontSize: 14,
    // marginBottom: 10,
  },
  _favbutton: {
    position: "absolute",
    right: 5,
    top: 5,
  },
});
