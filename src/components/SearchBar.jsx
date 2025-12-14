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
    Junior: defaultFilters.experience?.includes('Junior') || false,
    Mid: defaultFilters.experience?.includes('Mid') || false,
    senior: defaultFilters.experience?.includes('Senior') || false,
    lead: defaultFilters.experience?.includes('Lead') || false,
  });


  // ✅ Appelé sur Enter (redirection depuis HomeScreen)
  const handleSubmitSearch = () => {
    const apiFilters = buildApiFilters(searchText, filters);

    console.log('🚀 SearchBar: Submit (Enter pressed):', apiFilters);
    console.log('   onSearchSubmit exists?', !!onSearchSubmit);
    console.log('   onFilterApply exists?', !!onFilterApply);

    // Si onSearchSubmit existe (HomeScreen), redirige vers Jobs
    if (onSearchSubmit) {
      console.log('   → Calling onSearchSubmit (redirect to Jobs)');
      onSearchSubmit(apiFilters);
    }
    // Sinon si onFilterApply existe (JobsScreen), applique les filtres
    else if (onFilterApply) {
      console.log('   → Calling onFilterApply (apply filters)');
      onFilterApply(apiFilters);
    }
    else {
      console.warn('   ⚠️ No handler defined!');
    }
  };

  // Appelé quand on clique "Update" dans le modal
  const handleFilterApply = () => {
    const apiFilters = buildApiFilters(searchText, filters);

    console.log('✅ SearchBar: Update clicked:', apiFilters);
    console.log('   onSearchSubmit exists?', !!onSearchSubmit);
    console.log('   onFilterApply exists?', !!onFilterApply);

    setModalVisible(false);

    // Si onSearchSubmit existe (HomeScreen), redirige vers Jobs
    if (onSearchSubmit) {
      console.log('   → Calling onSearchSubmit (redirect to Jobs)');
      onSearchSubmit(apiFilters);
    }
    // Sinon si onFilterApply existe (JobsScreen), applique les filtres
    else if (onFilterApply) {
      console.log('   → Calling onFilterApply (apply filters)');
      onFilterApply(apiFilters);
    }
    else {
      console.warn('   ⚠️ No handler defined!');
    }
  };

  // Reset des filtres
  const handleReset = () => {
    console.log('🔄 SearchBar: Reset clicked');

    const resetFilters = {
      fullTime: false,
      partTime: false,
      contract: false,
      internship: false,
      Junior: false,
      Mid: false,
      senior: false,
      lead: false,
    };

    setFilters(resetFilters);
    setSearchText(''); // Vider aussi le texte
    const apiFilters = buildApiFilters('', resetFilters);

    console.log('   Reset filters:', apiFilters);

    setModalVisible(false);

    if (onSearchSubmit) {
      console.log('   → Calling onSearchSubmit');
      onSearchSubmit(apiFilters);
    } else if (onFilterApply) {
      console.log('   → Calling onFilterApply');
      onFilterApply(apiFilters);
    }
  };

  const toggleFilter = (key) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: !prev[key] };
      console.log('🎛️ Filter toggled:', key, '→', newFilters[key]);
      return newFilters;
    });
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
    if (uiFilters.Junior) apiFilters.experience.push('Junior');
    if (uiFilters.Mid) apiFilters.experience.push('Mid');
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
          <TouchableOpacity
            style={{ width: '100%' }}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}  // ← Empêche la fermeture du modal
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
                    label="Junior"
                    checked={filters.Junior}
                    onToggle={() => toggleFilter("Junior")}
                  />
                  <CheckBoxItem
                    label="Intermediate"
                    checked={filters.Mid}
                    onToggle={() => toggleFilter("Mid")}
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
                  onPress={() => {
                    console.log('🔘🔘🔘 UPDATE BUTTON CLICKED 🔘🔘🔘');
                    handleFilterApply();
                  }}
                  size="small"
                  style={{ flex: 1, marginLeft: 8 }}
                />
              </View>
            </View></TouchableOpacity>
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