// components/SearchBar.js
import { useState } from "react";
import { View, TextInput, TouchableOpacity, Modal, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import { useTheme } from "../styles/theme";
import Button from "./Button";
import { createSearchBarStyles } from "../styles/components/searchBarStyles";
import Accordion from "./Accordion";

export default function SearchBar({ onSearch, onFilterApply, onSearchSubmit, placeholder = "Search job...", defaultQuery = "", defaultFilters = {}, }) {
  const theme = useTheme();
  const styles = createSearchBarStyles(theme);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [filters, setFilters] = useState({
    // Job Type
    fullTime: defaultFilters.jobType?.includes('Full-time') || false,
    partTime: defaultFilters.jobType?.includes('Part-time') || false,
    contract: defaultFilters.jobType?.includes('Contract') || false,
    internship: defaultFilters.jobType?.includes('Internship') || false,

    // Experience
    entry: defaultFilters.experience?.includes('Entry') || false,
    intermediate: defaultFilters.experience?.includes('Intermediate') || false,
    senior: defaultFilters.experience?.includes('Senior') || false,
    lead: defaultFilters.experience?.includes('Lead') || false,
  });

  const handleSearch = (text) => {
    setSearchText(text);
    const apiFilters = buildApiFilters(text, filters);
    onSearch?.(apiFilters);
  };

  const handleSubmitSearch = () => {
    const apiFilters = buildApiFilters(searchText, filters);
    console.log('🚀 Submit Search:', apiFilters);
    onSearchSubmit?.(apiFilters);
  };

  const handleFilterApply = () => {
    const apiFilters = buildApiFilters(searchText, filters);
    onFilterApply?.(apiFilters);
    setModalVisible(false);
  };

  const handleReset = () => {
    const resetFilters = {
      fullTime: false,
      partTime: false,
      contract: false,
      internship: false,
      entry: false,
      intermediate: false,
      senior: false,
      lead: false,
    };

    setFilters(resetFilters);
    const apiFilters = buildApiFilters(searchText, resetFilters);

    onFilterApply?.(apiFilters);
    setModalVisible(false);
  };

  const toggleFilter = (key) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const buildApiFilters = (title, uiFilters) => {
    const apiFilters = {
      title: title || undefined,
      jobType: [],
      experience: [],
    };

    // Job Type
    if (uiFilters.fullTime) apiFilters.jobType.push('Full-time');
    if (uiFilters.partTime) apiFilters.jobType.push('Part-time');
    if (uiFilters.contract) apiFilters.jobType.push('Contract');
    if (uiFilters.internship) apiFilters.jobType.push('Internship');

    // Experience
    if (uiFilters.entry) apiFilters.experience.push('Entry');
    if (uiFilters.intermediate) apiFilters.experience.push('Intermediate');
    if (uiFilters.senior) apiFilters.experience.push('Senior');
    if (uiFilters.lead) apiFilters.experience.push('Lead');

    if (apiFilters.jobType.length === 0) delete apiFilters.jobType;
    if (apiFilters.experience.length === 0) delete apiFilters.experience;
    if (!apiFilters.title) delete apiFilters.title;

    return apiFilters;
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
          onChangeText={setSearchText}
          onSubmitEditing={handleSubmitSearch}
          returnKeyType="search"
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
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={[
            styles.modalContent,
          ]}>

            <View style={styles.filtersContainer}>
              {/* Job Type */}
              <Accordion title="Job Type">
                <CheckBoxItem
                  label="Full-time"
                  checked={filters.fullTime}
                  onToggle={() => toggleFilter("fullTime")}
                />
                <CheckBoxItem
                  label="Part-time"
                  checked={filters.partTime}
                  onToggle={() => toggleFilter("partTime")}
                />
                <CheckBoxItem
                  label="Contract"
                  checked={filters.contract}
                  onToggle={() => toggleFilter("contract")}
                />
                <CheckBoxItem
                  label="Internship"
                  checked={filters.internship}
                  onToggle={() => toggleFilter("internship")}
                />
              </Accordion>

              {/* Experience Level */}
              <Accordion title="Experience Level">
                <CheckBoxItem
                  label="Entry"
                  checked={filters.entry}
                  onToggle={() => toggleFilter("entry")}
                />
                <CheckBoxItem
                  label="Intermediate"
                  checked={filters.intermediate}
                  onToggle={() => toggleFilter("intermediate")}
                />
                <CheckBoxItem
                  label="Senior"
                  checked={filters.senior}
                  onToggle={() => toggleFilter("senior")}
                />
                <CheckBoxItem
                  label="Lead"
                  checked={filters.lead}
                  onToggle={() => toggleFilter("lead")}
                />
              </Accordion>
            </View>

            <View style={styles.modalButtons}>
              <Button
                title="Reset"
                onPress={handleReset}
                variant="outline"
                size="small"
                style={{ flex: 1, marginRight: 8 }}
              />
              <Button
                title="Update"
                onPress={handleFilterApply}
                size="small"
                style={{ flex: 1, marginLeft: 8 }}
              />
            </View>
          </View>
        </TouchableOpacity>
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