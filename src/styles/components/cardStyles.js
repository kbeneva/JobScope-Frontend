import { StyleSheet } from 'react-native';

export const createCardStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    flex: 1,
  },
  title: {
    ...theme.typography.h4,
    color: theme.colors.textPrimary,
    lineHeight: theme.typography.sizes.xl
  },
  company: {
    marginBottom: theme.spacing.md,
  },
  info: {
    ...theme.bodySmall,
    color: theme.colors.textSecondary
  }
});