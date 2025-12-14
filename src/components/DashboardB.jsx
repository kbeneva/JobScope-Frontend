import { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useTheme } from "../styles/theme";
import { analyticsService } from '../services/analyticsService';
import { createAnalyticsStyles } from '../styles/screens/analyticsStyles';
import RadarDomainChart from "./charts/RadarDomainChart";
// import SeniorityDistributionChart from "./charts/SeniorityDistributionChart";
// import TopCitiesDomainChart from "./charts/TopCitiesDomainChart";
// import TopTechnologiesChart from "./charts/TopTechnologiesChart";

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
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>

      {/* Dropdown */}
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemContainerStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor={theme.colors.accent + '20'}
        data={domainData}
        maxHeight={300}
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
          {/* Le type contient le domaine, par exemple: "radar_domain_web" */}
          {chartsData[`radar_domain_${selectedDomain.toLowerCase()}`] && (
            <RadarDomainChart 
              data={chartsData[`radar_domain_${selectedDomain.toLowerCase()}`].data}
              title={chartsData[`radar_domain_${selectedDomain.toLowerCase()}`].title}
              metadata={chartsData[`radar_domain_${selectedDomain.toLowerCase()}`].metadata}
              domain={selectedDomain}
            />
          )}
{/*           
          {chartsData[`seniority_distribution_${selectedDomain.toLowerCase()}`] && (
            <SeniorityDistributionChart 
              data={chartsData[`seniority_distribution_${selectedDomain.toLowerCase()}`].data}
              title={chartsData[`seniority_distribution_${selectedDomain.toLowerCase()}`].title}
              metadata={chartsData[`seniority_distribution_${selectedDomain.toLowerCase()}`].metadata}
            />
          )}
          
          {chartsData[`top_cities_${selectedDomain.toLowerCase()}`] && (
            <TopCitiesDomainChart 
              data={chartsData[`top_cities_${selectedDomain.toLowerCase()}`].data}
              title={chartsData[`top_cities_${selectedDomain.toLowerCase()}`].title}
              metadata={chartsData[`top_cities_${selectedDomain.toLowerCase()}`].metadata}
            />
          )}
          
          {chartsData[`top_technologies_${selectedDomain.toLowerCase()}`] && (
            <TopTechnologiesChart 
              data={chartsData[`top_technologies_${selectedDomain.toLowerCase()}`].data}
              title={chartsData[`top_technologies_${selectedDomain.toLowerCase()}`].title}
              metadata={chartsData[`top_technologies_${selectedDomain.toLowerCase()}`].metadata}
            />
          )} */}
        </View>
      )}

    </ScrollView>
  );
}