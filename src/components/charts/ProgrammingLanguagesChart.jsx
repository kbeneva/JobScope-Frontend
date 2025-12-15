import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createTopLanguagesChartStyles } from "../../styles/components/charts/firstChart";
import { useTheme } from "../../styles/theme";
 
export default function ProgrammingLanguagesChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createTopLanguagesChartStyles(theme);
    const maxValue = 1500;
    // data = [
    //     { label: "Python", value: 913 },
    //     { label: "Java", value: 803 },
    //     { label: "JavaScript", value: 522 },
    //     { label: "C", value: 352 },
    //     { label: "TypeScript", value: 293 },
    //     { label: "PHP", value: 234 },
    //     { label: "Go", value: 164 },
    //     { label: "PowerShell", value: 129 },
    //     { label: "Shell", value: 124 },
    //     { label: "Kotlin", value: 114 },
    // ];
    const COLORS = {
        light1: "rgba(210, 240, 241, 1)",
        light2: "#9ad1d4",
        mid: "#62B6CB",
        mid2: "#2C7DA0",
        dark: "#1b4865",
    };
 
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
                                    width: `${Math.min(item.value, maxValue) / maxValue * 100}%`,
                                    backgroundColor:
                                        index === 0 ? COLORS.dark :
                                            index === 1 ? COLORS.mid2 :
                                                index === 2 ? COLORS.mid :
                                                    index >= 3 && index <= 5 ? COLORS.light2 :
                                                        COLORS.light1,
 
                                },
                            ]}
                        />
 
                    </View>
 
                    <Text style={styles.value}>{item.value}</Text>
 
 
                </View>
 
            ))}
            <Text style={styles.footerLabel}>
                Number of mentions
            </Text>
        </View>
    );
}