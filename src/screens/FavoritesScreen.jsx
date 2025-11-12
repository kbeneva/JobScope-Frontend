import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";

export default function FavoritesScreen() {
  const theme = useTheme();
  const screenStyles = createScreenStyles(theme);

  return (
    <View style={screenStyles.container}>
      <></>
    </View>
  );
}
