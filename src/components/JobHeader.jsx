import { useTheme } from "../styles/theme";
import { useUser } from "../context/UserContext";
import { View, Text } from "react-native";
import { createHeaderStyles } from "../styles/components/JobHeaderStyles";
import SearchBar from "./SearchBar";

export default function JobHeader({ isHomePage = false }) {
    const theme = useTheme();
    const { user, isAuthenticated } = useUser();
    const styles = createHeaderStyles(theme);

    return (
        <View style={styles.container}>
            {isHomePage ? (
                <View>
                    {isAuthenticated && user ? (
                        <Text style={styles.header}>
                            Welcome back,{' '}
                            <Text style={[styles.header, { color: theme.colors.primary }]}>
                                { user.firstName } { user.lastName }
                            </Text>
                        </Text>
                    ) : (
                        <Text style={styles.header}>Welcome</Text>
                    )}
                    <SearchBar />
                </View>
            ) : (
                <View>
                    <SearchBar />
                </View>
            )}
        </View>
    );
}