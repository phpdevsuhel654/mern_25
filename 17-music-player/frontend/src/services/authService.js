import httpClient from '../api/httpClient';

export const registerUser = async (payload) => {
  const { data } = await httpClient.post('/auth/register', payload);
  return data.data;
};

export const loginUser = async (payload) => {
  const { data } = await httpClient.post('/auth/login', payload);
  return data.data;
};

export const getMyProfile = async () => {
  const { data } = await httpClient.get('/auth/me');
  return data.data.user;
};
