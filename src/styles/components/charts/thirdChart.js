import { StyleSheet } from "react-native";

export const createJobTypeDonutStyles = (theme) =>
    StyleSheet.create({

        title: {
            marginBottom: theme.spacing?.md ?? 16,
            ...theme.typography.h4,
            color: theme.colors.textPrimary,
            textAlign: "center",
            marginTop: 60,

        },

        chartContainer: {
            alignItems: "center",
        },

        legendContainer: {
            marginTop: 16,
        },

        legendRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 6,
        },

        legendLeft: {
            flexDirection: "row",
            alignItems: "center",
        },

        colorDot: {
            width: 10,
            height: 10,
            borderRadius: 5,
            marginRight: 8,
        },

        legendText: {
            fontSize: 13,
            color: theme.colors.textPrimary,
        },

        legendValue: {
            fontSize: 13,
            color: theme.colors.textSecondary,
        },
        donutHole: {
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: 40,
            // top: "50%",
            // left: "50%",
            // transform: [
            //     { translateX: -40 },
            //     { translateY: -40 },
            // ],
        },
    });


