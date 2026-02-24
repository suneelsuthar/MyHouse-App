import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "./Text";
import { colors } from "../theme";
import { ITopRated } from "../utils/data";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../assets/Images";

interface Props {
  data: ITopRated;
}

export default function StockCard({ data }: Props) {
  const [fave, setfave] = useState(data.liked);
  return (
    <View style={styles._card}>
      <Image source={data.image} style={styles._image} />
      <View style={styles._iconview}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setfave(!fave)}
          style={styles._iconbtn}
        >
          {fave ? (
            <MaterialIcons name="favorite" size={18} color={colors.primary} />
          ) : (
            <MaterialIcons
              name="favorite-border"
              size={18}
              color={colors.primary}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} style={styles._iconbtn}>
          <WithLocalSvg asset={Images.wifi} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} style={styles._iconbtn}>
          <WithLocalSvg asset={Images.car} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles._iconbtn}>
          <WithLocalSvg asset={Images.location} />
        </TouchableOpacity>
      </View>
      <View style={styles._info}>
        <Text weight="semiBold" text={data.title} style={styles._title} />
        <Text
          weight="semiBold"
          text={`(${data.subtitle})`}
          style={styles._subtitle}
        />

        <View style={styles._row}>
          <Text
            style={{ color: colors.primary, fontSize: 14 }}
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
    borderWidth: 1.2,
    borderColor: colors.border,
    width: 209,
  },

  _name: {
    fontSize: 18,
  },
  _image: {
    height: 211,
    width: 209,
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
  price: {
    color: colors.primary,
    fontSize: 18,
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
  },
  _title: {
    color: colors.primary,
    fontSize: 16,
  },
  _subtitle: {
    color: colors.grey,
    fontSize: 14,
  },
});
