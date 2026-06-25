import httpClient from '../api/httpClient';

export const listPublicPlaylists = async (params = {}) => {
  const { data } = await httpClient.get('/playlists/public', { params });
  return data.data;
};
