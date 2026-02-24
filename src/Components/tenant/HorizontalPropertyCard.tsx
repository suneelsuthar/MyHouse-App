import React from "react";
import { View, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { adjustSize, colors } from "../../theme";
import { Text } from "../Text";
import { LineChart } from "react-native-chart-kit";

interface PropertyCardProps {
  data: {
    title: string;
    onPress?: () => void;
    isLoss: boolean;
    value: number;
    chartdata: any;
  };
}

const width = Dimensions.get("window").width;

export const HorizontalPropertyCard: React.FC<PropertyCardProps> = ({
  data,
}: PropertyCardProps) => {
  const { title, onPress, isLoss, value, chartdata } = data;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text weight="medium" style={styles.title}>
              {title}
            </Text>
            <Text style={styles.subtitle}>
              (
              <Text
                text="54+ "
                style={{
                  color: isLoss ? "#D62828" : "#0AD029",
                  fontSize: adjustSize(10),
                }}
              />
              from last month)
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text weight="semiBold" style={styles.mainValue}>
              {value}
            </Text>
            <Text
              style={[styles.change, { color: isLoss ? "#D62828" : "#0AD029" }]}
            >
              ▲ 2% more
            </Text>
          </View>
        </View>
        <LineChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [...chartdata],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2, // optional
              },
            ],
            // legend: ["Rainy Days"], // optional
          }}
          width={adjustSize(280)}
          height={adjustSize(65)}
          withHorizontalLabels={false}
          withVerticalLabels={false}
          withInnerLines={false}
          withOuterLines={false}
          withShadow={true}
          withDots={true}
          chartConfig={{
            useShadowColorFromDataset: false,
            fillShadowGradientFrom: colors.primary,
            fillShadowGradientTo: colors.primary,
            fillShadowGradientToOpacity: 0.6,
            fillShadowGradientFromOpacity: 1,
            backgroundColor: colors.primary,
            backgroundGradientFrom: colors.white,
            backgroundGradientTo: colors.white,
            decimalPlaces: 0,
            color: (opacity = 1) => colors.primary,
            style: {},
            propsForDots: {
              r: "4",
              strokeWidth: "2",
              fill: colors.primary,
            },
          }}
          style={styles.chart}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: adjustSize(12),
    marginBottom: adjustSize(10),
    shadowColor: "#000",
    height: adjustSize(160),
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: adjustSize(230),
    marginRight: adjustSize(10),
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: adjustSize(14),
    color: colors.primary,
  },
  subtitle: {
    fontSize: adjustSize(10),
    color: colors.primaryLight,
  },
  mainValue: {
    fontSize: adjustSize(32),
    color: colors.primary,
    lineHeight: adjustSize(36),
  },
  change: {
    fontSize: adjustSize(10),
    color: "#0AD029",
  },
  chart: {
    alignSelf: "center",
  },
  pointer: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
