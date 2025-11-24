import { StyleSheet } from 'react-native';

export const createCardStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
});