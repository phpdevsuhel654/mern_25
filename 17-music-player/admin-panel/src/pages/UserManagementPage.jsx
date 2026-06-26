import React from 'react';

import EntityManagementPage from '../components/EntityManagementPage';
import { userService } from '../services/userService';

const UserManagementPage = () => {
  return (
    <EntityManagementPage
      title="Users"
      description="Manage user account state and role assignments."
      service={userService}
      fields={[
        { name: 'fullName', label: 'Full Name' },
        { name: 'username', label: 'Username' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password (required for create)', type: 'password' },
        {
          name: 'role',
          label: 'Role',
          type: 'select',
          defaultValue: 'user',
          options: [
            { label: 'User', value: 'user' },
            { label: 'Admin', value: 'admin' }
          ]
        },
        {
          name: 'status',
          label: 'Status',
          type: 'select',
          defaultValue: 'active',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Suspended', value: 'suspended' }
          ]
        }
      ]}
      tableColumns={[
        { key: 'fullName', label: 'Name', render: (item) => item.fullName || '-' },
        { key: 'email', label: 'Email', render: (item) => item.email || '-' },
        { key: 'role', label: 'Role', render: (item) => item.role || '-' },
        { key: 'status', label: 'Status', render: (item) => item.status || '-' }
      ]}
      emptyStateText="No users found."
    />
  );
};

export default UserManagementPage;
