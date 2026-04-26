import API from './axios';

export const createProduct = (data) =>
  API.post('/products', data);

export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data);

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);