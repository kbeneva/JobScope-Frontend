import { StyleSheet } from "react-native";

// ============================================
// STYLES COMMUNS PARTAGÉS
// ============================================

const createCommonChartStyles = (theme) => ({
  title: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing?.md ?? 16,
    textAlign: "center",
  },

  titleWithTopMargin: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: 16,
    textAlign: "center",
    marginTop: 60,
  },

  card: {
    padding: 16,
    borderRadius: 14,
    // backgroundColor: theme.colors.card,
    marginVertical: 16,
  },

  // Styles pour les barres horizontales
  horizontalBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing?.sm ?? 10,
  },

  horizontalBarLabel: {
    fontSize: 13,
    color: theme.colors.textPrimary,
  },

  horizontalBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: theme.colors.tag ?? "#EAEAEA",
    borderRadius: theme.borderRadius?.sm ?? 6,
    marginHorizontal: theme.spacing?.sm ?? 8,
    overflow: "hidden",
  },

  horizontalBar: {
    height: "100%",
    borderRadius: theme.borderRadius?.sm ?? 6,
  },

  horizontalBarValue: {
    width: 40,
    fontSize: 12,
    textAlign: "right",
    color: theme.colors.textSecondary,
  },

  // Styles pour les barres verticales
  verticalChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 230,
    paddingHorizontal: 6,
  },

  verticalBarWrapper: {
    alignItems: "center",
    width: 28,
  },

  verticalBarValue: {
    fontSize: 10,
    marginBottom: 4,
    color: theme.colors.textSecondary,
  },

  verticalBar: {
    width: 16,
    borderRadius: 6,
  },

  verticalBarLabel: {
    fontSize: 9,
    marginTop: 6,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },

  // Styles pour les légendes
  legendContainer: {
    marginTop: 16,
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  legendRowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },

  legendText: {
    fontSize: 13,
    color: theme.colors.textPrimary,
  },

  legendValue: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
});

// ============================================
// 1. TOP PROGRAMMING LANGUAGES CHART
// ============================================

export const createTopLanguagesChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);
  
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing?.lg ?? 16,
    },
    title: common.title,
    row: common.horizontalBarRow,
    label: {
      ...common.horizontalBarLabel,
      width: 90,
    },
    barContainer: common.horizontalBarContainer,
    bar: {
      ...common.horizontalBar,
      backgroundColor: theme.colors.accent,
    },
    value: common.horizontalBarValue,
  });
};

// ============================================
// 2. TOP CITIES CHART
// ============================================

export const createTopCitiesChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);
  
  return StyleSheet.create({
    title: common.titleWithTopMargin,
    row: common.horizontalBarRow,
    label: {
      ...common.horizontalBarLabel,
      width: 120,
    },
    barContainer: common.horizontalBarContainer,
    bar: {
      ...common.horizontalBar,
      backgroundColor: theme.colors.primary,
    },
    value: common.horizontalBarValue,
    axisLabel: {
      marginTop: 10,
      fontSize: 11,
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
  });
};

// ============================================
// 3. JOB TYPE DONUT CHART
// ============================================

export const createJobTypeDonutStyles = (theme) => {
  const common = createCommonChartStyles(theme);
  
  return StyleSheet.create({
    title: common.titleWithTopMargin,
    chartContainer: {
      alignItems: "center",
    },
    legendContainer: common.legendContainer,
    legendRow: common.legendRowSpaceBetween,
    legendLeft: common.legendLeft,
    colorDot: common.legendDot,
    legendText: common.legendText,
    legendValue: common.legendValue,
    donutHole: {
      position: "absolute",
      width: 40,
      height: 40,
      borderRadius: 40,
    },
  });
};

// ============================================
// 4. SOFT SKILLS CHART (Vertical Bars)
// ============================================

export const createSoftSkillsChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);
  
  return StyleSheet.create({
    card: common.card,
    title: common.titleWithTopMargin,
    chart: {
      ...common.verticalChart,
      marginTop: 50,
      paddingHorizontal: 1,
    },
    barWrapper: common.verticalBarWrapper,
    value: common.verticalBarValue,
    bar: common.verticalBar,
    label: common.verticalBarLabel,
    legend: common.legendContainer,
    legendRow: common.legendRow,
    dot: common.legendDot,
    legendText: {
      fontSize: 12,
      color: theme.colors.textPrimary,
    },
  });
};

// ============================================
// 5. HARD SKILLS CHART (Vertical Bars)
// ============================================

export const createHardSkillsChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);
  
  return StyleSheet.create({
    card: common.card,
    title: common.titleWithTopMargin,
    chart: common.verticalChart,
    barWrapper: common.verticalBarWrapper,
    value: common.verticalBarValue,
    bar: common.verticalBar,
    label: common.verticalBarLabel,
    legend: common.legendContainer,
    legendRow: common.legendRow,
    dot: common.legendDot,
    legendText: {
      fontSize: 12,
      color: theme.colors.textPrimary,
    },
  });
};

// ============================================
// 6. SKILLS DISTRIBUTION RADAR CHART
// ============================================

export const createSkillsDistChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);
  
  return StyleSheet.create({
    title: {
      ...theme.typography.h4,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing?.xs ?? 8,
      textAlign: "center",
    },
    chartContainer: {
      alignItems: 'center',
      width: '100%',
      paddingVertical: 20,
      paddingHorizontal: 10,
      marginVertical: 10,
    },
    legendContainer: common.legendContainer,
    legendItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 4,
    },
    legendLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      marginRight: 12,
    },
    legendRight: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    categoryName: {
      ...theme.typography.bodySmall,
      color: theme.colors.textPrimary,
    },
    percentage: {
      fontSize: 13,
    },
  });
};

// ============================================
// 7. TOP TECHNOLOGIES CHART
// ============================================

export const createTopTechnologiesChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);
  
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing?.lg ?? 16,
    },
    title: common.title,
    row: common.horizontalBarRow,
    label: {
      ...common.horizontalBarLabel,
      width: 100,
    },
    barContainer: common.horizontalBarContainer,
    bar: common.horizontalBar,
    value: common.horizontalBarValue,
    categoryBadge: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      marginTop: 4,
      alignSelf: 'flex-start',
    },
    categoryText: {
      fontSize: 10,
      fontWeight: '500',
    },
  });
};

// ============================================
// 8. SENIORITY DISTRIBUTION CHART
// ============================================

export const createSeniorityDistributionStyles = (theme) => {
  const common = createCommonChartStyles(theme);
  
  return StyleSheet.create({
    container: {
      marginBottom: theme.spacing?.lg ?? 16,
    },
    title: common.title,
    chartContainer: {
      alignItems: "center",
    },
    distributionBar: {
      flexDirection: 'row',
      height: 40,
      borderRadius: 8,
      overflow: 'hidden',
      marginVertical: 16,
    },
    distributionSegment: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    legendContainer: common.legendContainer,
    legendRow: common.legendRowSpaceBetween,
    legendLeft: common.legendLeft,
    colorDot: common.legendDot,
    legendText: common.legendText,
    legendValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
  });
};