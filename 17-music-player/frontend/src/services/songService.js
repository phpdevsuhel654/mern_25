import httpClient from '../api/httpClient';

export const listSongs = async (params = {}) => {
  const { data } = await httpClient.get('/songs', { params });
  return data.data;
};

export const getSong = async (id) => {
  const { data } = await httpClient.get(`/songs/${id}`);
  return data.data.song;
};
