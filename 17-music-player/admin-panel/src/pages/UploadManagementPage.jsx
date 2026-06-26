import React from 'react';

import EntityManagementPage from '../components/EntityManagementPage';
import { uploadService } from '../services/uploadService';

const UploadManagementPage = () => {
  return (
    <EntityManagementPage
      title="Uploads"
      description="Track uploaded files and processing lifecycle metadata."
      service={uploadService}
      fields={[
        { name: 'fileName', label: 'File Name' },
        {
          name: 'fileType',
          label: 'File Type',
          type: 'select',
          defaultValue: 'audio',
          options: [
            { label: 'Audio', value: 'audio' },
            { label: 'Cover', value: 'cover' }
          ]
        },
        { name: 'sizeMb', label: 'Size (MB)', type: 'number' },
        {
          name: 'source',
          label: 'Source',
          type: 'select',
          defaultValue: 'local',
          options: [
            { label: 'Local', value: 'local' },
            { label: 'External URL', value: 'external' }
          ]
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          defaultValue: 'processing',
          options: [
            { label: 'Processing', value: 'processing' },
            { label: 'Processed', value: 'processed' },
            { label: 'Failed', value: 'failed' }
          ]
        }
      ]}
      tableColumns={[
        { key: 'fileName', label: 'File', render: (item) => item.fileName || '-' },
        { key: 'fileType', label: 'Type', render: (item) => item.fileType || '-' },
        { key: 'sizeMb', label: 'Size (MB)', render: (item) => item.sizeMb || '-' },
        { key: 'source', label: 'Source', render: (item) => item.source || '-' },
        { key: 'status', label: 'Status', render: (item) => item.status || '-' }
      ]}
      emptyStateText="No uploads tracked yet."
    />
  );
};

export default UploadManagementPage;
