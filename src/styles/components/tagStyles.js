import { StyleSheet } from 'react-native';

export const createTagStyles = ({theme, outlined = false}) => StyleSheet.create({
  tag: {
    // paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    backgroundColor: theme.colors.tag,
    alignSelf: 'flex-start',
    borderWidth: outlined ? 1 : 0,
    borderColor: outlined ? theme.colors.textSecondary : 'transparent'
  },

  text: {
    ...theme.typography.caption,
    lineHeight: theme.typography.sizes.lg,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    fontFamily: theme.typography.fontFamily.medium,
  },
});