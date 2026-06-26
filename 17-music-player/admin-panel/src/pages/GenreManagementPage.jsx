import React from 'react';

import EntityManagementPage from '../components/EntityManagementPage';
import { genreService } from '../services/genreService';

const GenreManagementPage = () => {
  return (
    <EntityManagementPage
      title="Genres"
      description="Maintain genre taxonomy used in search and recommendations."
      service={genreService}
      fields={[
        { name: 'name', label: 'Genre Name' },
        { name: 'description', label: 'Description', type: 'textarea' }
      ]}
      tableColumns={[
        { key: 'name', label: 'Genre', render: (item) => item.name || '-' },
        { key: 'description', label: 'Description', render: (item) => item.description || '-' }
      ]}
      emptyStateText="No genres found."
    />
  );
};

export default GenreManagementPage;
