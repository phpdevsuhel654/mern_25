import React from 'react';

import EntityManagementPage from '../components/EntityManagementPage';
import { albumService } from '../services/albumService';

const AlbumManagementPage = () => {
  return (
    <EntityManagementPage
      title="Albums"
      description="Manage albums and connect them to artists and release windows."
      service={albumService}
      fields={[
        { name: 'title', label: 'Album Title' },
        { name: 'artistId', label: 'Artist ID', type: 'number' },
        { name: 'releaseDate', label: 'Release Date', type: 'date' },
        { name: 'labelName', label: 'Label Name' },
        { name: 'totalTracks', label: 'Total Tracks', type: 'number' }
      ]}
      tableColumns={[
        { key: 'title', label: 'Album', render: (item) => item.title || '-' },
        { key: 'artistName', label: 'Artist', render: (item) => item.artistName || '-' },
        { key: 'releaseDate', label: 'Release Date', render: (item) => item.releaseDate || '-' },
        { key: 'totalTracks', label: 'Tracks', render: (item) => item.totalTracks || 0 }
      ]}
      emptyStateText="No albums created yet."
    />
  );
};

export default AlbumManagementPage;
