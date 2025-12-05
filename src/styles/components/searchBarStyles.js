import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const createSearchBarStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    ...theme.typography.input,
    color: theme.colors.textSecondary,
    paddingVertical: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    borderRadius: 12,
    backgroundColor: theme.colors.bar,
    borderRadius: 8,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    // ...Platform.select({
    //   web: {
    //     outlineStyle: 'none',
    //   },
    // }),
  },
  filterButton: {
    padding: 8,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    padding: 24,
    // backgroundColor: '#fff',
    width: screenWidth > 768 ? 400 : '90%',
    backgroundColor: theme.colors.cardBackground,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 24,
  },
  filtersContainer: {
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
});