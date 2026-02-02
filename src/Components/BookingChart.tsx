import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "./Text";
import { adjustSize, colors } from "../theme";

type BookingsChartProps = {
  data?: number[];
  labels?: string[];
  lables?: string[];
  formatXLabel?: (label: string, index: number) => string;
  renderCustomBottomLabels?: boolean;
  customBottomLabels?: string[];
  bottomLabelStyle?: any;
};

const BookingsChart = (props: BookingsChartProps) => {
  const labels = props.labels ?? props.lables ?? [];
  const bottomLabels =
    props.customBottomLabels ?? (labels as string[]) ?? ([] as string[]);
  return (
    <View style={styles._chart}>
      <View style={styles.leftLine} />
      <View style={styles.bottomLine} />

      <LineChart
        data={{
          labels,
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
        withInnerLines={true}
        withOuterLines={false}
        withHorizontalLabels={true}
        withVerticalLines={false}
        yLabelsOffset={30}
        // xLabelsOffset={34}
        withVerticalLabels={false}
        formatXLabel={(label: string) => {
          if (!props.formatXLabel) return label;
          const idx = labels.indexOf(label);
          return props.formatXLabel(label, idx);
        }}
        // fromNumber={500}
        segments={4}
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
            stroke: colors.primaryLight,
            strokeWidth: 0.4,
          },
          useShadowColorFromDataset: false,
          backgroundColor: "transparent",
          backgroundGradientTo: colors.white,
          backgroundGradientFromOpacity: 0,
          backgroundGradientToOpacity: 0,
          fillShadowGradientFrom: colors.fill,
          fillShadowGradientTo: colors.white,
          backgroundGradientFrom: colors.white,
          fillShadowGradientFromOpacity: 0.4,
          fillShadowGradientToOpacity: 0.1,
          decimalPlaces: 0,

          color: (opacity = 1) => colors.primary,
          labelColor: (opacity = 1) => colors.primary,
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

      {props.renderCustomBottomLabels && bottomLabels.length > 0 ? (
        <View style={styles.bottomLabelsRow}>
          {bottomLabels.map((l, idx) => (
            <Text
              key={`${l}-${idx}`}
              style={[styles.bottomLabel, props.bottomLabelStyle,{
                transform:[{rotate:bottomLabels.length <=4 ? "0deg":"45deg"}]
              }]}
              numberOfLines={1}
            >
              {props.formatXLabel ? props.formatXLabel(l, idx) : l}
            </Text>
          ))}
        </View>
      ) : null}
    </View>
  );
};

export default BookingsChart;

const styles = StyleSheet.create({
  _chart: {
    margin: adjustSize(10),
    borderRadius: adjustSize(12),
    padding: adjustSize(16),
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
    // backgroundColor: colors.fill,
    position: "relative",
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
  _label: {
    color: colors.grey,
    fontSize: adjustSize(10),
    marginTop: -24,
  },
  leftLine: {
    position: "absolute",
    height: 240,
    width: 1,
    backgroundColor: "#B0B0B0",
    left: 60,
    bottom: 59,
  },
  bottomLine: {
    position: "absolute",
    width: "93%",
    backgroundColor: "#B0B0B0",
    // left: 60,
    bottom: 60,
    height: 1,
    zIndex: 1,
    right: 5,
  },
  bottomLabelsRow: {
    marginTop: adjustSize(8),
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 60,
    paddingRight: 10,
  },
  bottomLabel: {
    color: colors.primary,
    fontSize: adjustSize(10),
    marginTop:10,
    
  },
});
