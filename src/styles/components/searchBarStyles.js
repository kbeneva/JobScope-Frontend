import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

export const createSearchBarStyles = (theme) =>
  StyleSheet.create({
  wrapper: {
      position: 'relative', 
      borderRadius: 12,     
      marginBottom: 20,
    },
       shadowLayer: {
      position: 'absolute',
      top: -7,
      left: -7,
      right: -7,
      bottom: -7,
      borderRadius: 17,
      backgroundColor: 'rgba(237, 246, 249, 0.3)',
      zIndex: 0,
    },

    

    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.sm,
      height: 48,
      borderRadius: 12,
      backgroundColor: theme.colors.bar,
      zIndex: 2,                
    },

    searchIcon: {
      marginRight: 12,
    },

    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      color: theme.colors.textPrimary,
      paddingVertical: 0,
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
      backgroundColor: theme.colors.bar,
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
      borderColor: '#ffffffff',
      padding: theme.spacing.md,
      flexDirection: 'row',
      marginTop: 'auto',
    },
  });
