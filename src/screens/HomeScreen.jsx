import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, Switch } from "react-native";
import JobCard from "../components/JobCard";
import Button from "../components/Button";
import { useNavigation } from '@react-navigation/native'; // ENLEVER

export default function HomeScreen() {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);
  const navigation = useNavigation(); // ENLEVER

  return (
    <View style={screenStyles.container}>
      <Text style={{ ...theme.typography.h1, color: theme.colors.textPrimary }}>
        Bienvenue
      </Text>

      <View style={screenStyles.rowContainer}>
        <Text style={{ color: theme.colors.textPrimary }}>
          {" "}
          {theme.theme === "light" ? "Mode clair" : "Mode sombre"}{" "}
        </Text>

        <Switch
          value={theme.theme === "dark"}
          onValueChange={theme.toggleTheme}
          thumbColor={
            theme.theme === "dark" ? theme.colors.accent : theme.colors.white
          }
          trackColor={{
            false: theme.colors.tag,
            true: theme.colors.accent + 80,
          }}
        />
      </View>

      <JobCard></JobCard>

      <Button title="Envoyer" onPress={() => console.log("Clicked")} />
      <Button title="Voir les favoris" onPress={() => navigation.navigate("Favorites")} /> 
     <Button title="Voir le détail du job" onPress={() => navigation.navigate("Details")}  /> 
    </View>
  );
}
     // Enlever <Button title="Voir le détail du job" onPress={() => navigation.navigate("Details")}  />
     // Enlever <Button title="Voir les favoris" onPress={() => navigation.navigate("Favorites")} /> 