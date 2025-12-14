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

// TODO: Passer en prop jobId
export default function DetailsScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);
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
