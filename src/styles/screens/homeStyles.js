import { StyleSheet } from 'react-native';

export const createHomeStyles = (theme) => StyleSheet.create({
  webContainer: {
    maxWidth: 1600,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  jobsContainer: {
    width: '100%',
  },
  jobsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'flex-start',
  },
  jobCardWrapper: {
    width: '100%',
  },
});