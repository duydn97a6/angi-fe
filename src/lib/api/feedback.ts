import { apiClient } from './client';

export const feedbackApi = {
  submit: async (data: {
    recommendationId: string;
    restaurantId: string;
    dishId?: string;
    emoji: string;
    regretLevel?: 'none' | 'slight' | 'high';
    tags?: string[];
    notes?: string;
  }) => {
    const response = await apiClient.post('/feedback', data);
    return response.data;
  },

  getPending: async () => {
    const response = await apiClient.get('/feedback/pending');
    return response.data;
  },
};
