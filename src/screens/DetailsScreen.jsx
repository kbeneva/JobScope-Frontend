import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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

  const { jobId, job: initialJob } = route.params || {};

  const [job, setJob] = useState(initialJob);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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
      <View
        style={[
          screenStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          screenStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: theme.colors.error, marginBottom: 20 }}>
          Error: {error}
        </Text>
        <TouchableOpacity onPress={fetchJob}>
          <Text style={{ color: theme.colors.primary }}>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!job) {
    return (
      <View
        style={[
          screenStyles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: theme.colors.textPrimary }}>Offer not Found</Text>
      </View>
    );
  }

  const isLongText = job.description && job.description.length > 500;

  return (
    <View style={screenStyles.container}>
      <BackHeader title="Details of Job Offer" />

      <View style={detailsStyles.relative}>
        <Bookmark style={detailsStyles.bookmark} jobId={job._id || job.id} />

        <View>
          <Text style={detailsStyles.title}>{job.title}</Text>

          <Text style={detailsStyles.company}>{job.company}</Text>

          <View style={detailsStyles.headerRow}>
            <View style={detailsStyles.locationRow}>
              <Ionicons
                name="location-sharp"
                size={24}
                color={theme.colors.primary}
              />
              <Text style={detailsStyles.location}>{job.location}</Text>
            </View>

            <Text style={detailsStyles.published}>{job.publishedTime}</Text>
          </View>
        </View>
      </View>
      <View style={detailsStyles.divider} />
      <ScrollView
        style={detailsStyles.flex1}
        contentContainerStyle={screenStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={detailsStyles.sectionTitle}>Job details</Text>
        <View style={detailsStyles.detailRow}>
          <MaterialIcons
            name="attach-money"
            size={20}
            color={theme.colors?.primary || theme.primary}
            style={detailsStyles.detailIcon}
          />
          {job.salary ? (
            <JobTag label={job.salary} outlined={true} />
          ) : (
            <Text style={theme.typography.caption}>not disclosed</Text>
          )}
        </View>
        <View style={detailsStyles.detailRow}>
          <MaterialIcons
            name="work"
            size={20}
            color={theme.colors?.primary || theme.primary}
            style={detailsStyles.detailIcon}
          />
          <JobTag label={job.jobType} outlined={true} />
        </View>

        <Text
          style={[detailsStyles.sectionTitle, detailsStyles.titleMarginTop]}
        >
          Job description
        </Text>
        <Text
          style={detailsStyles.description}
          numberOfLines={isExpanded ? undefined : 5}
        >
          {job.description}
        </Text>

        {isLongText && (
          <TouchableOpacity
            onPress={() => setIsExpanded(!isExpanded)}
            style={{ marginTop: 8, marginBottom: 16 }}
          >
            <Text style={{ color: theme.colors.primary }}>
              {isExpanded ? "Read less" : "Read more"}
            </Text>
          </TouchableOpacity>
        )}

        <Text
          style={[detailsStyles.sectionTitle, detailsStyles.titleMarginTop]}
        >
          Skills
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: 8,
          }}
        >
          {job.skills?.map((tag, index) => (
            <JobTag key={index} label={tag} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
