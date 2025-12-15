import { StyleSheet } from "react-native";
import { padding } from "../spacing";

export const createDetailsStyles = (theme) =>
  StyleSheet.create({
    relative: {
      position: "relative",
    },
    bookmark: {
      position: "absolute",
      right: 0,
      top: 0,
      zIndex: 999,
    },
    title: {
      ...theme.typography.h3,
      lineHeight: 28,
      paddingRight: theme.spacing.xl,
      marginTop: theme.spacing.xs,
      color: theme.colors.textPrimary,
    },
    company: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 12,
    },
    locationRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    location: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
      marginLeft: 4,
    },
    published: {
      ...theme.typography.bodySmall,
      color: theme.colors.textSecondary,
    },
    divider: {
      height: 2,
      backgroundColor: theme.colors.textDisabled,
      marginBottom: 12,
    },
    sectionTitle: {
      ...theme.typography.h4,
      color: theme.colors.textPrimary,
    },
    titleMarginTop: {
      marginTop: theme.spacing.md,
    },
    detailRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    detailIcon: {
      marginRight: 6,
    },
    description: {
      ...theme.typography.bodySmall,
      lineHeight: 22,
      color: theme.colors.textSecondary,
    },
  });
