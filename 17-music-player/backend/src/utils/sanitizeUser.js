'use strict';

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    role: user.role,
    fullName: user.full_name,
    username: user.username,
    email: user.email,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    status: user.status,
    lastLoginAt: user.last_login_at,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  };
};

module.exports = sanitizeUser;
