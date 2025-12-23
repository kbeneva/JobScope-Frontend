import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../styles/theme";
import { createCommonVerticalChartStyles } from "../../styles/components/chartsStyles";

const CATEGORY_COLORS = {
    "Cloud Platform": "#0B7285",
    "DevOps": "#228BE6",
    "Web Framework": "#4DABF7",
    "Development Practice": "#74C0FC",
    "Operating System": "#A5D8FF",
    "Database": "#89C2D9",
};

export default function HardSkillsChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createCommonVerticalChartStyles(theme);
    const maxValue = Math.max(...data.map(item => item.mentions));

    return (
        <View style={[styles.container, {marginBottom: 100}]}>

            <Text style={styles.title}>
                {title}
            </Text>

            <View style={styles.chart}>
                    {data.map((item, index) => (
                        <View key={index} style={styles.barWrapper}>
                            <Text style={styles.value}>{item.mentions}</Text>

                            <View
                                style={[
                                    styles.bar,
                                    {
                                        height: `${(item.mentions / maxValue) * 100}%`,
                                        backgroundColor: CATEGORY_COLORS[item.category] || theme.colors.accent,
                                    },
                                ]}
                            />

                            <Text style={styles.label} numberOfLines={1}>
                                {item.skill}
                            </Text>
                        </View>
                    ))}
                </View>

            <View style={styles.legend}>
                {Object.keys(CATEGORY_COLORS).map((key) => (
                    <View key={key} style={styles.legendRow}>
                        <View
                            style={[
                                styles.dot,
                                { backgroundColor: CATEGORY_COLORS[key] },
                            ]}
                        />
                        <Text style={styles.legendText}>{key}</Text>
                    </View>
                ))}
            </View>

        </View>
    );
}