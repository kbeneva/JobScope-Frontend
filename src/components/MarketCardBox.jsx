import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../styles/theme";

export default function MarketCardBox({ children }) {
  const theme = useTheme();

  return (
    <View style={[styles.box, { backgroundColor: theme.colors.accent }]}>
      <Text style={[styles.text, { color: theme.colors.white }]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "flex-start", // pas full width — juste autour du texte
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
