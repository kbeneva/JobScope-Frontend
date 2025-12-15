import { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from "../styles/theme";
import { analyticsService } from '../services/analyticsService';
import { createAnalyticsStyles } from '../styles/screens/analyticsStyles';
import RadarDomainChart from "./charts/RadarDomainChart";
import TopCitiesChart from './charts/TopCitiesChart';
import SeniorityDistributionChart from "./charts/SeniorityDistributionChart";
import TopTechnologiesChart from "./charts/TopTechnologiesChart";

const DOMAINS = ["Web", "Mobile", "DevOps", "Data", "QA & Security", "Design", "Management"];

export default function DashboardB() {
  const theme = useTheme();
  const styles = createAnalyticsStyles(theme);
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0]);
  const [isFocus, setIsFocus] = useState(false);
  const [chartsData, setChartsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Transformer les domaines en format pour le dropdown
  const domainData = DOMAINS.map((domain) => ({
    label: domain,
    value: domain,
  }));

  const normalizeDomainForType = (domain) => {
    return domain
      .toLowerCase()
      .replace(/\s+&\s+/g, '_and_')  // "QA & Security" -> "qa_and_security"
      .replace(/\s+/g, '_');          // Remplacer les espaces restants par _
  };

  // Charger les données du domaine sélectionné
  useEffect(() => {
    const fetchDomainData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await analyticsService.getDomainDashboard(selectedDomain);

        const dataByType = {};
        response.charts.forEach(chart => {
          dataByType[chart.type] = chart;
        });

        setChartsData(dataByType);
      } catch (err) {
        setError('Error while loading domain data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDomainData();
  }, [selectedDomain]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: 20,
        paddingBottom: 100,
        minHeight: '100%',
      }}
      showsVerticalScrollIndicator={false}
    >

      {/* Dropdown */}
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        inputSearchStyle={styles.inputSearchStyle}
        activeColor={theme.colors.accent + '20'}
        data={domainData}
        maxHeight={260}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select a domain' : '...'}
        searchPlaceholder="Search..."
        value={selectedDomain}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setSelectedDomain(item.value);
          setIsFocus(false);
        }}

        renderItem={(item, selected) => (
          <View
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              backgroundColor: selected
                ? theme.colors.accent + '10'
                : theme.colors.white,
            }}
          >
            <Text
              style={{
                ...theme.typography.body,
                fontSize: 14,
                color: selected
                  ? theme.colors.accent
                  : theme.colors.textPrimary,
              }}
            >
              {item.label}
            </Text>
          </View>
        )}
      />

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.accent} />
          <Text style={styles.loadingText}>Loading {selectedDomain} data...</Text>
        </View>
      )}

      {/* Error State */}
      {error && !loading && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Data Display - Mapper les charts par type */}
      {Object.keys(chartsData).length > 0 && !loading && !error && (
        <View>
          {chartsData[`top_cities_${normalizeDomainForType(selectedDomain)}`] && (
            <TopCitiesChart
              data={chartsData[`top_cities_${normalizeDomainForType(selectedDomain)}`].data}
              title={chartsData[`top_cities_${normalizeDomainForType(selectedDomain)}`].title}
              metadata={chartsData[`top_cities_${normalizeDomainForType(selectedDomain)}`].metadata}
            />
          )}

          {chartsData[`top_technologies_${normalizeDomainForType(selectedDomain)}`] && (
            <TopTechnologiesChart
              data={chartsData[`top_technologies_${normalizeDomainForType(selectedDomain)}`].data}
              title={chartsData[`top_technologies_${normalizeDomainForType(selectedDomain)}`].title}
              metadata={chartsData[`top_technologies_${normalizeDomainForType(selectedDomain)}`].metadata}
            />
          )}

          {chartsData[`seniority_distribution_${normalizeDomainForType(selectedDomain)}`] && (
            <SeniorityDistributionChart 
              data={chartsData[`seniority_distribution_${normalizeDomainForType(selectedDomain)}`].data}
              title={chartsData[`seniority_distribution_${normalizeDomainForType(selectedDomain)}`].title}
              metadata={chartsData[`seniority_distribution_${normalizeDomainForType(selectedDomain)}`].metadata}
            />
          )}

          {chartsData[`radar_domain_${normalizeDomainForType(selectedDomain)}`] && (
            <RadarDomainChart
              data={chartsData[`radar_domain_${normalizeDomainForType(selectedDomain)}`].data}
              title={chartsData[`radar_domain_${normalizeDomainForType(selectedDomain)}`].title}
              metadata={chartsData[`radar_domain_${normalizeDomainForType(selectedDomain)}`].metadata}
              domain={selectedDomain}
            />
          )}


        </View>
      )}

    </ScrollView>
  );
}