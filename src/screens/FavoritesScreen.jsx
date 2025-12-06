import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView 
} from "react-native";
import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import JobCard from "../components/JobCard";
import ResponsiveGrid from "../components/ResponsiveGrid";
import { Ionicons } from "@expo/vector-icons";

export default function FavoritesScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);

  const [page, setPage] = useState(1);
  const [limit] = useState(6); // Items par page
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Simulation d'API - À remplacer plus tard par un vrai fetch
  const fetchFavorites = async (pageNumber) => {
    setLoading(true);

    // Simule un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));

    // Données mockées - simulation de tous les jobs
    const allJobs = [
      {
        id: 1,
        title: "UX Designer",
        company: "Google",
        location: "Laval, Canada",
        salary: "$60 - 70k Yearly",
        jobType: "Part-time",
        tags: ["Hybrid"],
        publishedTime: "5 days ago"
      },
      {
        id: 2,
        title: "IT Manager",
        company: "Microsoft",
        location: "Laval, Canada",
        salary: "$60 - 70k Yearly",
        jobType: "Part-time",
        tags: ["Hybrid"],
        publishedTime: "5 days ago"
      },
      {
        id: 3,
        title: "AI Engineer",
        company: "Amazon",
        location: "Laval, Canada",
        salary: "$60 - 70k Yearly",
        jobType: "Part-time",
        tags: ["Hybrid"],
        publishedTime: "5 days ago"
      },
      {
        id: 4,
        title: "Backend Developer",
        company: "Apple",
        location: "Montreal, Canada",
        salary: "$80 - 90k Yearly",
        jobType: "Full-time",
        tags: ["Remote"],
        publishedTime: "2 days ago"
      },
      {
        id: 5,
        title: "Product Manager",
        company: "Netflix",
        location: "Toronto, Canada",
        salary: "$90 - 110k Yearly",
        jobType: "Full-time",
        tags: ["Hybrid"],
        publishedTime: "1 week ago"
      },
      {
        id: 6,
        title: "DevOps Engineer",
        company: "Tesla",
        location: "Vancouver, Canada",
        salary: "$75 - 95k Yearly",
        jobType: "Full-time",
        tags: ["On-site"],
        publishedTime: "3 days ago"
      },
      {
        id: 7,
        title: "Data Scientist",
        company: "Meta",
        location: "Ottawa, Canada",
        salary: "$85 - 105k Yearly",
        jobType: "Full-time",
        tags: ["Remote"],
        publishedTime: "4 days ago"
      },
      {
        id: 8,
        title: "Frontend Developer",
        company: "Shopify",
        location: "Montreal, Canada",
        salary: "$70 - 90k Yearly",
        jobType: "Full-time",
        tags: ["Hybrid"],
        publishedTime: "1 week ago"
      },
    ];

    // Simulation de pagination
    const totalJobs = allJobs.length;
    const startIndex = (pageNumber - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedJobs = allJobs.slice(startIndex, endIndex);

    // Simulation de la réponse API
    const response = {
      items: paginatedJobs,
      total: totalJobs,
      page: pageNumber,
      pages: Math.ceil(totalJobs / limit),
      limit: limit,
    };

    // Mise à jour des états
    setJobs(response.items);
    setTotal(response.total);
    setTotalPages(response.pages);
    setPage(response.page);
    setLoading(false);
  };

  // Charger les données au montage
  useEffect(() => {
    fetchFavorites(page);
  }, [page]);

  // Chargement initial
  if (loading && jobs.length === 0) {
    return (
      <View style={[screenStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={screenStyles.container}
      >
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: 16 
        }}>
          <Text style={{ 
            fontSize: 18, 
            fontFamily: 'Poppins_600SemiBold',
            color: theme.colors.textPrimary 
          }}>
            Mes Favoris ({total})
          </Text>
          
          {/* Pagination en haut */}
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
                disabled={page === 1}
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
                disabled={page === totalPages}
              >
                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Grille de jobs */}
        <ResponsiveGrid spacing={20}>
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </ResponsiveGrid>

        {/* Indicateur de chargement lors du changement de page */}
        {loading && (
          <View style={{ paddingVertical: 20, alignItems: 'center' }}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}