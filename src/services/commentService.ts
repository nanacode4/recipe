// src/services/commentService.ts
import apiClient from './apiClient';

export interface Comment {
  id: number;
  recipeId: number;
  userId: number;
  content: string;
  createdAt: string;
}

const commentService = {
  getRecipeComments: async (recipeId: number): Promise<Comment[]> => {
    
      const response = await apiClient.get('/recipes/comments', {
        params: { recipeId },
      });
      return response.data.data;
    
  },
  commentOnRecipe: async (comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
      const response = await apiClient.post('/recipes/comment', comment);
      return response.data.data;
    
  },
};

export default commentService;
