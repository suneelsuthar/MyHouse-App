import React from "react";
import { View } from "react-native";
import { Screen, Header2, Text } from "../../../Components";

export function AdminReservationView() {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header2 title="Reservation - View" onNotificationPress={() => {}} />
      <View style={{ padding: 16 }}>
        <Text>View Reservation details screen</Text>
      </View>
    </Screen>
  );
}
