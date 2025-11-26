import { useTheme } from "../styles/theme";
import { View, Text } from "react-native";
import { createHeaderStyles } from "../styles/components/JobHeaderStyles";

export default function JobHeader() {
    const theme = useTheme();
    const styles = createHeaderStyles(theme)
    
    return ( 
        <View style={styles.container}>
            <Text style={{ ...theme.typography.h1, color: theme.colors.textPrimary }}>Bienvenue</Text>
        </View>
     );
}