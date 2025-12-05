import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../styles/theme";

export default function MarketTable({ data }) {
  const theme = useTheme();

  return (
    <View style={[styles.table, { borderColor: theme.colors.accent }]}>
      <View
        style={[
          styles.row,
          styles.header,
          { backgroundColor: theme.colors.accent },
        ]}
      >
        <Text style={[styles.cellHeader, { color: theme.colors.white }]}>
          Job Type
        </Text>
        <Text style={[styles.cellHeader, { color: theme.colors.white }]}>
          Average Salary
        </Text>
      </View>

      {data.map((item, index) => (
        <View
          key={index}
          style={[
            styles.row,
            {
              backgroundColor:
                index % 2 === 0
                  ? theme.colors.card
                  : theme.colors.tag,
            },
          ]}
        >
          <Text
            style={[
              styles.cell,
              { color: theme.colors.textPrimary },
            ]}
          >
            {item.job}
          </Text>
          <Text
            style={[
              styles.cell,
              { color: theme.colors.textPrimary },
            ]}
          >
            {item.salary}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  header: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cellHeader: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "left",
  },
  cell: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
});
