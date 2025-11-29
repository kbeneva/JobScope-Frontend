import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text } from "react-native";
import { useUser } from "../context/UserContext";

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);

  return (
    <View style={screenStyles.container}>
      <></>
    </View>
  );
}