import React from "react";
import { View } from "react-native";
import { Screen, Header2, Text } from "../../../Components";

export function AdminAmenityView() {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header2 title="Amenity - View" onNotificationPress={() => {}} />
      <View style={{ padding: 16 }}>
        <Text>View Amenity details screen</Text>
      </View>
    </Screen>
  );
}
