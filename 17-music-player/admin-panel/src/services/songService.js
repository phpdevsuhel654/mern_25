import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';

export const listSongs = async (params = {}) => {
  const { data } = await httpClient.get('/songs', {
    params: {
      limit: ADMIN_PAGE_LIMIT,
      ...params
    }
  });
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
