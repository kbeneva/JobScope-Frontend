import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Bookmark from '../../src/components/Bookmark';

// ✅ Mock navigation AVANT d'importer les autres modules
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: jest.fn(),
  };
});

// ✅ Mock des contextes
jest.mock('../../src/context/UserContext', () => ({
  useUser: jest.fn(),
}));

jest.mock('../../src/context/FavoritesContext', () => ({
  useFavorites: jest.fn(),
}));

// ✅ Mock du theme
jest.mock('../../src/styles/theme', () => ({
  useTheme: () => ({
    colors: { primary: '#007AFF' },
  }),
}));

// ✅ Import APRÈS les mocks
const { useNavigation } = require('@react-navigation/native');
const { useUser } = require('../../src/context/UserContext');
const { useFavorites } = require('../../src/context/FavoritesContext');

describe('Bookmark', () => {
  let mockNavigate;
  let mockToggleFavorite;
  let mockIsFavorite;

  beforeEach(() => {
    // ✅ Créer les mocks
    mockNavigate = jest.fn();
    mockToggleFavorite = jest.fn();
    mockIsFavorite = jest.fn();

    // ✅ Configurer useNavigation
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });

    // ✅ Configurer useFavorites
    useFavorites.mockReturnValue({
      isFavorite: mockIsFavorite,
      toggleFavorite: mockToggleFavorite,
    });

    // ✅ Mock Alert.alert
    jest.spyOn(Alert, 'alert');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should work when user is logged in', async () => {
    useUser.mockReturnValue({ isAuthenticated: true });
    mockIsFavorite.mockReturnValue(false);
    mockToggleFavorite.mockResolvedValue(true);

    const { getByRole } = render(<Bookmark jobId="job123" />);
    
    const button = getByRole('button');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith('job123', false);
    });
  });

  it('should show login alert when user is NOT logged in', () => {
    useUser.mockReturnValue({ isAuthenticated: false });
    mockIsFavorite.mockReturnValue(false);

    const { getByRole } = render(<Bookmark jobId="job123" />);
    
    const button = getByRole('button');
    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Login Required',
      'You need to be logged in to save job offers',
      expect.any(Array)
    );
    expect(mockToggleFavorite).not.toHaveBeenCalled();
  });
});