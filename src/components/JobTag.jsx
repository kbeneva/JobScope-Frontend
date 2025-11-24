import { View, Text } from "react-native";
import { useTheme } from '../styles/theme';
import { createTagStyles } from "../styles/components/tagStyles";

export default function JobTag({ label }) {
  const theme = useTheme();
  const styles = createTagStyles(theme);

  return (
    <View style={styles.tag}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};
