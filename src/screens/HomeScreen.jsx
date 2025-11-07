import { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import { View, Text } from 'react-native';

export default function HomeScreen() {
    const { colors, theme } = useContext(ThemeContext);

    return (
        <>
            <Text>Profile</Text>
        </>
    );
}