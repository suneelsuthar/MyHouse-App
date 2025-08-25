import React from "react";
import { View } from "react-native";
import { Screen, Header2, Text } from "../../../Components";

export function AdminAmenityEdit() {
  return (
    <Screen preset="fixed" safeAreaEdges={["top"]}>
      <Header2 title="Amenity - Edit" onNotificationPress={() => {}} />
      <View style={{ padding: 16 }}>
        <Text>Edit Amenity screen</Text>
      </View>
    </Screen>
  );
}
