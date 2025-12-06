// components/SearchBar.js
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Modal, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import { useTheme } from "../styles/theme";
import Button from "./Button";
import { createSearchBarStyles } from "../styles/components/searchBarStyles";

export default function SearchBar({ onSearch, onFilterApply, placeholder = "Rechercher..." }) {
  const theme = useTheme();
  const styles = createSearchBarStyles(theme);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  
  const [filters, setFilters] = useState({
    fullTime: false,
    partTime: false,
    remote: false,
    onSite: false,
  });

  const handleSearch = (text) => {
    setSearchText(text);
    onSearch?.(text);
  };

  const handleFilterApply = () => {
    onFilterApply?.(filters);
    setModalVisible(false);
  };

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <View style={[styles.searchContainer]}>
        <FontAwesome 
          name="search" 
          size={20} 
          color={theme.colors.textSecondary} 
          style={styles.searchIcon}
        />

        <TextInput
          style={[
            styles.input,
            { 
              color: theme.colors.textPrimary,
              flex: 1,
            }
          ]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={searchText}
          onChangeText={handleSearch}
        />

        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          style={styles.filterButton}
        >
          <FontAwesome 
            name="sliders" 
            size={20} 
            color={theme.colors.textSecondary} 
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[
            styles.modalContent,
          ]}>
            <Text style={[
              styles.modalTitle,
              { color: theme.colors.textPrimary }
            ]}>
              Filtres
            </Text>

            <View style={styles.filtersContainer}>
              <CheckBoxItem
                label="Full time"
                checked={filters.fullTime}
                onToggle={() => toggleFilter('fullTime')}
              />
              <CheckBoxItem
                label="Part time"
                checked={filters.partTime}
                onToggle={() => toggleFilter('partTime')}
              />
              <CheckBoxItem
                label="Remote"
                checked={filters.remote}
                onToggle={() => toggleFilter('remote')}
              />
              <CheckBoxItem
                label="On ite"
                checked={filters.onSite}
                onToggle={() => toggleFilter('onSite')}
              />
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Annuler"
                onPress={() => setModalVisible(false)}
                variant="secondary"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Appliquer"
                onPress={handleFilterApply}
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

// Composant CheckBox item avec Expo Checkbox
function CheckBoxItem({ label, checked, onToggle }) {
  const theme = useTheme();
  const styles = createSearchBarStyles(theme);

  return (
    <View style={styles.checkboxRow}>
      <Checkbox
        value={checked}
        onValueChange={onToggle}
        color={checked ? theme.colors.primary : undefined}
        style={styles.checkbox}
      />
      <Text 
        style={[
          styles.checkboxLabel,
          { color: theme.colors.textPrimary }
        ]}
        onPress={onToggle} // Permet de cliquer sur le texte aussi
      >
        {label}
      </Text>
    </View>
  );
}