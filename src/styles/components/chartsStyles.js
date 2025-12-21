import { StyleSheet } from "react-native";

// common styles for all charts
const createCommonChartStyles = (theme) => ({
  container: {
    paddingTop: theme.spacing.xs,
    marginBottom: theme.spacing.xl,
    flex: 1,
  },
  title: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    textAlign: "center",
  },
  horizontalBarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing?.sm ?? 10,
  },
  horizontalBarLabel: {
    ...theme.typography.caption,
    color: theme.colors.textPrimary,
  },
  horizontalBarContainer: {
    flex: 1,
    height: 28,
    borderRadius: theme.borderRadius?.sm ?? 6,
    marginHorizontal: theme.spacing?.sm ?? 8,
    overflow: "hidden",
  },
  horizontalBar: {
    height: "100%",
    borderRadius: theme.borderRadius.xs,
  },
  horizontalBarValue: {
    width: 40,
    ...theme.typography.caption,
    textAlign: "right",
    color: theme.colors.textSecondary,
  },
  legendContainer: {
    marginTop: 16,
  },
});

// ============================================
// 1. TOP PROGRAMMING LANGUAGES CHART
// ============================================
export const createTopLanguagesChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);

  return StyleSheet.create({
    container: common.container,
    title: {
      ...common.title,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    label: {
      width: 75,
      ...theme.typography.caption,
      textAlign: "right",
      paddingRight: 6,
      color: theme.colors.textPrimary,
    },
    barContainer: {
      flex: 1,
      height: 28,
      marginRight: 6,
    },
    bar: {
      height: 28,
      backgroundColor: theme.colors.accent,
    },
    value: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    footerLabel: {
      marginTop: 8,
      textAlign: "center",
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
  });
};
// ============================================
// 2. TOP CITIES CHART
// ============================================

export const createTopCitiesChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);

  return StyleSheet.create({
    container: common.container,
    title: {
      ...common.title,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 18,
    },
    label: {
      width: 75,
      ...theme.typography.caption,
      textAlign: "right",
      paddingRight: 6,
      color: theme.colors.textPrimary,
    },
    barContainer: {
      flex: 1,
      height: 28,
      marginRight: 6,
    },
    bar: {
      height: 28,
      backgroundColor: theme.colors.accent,
    },
    value: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    footerLabel: {
      textAlign: "center",
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    axisLabel: {
      marginTop: 12,
      textAlign: "center",
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
  });
};

// ============================================
// 3. JOB TYPE DONUT CHART
// ============================================

export const createJobTypeDonutStyles = (theme) => {
  const common = createCommonChartStyles(theme);

  return StyleSheet.create({
    container: common.container,
    title: {
      ...common.title,
    },
    chartContainer: {
      alignItems: "center",

    },
    legendContainer: {
      marginTop: 18,
    },
    legendRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    legendLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    colorDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginRight: 8,
    },
    legendText: {
      ...theme.typography.caption,
      color: theme.colors.textPrimary,
    },
    legendValue: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
  });
};

// ============================================
// common styles for vertical charts (Soft/Hard Skills)
// ============================================
export const createCommonVerticalChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);

  return StyleSheet.create({
    container: common.container,
    card: {
      padding: 16,
      borderRadius: 14,
      backgroundColor: theme.colors.card,
      marginVertical: 16,
    },
    title: {
      ...common.title,
    },
    chart: {
      marginTop: 50,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      height: 230,
      paddingHorizontal: 1,
    },
    barWrapper: {
      alignItems: "center",
      width: 28,
    },
    value: {
      ...theme.typography.caption,
      marginBottom: 4,
      color: theme.colors.textSecondary,
    },
    bar: {
      width: 20,
      borderRadius: 4
    },
    label: {
      ...theme.typography.captionSmall,
      marginTop: 6,
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
    legend: {
      marginTop: 16,
    },
    legendRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 2,
      marginRight: 8,
    },

    legendText: {
      ...theme.typography.caption,
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
    container: common.container,
    title: {
      ...common.title,
    },
    chartContainer: {
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 10,
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
      ...theme.typography.caption,
    },
  });
};

// ============================================
// 7. TOP TECHNOLOGIES CHART
// ============================================

export const createTopTechnologiesChartStyles = (theme) => {
  const common = createCommonChartStyles(theme);

  return StyleSheet.create({
    container: common.container,
    title: {
      ...common.title,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    label: {
      width: 75,
      ...theme.typography.caption,
      textAlign: "right",
      paddingRight: 6,
      color: theme.colors.textPrimary,
    },
    barContainer: {
      flex: 1,
      height: 28,
      marginRight: 6,
    },
    bar: {
      height: 28,
      backgroundColor: theme.colors.accent,
    },
    value: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    footerLabel: {
      marginTop: 8,
      textAlign: "center",
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
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
      ...common.container,
    },
    title: {
      ...common.title,
    },
    chartContainer: {
      alignItems: "center",
      marginVertical: theme.spacing?.md ?? 16,
    },

    legendContainer: {
      marginTop: theme.spacing?.md ?? 12,
      paddingHorizontal: theme.spacing?.sm ?? 8,
    },
    legendRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing?.sm ?? 8,
    },
    legendLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    colorDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      marginRight: 8,
    },
    legendText: {
      ...theme.typography.caption,
      color: theme.colors.textPrimary,
    },
    legendValue: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
  });
};