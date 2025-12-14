import { StyleSheet } from "react-native";

export const createTopLanguagesChartStyles = (theme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing.lg,
    },
    title: {
      marginBottom: theme.spacing.md,
      ...theme.typography.h4,
      color: theme.colors.textPrimary,
      textAlign: "center",
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: theme.spacing.sm ?? 10,
    },

    label: {
      width: 90,
      fontSize: 13,
      color: theme.colors.textPrimary,
    },

    barContainer: {
      flex: 1,
      height: 10,
      backgroundColor: theme.colors.tag ?? "#EAEAEA",
      borderRadius: theme.borderRadius.sm ?? 6,
      marginHorizontal: theme.spacing.sm ?? 8,
      overflow: "hidden",
    },

    bar: {
      height: "100%",
      borderRadius: theme.borderRadius.sm ?? 6,
      backgroundColor: theme.colors.accent,
    },

    value: {
      width: 40,
      fontSize: 12,
      textAlign: "right",
      color: theme.colors.textSecondary,
    },

  });
