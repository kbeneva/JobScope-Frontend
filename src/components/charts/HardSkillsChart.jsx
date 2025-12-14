import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../styles/theme";
import { createHardSkillsChartStyles } from "../../styles/components/charts/fifthChart";

const COLORS = {
    "Cloud Platform": "#0B7285",
    DevOps: "#228BE6",
    "Web Framework": "#4DABF7",
    "Development Practice": "#74C0FC",
    "Operating System": "#A5D8FF",
};
const DATA = [
    { label: "AWS", value: 728, type: "Cloud Platform" },
    { label: "Azure", value: 443, type: "Cloud Platform" },
    { label: "GCP", value: 360, type: "Cloud Platform" },
    { label: "Docker", value: 291, type: "DevOps" },
    { label: "Kubernetes", value: 183, type: "DevOps" },
    { label: "CI/CD", value: 157, type: "Development Practice" },
    { label: "React", value: 139, type: "Web Framework" },
    { label: "Node.js", value: 122, type: "Web Framework" },
    { label: "Linux", value: 113, type: "Operating System" },
    { label: "Git", value: 106, type: "Development Practice" },
];

export default function HardSkillsChart() {
    const theme = useTheme();
    const styles = createHardSkillsChartStyles(theme);
    const maxValue = 750;

    return (
        <View >

            <Text style={styles.title}>
                Top 10 Hard Skills (Excluding Languages)
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
