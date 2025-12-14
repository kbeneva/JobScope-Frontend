import React from "react";
import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useTheme } from "../../styles/theme";
import { createJobTypeDonutStyles } from "../../styles/components/charts/thirdChart";

export default function JobTypeChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createJobTypeDonutStyles(theme);
    const screenWidth = Dimensions.get("window").width;

    data = [
        {
            name: "Full-time",
            population: 80.2,
            color: "#006989",
        },
        {
            name: "Contractor",
            population: 18,
            color: "#2C7DA0",
        },
        {
            name: "Part-time",
            population: 1.47,
            color: "#468FAF",
        },
        {
            name: "Internship",
            population: 0.35,
            color: "#61A5C2",
        },
    ];

    return (
        <View>

            <Text style={styles.title}>Job Types Distribution</Text>

            <View style={styles.chartContainer}>
                <PieChart
                    data={data}
                    width={screenWidth - 60}
                    height={250}
                    chartConfig={{
                        backgroundColor: "transparent",
                        backgroundGradientFrom: "transparent",
                        backgroundGradientTo: "transparent",
                        color: () => theme.colors.textPrimary,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="82"
                    hasLegend={false}
                    absolute
                />
                <View
                    style={[
                        styles.donutHole,
                        { backgroundColor: theme.colors.card },
                    ]}
                />
            </View>
            <View style={styles.legendContainer}>
                {data.map((item, index) => (
                    <View key={index} style={styles.legendRow}>

                        <View style={styles.legendLeft}>
                            <View
                                style={[
                                    styles.colorDot,
                                    { backgroundColor: item.color },
                                ]}
                            />
                            <Text style={styles.legendText}>{item.name}</Text>
                        </View>

                        <Text style={styles.legendValue}>
                            {item.population}%
                        </Text>

                    </View>
                ))}
            </View>

        </View>
    );
}