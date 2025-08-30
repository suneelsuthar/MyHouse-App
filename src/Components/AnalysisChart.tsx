import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { adjustSize, colors, typography } from "../theme";

const screenWidth = Dimensions.get("window").width;
const chartColor = colors.primaryLight;

interface BookingsChartProps {
  data: number[];
  labels: string[];
  period: string; // ✅ Add period prop to detect which time range is selected
}

const AnalysisChart: React.FC<BookingsChartProps> = ({
  data,
  labels,
  period,
}) => {
  // Check if we're showing yearly data (which has longer labels)
  const isYearlyData = period === "This Year";

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: labels,
          datasets: [{ data: data }],
        }}
        width={screenWidth - adjustSize(20)}
        height={260} // Increase height for yearly data to accommodate vertical labels
        fromZero
        showValuesOnTopOfBars={false}
        withInnerLines={false}
        withHorizontalLabels={true}
        chartConfig={{
          backgroundGradientFrom: colors.fill,
          backgroundGradientTo: colors.fill,
          decimalPlaces: 0,
          color: () => chartColor,
          labelColor: () => chartColor,
          propsForBackgroundLines: { strokeWidth: 0 },
          propsForLabels: {
            fontSize: adjustSize(10),
            fontFamily: typography.fonts.poppins.medium,
            dy: isYearlyData ? 0 : 0,
            dx: isYearlyData ? -10 : 0,
          },
          barPercentage: isYearlyData ? adjustSize(0.3) : adjustSize(0.6),
        }}
        style={styles.chart}
        verticalLabelRotation={isYearlyData ? -90 : 0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: adjustSize(25),
  },
  chart: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default AnalysisChart;
