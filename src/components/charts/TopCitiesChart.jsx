import { View, Text } from "react-native";
import { useTheme } from "../../styles/theme";
import { createTopCitiesChartStyles }
    from "../../styles/components/charts/secondChart";

export default function TopCitiesChart({ data, title, metadata }) {
    const theme = useTheme();
    const styles = createTopCitiesChartStyles(theme);
    const maxValue = 1000;

    data = [
        { label: "Toronto, ON", value: 975 },
        { label: "Mississauga, ON", value: 236 },
        { label: "Brampton, ON", value: 53 },
        { label: "Markham, ON", value: 48 },
        { label: "Vaughan, ON", value: 25 },
    ];

    return (
        <View >


            <Text style={styles.title}>Top 5 Cities</Text>

            {data.map((item, index) => (
                <View key={index} style={styles.row}>

                    <Text style={styles.label}>{item.label}</Text>

                    <View style={styles.barContainer}>
                        <View
                            style={[
                                styles.bar,
                                { width: `${(item.value / maxValue) * 100}%` },
                            ]}
                        />
                    </View>

                    <Text style={styles.value}>{item.value}</Text>
                </View>
            ))}



        </View>
    );
}
