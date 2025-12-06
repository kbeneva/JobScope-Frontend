import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../styles/theme";
import { createBackHeaderStyles } from "../styles/components/backHeaderStyles";

export default function BackHeader({ title = "Details", onBack, backParams = null }) {
  const navigation = useNavigation();
  const theme = useTheme();
  const styles = createBackHeaderStyles(theme);

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
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={handleBack}
        style={styles.button}>
        <Ionicons
          name="chevron-back"
          size={26}
          color={theme.colors?.textPrimary || theme.text}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          { color: theme.colors.textPrimary || theme.text },
        ]}
      >
        {title}
      </Text>
    </View>
  );
}