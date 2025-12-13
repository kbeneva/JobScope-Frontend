import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, ScrollView, Switch } from "react-native";
import JobCard from "../components/JobCard";
import { useUser } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import JobHeader from "../components/JobHeader";
import ResponsiveGrid from "../components/ResponsiveGrid";
import Button from "../components/Button";
import { jobsService } from "../services/jobsService";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await jobsService.getRecentJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <JobHeader isHomePage={true} />
      <ScrollView
        style={screenStyles.container}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <Button
          title="Voir le détail du job"
          onPress={() => navigation.navigate("Details")}
        />
        <ResponsiveGrid>
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </ResponsiveGrid>
      </ScrollView>
    </View>
  );
}
