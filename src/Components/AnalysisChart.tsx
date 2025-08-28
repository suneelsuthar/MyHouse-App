import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { adjustSize, colors, typography } from "../theme";
const screenWidth = Dimensions.get("window").width;

// same color as your screenshot
const chartColor = colors.primaryLight;

interface BookingsChartProps {
  data: number[];
}

const AnalysisChart: React.FC<BookingsChartProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              data:
                data && data.length === 7
                  ? data
                  : [300, 180, 120, 200, 150, 220, 60],
            },
          ],
        }}
        width={screenWidth - 32}
        height={260}
        fromZero
        showValuesOnTopOfBars={false}
        withInnerLines={false}
        withHorizontalLabels={true}
        chartConfig={{
          backgroundGradientFrom: colors.fill,
          backgroundGradientTo: colors.fill,
          decimalPlaces: 0,
          color: () => chartColor, // bar color
          labelColor: () => chartColor, // label color
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        
          propsForLabels: {
            fontSize: adjustSize(10), // custom font size
            fontFamily: typography.fonts.poppins.medium, // replace with your font
          },
          barPercentage: 0.6,
        }}
        style={styles.chart}
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
