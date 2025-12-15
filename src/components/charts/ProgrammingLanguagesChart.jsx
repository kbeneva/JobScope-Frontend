import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createTopLanguagesChartStyles } from "../../styles/components/charts/chart";
import { useTheme } from "../../styles/theme";

export default function ProgrammingLanguagesChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createTopLanguagesChartStyles(theme);
    const maxValue = data?.length ? Math.max(...data.map(item => item.mentions)) : 0;

    const COLORS = {
        light1: "rgba(210, 240, 241, 1)",
        light2: "#9ad1d4",
        mid: "#62B6CB",
        mid2: "#2C7DA0",
        dark: "#1b4865",
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {data.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.label}>{item.language}</Text>

                    <View style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                {
                                    width: `${Math.min(item.mentions, maxValue) / maxValue * 100}%`,
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
            {metadata.total_mentions ?
                <Text style={styles.footerLabel}>
                    Number of mentions {metadata.total_mentions}
                </Text>
                :
                <></>
            }

        </View>
    );
}