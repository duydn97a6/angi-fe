import { apiClient } from './client';

export const feedbackApi = {
  submit: async (data: {
    mealId: string;
    emoji: 'sad' | 'neutral' | 'happy';
    regretLevel: 'none' | 'slight' | 'high';
    tags?: string[];
  }) => {
    const response = await apiClient.post('/feedback', data);
    return response.data;
  },
};
