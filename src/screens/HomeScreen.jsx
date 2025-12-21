import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, ScrollView } from "react-native";
import JobCard from "../components/JobCard";
import { useUser } from "../context/UserContext";
import JobHeader from "../components/JobHeader";
import ResponsiveGrid from "../components/ResponsiveGrid";
import { jobsService } from "../services/jobsService";
import { useState, useEffect } from "react";

export default function HomeScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      var data;
      if(isAuthenticated && user){
        data = await jobsService.getPersonalizedJobs();
      } else {
        data = await jobsService.getRecentJobs();
      }
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
        <ResponsiveGrid>
          {jobs.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </ResponsiveGrid>
      </ScrollView>
    </View>
  );
}
