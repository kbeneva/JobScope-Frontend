import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import { useFavorites } from "../context/FavoritesContext";
import JobCard from "../components/JobCard";
import ResponsiveGrid from "../components/ResponsiveGrid";
import { Ionicons } from "@expo/vector-icons";
import BackHeader from "../components/BackHeader";
import { createFavoritesStyles } from "../styles/screens/favoritesStyles";
import { favoritesService } from "../services/favoritesService";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

export default function FavoritesScreen() {
  const theme = useTheme();
  const { isAuthenticated } = useUser();
  const { refreshFavorites } = useFavorites();
  const screenStyles = createScreenStyles(theme);
  const favoritesStyles = createFavoritesStyles(theme);
  const navigation = useNavigation();

  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (isAuthenticated) {
        refreshFavorites();
        fetchFavorites(1);
      }
    }, [isAuthenticated])
  );

  const fetchFavorites = async (pageNumber) => {
    if (!isAuthenticated) return;

    setLoading(true);

    try {
      const response = await favoritesService.getFavorites(pageNumber, limit);

      setJobs(response.items || response.favorites || []);
      setTotal(response.total || 0);
      setTotalPages(response.pages || Math.ceil((response.total || 0) / limit));
      setPage(response.page || pageNumber);
    } catch (error) {
      setJobs([]);
      setTotal(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  };

  const handleFavoriteToggle = (jobId, isFavorite) => {
    if (!isFavorite) {
      setJobs((prevJobs) =>
        prevJobs.filter((job) => (job._id || job.id) !== jobId)
      );
      setTotal((prev) => Math.max(0, prev - 1));

      if (jobs.length === 1 && page > 1) {
        setPage(page - 1);
        fetchFavorites(page - 1);
      } else if (jobs.length === 1) {
        setJobs([]);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && !initialLoad) {
      fetchFavorites(page);
    }
  }, [page]);

  if (!isAuthenticated) {
    return (
      <View style={screenStyles.container}>
        <BackHeader title="Saved" />
        <View style={favoritesStyles.emptyContainer}>
          <Ionicons
            name="bookmark-outline"
            size={80}
            color={theme.colors.textSecondary}
            style={{ marginBottom: theme.spacing.lg }}
          />
          <Text style={favoritesStyles.emptyTitle}>Login Required</Text>
          <Text style={favoritesStyles.emptyText}>
            You need to be logged in to view your saved jobs
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={favoritesStyles.loginButton}
          >
            <Text style={favoritesStyles.loginButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (loading && initialLoad) {
    return (
      <View style={screenStyles.container}>
        <BackHeader title="Saved" />
        <View style={favoritesStyles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  if (!loading && jobs.length === 0) {
    return (
      <View style={screenStyles.container}>
        <BackHeader title="Saved" />
        <View style={favoritesStyles.emptyContainer}>
          <Ionicons
            name="bookmark-outline"
            size={80}
            color={theme.colors.primary}
            style={{ marginBottom: theme.spacing.lg }}
          />
          <Text style={favoritesStyles.emptyTitle}>No Saved Jobs</Text>
          <Text style={favoritesStyles.emptyText}>
            Start saving jobs you're interested in
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[screenStyles.container, favoritesStyles.scrollView]}>
      <BackHeader title="Saved" />
      <ScrollView
        style={favoritesStyles.scrollView}
        contentContainerStyle={favoritesStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={favoritesStyles.headerContainer}>
          {totalPages > 1 && (
            <View style={favoritesStyles.paginationContainer}>
              <TouchableOpacity
                style={[
                  favoritesStyles.paginationButton,
                  page === 1 && favoritesStyles.paginationButtonDisabled,
                ]}
                onPress={() => setPage(page - 1)}
                disabled={page === 1 || loading}
              >
                <Ionicons
                  name="chevron-back"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>

              <Text style={favoritesStyles.paginationText}>
                {page} / {totalPages}
              </Text>

              <TouchableOpacity
                style={[
                  favoritesStyles.paginationButton,
                  page === totalPages &&
                    favoritesStyles.paginationButtonDisabled,
                ]}
                onPress={() => setPage(page + 1)}
                disabled={page === totalPages || loading}
              >
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <ResponsiveGrid spacing={20}>
          {jobs.map((job) => (
            <JobCard
              key={job._id || job.id}
              job={job}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </ResponsiveGrid>

        {loading && (
          <View style={favoritesStyles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
