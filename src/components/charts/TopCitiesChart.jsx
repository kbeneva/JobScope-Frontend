import { View, Text } from "react-native";
import { useTheme } from "../../styles/theme";
import { createTopCitiesChartStyles } from "../../styles/components/charts/chart";

export default function TopCitiesChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createTopCitiesChartStyles(theme);

    if (!data || data.length === 0) {
        return (
            <View>
                <Text style={styles.title}>{title || "Top 5 Cities"}</Text>
                <Text style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
                    No data available
                </Text>
            </View>
        );
    }

    const maxValue = Math.max(...data.map(item => item.count));

    return (
        <View>
            <Text style={styles.title}>{title}</Text>

            {data.map((item, index) => (
                <View key={index} style={styles.row}>
                    <Text style={styles.label}>{item.location}</Text>

                    <View style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                { width: `${(item.count / maxValue) * 100}%` },
                            ]}
                        />
                    </View>

                    <Text style={styles.value}>{item.count}</Text>
                </View>
            ))}

            {/* Métadonnées optionnelles */}
            {metadata && (
                <Text style={styles.axisLabel}>
                    Total locations: {metadata.total_locations || metadata.total_location} • Total jobs: {metadata.total_jobs}
                </Text>
            )}
        </View>
    );
}