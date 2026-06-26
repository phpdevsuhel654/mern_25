import httpClient from '../api/httpClient';

export const genreService = {
  list: async () => {
    const { data } = await httpClient.get('/genres', { params: { limit: 200 } });
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
