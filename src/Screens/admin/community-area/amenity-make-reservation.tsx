import React from "react";
import { View } from "react-native";
import { Screen, Header2, Text } from "../../../Components";

export function AdminAmenityMakeReservation() {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header2 title="Amenity - Make Reservation" onNotificationPress={() => {}} />
      <View style={{ padding: 16 }}>
        <Text>Make a reservation for this amenity</Text>
      </View>
    </Screen>
  );
}
