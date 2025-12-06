import React, { createContext, useState, useMemo } from 'react';
import { lightColors, darkColors } from '../styles/colors';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const baseColors = useMemo(() => {
  return theme === 'light' ? lightColors : darkColors;
}, [theme]);

 const colors = useMemo(
  () => ({
    ...baseColors,

    // Aliases utilisés par les écrans/components
    text: baseColors.textPrimary,            // utilisé partout dans le Profil
    border: baseColors.tag,                  // séparateurs/traits fins
    iconPrimary: baseColors.icon,            // icônes principales (liste)
    iconSecondary: baseColors.textSecondary, // icônes secondaires
  }),
  [baseColors]
);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}