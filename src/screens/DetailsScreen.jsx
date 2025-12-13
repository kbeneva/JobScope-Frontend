import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import JobTag from "../components/JobTag";
import Bookmark from "../components/Bookmark";
import BackHeader from "../components/BackHeader";
import { jobsService } from "../services/jobsService";
import { useState, useEffect } from "react";
import { createDetailsStyles } from "../styles/screens/detailsStyles";

export default function DetailsScreen({ route }) {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);
  const detailsStyles = createDetailsStyles(theme);
  const navigation = useNavigation();

  const { jobId, job: initialJob } = route.params || {};

  const [job, setJob] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (jobId && !initialJob) {
      fetchJob();
    }
  }, [jobId]);

  const fetchJob = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await jobsService.getJobById(jobId);
      setJob(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[screenStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[screenStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.colors.error, marginBottom: 20 }}>
          Error: {error}
        </Text>
        <TouchableOpacity onPress={fetchJob}>
          <Text style={{ color: theme.colors.primary }}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Pas de job
  if (!job) {
    return (
      <View style={[screenStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: theme.colors.textPrimary }}>
          Aucune offre trouvée
        </Text>
      </View>
    );
  }

  return (
    <View style={screenStyles.container}>
      <BackHeader title="Details of Job Offer" />
      {/* 1 */}
      <View style={detailsStyles.relative}>
        <Bookmark
          style={detailsStyles.bookmark}
          isSaved={job.isFavorite}
        />

        <View style={detailsStyles.headerRow}>
          <View style={detailsStyles.flex1}>
            <Text style={detailsStyles.title}>
              {job.title}
            </Text>
            <Text style={detailsStyles.company}>
              {job.company}
            </Text>
            <View style={detailsStyles.locationRow}>
              <Ionicons name="location-sharp" size={24} color={theme.colors.primary} />
              <Text style={detailsStyles.location}>
                {job.location}
              </Text>
            </View>
          </View>
          <Text style={detailsStyles.published}>
            {job.publishedTime || job.postedAgo}
          </Text>
        </View>
      </View>
      <ScrollView
        style={detailsStyles.flex1}
        contentContainerStyle={screenStyles.scrollContent}
      >
        {/* 2 */}
        <View style={detailsStyles.tabRow}>
          <View style={detailsStyles.tabActive}>
            <Text style={detailsStyles.tabActiveLabel}>
              Job
            </Text>
          </View>
        </View>
        {/* 3 */}
        <Text style={detailsStyles.sectionTitle}>
          Job details
        </Text>
        <View style={detailsStyles.detailRow}>
          <MaterialIcons
            name="attach-money"
            size={20}
            color={theme.colors?.primary || theme.primary}
            style={detailsStyles.detailIcon}
          />
          <JobTag title={job.pay || job.salary} outlined={true} />
        </View>
        <View style={detailsStyles.detailRow}>
          <MaterialIcons
            name="work"
            size={20}
            color={theme.colors?.primary || theme.primary}
            style={detailsStyles.detailIcon}
          />
          <JobTag title={job.jobType} outlined={true} />
        </View>
        {/* 4*/}
        <Text style={detailsStyles.sectionTitle}>
          Full job description
        </Text>
        <Text style={detailsStyles.description}>
          {job.description}
        </Text>
        <Text style={theme.typography.h4}>Skills</Text>
        {/* TODO: map les skills */}
      </ScrollView>
    </View>
  );
}
