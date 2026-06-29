import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';

export const genreService = {
  list: async () => {
    const { data } = await httpClient.get('/genres', { params: { limit: ADMIN_PAGE_LIMIT } });
    return data.data.items || [];
  },
  create: async (payload) => {
    const { data } = await httpClient.post('/genres', payload);
    return data.data.genre;
  },
  update: async (id, payload) => {
    const { data } = await httpClient.patch(`/genres/${id}`, payload);
    return data.data.genre;
  },
  remove: async (id) => {
    await httpClient.delete(`/genres/${id}`);
    return true;
  }
};
