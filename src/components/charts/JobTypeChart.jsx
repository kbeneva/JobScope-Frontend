import React from "react";
import { View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { useTheme } from "../../styles/theme";
import { createJobTypeDonutStyles } from "../../styles/components/chartsStyles";

export default function JobTypeChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createJobTypeDonutStyles(theme);

    // Vérifier si les données existent
    if (!data || data.length === 0) {
        return (
            <View>
                <Text style={styles.title}>{title || "Job Types Distribution"}</Text>
                <Text style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
                    No data available
                </Text>
            </View>
        );
    }

    // Couleurs pour les différents types de jobs
    const colors = ["#006989", "#2C7DA0", "#468FAF", "#61A5C2", "#89C2D9"];

    // Préparer les données pour le PieChart
    const chartData = data.map((item, index) => ({
        value: item.value,
        color: colors[index % colors.length],
        text: `${item.percentage}%`,
        label: item.label,
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
                            <Text style={{ 
                                fontSize: 20, 
                                fontWeight: 'bold',
                                color: theme.colors.textPrimary,
                            }}>
                                {metadata?.total_jobs || ''}
                            </Text>
                            <Text style={{ 
                                fontSize: 12, 
                                color: theme.colors.textSecondary,
                            }}>
                                Jobs
                            </Text>
                        </View>
                    )}
                    textColor={theme.colors.white || '#fff'}
                    textSize={11}
                    showText
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
                            <Text style={styles.legendText}>{item.label}</Text>
                        </View>
                        <Text style={styles.legendValue}>
                            {item.value} ({item.percentage}%)
                        </Text>
                    </View>
                ))}
            </View>

            {/* Métadonnées */}
            {metadata && (
                <Text style={{ 
                    fontSize: 11, 
                    color: theme.colors.textSecondary,
                    textAlign: 'center',
                    marginTop: 8,
                }}>
                    Total jobs: {metadata.total_jobs ?? "-"}
                </Text>
            )}
        </View>
    );
}