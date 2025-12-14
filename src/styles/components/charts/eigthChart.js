import { StyleSheet } from "react-native";

export const createSkillsDistChartStyles = (theme) =>
    StyleSheet.create({
        title: {
            ...theme.typography.h4,
            color: theme.colors.textPrimary,
            marginBottom: theme.spacing.xs,
            textAlign: "center",
        },
        chartContainer: {
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        legendContainer: {
            marginTop: 16,
        },
        legendItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 4,
        },
        legendLeft: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: 12,
        },
        legendRight: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        categoryName: {
            ...theme.typography.bodySmall,
            color: theme.colors.textPrimary
        },
        percentage: {
            fontSize: 13,
        },
    });