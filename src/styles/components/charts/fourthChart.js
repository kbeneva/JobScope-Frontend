import { StyleSheet } from "react-native";

export const createSoftSkillsChartStyles = (theme) =>
    StyleSheet.create({

        card: {
            padding: 16,
            borderRadius: 14,
            backgroundColor: theme.colors.card,
            marginVertical: 16,
        },

        title: {
            ...theme.typography.h4,
            color: theme.colors.textPrimary,
            marginBottom: 16,
            textAlign: "center",
            marginTop: 60,

        },

        chart: {
            marginTop: 50,
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: 230,
            paddingHorizontal: 1,
        },

        barWrapper: {
            alignItems: "center",
            width: 28,
        },

        value: {
            fontSize: 10,
            marginBottom: 4,
            color: theme.colors.textSecondary,
        },

        bar: {
            width: 16,
            borderRadius: 6,
        },

        label: {
            fontSize: 9,
            marginTop: 6,
            color: theme.colors.textSecondary,
            textAlign: "center",
        },

        legend: {
            marginTop: 16,
        },

        legendRow: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
        },

        dot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginRight: 8,
        },

        legendText: {
            fontSize: 12,
            color: theme.colors.textPrimary,
        },
    });
