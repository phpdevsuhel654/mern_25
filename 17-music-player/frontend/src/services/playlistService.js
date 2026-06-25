import httpClient from '../api/httpClient';

export const listMyPlaylists = async () => {
  const { data } = await httpClient.get('/playlists/mine/list');
  return data.data;
};

export const listPublicPlaylists = async (params = {}) => {
  const { data } = await httpClient.get('/playlists/public', { params });
  return data.data;
};

export const createPlaylist = async (payload) => {
  const { data } = await httpClient.post('/playlists', payload);
  return data.data.playlist;
};

export const getPlaylistDetail = async (id) => {
  const { data } = await httpClient.get(`/playlists/${id}`);
  return data.data;
};

export const addSongToPlaylist = async (id, payload) => {
  const { data } = await httpClient.post(`/playlists/${id}/songs`, payload);
  return data.data;
};
