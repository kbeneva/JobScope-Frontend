import React from 'react';
import { useTheme } from "../../styles/theme";
import { StyleSheet, View, Text } from 'react-native';
import { RadarChart } from '@salmonco/react-native-radar-chart';
import { createSkillsDistChartStyles } from '../../styles/components/chartsStyles';

export default function RadarDomainChart({ data, title, metadata, domain }) {
  const theme = useTheme();
  const styles = createSkillsDistChartStyles(theme);

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.white }]}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          {title || 'Skills Distribution'}
        </Text>
        <Text style={{ color: theme.colors.textSecondary }}>
          No data available
        </Text>
      </View>
    );
  }

  const radarData = data.map(item => ({
    label: item.category,
    value: item.percentage,
  }));

  const maxPercentage = Math.max(...data.map(item => item.percentage));
  const maxValue = Math.ceil(maxPercentage / 10) * 10;

  return (
    <View>
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        {title}
      </Text>

      <View style={styles.chartContainer}>
        <RadarChart
          data={radarData}
          maxValue={maxValue}
          gradientColor={{
            startColor: theme.colors.background,
            endColor: theme.colors.background,
            count: 5,
          }}
          stroke={[
            theme.colors.textDisabled,
            theme.colors.textDisabled,
            theme.colors.textDisabled,
            theme.colors.textDisabled,
            theme.colors.textDisabled,
          ]}
          strokeWidth={[1, 1, 1, 1, 1.5]}
          strokeOpacity={[0.6, 0.7, 0.8, 0.9, 1]}
          labelColor={theme.colors.textPrimary}
          dataFillColor={theme.colors.accent}
          dataFillOpacity={0.5}
          dataStroke={theme.colors.accent}
          dataStrokeWidth={2}

          labelSize={10}
          labelFontFamily={theme.typography.fontFamily.regular}
          labelDistance={1.2}
          
          divisionStroke={theme.colors.textDisabled}
          
          isCircle
        />
      </View>

      {/* Légende avec les valeurs */}
      <View style={styles.legendContainer}>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.legendItem}>
              <View style={styles.legendLeft}>
                <Text
                  style={styles.categoryName}
                  numberOfLines={2}
                >
                  {item.category}
                </Text>
              </View>
              <View style={styles.legendRight}>
                <Text style={[styles.percentage, { color: theme.colors.textSecondary }]}>
                  ({item.percentage}%)
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}