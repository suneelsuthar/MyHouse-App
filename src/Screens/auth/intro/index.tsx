import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Swiper from "react-native-swiper";
import { Text, Button } from "../../../Components"; // Assuming you have your own Text & Button components
import { colors } from "../../../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Images } from "../../../assets/Images";
import AntDesign from "@expo/vector-icons/AntDesign";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../utils/interfaces";
const { width, height } = Dimensions.get("window");

export function Intro({ navigation }: NativeStackScreenProps<AuthStackParamList, "Intro">) {
  const slides = [
    {
      id: 1,
      image: Images.slide1,
      title: "Welcome to ",
      subtitle: "My Homes",

      description:
        "Explore a World of Tailored Properties – Designed to Fit Your Lifestyle with ",
      subdesc: "MyHomes",
    },
    {
      id: 2,
      image: Images.slide2,
      title: "Discover ",
      subtitle: "Properties",
      description:
        "From Cozy Apartments to Spacious Villas – Your Perfect Match Awaits",
      subdesc: "",
    },
    {
      id: 3,
      image: Images.slide3,
      title: "Start your ",
      subtitle: "Search",
      description:
        "No Matter the Property, We’ve Got You Covered – Start Your Search with ",
      subdesc: "My Homes",
    },
  ];

  const onFinish = async () => {
    await AsyncStorage.setItem("hasLaunched", "true");
    navigation.replace("GettingStart");
  };

  return (
    <Swiper
      onIndexChanged={(index) => {
        console.log(index);
        if (index === slides.length) {
          // index starts from 0, so slides.length means swipe past last slide
          navigation.replace("Login");
        }
      }}
      loop={false}
      showsPagination={true}
      activeDotColor={colors.primary}
      activeDotStyle={{
        backgroundColor: "#F0F1F3",
        width: 38,
        height: 3,
        borderRadius: 100,
        marginBottom: 30,
      }}
      dotStyle={{
        width: 6,
        borderRadius: 100,
        height: 3,
        backgroundColor: "#B0B0B0",
        marginBottom: 30,
      }}
    >
      {slides.map((slide, index) => (
        <View style={styles.slide} key={slide.id}>
          <Image source={slide.image} style={styles.image} resizeMode="cover" />
          <View style={styles.bottomContainer}>
            <Text style={styles.title} weight="semiBold">
              {slide.title}
              <Text style={styles.subtitle} weight="semiBold">
                {slide.subtitle}
              </Text>
            </Text>
            <Text style={styles.description}>
              {slide.description}
              <Text
                text={slide.subdesc}
                style={styles.subdesc}
                weight="semiBold"
              />
            </Text>
            <TouchableOpacity
              onPress={() => onFinish()}
              style={styles._nextbtn}
            >
              <AntDesign name="rightcircleo" size={24} color={"#B8B8B8"} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </Swiper>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    width: width,
    height: height * 0.6,
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: colors.primary,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
    height: 260,
  },
  title: {
    fontSize: 24,
    color: colors.white,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 22,
    color: "#B0B0B0",
    textAlign: "center",
    paddingLeft: 10,
  },
  description: {
    fontSize: 15,
    color: "#B8B8B8",
    textAlign: "center",
  },
  subdesc: {
    color: colors.white,
    textAlign: "center",
    marginTop: 10,
    fontSize: 15,
  },
  _nextbtn: {
    position: "absolute",
    right: 20,
    bottom: 45,
  },
});
