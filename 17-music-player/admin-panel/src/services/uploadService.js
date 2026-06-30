import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';

export const uploadService = {
  list: async () => {
    const { data } = await httpClient.get('/uploads', { params: { limit: ADMIN_PAGE_LIMIT } });
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

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await httpClient.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return data.data.url;
};
