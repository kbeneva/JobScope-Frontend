import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import JobCard from "../components/JobCard";
import { Ionicons } from "@expo/vector-icons";



const jobs = [
  {
    title: "UX Designer",
    company: "Google",
    location: "Laval, Canada",
    pay: "$60 - 70k Yearly",
    jobType: "Part-time",
    tags: ["Hybrid"],
    publishedTime: "5 days ago"
  },
  {
    title: "IT Manager",
    company: "Google",
    location: "Laval, Canada",
    pay: "$60 - 70k Yearly",
    jobType: "Part-time",
    tags: ["Hybrid"],
    publishedTime: "5 days ago"
  },
  {
    title: "AI Engineer",
    company: "Google",
    location: "Laval, Canada",
    pay: "$60 - 70k Yearly",
    jobType: "Part-time",
    tags: ["Hybrid"],
    publishedTime: "5 days ago"
  }
];

export default function FavoritesScreen() {
    // Page
    const [page, setPage] = React.useState(1);
    const totalPages = 10;
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  return (
    <View style={screenStyles.container}>
      {/* Page */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 16 }}>
        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 20, padding: 8, marginHorizontal: 8 }}
          onPress={() => setPage(page > 1 ? page - 1 : 1)}
        >
          <Ionicons name="chevron-back" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, color: theme.colors.textSecondary }}>{`${page} of ${totalPages}`}</Text>
        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: theme.colors.border, borderRadius: 20, padding: 8, marginHorizontal: 8 }}
          onPress={() => setPage(page < totalPages ? page + 1 : totalPages)}
        >
          <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
        </TouchableOpacity>
      </View>
      {/* Favoris */}
      {jobs.map((job, idx) => (
        <View key={idx} style={{ marginBottom: 20 }}>
          <JobCard job={job} isFavorite={true} />
        </View>
      ))}
    </View>
  );
}
