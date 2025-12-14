import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../styles/theme";
import { createSoftSkillsChartStyles } 
  from "../../styles/components/charts/fourthChart";

const COLORS = {
  Communication: "#0B7285",
  Interpersonal: "#228BE6",
  "Problem Solving": "#4DABF7",
  Leadership: "#74C0FC",
  Personal: "#A5D8FF",
};
const DATA = [
  { label: "Communication", value: 728, type: "Communication" },
  { label: "Collaboration", value: 443, type: "Interpersonal" },
  { label: "Problem Solving", value: 360, type: "Problem Solving" },
  { label: "Teamwork", value: 291, type: "Interpersonal" },
  { label: "Leadership", value: 183, type: "Leadership" },
  { label: "Adaptability", value: 157, type: "Personal" },
  { label: "Time Mgmt", value: 139, type: "Personal" },
  { label: "Decision Making", value: 122, type: "Leadership" },
  { label: "Creativity", value: 113, type: "Personal" },
  { label: "Coaching", value: 106, type: "Leadership" },
];

export default function SoftSkillsChart({ data, title, metadata }) {
  const theme = useTheme();
  const styles = createSoftSkillsChartStyles(theme);
  const maxValue = 750;

  return (
    <View >

      <Text style={styles.title}>
        Top 10 Soft Skills (Interpersonal)
      </Text>

      <View style={styles.chart}>
        {DATA.map((item, index) => (
          <View key={index} style={styles.barWrapper}>

            <Text style={styles.value}>{item.value}</Text>

            <View
              style={[
                styles.bar,
                {
                  height: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: COLORS[item.type],
                },
              ]}
            />

            <Text style={styles.label}>{item.label}</Text>
          </View>
        ))}
      </View>

      {/* LEGEND */}
      <View style={styles.legend}>
        {Object.keys(COLORS).map((key) => (
          <View key={key} style={styles.legendRow}>
            <View
              style={[
                styles.dot,
                { backgroundColor: COLORS[key] },
              ]}
            />
            <Text style={styles.legendText}>{key}</Text>
          </View>
        ))}
      </View>

    </View>
  );
}
