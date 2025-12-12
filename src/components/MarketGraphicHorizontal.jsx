import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../styles/theme";

const DATA = [
  { label: "text_04", value: 30, color: "#f77da7" },
  { label: "text_03", value: 20, color: "#6bb4f6" },
  { label: "text_02", value: 40, color: "#f5b82e" },
  { label: "text_01", value: 10, color: "#4dd7a5" },
];

export default function MarketGraphicHorizontal() {
  const theme = useTheme();

  return (
    <View style={styles.container}>

      <Text style={[theme.typography.h2, styles.title]}>
        Horizontal Bar Chart
      </Text>

      {DATA.map((item, index) => (
        <View key={index} style={styles.row}>

          <Text style={[styles.label, { color: theme.colors.textPrimary }]}>
            {item.label}
          </Text>

          <View
            style={[
              styles.barBackground,
              { backgroundColor: theme.colors.border },
            ]}
          >
            <View
              style={[
                styles.barFill,
                {
                  width: `${item.value}%`,
                  backgroundColor: item.color,
                },
              ]}
            />
          </View>

          {/* VALUE */}
          <Text style={[styles.value, { color: theme.colors.textSecondary }]}>
            {item.value}%
          </Text>

        </View>
      ))}

      <View style={styles.footer}>
        <InfoBlock title="Chart 01" />
        <InfoBlock title="Chart 02" />
        <InfoBlock title="Chart 03" />
        <InfoBlock title="Chart 04" />
      </View>

    </View>
  );
}

function InfoBlock(props) {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.infoTitle}>{props.title}</Text>
      <Text style={styles.infoText}>
        Lorem ipsum dolor sit amet, simul adolescens ei vis, id nec errem interesset.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  title: {
    textAlign: "center",
    marginBottom: 24,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  label: {
    width: 70,
    fontSize: 12,
  },

  barBackground: {
    flex: 1,
    height: 14,
    borderRadius: 8,
    overflow: "hidden",
    marginHorizontal: 8,
  },

  barFill: {
    height: "100%",
    borderRadius: 8,
  },

  value: {
    width: 40,
    fontSize: 12,
    textAlign: "right",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
  },

  infoBlock: {
    width: "22%",
  },

  infoTitle: {
    fontWeight: "600",
    marginBottom: 4,
    color: "#fff",
  },

  infoText: {
    fontSize: 11,
    color: "#ccc",
  },
});
