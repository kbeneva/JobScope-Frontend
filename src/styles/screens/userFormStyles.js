import { StyleSheet } from 'react-native';

export const createUserFormStyles = (theme) => StyleSheet.create({
    label: {
        ...theme.typography.caption,
        color: theme.colors.textSecondary,
        marginBottom: 6,
        marginTop: theme.spacing.md,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        paddingVertical: 10,
        ...theme.typography.body,
        color: theme.colors.text,
    },
    saveBtn: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        borderRadius: theme.borderRadius.md,
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing.lg,
    },
    saveText: {
        ...theme.typography.button,
        color: theme.colors.white
    },
});