import { StyleSheet } from 'react-native';

export const createGridStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  item: {
    width: '100%',
  },
});