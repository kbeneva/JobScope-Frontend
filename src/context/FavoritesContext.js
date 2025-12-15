import React, { createContext, useContext, useState, useEffect } from "react";
import { favoritesService } from "../services/favoritesService";
import { useUser } from "./UserContext";

const FavoritesContext = createContext(undefined);

export const FavoritesProvider = ({ children }) => {
  const { isAuthenticated } = useUser();
  const [favoriteJobIds, setFavoriteJobIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setFavoriteJobIds(new Set());
    }
  }, [isAuthenticated]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await favoritesService.getFavorites(1, 1000);
      const favorites = response.items || response.favorites || [];
      const ids = new Set(favorites.map(job => job._id || job.id));
      setFavoriteJobIds(ids);
    } catch (error) {
      setFavoriteJobIds(new Set());
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (jobId) => {
    try {
      await favoritesService.addFavorite(jobId);
      setFavoriteJobIds(prev => new Set([...prev, jobId]));
      return true;
    } catch (error) {
      throw error;
    }
  };

  const removeFavorite = async (jobId) => {
    try {
      await favoritesService.removeFavorite(jobId);
      setFavoriteJobIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
      return true;
    } catch (error) {
      throw error;
    }
  };

  const toggleFavorite = async (jobId, currentState) => {
    if (currentState) {
      return await removeFavorite(jobId);
    } else {
      return await addFavorite(jobId);
    }
  };

  const isFavorite = (jobId) => {
    return favoriteJobIds.has(jobId);
  };

  const refreshFavorites = () => {
    if (isAuthenticated) {
      loadFavorites();
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteJobIds,
        loading,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        refreshFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};