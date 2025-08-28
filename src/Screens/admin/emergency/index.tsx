import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Screen, Text, Button, Header2 } from "../../../Components";
import { colors, typography, adjustSize } from "../../../theme";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
export const AdminEmergency: React.FC = () => {
  const navigation = useNavigation();
  const list = [
    {
      name: "Ambulance",
      num: "# 112",
    },
    {
      name: "Fire Brigade",
      num: "# 767",
    },
    {
      name: "Police",
      num: "# 119",
    },
  ];

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header2 title="Emergency" onNotificationPress={() => {}} />
      <View style={styles.containeInner}>
        <View>
          <Text style={styles.text}>
            Contact these Help Lines In case of any Emergency
          </Text>
          {list.map((val, index) => {
            return (
              <View key={index} style={styles.list}>
                <View>
                  <Text style={styles.name}>{val.name}</Text>
                  <Text style={styles.num}>{val.num}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <WithLocalSvg asset={Images.call2Icon} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Button
          text={"Panic"}
          preset="reversed"
          style={styles.btn}
          textStyle={styles.btnTxt}
          onPress={() => (navigation as any).navigate("AdminPanicEmergency")}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fill,
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
    paddingVertical: adjustSize(15),
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
  btn: {
    height: adjustSize(49),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: adjustSize(30),
    backgroundColor: "#D51E1E",
  },
  btnTxt: {
    fontSize: adjustSize(15),
    fontFamily: typography.fonts.poppins.semiBold,
  },
});
