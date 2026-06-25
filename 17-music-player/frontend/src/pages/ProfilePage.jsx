import React from 'react';

import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <section className="panel">
      <h1>Profile</h1>
      <p><strong>Name:</strong> {user?.fullName}</p>
      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <p><strong>Status:</strong> {user?.status}</p>
    </section>
  );
};

export default ProfilePage;
