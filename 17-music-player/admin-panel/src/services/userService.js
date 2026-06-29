import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';

export const userService = {
  list: async () => {
    const { data } = await httpClient.get('/users', { params: { limit: ADMIN_PAGE_LIMIT } });
    return data.data.items || [];
  },
  create: async (payload) => {
    const { data } = await httpClient.post('/users', payload);
    return data.data.user;
  },
  update: async (id, payload) => {
    const { data } = await httpClient.patch(`/users/${id}`, payload);
    return data.data.user;
  },
  remove: async (id) => {
    await httpClient.delete(`/users/${id}`);
    return true;
  }
};
