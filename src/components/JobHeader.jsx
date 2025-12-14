import { useTheme } from "../styles/theme";
import { View, Text } from "react-native";
import { createHeaderStyles } from "../styles/components/JobHeaderStyles";
import SearchBar from "./SearchBar";

export default function JobHeader({ isHomePage = false }) {
    const theme = useTheme();
    const styles = createHeaderStyles(theme)

    return (
        <View style={styles.container}>
            {isHomePage ?
                <View>
                    <Text style={styles.header}>Welcome</Text>
                    <SearchBar />
                </View>
                :
                <View>
                    <SearchBar />
                </View>
            }
        </View>
    );
}