import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';

export const listPublicPlaylists = async (params = {}) => {
  const { data } = await httpClient.get('/playlists/public', {
    params: {
      limit: ADMIN_PAGE_LIMIT,
      ...params
    }
  });
  return data.data;
};
