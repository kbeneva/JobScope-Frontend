import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "../styles/theme";

export default function EducationPieChart() {
  const theme = useTheme();

  const data = [
    { name: "University", population: 40, color: theme.colors.accent },
    { name: "Cegep", population: 35, color: "#6bb4d6" },
    { name: "High School", population: 25, color: "#c9f0ee" },
  ];

  return (
    <View style={{ width: "100%" }}>
      {/* TITRE DEHORS DU CARD */}
      <Text style={[theme.typography.h3, styles.title]}>
        Level of Education Sought in Canada
      </Text>

      {/* CARD BLANCHE COMME TON IMAGE */}
      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.card },
        ]}
      >
        <View style={styles.row}>

          {/* PIE CHART À GAUCHE, BIEN COMPLET */}
          <PieChart
            data={data}
            width={270}
            height={170}
            chartConfig={{
              color: () => theme.colors.textPrimary,
            }}
            accessor="population"
            backgroundColor="transparent"
            hasLegend={false}
            center={[0, 0]}
            absolute={false}
          />

          <View style={styles.legend}>
            {data.map((item, index) => (
              <View key={index} style={styles.legendRow}>
                <View style={[styles.dot, { backgroundColor: item.color }]} />
                <Text style={[styles.legendLabel, { color: theme.colors.textPrimary }]}>
                  {item.name}
                </Text>
              </View>
            ))}
          </View>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    marginLeft: 4,
  },

  card: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 22,  
    marginBottom: 20,

    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  legend: {
    marginLeft: -100,    
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    marginRight: 8,
  },

  legendLabel: {
    fontSize: 13,
    fontWeight: "500",
  },
});
