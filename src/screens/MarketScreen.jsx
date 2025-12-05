import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, Switch } from "react-native";
import MarketCardBox from "../components/MarketCardBox";
import MarketTable from "../components/MarketTable";
import EducationPieChart from "../components/EducationPieChart";

export default function MarketScreen() {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  return (
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


      <Text style={theme.typography.h2}>Average Yearly Salary in Canada</Text>
      <MarketCardBox>
        $67,282 annually or $35.20 hourly
      </MarketCardBox>
      <MarketTable
        data={[
          { job: "Surgeon", salary: "$325,732" },
          { job: "Physician", salary: "$268,000" },
          { job: "Pathologist", salary: "$250,012" },
          { job: "Psychologist", salary: "$170,564" },
          { job: "Dentist", salary: "$148,405" },
        ]}
        
      />
      <EducationPieChart />

    </View>
  );
}