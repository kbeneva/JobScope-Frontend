import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import JobTag from "../components/JobTag";
import Bookmark from "../components/Bookmark";
import BackHeader from "../components/BackHeader";
import { createDetailsStyles } from "../styles/screens/detailsStyles";

// TODO: Passer en prop jobId
export default function DetailsScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);
  const detailsStyles = createDetailsStyles(theme);
  const navigation = useNavigation();

  // simuler appel a l'api avec l'id

  const job = {
    title: "Senior Full-Stack Web Developer",
    company: "Lightspeed Commerce",
    location: "Toronto, ON",
    jobType: "Full-time",
    experience: "5+ years",
    education: "Bachelor's degree in Computer Science",
    languages: ["English"],
    shortDescription:
      "Join our Marketing team to build, maintain, and evolve our marketing website and related applications.",
    description:
      "We are looking for a Full-Stack Web Developer to join our Marketing team...",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "PHP",
      "MySQL",
      "WordPress",
      "Git",
      "REST",
      "HTML",
      "CSS",
    ],
    tags: ["JavaScript", "React", "Node.js"],
    postedOn: "LinkedIn",
    publishedTime: "5 days ago",
    isFavorite: false,
  };

  return (
    <View style={screenStyles.container}>
      <BackHeader title="Details of Job Offer"/>
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
