import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Text } from "./Text";
import { colors } from "../theme";
import { IForYou } from "../utils/data";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
interface Props {
  data: IForYou;
}

export default function ForYouCard({ data }: Props) {
  const [fave, setfave] = useState(data.liked);
  return (
    <View style={styles._card}>
      <ImageBackground source={data.image} style={styles._image}>
        <View style={styles._row}>
          <View style={styles._iconview}>
            <Text text={data.title} weight="semiBold" style={styles._name} />
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={() => setfave(!fave)}>
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  _card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
    borderColor: colors.border,
    height: 134,
    width: 209,
    overflow: "hidden",
  },
  _image: {
    flex: 1,
    resizeMode: "cover",
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },

  _name: {
    fontSize: 13,
  },

  _row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  _iconview: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
