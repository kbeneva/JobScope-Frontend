import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text } from "react-native";
import JobCard from "../components/JobCard";
import Button from "../components/Button";

export default function HomeScreen() {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  return (
    <View style={screenStyles.container}>
      <Text style={{ ...theme.typography.h1, color: theme.colors.textPrimary }}>
        Bienvenue
      </Text>
      <JobCard></JobCard>
      <Button title="Envoyer" onPress={() => console.log("Clicked")} />
    </View>
  );
}
