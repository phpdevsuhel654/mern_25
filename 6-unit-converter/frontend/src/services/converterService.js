import httpClient from '../api/httpClient';

export const convertUnit = async (payload) => {
  const { data } = await httpClient.post('/api/converter/convert', payload);
  return data;
};
