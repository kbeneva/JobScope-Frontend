import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { useUser } from "../context/UserContext";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import BackHeader from "../components/BackHeader";
import { Ionicons } from "@expo/vector-icons";
import { createSettingsStyles } from "../styles/screens/settingsStyle";

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
              size={20}
              color={theme.colors.iconPrimary}
            />
            <Text style={settingsStyles.rowText}>Theme</Text>
          </View>
          <Switch
            value={theme.theme === "dark"}
            onValueChange={theme.toggleTheme}
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={theme.colors.white}
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
              size={20}
              color={theme.colors.iconPrimary}
            />
            <Text style={settingsStyles.rowText}>Logout</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={theme.colors.iconSecondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
