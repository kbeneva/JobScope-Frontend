import { useState, useEffect, useRef } from "react";
import { View, TextInput, TouchableOpacity, Modal, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import { useTheme } from "../styles/theme";
import Button from "./Button";
import { createSearchBarStyles } from "../styles/components/searchBarStyles";
import Accordion from "./Accordion";


export default function SearchBar({
  onFilterApply,
  onSearchSubmit,
  placeholder = "Search job...",
  initialQuery = "",
  initialFilters = {},
}) {

  const theme = useTheme();
  const styles = createSearchBarStyles(theme);
  const [searchText, setSearchText] = useState(initialQuery);
  const [modalVisible, setModalVisible] = useState(false);

  const [filters, setFilters] = useState({
    fullTime: initialFilters.jobType?.includes('Full-time') || false,
    partTime: initialFilters.jobType?.includes('Part-time') || false,
    contract: initialFilters.jobType?.includes('Contract') || false,
    internship: initialFilters.jobType?.includes('Internship') || false,

    entry: initialFilters.experience?.includes('Entry') || false,
    intermediate: initialFilters.experience?.includes('Intermediate') || false,
    senior: initialFilters.experience?.includes('Senior') || false,
    lead: initialFilters.experience?.includes('Lead') || false,
  });

  const handleSubmitSearch = () => {
    const apiFilters = buildApiFilters(searchText, filters);

    if (onSearchSubmit) {
      onSearchSubmit(apiFilters);
    }
    else if (onFilterApply) {
      onFilterApply(apiFilters);
    }
  };

  const handleFilterApply = () => {
    const apiFilters = buildApiFilters(searchText, filters);

    setModalVisible(false);

    if (onSearchSubmit) {
      onSearchSubmit(apiFilters);
    }
    else if (onFilterApply) {
      onFilterApply(apiFilters);
    }
  };

  // Reset filters
  const handleReset = () => {
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
    setSearchText('');
    const apiFilters = buildApiFilters('', resetFilters);

    setModalVisible(false);

    if (onSearchSubmit) {
      onSearchSubmit(apiFilters);
    } else if (onFilterApply) {
      onFilterApply(apiFilters);
    }
  };

  const toggleFilter = key => {
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
            onPress={(e) => e.stopPropagation()}
          >
            <View style={[
              styles.modalContent,
              { backgroundColor: theme.colors.bar }
            ]}>

              <View style={styles.filtersContainer}>
                {/* Job Type */}
                <Accordion title="Job Type">
                  <CheckBoxItem
                    label="Full-time"
                    checked={filters.fullTime}
                    onToggle={() => toggleFilter("fullTime")}
                    backgroundColor={theme.colors.secondary}
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
                  textStyle={{ color: theme.colors.textPrimary }}
                  style={{ flex: 1, marginRight: 8 }}
                />
                <Button
                  title="Update"
                  onPress={handleFilterApply}
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
        onPress={onToggle}
      >
        {label}
      </Text>
    </View>
  );
}