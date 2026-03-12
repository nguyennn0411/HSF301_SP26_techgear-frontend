import api from './axios.js';

export const createOrder = async (payload) => {
  const res = await api.post('/orders', payload || {});
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get('/orders/my');
  return res.data;
};

export const getMyOrderDetail = async (orderId) => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data;
};

export const cancelMyOrder = async (orderId) => {
  const res = await api.put(`/orders/${orderId}/cancel`);
  return res.data;
};

