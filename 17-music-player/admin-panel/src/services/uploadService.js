import httpClient from '../api/httpClient';

export const uploadService = {
  list: async () => {
    const { data } = await httpClient.get('/uploads');
    return data.data.items || [];
  },
  create: async (payload) => {
    const { data } = await httpClient.post('/uploads', payload);
    return data.data.upload;
  },
  update: async (id, payload) => {
    const { data } = await httpClient.patch(`/uploads/${id}`, payload);
    return data.data.upload;
  },
  remove: async (id) => {
    await httpClient.delete(`/uploads/${id}`);
    return true;
  }
};
