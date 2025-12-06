// navigation/AppNavigator.jsx
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, View } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import JobsScreen from "../screens/JobsScreen";
import MarketScreen from "../screens/MarketScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import DetailsScreen from "../screens/DetailsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
    const { colors, theme } = useContext(ThemeContext);
    const tabBarColor = theme === "light" ? "#fff" : "#222";
   

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.iconSecondary,
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: tabBarColor },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Graphs"
                component={MarketScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons
                            name={focused ? "bar-chart" : "bar-chart-outline"}
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Jobs"
                component={JobsScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons
                            name={focused ? "briefcase" : "briefcase-outline"}
                            size={size}
                            color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (
                        <Ionicons
                            name={focused ? "person-circle" : "person-circle-outline"}
                            size={size}
                            color={color} />
                    ),
                }}
            />
          

        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const { theme, colors } = useContext(ThemeContext);
    const { isLoading } = useUser();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <NavigationContainer theme={theme === "light" ? DefaultTheme : DarkTheme}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Details" component={DetailsScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}