import { useTheme } from "../styles/theme";
import { createScreenStyles } from "../styles/screens/screenStyles";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  Alert,
  ActionSheetIOS,
} from "react-native";
import { useUser } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { createProfileStyles } from "../styles/screens/profileStyles";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import cameraIcon from "../../assets/camera.png";

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, isAuthenticated } = useUser();
  const screenStyles = createScreenStyles(theme);
  const profileStyles = createProfileStyles(theme);
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);

  if (!isAuthenticated) {
    return (
      <View style={profileStyles.notAuthContainer}>
        <Ionicons
          name="person-circle-outline"
          size={96}
          color={theme.colors.icon}
          style={profileStyles.notAuthIcon}
        />

        <Text style={profileStyles.notAuthTitle}>You are not logged in</Text>

        <Text style={profileStyles.notAuthMessage}>
          Please log in to view and edit your profile.
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={profileStyles.notAuthButton}
        >
          <Text style={profileStyles.notAuthButtonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const pickFromLibrary = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission requise", "Autorisez l'accès à la bibliothèque");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert("Permission requise", "Autorisez l'accès à la caméra");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const openPickerOptions = () => {
    const options = [
      "Prendre une photo",
      "Choisir dans la bibliothèque",
      "Annuler",
    ];
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) takePhoto();
          if (buttonIndex === 1) pickFromLibrary();
        }
      );
    } else {
      Alert.alert("Photo de profil", "Sélectionnez une option", [
        { text: options[0], onPress: takePhoto },
        { text: options[1], onPress: pickFromLibrary },
        { text: options[2], style: "cancel" },
      ]);
    }
  };

  return (
    <View style={screenStyles.container}>
      <View style={profileStyles.profileHeader}>
        <View style={profileStyles.avatarContainer}>
          <Image
            source={
              imageUri
                ? { uri: imageUri }
                : {
                    uri: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                  }
            }
            style={profileStyles.avatar}
          />
          <TouchableOpacity
            onPress={openPickerOptions}
            activeOpacity={0.8}
            style={[
              profileStyles.cameraButton,
              { borderColor: theme.colors.background },
            ]}
          >
            <Image source={cameraIcon} style={profileStyles.cameraIcon} />
          </TouchableOpacity>
        </View>

        <Text style={profileStyles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={profileStyles.email}>{user?.email}</Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("UserForm")}
          style={profileStyles.editButton}
        >
          <Text style={profileStyles.buttonText}>Edit Profil</Text>
        </TouchableOpacity>
      </View>

      <View style={profileStyles.bioContainer}>
        <Text style={profileStyles.bio}>{user?.biography}</Text>
        {user?.interest && (
          <Text style={profileStyles.bioInterest}>{user.interest}</Text>
        )}
      </View>

      <View style={profileStyles.sectionList}>
        <TouchableOpacity
          style={profileStyles.row}
          onPress={() => navigation.navigate("Favorites")}
        >
          <View style={profileStyles.rowLeft}>
            <Ionicons
              name="bookmark-outline"
              size={22}
              color={theme.colors.textPrimary}
            />
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
