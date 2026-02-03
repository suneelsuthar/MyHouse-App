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
          datasets: [
            {
              data: data,
              colors: data.map(() => () => "#7979a3"),
            },
          ],
          // data: [colors.primary, colors.primary, colors.primary],
        }}
        width={screenWidth - adjustSize(20)}
        height={260} // Increase height for yearly data to accommodate vertical labels
        fromZero
        showValuesOnTopOfBars={false}
        withHorizontalLabels={true}
        withCustomBarColorFromData
        flatColor
        chartConfig={{
          backgroundGradientFrom: colors.fill,
          backgroundGradientTo: colors.fill,
          // backgroundGradientToOpacity: 0.1,
          style: {
            borderRadius: 106,
          },
          decimalPlaces: 0,

          // color: () => "red",
          labelColor: () => colors.primary,
          color: (opacity = 1) => `rgb(41, 39, 102)`,
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
        showBarTops={false}
        
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
