import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import BackHeader from "../components/BackHeader";
import { Ionicons } from "@expo/vector-icons";
import { createSettingsStyles } from "../styles/screens/settingsStyles";

export default function SettingsScreen() {
  const theme = useTheme();
  const { user, logout } = useUser();
  const screenStyles = createScreenStyles(theme);
  const settingsStyles = createSettingsStyles(theme);

  return (
    <View style={screenStyles.container}>
      <BackHeader title="Settings" />
      <View>
        <View style={settingsStyles.settingRow}>
          <View style={settingsStyles.rowLeft}>
            <Ionicons
              name="sunny-outline"
              size={30}
              color={theme.colors.textSecondary}
            />
            <Text style={settingsStyles.rowText}>Theme</Text>
          </View>
          <Switch
            value={theme.theme === "dark"}
            onValueChange={theme.toggleTheme}
            thumbColor={
              theme.theme === "dark" ? theme.colors.accent : theme.colors.white
            }
            trackColor={{
              false: theme.colors.tag,
              true: theme.colors.accent + 80,
            }}
          />
        </View>

        <View style={settingsStyles.divider} />

        {/* Logout row  */}
        <TouchableOpacity
          style={settingsStyles.settingRow}
          onPress={() => {
            // TODO: logout and go to login
            setIsSettingsOpen(false);
          }}
        >
          <View style={settingsStyles.rowLeft}>
            <Ionicons
              name="log-out-outline"
              size={30}
              color={theme.colors.textSecondary}
            />
            <Text style={settingsStyles.rowText}>Logout</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
