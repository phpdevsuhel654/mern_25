import httpClient from '../api/httpClient';

export const listSongs = async (params = {}) => {
  const { data } = await httpClient.get('/songs', { params });
  return data.data;
};

export const createSong = async (payload) => {
  const { data } = await httpClient.post('/songs', payload);
  return data.data.song;
};

export const updateSongStatus = async (songId, isActive) => {
  const { data } = await httpClient.patch(`/songs/${songId}/status`, { isActive });
  return data.data.song;
};

export const archiveSong = async (songId) => {
  const { data } = await httpClient.delete(`/songs/${songId}`);
  return data.data;
};
