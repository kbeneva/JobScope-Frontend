import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTheme } from "../../styles/theme";
import { createSeniorityDistributionStyles } from "../../styles/components/chartsStyles";

export default function SeniorityDistributionChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createSeniorityDistributionStyles(theme);

    if (!data || data.length === 0) {
        return (
            <View>
                <Text style={styles.title}>{title || "Seniority Distribution"}</Text>
                <Text style={{ color: theme.colors.textSecondary, textAlign: "center" }}>
                    No data available
                </Text>
            </View>
        );
    }

    // Couleurs pour chaque niveau
    const colors = ["#006989", "#2C7DA0", "#468FAF", "#61A5C2", "#89C2D9"];

    // Préparer les données pour PieChart
    const chartData = data.map((item, index) => ({
        value: item.count,
        color: colors[index % colors.length],
        text: `${item.percentage}%`,
        label: item.level,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            <View style={styles.chartContainer}>
                <PieChart
                    data={chartData}
                    donut
                    radius={90}
                    innerRadius={50}
                    innerCircleColor={theme.colors.card || theme.colors.background}
                    centerLabelComponent={() => (
                        <View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    color: theme.colors.textPrimary,
                                    textAlign: "center",
                                }}
                            >
                                {metadata?.total_jobs || ""}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: theme.colors.textSecondary,
                                    textAlign: "center",
                                }}
                            >
                                Jobs
                            </Text>
                        </View>
                    )}
                    showText
                    textColor={theme.colors.white || "#fff"}
                    textSize={11}
                    fontWeight="bold"
                />
            </View>

            {/* Légende */}
            <View style={styles.legendContainer}>
                {data.map((item, index) => (
                    <View key={index} style={styles.legendRow}>
                        <View style={styles.legendLeft}>
                            <View
                                style={[
                                    styles.colorDot,
                                    { backgroundColor: colors[index % colors.length] },
                                ]}
                            />
                            <Text style={styles.legendText}>{item.level}</Text>
                        </View>
                        <Text style={styles.legendValue}>
                            {item.count} ({item.percentage}%)
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
