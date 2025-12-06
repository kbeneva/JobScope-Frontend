import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, Switch } from "react-native";
import JobCard from "../components/JobCard";
import Button from "../components/Button";
import { useUser } from "../context/UserContext";

export default function HomeScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);

  return (
    <View style={screenStyles.container}>
      <Text style={{ ...theme.typography.h1, color: theme.colors.textPrimary }}>
        Bienvenue
      </Text>

      

      <JobCard></JobCard>

      <Text style={theme.typography.h1}>Ceci est un h1</Text>
      <Text style={theme.typography.h2}>Ceci est un h2</Text>
      <Text style={theme.typography.h3}>Ceci est un h3</Text>
      <Text style={theme.typography.h4}>Ceci est un h4</Text>
      <Text style={theme.typography.body}>Ceci est un body</Text>
      <Text style={theme.typography.bodySmall}>Ceci est un bodySmall</Text>
      <Text style={theme.typography.caption}>Ceci est un caption</Text>
      <Text style={theme.typography.button}>Ceci est un button</Text>
      <Text style={theme.typography.input}>Ceci est un input</Text>
      <Text style={theme.typography.inputLabel}>Ceci est un inputLabel</Text>
      <Text style={theme.typography.inputHelper}>Ceci est un inputHelper</Text>
      <Text style={theme.typography.inputError}>Ceci est un inputError</Text>

      <Button title="Envoyer" onPress={() => console.log("Clicked")} />
    </View>
  );
}
