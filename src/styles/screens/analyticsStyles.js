import { StyleSheet } from 'react-native';

export const createAnalyticsStyles = (theme) => StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 8,
        marginBottom: 8,
    },
    divider: {
        height: 2,
        backgroundColor: theme.colors.textSecondary,
        marginBottom: 12
    },
    button: {
        minWidth: 34,
        position: "absolute",
        left: 0,
        zIndex: 10,
    },
    title: {
        ...theme.typography.h3,
        marginBottom: theme.spacing.lg,
        color: theme.colors.textPrimary
    },
    navbar: {
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border || '#e5e7eb',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        ...theme.typography.bodyMedium
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.primary,
    },
    activeText: {
        color: theme.colors.primary,
    },
    inactiveText: {
        color: theme.colors.textSecondary,
    },
    dropdown: {
        width: '100%',
        height: 40,
        borderColor: theme.colors.textSecondary,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: theme.colors.card,
        marginBottom: 16,
    },
    placeholderStyle: {
        ...theme.typography.bodyMedium,
        color: theme.colors.textSecondary,
    },
    selectedTextStyle: {
        ...theme.typography.bodyMedium,
        color: theme.colors.textPrimary,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        borderRadius: 8,
    },
    itemContainerStyle: {
        backgroundColor: theme.colors.white,
    },
    itemTextStyle: {
        fontSize: 16,
        color: theme.colors.textPrimary,
        paddingVertical: 8,
    },
    selectedItemTextStyle: {
        color: theme.colors.accent,
        fontWeight: '600',
    },
    containerStyle: {
        borderRadius: 8,
        backgroundColor: theme.colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    resultText: {
        color: theme.colors.textPrimary,
        fontSize: 18,
        marginTop: 16,
    },
    loadingContainer: {
        marginTop: 24,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: theme.colors.textSecondary,
    },
    errorContainer: {
        marginTop: 24,
        padding: 16,
        backgroundColor: '#fee2e2',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    errorText: {
        color: theme.colors.error,
        fontSize: 16,
        textAlign: 'center',
    },
    dataContainer: {
        marginTop: 24,
        padding: 16,
        backgroundColor: theme.colors.background,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border || '#e5e7eb',
    },
    dataText: {
        color: theme.colors.textPrimary,
        fontSize: 14,
        fontFamily: 'monospace',
    },
});