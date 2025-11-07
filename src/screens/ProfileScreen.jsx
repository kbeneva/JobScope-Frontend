import { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import { View, Text } from 'react-native';

export default function ProfileScreen() {
    const { colors, theme } = useContext(ThemeContext);

    return (  
        <>
        <Text>Home</Text>
        </>
    );
}