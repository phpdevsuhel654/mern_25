import React from 'react';

import EntityManagementPage from '../components/EntityManagementPage';
import { artistService } from '../services/artistService';

const ArtistManagementPage = () => {
  return (
    <EntityManagementPage
      title="Artists"
      description="Create and manage artist records for the catalog."
      service={artistService}
      fields={[
        { name: 'name', label: 'Artist Name' },
        { name: 'bio', label: 'Bio', type: 'textarea' }
      ]}
      tableColumns={[
        { key: 'name', label: 'Artist', render: (item) => item.name || '-' },
        { key: 'bio', label: 'Bio', render: (item) => item.bio || '-' }
      ]}
      emptyStateText="No artists added yet."
    />
  );
};

export default ArtistManagementPage;
