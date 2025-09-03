import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { adjustSize, colors } from "../../../theme";
import { Screen, Header2, Text } from "../../../Components";
import { DrawerActions } from "@react-navigation/native";
import DropdownComponent from "../../../Components/DropDown";
import { useNavigation } from "@react-navigation/native";

export const TenantAssignedProp = () => {
  const [selected, setselected] = useState("");
  console.log(selected);
  const navigation = useNavigation();
  return (
    <Screen contentContainerStyle={styles.container} safeAreaEdges={["top"]}>
      <Header2
        title="Assigned Properties"
        onPress={() =>
          (navigation as any)
            .getParent?.("TenantDrawer")
            ?.dispatch(DrawerActions.openDrawer())
        }
      />
      <View style={styles._content}>
        <Text
          text="Select Property"
          weight="semiBold"
          style={styles._heading}
        />
        <DropdownComponent
          placeholder="Select Property"
          data={[
            { label: "Property 1", value: "property1" },
            { label: "Property 2", value: "property2" },
            { label: "Property 3", value: "property3" },
          ]}
          label="Select Property"
          value={selected}
          onChangeValue={(v: string) => setselected(v)}
          dropdownStyle={styles.dropdown}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelected}
          rightIconColor={colors.primary}

          // onSelect={(value) => console.log(value)}
        />

        {selected && (
          <>
            <Text
              text="My Property"
              weight="semiBold"
              style={[styles._heading, { marginVertical: 10 }]}
            />

            <View style={styles._row}>
              <Text text="Property name:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>

            <View style={styles._row}>
              <Text text="Property Group:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>

            <View style={styles._row}>
              <Text text="Unit Size:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>

            <View style={styles._row}>
              <Text text="Number of Rooms:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>

            <View style={styles._row}>
              <Text text="Flour level:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>

            <View style={styles._row}>
              <Text text="Unit type:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>
            <View style={styles._divider} />
            <View style={styles._row}>
              <Text text="Electricity:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>
            <View style={styles._row}>
              <Text text="Water:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>
            <View style={styles._row}>
              <Text text="Gas:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>
            <View style={styles._row}>
              <Text text="Internet:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>
            <View style={styles._row}>
              <Text text="Maintenance Services:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>

            <View style={styles._divider} />
            <View style={styles._row}>
              <Text text="Category:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>
            <View style={styles._row}>
              <Text text="Price:" style={styles._lable} />
              <Text text="lorem ipsum" style={styles._lablevalue} />
            </View>
          </>
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  _content: {
    padding: adjustSize(10),
  },
  dropdown: {
    backgroundColor: colors.fill,
    borderRadius: adjustSize(8),
    borderColor: colors.grey,
    borderWidth: adjustSize(0.4),
    boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  dropdownPlaceholder: {
    color: colors.textDim,
    fontSize: adjustSize(14),
  },
  dropdownSelected: {
    color: colors.text,
    fontSize: adjustSize(14),
  },
  _heading: {
    fontSize: adjustSize(14),
    color: colors.primary,
    paddingVertical: adjustSize(5),
  },
  _row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: adjustSize(5),
  },
  _lable: {
    fontSize: adjustSize(13),
    color: colors.primary,
  },
  _lablevalue: {
    fontSize: adjustSize(12),
    color: colors.textDim,
  },
  _divider: {
    borderBottomWidth: 0.5,
    borderColor: colors.grey,
    marginVertical: adjustSize(10),
  },
});
