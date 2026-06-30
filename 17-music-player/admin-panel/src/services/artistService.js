import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';

export const artistService = {
  list: async (params = {}) => {
    const { data } = await httpClient.get('/artists', {
      params: {
        limit: ADMIN_PAGE_LIMIT,
        ...params
      }
    });
    return data.data;
  },
  create: async (payload) => {
    const { data } = await httpClient.post('/artists', payload);
    return data.data.artist;
  },
  update: async (id, payload) => {
    const { data } = await httpClient.patch(`/artists/${id}`, payload);
    return data.data.artist;
  },
  remove: async (id) => {
    await httpClient.delete(`/artists/${id}`);
    return true;
  }
};
