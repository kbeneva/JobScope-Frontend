import { View, Text } from "react-native";
import { useTheme } from '../styles/theme';
import { createTagStyles } from "../styles/components/tagStyles";

export default function JobTag({ label, outlined=false, style}) {
  const theme = useTheme();
  const styles = createTagStyles({theme, outlined});

  return (
    <View style={[styles.tag, { alignItems: 'center'}, style]}>
      <Text style={[styles.text, style]}>{label}</Text>
    </View>
  );
};
