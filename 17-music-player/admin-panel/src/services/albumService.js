import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';

export const albumService = {
  list: async () => {
    const { data } = await httpClient.get('/albums', { params: { limit: ADMIN_PAGE_LIMIT } });
    return data.data.items || [];
  },
  create: async (payload) => {
    const { data } = await httpClient.post('/albums', payload);
    return data.data.album;
  },
  update: async (id, payload) => {
    const { data } = await httpClient.patch(`/albums/${id}`, payload);
    return data.data.album;
  },
  remove: async (id) => {
    await httpClient.delete(`/albums/${id}`);
    return true;
  }
};
