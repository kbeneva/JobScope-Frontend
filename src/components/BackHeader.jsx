import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../styles/theme";

export default function BackHeader({ title = "Détails", onBack, backParams = null }) {
    const navigation = useNavigation();
    const theme = useTheme();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (backParams) {
            navigation.navigate(backParams.screen, backParams.params);
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBack} style={styles.button}>
                <Ionicons
                    name="chevron-back"
                    size={26}
                    color={theme.colors?.textPrimary || theme.text}
                />
            </TouchableOpacity>

            <Text style={[
                styles.title,
                { color: theme.colors?.textPrimary || theme.text }
            ]}>
                {title}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    button: {
        padding: 4,
        minWidth: 34, // Pour garder l'alignement même sans bookmark
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
    },
});