import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, Switch, ScrollView } from "react-native";
import ProgrammingLanguageChart from "../components/charts/ProgrammingLanguageChart";
import TopCitiesChart from "../components/charts/TopCitiesChart";
import JobTypeDonutChart from "../components/charts/JobTypeChart";
import SoftSkillsChart from "../components/charts/SoftKillsChart";
import HardSkillsChart from "../components/charts/HardSkillsChart";
export default function MarketScreen() {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  return (
    <ScrollView style={screenStyles.container}>

      <View style={screenStyles.rowContainer}>
        <Text style={{ color: theme.colors.textPrimary }}>
          {theme.theme === "light" ? "Mode clair" : "Mode sombre"}
        </Text>

        <Switch
          value={theme.theme === "dark"}
          onValueChange={theme.toggleTheme}
          thumbColor={
            theme.theme === "dark"
              ? theme.colors.accent
              : theme.colors.white
          }
          trackColor={{
            false: theme.colors.tag,
            true: theme.colors.accent + "80",
          }}
        />
      </View>

      <ProgrammingLanguageChart />
      {/*<Text style={{ color: theme.colors.bodySmall }}>
        Number of job offers
      </Text>*/}
      <TopCitiesChart />
      <JobTypeDonutChart />

      <SoftSkillsChart />
      <HardSkillsChart />

    </ScrollView>
  );
}
