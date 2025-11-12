import { StyleSheet } from 'react-native';

export const createSearchBarStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    ...theme.typography.input,
    color: theme.colors.textSecondary,
    paddingVertical: 0,
  },
});