import { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";

export default function SettingsScreen() {
    const { theme, toggleTheme, colors } = useContext(ThemeContext);

    return (  
        <></>
    );
}