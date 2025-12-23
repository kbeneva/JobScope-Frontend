import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../styles/theme";
import { createTopTechnologiesChartStyles } from "../../styles/components/chartsStyles";

export default function TopTechnologiesChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createTopTechnologiesChartStyles(theme);

    const COLORS = [
        "#1b4865",
        "#2C7DA0",
        "#62B6CB",
        "#9ad1d4",
        "rgba(210, 240, 241, 1)", 
    ];

    if (!data || data.length === 0) {
        return (
            <View>
                <Text style={styles.title}>{title || "Top Technologies"}</Text>
                <Text style={{ color: theme.colors.textSecondary, textAlign: "center" }}>
                    No data available
                </Text>
            </View>
        );
    }

    const sortedData = [...data]
        .sort((a, b) => b.mentions - a.mentions)
        .slice(0, 5);

    const maxValue = Math.max(...sortedData.map(item => item.mentions));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {sortedData.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.label}>{item.technology}</Text>

                    <View style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                {
                                    width: `${(item.mentions / maxValue) * 100}%`,
                                    backgroundColor:
                                        COLORS[index] || COLORS[COLORS.length - 1],
                                },
                            ]}
                        />
                    </View>

                    <Text style={styles.value}>{item.mentions}</Text>
                </View>
            ))}
        </View>
    );
}
