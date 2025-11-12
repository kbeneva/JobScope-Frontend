import React from "react";
import { Text, TextInput, View } from "react-native";
import { useTheme } from '../styles/theme';
import { createSearchBarStyles } from '../../styles/components/searchBarStyles';

export default function SearchBar({}) {
  const theme = useTheme();
  const styles = createSearchBarStyles(theme);

  return (
    <TextInput
      style={styles.input}
      placeholder="Search jobs"
      placeholderTextColor={theme.colors.textSecondary}
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    />
  );
};
