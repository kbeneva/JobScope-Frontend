import { StyleSheet } from 'react-native';

export const createHeaderStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
  },
});