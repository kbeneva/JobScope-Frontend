import { StyleSheet } from 'react-native';
import { padding } from '../spacing';

export const createUserFormStyles = (theme) => StyleSheet.create({
    label: {
        ...theme.typography.inputLabel,
        color: theme.colors.textPrimary,
    },
    input: {
        ...theme.typography.input,
        color: theme.colors.textSecondary,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
        padding: 2,
    },
});