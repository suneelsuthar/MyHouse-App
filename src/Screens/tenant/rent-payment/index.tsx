import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Screen, Text, Button, Header2 } from "../../../Components";
import { TenantStackParamList } from "../../../utils/interfaces";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { adjustSize, colors, spacing } from "../../../theme";
import { Images } from "../../../assets/Images";
import { WithLocalSvg } from "react-native-svg/css";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store";
export type RentPaymentProps = NativeStackScreenProps<
  TenantStackParamList,
  "RentPayment"
>;

export function RentPayment(props: RentPaymentProps) {
  const { user } = useAppSelector((state: RootState) => state.auth);

  let homesPaymentsdata = [];
  const homesPayments = [
    {
      id: 0,
      title: "Payment of Charges",
      icon: Images.charges,
      onPress: () => props.navigation.navigate("UtilitiesCharges"),
    },

    {
      id: 1,
      title: "Utility Payments",
      icon: Images.utility,
      onPress: () => props.navigation.navigate("UtilitiesMyMeter"),
    },
  ];

  const facility_homes = [
    {
      id: 0,
      title: "Upgrade Subscription Plan",
      icon: Images.upgrade,
      onPress: () => props.navigation.navigate("Subscription" as any),
    },
  ];
  if (user?.role === "facility_manager") {
    homesPaymentsdata = facility_homes;
  } else {
    homesPaymentsdata = homesPayments;
  }

  // user?.role === "facility_manager" ? homesPaymentsdata =facility_homes

  const quickPayment = [
    {
      id: 0,
      title: "Airtime",
      icon: Images.airtime,
      onPress: () => null,
    },
    {
      id: 1,
      title: "Data",
      icon: Images.data,
      onPress: () => null,
    },
    {
      id: 2,
      title: "Public Electricity",
      icon: Images.electricity,
      onPress: () => null,
    },
    {
      id: 3,
      title: "TV",
      icon: Images.tv,
      onPress: () => null,
    },
  ];

  const renderItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles._card}
        activeOpacity={0.6}
        onPress={() => item.onPress()}
      >
        <View style={styles._cardContent}>
          <WithLocalSvg asset={item.icon} />
        </View>
        <Text weight="medium" text={item.title} style={styles._title} />
      </TouchableOpacity>
    );
  };
  return (
    <Screen
      preset="fixed"
      contentContainerStyle={styles.screenContentContainer}
      statusBarStyle="dark"
      safeAreaEdges={["top"]}
    >
      <Header2 title="Payments" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles._content}
      >
        <View style={styles.container}>
          <Text
            weight="semiBold"
            text="My HomesNG Payments"
            style={styles._label}
          />
          <FlatList
            data={homesPaymentsdata}
            horizontal
            contentContainerStyle={{ gap: adjustSize(15) }}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <Text
            weight="semiBold"
            text="Quick payments"
            style={[styles._label, { marginTop: 50 }]}
          />
          <FlatList
            data={quickPayment}
            horizontal
            contentContainerStyle={{ gap: adjustSize(15) }}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />

          <Button
            text="Send Money"
            style={styles.backButton}
            textStyle={styles.backButtonText}
            onPress={() => props.navigation.navigate("SendMoney")}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContentContainer: {
    flex: 1,
    backgroundColor: colors.fill,
  },
  container: {
    padding: adjustSize(10),
  },
  _content: {
    flexGrow: 1,
  },
  _label: {
    marginVertical: adjustSize(20),
    fontSize: adjustSize(15),
    color: colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: colors.text,
    textAlign: "center",
    lineHeight: 24,
  },
  backButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    marginTop: spacing.xl,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
  },

  _cardContent: {
    backgroundColor: "#6369A4",
    height: adjustSize(68),
    width: adjustSize(68),
    borderRadius: adjustSize(10),
    alignItems: "center",
    justifyContent: "center",
    padding: adjustSize(5),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  _card: {
    width: adjustSize(68),
  },
  _title: {
    fontSize: adjustSize(12),
    textAlign: "center",
    lineHeight: adjustSize(16),
    marginTop: adjustSize(10),
    color: colors.primary,
  },
});
