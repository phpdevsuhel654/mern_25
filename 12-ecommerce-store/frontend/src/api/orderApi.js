import API from './axios';

export const createOrder = (data) =>
  API.post('/orders', data);

export const createPaymentIntent = (orderId) =>
  API.post('/payments/create-intent', { orderId });