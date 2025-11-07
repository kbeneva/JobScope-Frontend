import { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import { View, Text } from 'react-native';

export default function JobsScreen() {
    const { colors, theme } = useContext(ThemeContext);

    return (  
        <>
        <Text>Jobs</Text>
        </>
    );
}