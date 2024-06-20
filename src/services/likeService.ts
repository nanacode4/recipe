// src/services/likeService.ts
import apiClient from './apiClient';

export interface Like {
  userId: number;
  recipeId: number;
}

const likeService = {
  getRecipeLikes: async (recipeId: number): Promise<number> => {
    try {
      const response = await apiClient.get('/recipes/likes', {
        params: { recipeId },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching likes:", error);
      throw error;
    }
  },
  likeRecipe: async (like: Like): Promise<Like> => {
    try {
      const response = await apiClient.post('/recipes/like', like);
      return response.data.data;
    } catch (error) {
      console.error("Error liking recipe:", error);
      throw error;
    }
  },
  unlikeRecipe: async (like: Like): Promise<Like> => {
    try {
      const response = await apiClient.post('/recipes/unlike', like);
      return response.data.data;
    } catch (error) {
      console.error("Error unliking recipe:", error);
      throw error;
    }
  },
};

export default likeService;
