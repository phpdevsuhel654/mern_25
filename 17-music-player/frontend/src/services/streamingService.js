import httpClient from '../api/httpClient';

export const getPlaybackState = async () => {
  const { data } = await httpClient.get('/stream/state');
  return data.data;
};

export const playSong = async (songId) => {
  const { data } = await httpClient.post('/stream/play', { songId });
  return data.data;
};

export const pausePlayback = async () => {
  const { data } = await httpClient.post('/stream/pause');
  return data.data;
};

export const resumePlayback = async () => {
  const { data } = await httpClient.post('/stream/resume');
  return data.data;
};

export const nextTrack = async () => {
  const { data } = await httpClient.post('/stream/next');
  return data.data;
};

export const previousTrack = async () => {
  const { data } = await httpClient.post('/stream/previous');
  return data.data;
};

export const setVolume = async (volumePercent) => {
  const { data } = await httpClient.patch('/stream/volume', { volumePercent });
  return data.data;
};

export const setPlaybackMode = async (payload) => {
  const { data } = await httpClient.patch('/stream/mode', payload);
  return data.data;
};

export const addQueueItem = async (payload) => {
  const { data } = await httpClient.post('/stream/queue', payload);
  return data.data;
};

export const clearQueue = async () => {
  const { data } = await httpClient.delete('/stream/queue');
  return data.data;
};
