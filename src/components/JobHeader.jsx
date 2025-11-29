import { useTheme } from "../styles/theme";
import { View, Text } from "react-native";
import { createHeaderStyles } from "../styles/components/JobHeaderStyles";

export default function JobHeader() {
    const theme = useTheme();
    const styles = createHeaderStyles(theme)
    
    return ( 
        <View style={styles.container}>
            <Text style={styles.header}>Bienvenue</Text>
        </View>
     );
}