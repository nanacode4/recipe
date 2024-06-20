// src/components/FavoriteButton.tsx
import React, { useState, useEffect } from 'react';
import favoriteService, { Favorite } from '../../services/favoriteService';

interface FavoriteButtonProps {
  recipeId: number;
  initialIsFavorited?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ recipeId, initialIsFavorited = false }) => {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [error, setError] = useState<string | null>(null);

  const handleAddToFavorites = async () => {
    try {
      await favoriteService.addToFavorites(recipeId);
      setIsFavorited(true);
    } catch (error) {
      setError("Failed to add to favorites");
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      await favoriteService.removeFromFavorites(recipeId);
      setIsFavorited(false);
    } catch (error) {
      setError("Failed to remove from favorites");
    }
  };

  return (
    <div>
      {error && <div className="alert alert-danger">{error}</div>}
      {isFavorited ? (
        <button className="btn btn-danger" onClick={handleRemoveFromFavorites}>
          Remove from Favorites
        </button>
      ) : (
        <button className="btn btn-primary" onClick={handleAddToFavorites}>
          Add to Favorites
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;
