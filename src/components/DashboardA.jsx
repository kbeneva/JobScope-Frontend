import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from "../styles/theme";
import { analyticsService } from '../services/analyticsService';
import { createAnalyticsStyles } from '../styles/screens/analyticsStyles';
import TopCitiesChart from "./charts/TopCitiesChart";
import JobTypeDonutChart from "./charts/JobTypeChart";
import SoftSkillsChart from "./charts/SoftKillsChart";
import HardSkillsChart from "./charts/HardSkillsChart";
import ProgrammingLanguagesChart from './charts/ProgrammingLanguagesChart';

export default function DashboardA() {
  const theme = useTheme();
  const styles = createAnalyticsStyles(theme);
  const [chartsData, setChartsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverviewData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await analyticsService.getOverview();
        
        // Mapper les données par type pour un accès facile
        const dataByType = {};
        response.charts.forEach(chart => {
          dataByType[chart.type] = chart;
        });
        
        setChartsData(dataByType);
      } catch (err) {
        setError('Error while loading overview');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
          <Text style={styles.loadingText}>Loading overview...</Text>
        </View>
      )}

      {/* Error State */}
      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {Object.keys(chartsData).length > 0 && !loading && !error && (
        <View>
          {chartsData.top_cities && (
            <TopCitiesChart
              data={chartsData.top_cities.data}
              title={chartsData.top_cities.title}
              metadata={chartsData.top_cities.metadata}
            />
          )}
          {chartsData.job_type_distribution && (
            <JobTypeDonutChart
              data={chartsData.job_type_distribution.data}
              title={chartsData.job_type_distribution.title}
              metadata={chartsData.job_type_distribution.metadata}
            />
          )}
          {chartsData.top_soft_skills && (
            <SoftSkillsChart
              data={chartsData.top_soft_skills.data}
              title={chartsData.top_soft_skills.title}
              metadata={chartsData.top_soft_skills.metadata}
            />
          )}
          {chartsData.top_hard_skills_no_lang && (
            <HardSkillsChart
              data={chartsData.top_hard_skills_no_lang.data}
              title={chartsData.top_hard_skills_no_lang.title}
              metadata={chartsData.top_hard_skills_no_lang.metadata}
            />
          )}
          {chartsData.top_programming_languages && (
            <ProgrammingLanguagesChart
              data={chartsData.top_programming_languages.data}
              title={chartsData.top_programming_languages.title}
              metadata={chartsData.top_programming_languages.metadata}
            />
          )}
        </View>
      )}

    </ScrollView>
  );
}