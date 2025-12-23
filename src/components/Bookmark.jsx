import React, { useRef } from "react";
import { TouchableOpacity, Alert, Animated } from "react-native";
import { useTheme } from "../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../context/UserContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigation } from "@react-navigation/native";

export default function Bookmark({ style, jobId, onToggle }) {
  const theme = useTheme();
  const navigation = useNavigation();
  const iconColor = theme.colors.primary;
  const { isAuthenticated } = useUser();
  const { isFavorite, toggleFavorite } = useFavorites();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const playAnimation = () => {
    scaleAnim.setValue(1);
    Animated.timing(scaleAnim, {
      toValue: 1.2,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleToggle = async (e) => {
    e?.stopPropagation?.();

    if (!isAuthenticated) {
      Alert.alert(
        "Login Required",
        "You need to be logged in to save job offers",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
      return;
    }

    if (!jobId) return;

    playAnimation();

    const currentState = isFavorite(jobId);

    try {
      await toggleFavorite(jobId, currentState);
      onToggle?.(jobId, !currentState);
    } catch (err) {
      Alert.alert("Error", "Unable to save the job offer");
    }
  };

  const saved = isFavorite(jobId);

  return (
    <TouchableOpacity
      onPress={handleToggle}
      style={[{ padding: 4 }, style]}
      activeOpacity={0.6}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name={saved ? "bookmark" : "bookmark-outline"}
          size={24}
          color={iconColor}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}
