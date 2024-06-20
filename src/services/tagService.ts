// src/services/tagService.ts
import apiClient from './apiClient';

export interface Tag {
  id: number;
  name: string;
}

const tagService = {
  getAllTags: async (): Promise<Tag[]> => {
    try {
      const response = await apiClient.get('/recipes/tags');
      return response.data.data;
    } catch (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }
  },
  addTag: async (tag: Omit<Tag, 'id'>): Promise<Tag> => {
    try {
      const response = await apiClient.post('/recipes/tags', tag);
      return response.data.data;
    } catch (error) {
      console.error("Error adding tag:", error);
      throw error;
    }
  },
  deleteTag: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/recipes/tags/${id}`);
    } catch (error) {
      console.error("Error deleting tag:", error);
      throw error;
    }
  },
};

export default tagService;
