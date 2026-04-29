import { apiClient } from './client';

export const groupApi = {
  getAll: async () => {
    const response = await apiClient.get('/groups');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/groups/${id}`);
    return response.data;
  },

  create: async (data: { name: string; description?: string }) => {
    const response = await apiClient.post('/groups', data);
    return response.data;
  },

  invite: async (groupId: string, email: string) => {
    const response = await apiClient.post(`/groups/${groupId}/invite`, { email });
    return response.data;
  },

  vote: async (groupId: string, pollId: string, restaurantId: string) => {
    const response = await apiClient.post(`/groups/${groupId}/polls/${pollId}/vote`, { restaurantId });
    return response.data;
  },

  veto: async (groupId: string, pollId: string, restaurantId: string, reason: string) => {
    const response = await apiClient.post(`/groups/${groupId}/polls/${pollId}/veto`, { restaurantId, reason });
    return response.data;
  },
};
