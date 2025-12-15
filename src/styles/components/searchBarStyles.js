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
    paddingTop: 160,
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxLabel: {
    ...theme.typography.body,
    flex: 1,
  },
  modalButtons: {
    borderTopWidth: 1,
    borderColor: "#eee",
    padding: theme.spacing.md,
    flexDirection: 'row',
    marginTop: 'auto',
  },
  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  accordionTitle: {
    ...theme.typography.button,
    color: theme.colors.textPrimary
  },
  accordionContent: {
    paddingHorizontal: theme.spacing.md,
  },
});