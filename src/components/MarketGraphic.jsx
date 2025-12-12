import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useTheme } from "../styles/theme";

const screenWidth = Dimensions.get("window").width - 32;

export default function MarketGraphic() {
  const theme = useTheme();

  const chartConfig = {
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    decimalPlaces: 0,
    color: () => theme.colors.accent,
    labelColor: () => theme.colors.textSecondary,
    propsForBackgroundLines: {
      stroke: theme.colors.border,
    },
  };

  return (
    <View style={styles.container}>

      <Text style={[theme.typography.h3, styles.title]}>
        Top Technologies
      </Text>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <BarChart
          data={{
            labels: ["React", "Node", "Python", "Java", "AWS"],
            datasets: [{ data: [85, 75, 65, 55, 50] }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
        />
      </View>

      <Text style={[theme.typography.h3, styles.title]}>
        Top Cities
      </Text>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <BarChart
          data={{
            labels: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
            datasets: [{ data: [90, 70, 60, 45] }],
          }}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
        />
      </View>

      <Text style={[theme.typography.h3, styles.title]}>
        Job Types
      </Text>

      <View style={[styles.card, { backgroundColor: theme.colors.card }]}>
        <BarChart
          data={{
            labels: ["Full-time", "Contract", "Part-time"],
            datasets: [{ data: [80, 40, 20] }],
          }}
          width={screenWidth}
          height={200}
          chartConfig={chartConfig}
          fromZero
          showValuesOnTopOfBars
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  title: {
    marginBottom: 8,
    marginLeft: 4,
  },

  card: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 22,
    marginBottom: 24,

    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
