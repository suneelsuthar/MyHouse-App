import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextStyle,
  Switch,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { Screen, Text, Header2, TextField } from "../../../../Components";
import { colors, typography, adjustSize } from "../../../../theme";
import DropdownComponent from "../../../../Components/DropDown";

// ... [Previous CounterRow and ToggleRow components remain the same] ...

const styles = StyleSheet.create({
  // ... [Previous styles remain the same] ...
  _info: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 18,
    width: 18,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: -10,
    zIndex: 1,
  },
  // ... [Other styles remain the same] ...
});

const GracePeriodBasisTooltip = ({ isVisible, onClose }) => (
  <Tooltip
    isVisible={isVisible}
    content={
      <Text style={{ color: colors.white, fontSize: 10 }}>
        Select the basis for calculating the grace period
      </Text>
    }
    placement="top"
    onClose={onClose}
    contentStyle={{
      backgroundColor: colors.black,
      padding: 10,
    }}
    arrowStyle={{
      borderTopColor: colors.black,
    }}
  >
    <TouchableOpacity 
      style={styles._info}
      onPress={() => onClose()}
    >
      <Text
        weight="semiBold"
        style={{
          color: colors.white,
          fontSize: 10,
          lineHeight: 12,
        }}
      >
        ?
      </Text>
    </TouchableOpacity>
  </Tooltip>
);

const DayOfMonthTooltip = ({ isVisible, onClose, isCalendarDay }) => (
  <Tooltip
    isVisible={isVisible}
    content={
      <Text style={{ color: colors.white, fontSize: 10 }}>
        {isCalendarDay 
          ? "Enter the day of the month (1-31)" 
          : "Enter the number of days for the grace period"}
      </Text>
    }
    placement="top"
    onClose={onClose}
    contentStyle={{
      backgroundColor: colors.black,
      padding: 10,
    }}
    arrowStyle={{
      borderTopColor: colors.black,
    }}
  >
    <TouchableOpacity 
      style={styles._info}
      onPress={() => onClose()}
    >
      <Text
        weight="semiBold"
        style={{
          color: colors.white,
          fontSize: 10,
          lineHeight: 12,
        }}
      >
        ?
      </Text>
    </TouchableOpacity>
  </Tooltip>
);

// In your AdminUtilitiesSettings component, replace the tooltips with these components:
// For Grace Period Basis:
{/* <GracePeriodBasisTooltip 
  isVisible={gracePeriodTooltip} 
  onClose={() => setGracePeriodTooltip(!gracePeriodTooltip)} 
/> */}

// For Day of the Month:
{/* <DayOfMonthTooltip 
  isVisible={dayOfMonthTooltip} 
  onClose={() => setDayOfMonthTooltip(!dayOfMonthTooltip)}
  isCalendarDay={grandPeriodBasis === "Calendar Day"}
/> */}
