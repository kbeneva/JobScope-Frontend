import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView,
  Alert 
} from "react-native";
import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import JobHeader from "../components/JobHeader";
import JobCard from "../components/JobCard";
import ResponsiveGrid from "../components/ResponsiveGrid";
import { Ionicons } from "@expo/vector-icons";
import { jobsService } from "../services/jobsService";

export default function JobsScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les données quand la page change
  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const fetchJobs = async (pageNumber) => {
    setLoading(true);
    setError(null);

    try {
      const response = await jobsService.searchJobs('', pageNumber, limit);
    
      if (response.items && Array.isArray(response.items)) {
        setJobs(response.items);
        setTotal(response.total || response.items.length);
        setTotalPages(response.pages || Math.ceil((response.total || 0) / limit));
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err.message);
      Alert.alert('Erreur', 'Impossible de charger les offres');
    } finally {
      setLoading(false);
    }
  };

  if (loading && jobs.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <JobHeader />
        <View style={[screenStyles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <JobHeader />
        <View style={[screenStyles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="alert-circle-outline" size={64} color={theme.colors.error} />
          <Text style={{ 
            color: theme.colors.textPrimary, 
            fontSize: 18, 
            marginTop: 16,
            textAlign: 'center' 
          }}>
            Erreur de chargement
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
            onPress={() => fetchJobs(page)}
          >
            <Text style={{ color: theme.colors.white, fontSize: 16 }}>
              Réessayer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!loading && jobs.length === 0) {
    return (
      <View style={{ flex: 1 }}>
        <JobHeader />
        <View style={[screenStyles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
          <Ionicons name="briefcase-outline" size={64} color={theme.colors.textSecondary} />
          <Text style={{ 
            color: theme.colors.textPrimary, 
            fontSize: 18, 
            marginTop: 16 
          }}>
            No results
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <JobHeader />
      <ScrollView
        style={screenStyles.container}
        contentContainerStyle={{ paddingBottom: theme.spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          marginBottom: 16 
        }}>
          {totalPages > 1 && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{ 
                  borderWidth: 1, 
                  borderColor: theme.colors.border, 
                  borderRadius: 20, 
                  padding: 8, 
                  marginHorizontal: 4,
                  opacity: page === 1 ? 0.5 : 1 
                }}
                onPress={() => setPage(page - 1)}
                disabled={page === 1 || loading}
              >
                <Ionicons name="chevron-back" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
              
              <Text style={{ 
                fontSize: 14, 
                color: theme.colors.textSecondary,
                marginHorizontal: 8 
              }}>
                {page} / {totalPages}
              </Text>
              
              <TouchableOpacity
                style={{ 
                  borderWidth: 1, 
                  borderColor: theme.colors.border, 
                  borderRadius: 20, 
                  padding: 8, 
                  marginHorizontal: 4,
                  opacity: page === totalPages ? 0.5 : 1 
                }}
                onPress={() => setPage(page + 1)}
                disabled={page === totalPages || loading}
              >
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ResponsiveGrid spacing={20}>
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