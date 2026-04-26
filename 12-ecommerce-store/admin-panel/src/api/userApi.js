import API from './axios';

export const createUser = (data) =>
  API.post('/admin/users', data);

export const updateUser = (id, data) =>
  API.put(`/admin/users/${id}`, data);