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

export default function DetailsScreen({ route }) {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

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
      <View style={{ position: "relative" }}>
        <Bookmark
          style={{ position: "absolute", right: 10, top: 10 }}
          isSaved={job.isFavorite}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: theme.colors?.textPrimary || theme.text,
              }}
            >
              {job.title}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: theme.colors?.textSecondary || theme.textSecondary,
              }}
            >
              {job.company}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 2,
              }}
            >
              <Ionicons name="location-sharp" size={24} color={theme.colors.primary} />

              <Text
                style={{
                  color: theme.colors?.textSecondary || theme.textSecondary,
                  fontSize: 15,
                }}
              >
                {job.location}
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: theme.colors?.textSecondary || theme.textSecondary,
              fontSize: 14,
              marginLeft: 12,
            }}
          >
            {job.publishedTime || job.postedAgo}
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={screenStyles.scrollContent}
      >
        {/* 2 */}
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: theme.colors?.border || theme.border,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: theme.colors?.primary || theme.primary,
              marginRight: 20,
              paddingVertical: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                color: theme.colors?.primary || theme.primary,
              }}
            >
              Job
            </Text>
          </View>
        </View>
        {/* 3 */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 8,
            color: theme.colors?.textPrimary || theme.text,
          }}
        >
          Job details
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <MaterialIcons
            name="attach-money"
            size={20}
            color={theme.colors?.primary || theme.primary}
            style={{ marginRight: 6 }}
          />
          <JobTag title={job.pay || job.salary} outlined={true} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <MaterialIcons
            name="work"
            size={20}
            color={theme.colors?.primary || theme.primary}
            style={{ marginRight: 6 }}
          />
          <JobTag title={job.jobType} outlined={true} />
        </View>
        {/* 4*/}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: 8,
            color: theme.colors?.textPrimary || theme.text,
          }}
        >
          Full job description
        </Text>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 22,
            color: theme.colors?.textSecondary || theme.textSecondary,
          }}
        >
          {job.description}
        </Text>
        <Text style={theme.typography.h4}>Skills</Text>
        {/* TODO: map les skills */}
      </ScrollView>
    </View>
  );
}
