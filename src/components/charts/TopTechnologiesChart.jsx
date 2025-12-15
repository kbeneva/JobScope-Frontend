import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../../styles/theme";
import { createTopTechnologiesChartStyles } from "../../styles/components/charts/chart";

export default function TopTechnologiesChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createTopTechnologiesChartStyles(theme);

    if (!data || data.length === 0) {
        return (
            <View>
                <Text style={styles.title}>{title || "Top Technologies"}</Text>
                <Text style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
                    No data available
                </Text>
            </View>
        );
    }

    const maxValue = Math.max(...data.map(item => item.mentions));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {data.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.label}>{item.technology}</Text>
                    <View style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                { width: `${(item.mentions / maxValue) * 100}%` },
                            ]}
                        />
                    </View>
                    <Text style={styles.value}>{item.mentions}</Text>
                </View>
            ))}
        </View>
    );
}