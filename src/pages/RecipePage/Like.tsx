// src/components/Like.tsx
import React, { useEffect, useState } from 'react';
import likeService from '../../services/likeService';


interface LikeProps {
  recipeId: number;
}

const Like: React.FC<LikeProps> = ({ recipeId }) => {
  const [likes, setLikes] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const likeCount = await likeService.getRecipeLikes(recipeId);
        setLikes(likeCount);
      } catch (err) {
        console.error("Error fetching likes:", err);
        setError("Failed to fetch likes");
      }
    };

    fetchLikes();
  }, [recipeId]);

  const handleLike = async () => {
    try {
      const userId = Number(localStorage.getItem("userId")); // Assume user ID is stored in local storage
      await likeService.likeRecipe({ userId, recipeId });
      setLikes(likes + 1);
    } catch (err) {
      console.error("Error liking recipe:", err);
      setError("Failed to like the recipe");
    }
  };

  const handleUnlike = async () => {
    try {
      const userId = Number(localStorage.getItem("userId")); // Assume user ID is stored in local storage
      await likeService.unlikeRecipe({ userId, recipeId });
      setLikes(likes - 1);
    } catch (err) {
      console.error("Error unliking recipe:", err);
      setError("Failed to unlike the recipe");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={handleLike}>
        Like
      </button>
      <button className="btn btn-secondary" onClick={handleUnlike}>
        Unlike
      </button>
      <p>{likes} Likes</p>
    </div>
  );
};

export default Like;
