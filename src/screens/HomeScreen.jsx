import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from "react-native";
import JobCard from "../components/JobCard";
import { useUser } from "../context/UserContext";
import JobHeader from "../components/JobHeader";
import ResponsiveGrid from "../components/ResponsiveGrid";
import { jobsService } from "../services/jobsService";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, [isAuthenticated]);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      if (isAuthenticated && user) {
        data = await jobsService.getPersonalizedJobs();
      } else {
        data = await jobsService.getRecentJobs();
      }
      setJobs(data);
    } catch (err) {
      console.error("Error in fetchJobs:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && jobs.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <JobHeader isHomePage={true} />
        <View style={[screenStyles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <JobHeader isHomePage={true} />
        <View style={[screenStyles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="alert-circle-outline" size={64} color={theme.colors.error} />
          <Text style={{
            color: theme.colors.textPrimary,
            fontSize: 18,
            marginTop: 16,
            textAlign: 'center'
          }}>
            Loading error
          </Text>
          <Text style={{
            color: theme.colors.textSecondary,
            fontSize: 14,
            marginTop: 8,
            textAlign: 'center',
            paddingHorizontal: 40
          }}>
            {error}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.primary,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
              marginTop: 20,
            }}
            onPress={fetchJobs}
          >
            <Text style={{ color: theme.colors.white, fontSize: 16 }}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!loading && jobs.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <JobHeader isHomePage={true} />
        <View style={[screenStyles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="briefcase-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={{
            color: theme.colors.textPrimary,
            fontSize: 18,
            marginTop: 16
          }}>
            No jobs available
          </Text>
          <Text style={{
            color: theme.colors.textSecondary,
            fontSize: 14,
            marginTop: 8,
            textAlign: 'center',
            paddingHorizontal: 40
          }}>
            {isAuthenticated 
              ? "We couldn't find personalized jobs for you right now"
              : "Check back later for new opportunities"
            }
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <JobHeader isHomePage={true} />
      <ScrollView
        style={screenStyles.container}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <ResponsiveGrid>
          {jobs.map((job) => (
            <JobCard key={job._id || job.id} job={job} />
          ))}
        </ResponsiveGrid>

        {loading && jobs.length > 0 && (
          <View style={{ paddingVertical: 20, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}