import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createTopLanguagesChartStyles } from "../../styles/components/charts/firstChart";
import { useTheme } from "../../styles/theme";

export default function ProgrammingLanguagesChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createTopLanguagesChartStyles(theme);
    const maxValue = 1000;
    data = [
        { label: "Python", value: 913 },
        { label: "Java", value: 803 },
        { label: "JavaScript", value: 522 },
        { label: "C", value: 352 },
        { label: "TypeScript", value: 293 },
        { label: "PHP", value: 234 },
        { label: "Go", value: 164 },
        { label: "PowerShell", value: 129 },
        { label: "Shell", value: 124 },
        { label: "Kotlin", value: 114 },
    ];

    return (
        <View>
            <Text style={styles.title}>Top 10 Programming Languages</Text>

            {data.map((item, index) => (
                <View key={index} style={styles.row}>


                    <Text style={styles.label}>{item.label}</Text>


                    <View style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                {
                                    width: `${(item.value / maxValue) * 100}%`,
                                    backgroundColor: theme.colors.accent,
                                },
                            ]}
                        />
                    </View>

                    <Text style={[styles.value, { color: theme.colors.textSecondary }]}>
                        {item.value}
                    </Text>

                </View>

            ))}

        </View>
    );
}
