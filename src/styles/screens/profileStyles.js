import { StyleSheet } from 'react-native';

export const createProfileStyles = (theme) => StyleSheet.create({
    name: {
        ...theme.typography.h2,
        color: theme.colors.text
    },
    email: {
        ...theme.typography.body,
        color: theme.colors.primary,
        marginTop: 4,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: theme.borderRadius.md,
        marginTop: theme.spacing.md,
    },
    buttonText: { ...theme.typography.button, color: theme.colors.white },
    bio: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        lineHeight: 20,
    },
    sectionList: {
      marginTop: theme.spacing.xl,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: theme.spacing.md,
    },
    rowLeft: {
      flexDirection: "row",
      alignItems: "center", gap: 12
    },
    rowText: {
      ...theme.typography.body,
      color: theme.colors.text,
      marginLeft: 12,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border
    },
});