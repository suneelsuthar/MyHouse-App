import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Screen, Text, Button, Header2 } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";
export const Emergency: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  const navigation = useNavigation();
  const list = [
    {
      name: "Police",
      num: "# 119",
      image: Images.police,
      desc: "For police emergencies. Contact this number in case of any crime or law enforcement issues.",
    },
    {
      name: "Fire Brigade",
      num: "# 767",
      image: Images.fire,
      desc: "For fire emergencies. In case of fire, call this number immediately to get assistance from the fire department.",
    },
    {
      name: "Ambulance",
      num: "# 112",
      image: Images.ambulance,
      desc: "For medical emergencies. Use this number to call for an ambulance and get immediate medical help.",
    },
  ];

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Emergency" onNotificationPress={() => {}} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.containeInner}>
          <View>
            {user?.role !== "admin" && (
              <Text style={styles.text}>
                Contact these Help Lines In case of any Emergency
              </Text>
            )}
            {list.map((val, index) => {
              return (
                <View key={index} style={styles.list}>
                  <View style={styles.leftCol}>
                    <View style={styles.iconBox}>
                      <Image source={val.image} style={styles.icon} />
                    </View>
                    <View style={styles.leftInfo}>
                      <Text style={styles.name}>{val.name}</Text>
                      <Text style={styles.num}>{val.num}</Text>
                    </View>
                  </View>
                  <View style={styles.contentBox}>
                    <Text style={styles.desc}>{val.desc}</Text>
                    <Button
                      text={"Call us Now"}
                      preset="reversed"
                      style={styles.callBtn}
                      textStyle={styles.callBtnText}
                      onPress={() =>
                        (navigation as any).navigate("PanicEmergency")
                      }
                    />
                  </View>
                </View>
              );
            })}
          </View>
          {/* {user?.role !== "admin" && ( */}
          <Button
            text={"Panic"}
            preset="reversed"
            style={styles.btn}
            textStyle={styles.btnTxt}
            onPress={() => (navigation as any).navigate("PanicEmergency")}
          />
          {/* )} */}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containeInner: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: adjustSize(10),
  },
  text: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
    marginTop: adjustSize(20),
    marginBottom: adjustSize(10),
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: adjustSize(10),
    backgroundColor: colors.white,
    borderRadius: adjustSize(10),
    marginBottom: adjustSize(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    marginTop: 20,
  },
  iconBox: {
    // width: adjustSize(96),
    // height: adjustSize(96),
    // backgroundColor: "#f1f5f9",
    borderRadius: adjustSize(10),
    marginHorizontal: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    // width: "90%",
    // height: "90%",
    resizeMode: "contain",
  },
  contentBox: {
    flex: 1.5,
    paddingRight: adjustSize(10),
  },
  desc: {
    color: colors.black,
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.normal,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: adjustSize(10),
  },
  name: {
    color: colors.primary,
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  num: {
    color: colors.primary,
    fontSize: adjustSize(14),
    fontFamily: typography.fonts.poppins.normal,
  },
  callBtn: {
    minHeight: adjustSize(41),
    borderRadius: 10,
    paddingHorizontal: adjustSize(14),
    marginTop:20
  },
  callBtnText: {
    fontSize: adjustSize(12),
    fontFamily: typography.fonts.poppins.semiBold,
  },
  btn: {
    height: adjustSize(49),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: adjustSize(30),
    backgroundColor: "#D51E1E",
    borderRadius: adjustSize(10),
  },
  btnTxt: {
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.medium,
  },
  image: {
    height: "90%",
    width: "100%",
    alignSelf: "center",
    aspectRatio: 1 / 1,
  },
  leftCol:{
    flex:1
  },
  leftInfo:{
    justifyContent:"center",
    alignItems:"center"
  }
});
