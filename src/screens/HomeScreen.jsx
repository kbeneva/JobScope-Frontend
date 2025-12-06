import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, ScrollView, Switch } from "react-native";
import JobCard from "../components/JobCard";
import { useUser } from "../context/UserContext";
import { useNavigation } from '@react-navigation/native';
import JobHeader from "../components/JobHeader";
import ResponsiveGrid from "../components/ResponsiveGrid";
import Button from "../components/Button";

export default function HomeScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);
  const navigation = useNavigation();

  const jobs = [
    {
      title: "Senior Full-Stack Web Developer",
      company: "Lightspeed Commerce",
      location: "Toronto, ON",
      jobType: "Full-time",
      tags: ["JavaScript", "React", "Node.js"],
      publishedTime: "5 days ago",
      isFavorite: true,
    },
    {
      title: "Senior DevOps Engineer",
      company: "Munich Re",
      location: "Toronto, ON",
      jobType: "Full-time",
      salary: "$69,000 - $114,000",
      tags: ["Kubernetes", "Terraform", "AWS"],
      publishedTime: "18 days ago",
      isFavorite: false,
    },
    {
      title: "Junior Web Developer Co-Op",
      company: "Osler, Hoskin & Harcourt LLP",
      location: "Toronto, ON",
      jobType: "Full-time",
      tags: ["SharePoint", "SQL", "JavaScript"],
      publishedTime: "4 days ago",
      isFavorite: false,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <JobHeader isHomePage={true}/>
      <ScrollView
        style={screenStyles.container}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
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

        <Button title="Voir les favoris" onPress={() => navigation.navigate("Favorites")} /> 
        <Button title="Voir le détail du job" onPress={() => navigation.navigate("Details")}  /> 
        <ResponsiveGrid>
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </ResponsiveGrid>
      </ScrollView>
    </View>
  );
}