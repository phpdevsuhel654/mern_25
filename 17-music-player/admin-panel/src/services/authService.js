import httpClient from '../api/httpClient';

export const loginAdmin = async (payload) => {
  const { data } = await httpClient.post('/auth/login', payload);
  return data.data;
};

export const checkAdmin = async () => {
  const { data } = await httpClient.get('/auth/admin/check');
  return data.data.allowed;
};

export const getProfile = async () => {
  const { data } = await httpClient.get('/auth/me');
  return data.data.user;
};
