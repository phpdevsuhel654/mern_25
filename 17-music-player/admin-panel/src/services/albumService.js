import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';

const ALBUM_PAGE_LIMIT = 10;

export const albumService = {
  list: async (params = {}) => {
    const {
      page = 1,
      limit = ALBUM_PAGE_LIMIT,
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = params;

    const { data } = await httpClient.get('/albums', {
      params: { page, limit, sortBy, sortOrder }
    });

    return data.data;
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
