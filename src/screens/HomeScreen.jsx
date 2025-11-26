import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, Switch } from "react-native";
import JobCard from "../components/JobCard";
import Button from "../components/Button";
import JobHeader from "../components/JobHeader";

export default function HomeScreen() {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  return (
    <>
      <JobHeader />
      <View style={screenStyles.container}>
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
      </View>
    </>
  );
}
