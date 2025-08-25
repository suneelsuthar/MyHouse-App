import React from "react";
import { View } from "react-native";
import { Screen, Header2, Text } from "../../../Components";

export function AdminAmenityManageCalendar() {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header2 title="Amenity - Manage Calendar" onNotificationPress={() => {}} />
      <View style={{ padding: 16 }}>
        <Text>Manage calendar for this amenity</Text>
      </View>
    </Screen>
  );
}
