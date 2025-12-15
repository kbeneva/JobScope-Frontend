import { StyleSheet } from "react-native";
 
export const createTopLanguagesChartStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.lg,
    },
 
    title: {
      marginTop: 20,
      marginBottom: theme.spacing.md,
      ...theme.typography.h4,
      color: theme.colors.textPrimary,
      textAlign: "center",
 
    },
 
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    label: {
      width: 75,
      fontSize: 12,
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
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    footerLabel: {
      marginTop: 8,
      textAlign: "center",
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
 
  });