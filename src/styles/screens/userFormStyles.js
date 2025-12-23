import { StyleSheet } from 'react-native';

export const createUserFormStyles = (theme) => StyleSheet.create({
    label: {
        ...theme.typography.inputLabel,
        color: theme.colors.textPrimary,
    },
    input: {
        ...theme.typography.input,
        color: theme.colors.textPrimary,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
        padding: 2,
    },
});