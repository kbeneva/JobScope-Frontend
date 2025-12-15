import { useTheme } from "../styles/theme";
import { useUser } from "../context/UserContext";
import { View, Text } from "react-native";
import { createHeaderStyles } from "../styles/components/JobHeaderStyles";
import SearchBar from "./SearchBar";
import { useNavigation } from "@react-navigation/native";

export default function JobHeader({ isHomePage = false, onFilterApply }) {
    const theme = useTheme();
    const { user, isAuthenticated } = useUser();
    const navigation = useNavigation();
    const styles = createHeaderStyles(theme);

    const handleSearchSubmit = (filters) => {
        navigation.navigate('Jobs', {
            searchFilters: filters,
        });
    };

    return (
        <View style={styles.container}>
            {isHomePage ? (
                <View>
                    {isAuthenticated && user ? (
                        <Text style={styles.header}>
                            Welcome back,{'\n'}
                            <Text style={styles.header}>
                                { user.firstName } { user.lastName }
                            </Text>
                        </Text>
                    ) : (
                        <Text style={styles.header}>Welcome</Text>
                    )}
                    <SearchBar 
                        onSearchSubmit={handleSearchSubmit}
                    />
                </View>
            ) : (
                <View style={{paddingTop:20}}>
                    <SearchBar onFilterApply={onFilterApply}/>
                </View>
            )}
        </View>
    );
}