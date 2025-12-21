import { StyleSheet } from "react-native";

export const createFavoritesStyles = (theme) =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: theme.spacing.xl,
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    paginationContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    paginationButton: {
      borderWidth: 1,
      borderColor: theme.colors.textSecondary,
      borderRadius: 20,
      padding: 8,
      marginHorizontal: 4,
    },
    paginationButtonDisabled: {
      opacity: 0.5,
    },
    paginationText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      marginHorizontal: 8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: theme.spacing.xl,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: theme.spacing.xl,
    },
    emptyTitle: {
      ...theme.typography.h2,
      color: theme.colors.textPrimary,
      marginBottom: theme.spacing.sm,
      textAlign: "center",
    },
    emptyText: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: "center",
      marginBottom: theme.spacing.xl,
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      minWidth: 150,
      alignItems: "center",
    },
    loginButtonText: {
      ...theme.typography.button,
      color: theme.colors.white,
    },
  });
