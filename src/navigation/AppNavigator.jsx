import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import JobsScreen from "../screens/JobsScreen";
import MarketScreen from "../screens/MarketScreen";
import ProfileScreen from "../screens/ProfileScreen";

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
                tabBarStyle: { height: 60, backgroundColor: tabBarColor },
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
                component={JobsScreen}
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
                component={MarketScreen}
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
    const { theme } = useContext(ThemeContext);

    return (
        <NavigationContainer theme={theme === "light" ? DefaultTheme : DarkTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Tabs"
                    component={Tabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}