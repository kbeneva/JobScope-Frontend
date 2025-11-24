import { StyleSheet } from 'react-native';

export const createTagStyles = (theme) => StyleSheet.create({
  tag: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.tag,
    alignSelf: 'flex-start',
  },

  text: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
});