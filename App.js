import "react-native-gesture-handler";
import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "./src/context/ThemeContext";
import AppNavigator from "./src/navigation/AppNavigator";
import { ActivityIndicator, View, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import { UserProvider } from "./src/context/UserContext";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import * as SplashScreen from 'expo-splash-screen';
import CustomSplashScreen from './src/components/SplashScreen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_900Black,
  });

  // hide splash when fonts ready
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // show loading when fonts not loaded
  if (!fontsLoaded) {
    return null;
  }

  const isWeb = Platform.OS === 'web';

  // show custom splash screen
  if (showCustomSplash && !isWeb) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <CustomSplashScreen onFinish={() => setShowCustomSplash(false)} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <UserProvider>
          <FavoritesProvider>
            <SafeAreaProvider>
              <AppNavigator />
            </SafeAreaProvider>
          </FavoritesProvider>
        </UserProvider>
      </ThemeProvider>
    </View>
  );
}