import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "./Text";
import { adjustSize, colors } from "../theme";
const BookingsChart = (props) => {
  return (
    <View style={styles._chart}>
      <LineChart
        data={{
          labels: props.lables ? props.labels : [],
          datasets: [
            {
              data: props.data ? props.data : [],
              color: (opacity = 1) => colors.primary,
              strokeWidth: 3,
            },
          ],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        withShadow={true}
        withDots={true}
        withInnerLines={false}
        withOuterLines={true}
        withHorizontalLabels={true}
        yLabelsOffset={40}
        withVerticalLabels={true}
        renderDotContent={({ x, y, index }) => {
          const data = props.data ? props.data : [];
          return (
            <View
              key={index}
              style={[
                styles.dataLabel,
                {
                  left: x - 10,
                  top: y - 35, // Position above the dot
                },
              ]}
            >
              <Text style={styles.dataLabelText}>{data[index]}</Text>
            </View>
          );
        }}
        chartConfig={{
          propsForBackgroundLines: {
            strokeDasharray: "", // Solid line
            stroke: colors.primary,
            strokeWidth: 1,
          },
          useShadowColorFromDataset: false,
          backgroundColor: "transparent",
          backgroundGradientTo: colors.white,
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          fillShadowGradientFrom: colors.white,
          fillShadowGradientTo: colors.white,
          backgroundGradientFrom: colors.white,
          fillShadowGradientFromOpacity: 0.4,
          fillShadowGradientToOpacity: 0.1,
          decimalPlaces: 0,
          color: (opacity = 1) => colors.primary,
          labelColor: (opacity = 1) => colors.textDim,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "5",
            strokeWidth: "2",
            stroke: colors.primary,
            fill: colors.primary,
          },
          propsForLabels: {
            fontSize: adjustSize(10),
            color: colors.grey,
          },
        }}
        // bezier
        style={styles.chart}
      />
    </View>
  );
};

export default BookingsChart;

const styles = StyleSheet.create({
  _chart: {
    margin: adjustSize(10),
    borderRadius: adjustSize(12),
    padding: adjustSize(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: adjustSize(16),
    color: colors.text,
    marginBottom: adjustSize(16),
  },
  chart: {
    alignSelf: "center",
    borderRadius: 16,
  },
  dataLabel: {
    position: "absolute",
    backgroundColor: colors.primary,
    borderRadius: adjustSize(4),
    paddingHorizontal: adjustSize(4),
    alignItems: "center",
    justifyContent: "center",
  },
  dataLabelText: {
    color: colors.white,
    fontSize: adjustSize(10),
  },
});