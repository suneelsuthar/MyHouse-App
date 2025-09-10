import React from "react";
import { StyleSheet, View, TouchableOpacity, FlatList } from "react-native";
import { Screen, Text, Header2, Header } from "../../../../Components";
import { colors, typography, adjustSize } from "../../../../theme";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { WithLocalSvg } from "react-native-svg/css";
import { Images } from "../../../../assets/Images";
export const AdminSimDataManagement: React.FC = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: 0,
      name: "AirTel",
      icon: Images.airtel,
      totalgb: 200,
      used: 150,
    },
    {
      id: 1,
      name: "Glo",
      icon: Images.glo,
      totalgb: 200,
      used: 50,
    },
    {
      id: 2,
      name: "Mobile",
      icon: Images.mobile,
      totalgb: 200,
      used: 70,
    },
    {
      id: 3,
      name: "MTN",
      icon: Images.mtn,
      totalgb: 200,
      used: 90,
    },
  ];
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={styles.container}
    >
      <Header
        leftAccessory={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>
              (navigation as any)
                .getParent?.("AdminDrawer")
                ?.dispatch(DrawerActions.openDrawer())
            }
          >
            <WithLocalSvg asset={Images.user} />
          </TouchableOpacity>
        }
        centerAccessory={
          <Text
            weight="semiBold"
            style={{ fontSize: adjustSize(15), color: colors.primary }}
          >
            Sim Data Management
          </Text>
        }
        rightAccessory={
          <TouchableOpacity activeOpacity={0.5}>
            <WithLocalSvg asset={Images.notofication} />
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles._card}>
              <WithLocalSvg asset={item.icon} />
              <Text text={item.name} weight="semiBold" style={styles._name} />
              <View style={styles._progressbar}>
                <View
                  style={[
                    styles._filled,
                    { width: (item.used / item.totalgb) * 100 + "%" } as any,
                  ]}
                />
              </View>
              <Text
                text={`${item.used}GB / ${item.totalgb}GB`}
                style={styles._used}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
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
  content: {
    flex: 1,
    paddingHorizontal: adjustSize(20),
    paddingVertical: adjustSize(20),
  },
  pageTitle: {
    fontSize: adjustSize(24),
    color: colors.primary,
    fontFamily: typography.fonts.poppins.semiBold,
    marginBottom: adjustSize(16),
    textAlign: "center",
  },
  description: {
    fontSize: adjustSize(16),
    color: colors.grey,
    fontFamily: typography.fonts.poppins.normal,
    textAlign: "center",
    lineHeight: adjustSize(24),
  },
  _card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: adjustSize(10),
    borderRadius: adjustSize(10),
    margin: adjustSize(10),
    borderWidth: 1,
    borderColor: colors.grey,
    height: adjustSize(176),
  },
  _name: {
    fontSize: adjustSize(20),
    lineHeight: adjustSize(24),
    color: "#6369A4",
    fontFamily: typography.fonts.poppins.semiBold,
    marginTop: adjustSize(10),
  },
  _progressbar: {
    height: adjustSize(5),
    borderRadius: 100,
    width: "100%",
    backgroundColor: "#B0B0B0",
    marginVertical: adjustSize(10),
  },
  _filled: {
    backgroundColor: colors.primary,
    height: "100%",
    borderRadius: 100,
  },
  _used: {
    fontSize: adjustSize(12),
  },
});
