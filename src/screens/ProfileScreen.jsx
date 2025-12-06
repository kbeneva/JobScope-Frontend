import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useUser } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { createProfileStyles } from "../styles/screens/profileStyles";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);
  const profileStyles = createProfileStyles(theme);
  const navigation = useNavigation();

  return (
    <View style={screenStyles.container}>
      <View style={{ alignItems: "center", marginTop: theme.spacing.lg }}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          }}
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            marginBottom: theme.spacing.md,
          }}
        />
        <Text style={profileStyles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={profileStyles.email}>{user?.email}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("UserForm")}
          style={profileStyles.button}
        >
          <Text style={profileStyles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: theme.spacing.lg }}>
        <Text style={profileStyles.bio}>{user?.biography}</Text>
        {user?.interest ? (
          <Text style={[profileStyles.bio, { marginTop: 8 }]}>
            {user.interest}
          </Text>
        ) : null}
      </View>

      <View style={profileStyles.sectionList}>
        <TouchableOpacity
          style={profileStyles.row}
          onPress={() => navigation.navigate("Favorites")}
        >
          <View style={profileStyles.rowLeft}>
            <Ionicons name="bookmark-outline" size={22} color={theme.colors.textPrimary} />
            <Text style={profileStyles.rowText}>Saved</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>

        <View style={profileStyles.divider} />

        <TouchableOpacity
          style={profileStyles.row}
          onPress={() => navigation.navigate("Settings")}
        >
          <View style={profileStyles.rowLeft}>
            <Ionicons
              name="settings-outline"
              size={22}
              color={theme.colors.textPrimary}
            />
            <Text style={profileStyles.rowText}>Settings</Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={theme.colors.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
