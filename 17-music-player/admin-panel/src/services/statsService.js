import httpClient from '../api/httpClient';
import { ADMIN_PAGE_LIMIT } from '../constants/pagination';
import { listPublicPlaylists } from './playlistService';
import { listSongs } from './songService';

const safeCount = async (loader, accessor = (data) => data.items || []) => {
  try {
    const result = await loader();
    const collection = accessor(result);
    return Array.isArray(collection) ? collection.length : 0;
  } catch (_error) {
    return 0;
  }
};

export const loadAdminStats = async () => {
  try {
    const { data } = await httpClient.get('/stats/overview');
    return data.data;
  } catch (_error) {
    const songsData = await safeCount(() => listSongs({ limit: ADMIN_PAGE_LIMIT }));
    const playlistsData = await safeCount(() => listPublicPlaylists({ limit: ADMIN_PAGE_LIMIT }));

    return {
      songs: songsData,
      playlists: playlistsData,
      artists: 0,
      albums: 0,
      genres: 0,
      users: 0,
      uploads: 0,
      totalCatalog: songsData,
      activityIndex: playlistsData
    };
  }
};
