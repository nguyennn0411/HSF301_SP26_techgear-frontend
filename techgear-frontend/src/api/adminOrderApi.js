import api from './axios.js';

export const getAdminOrders = async (params = {}) => {
  const res = await api.get('/admin/orders', { params });
  return res.data;
};

export const getAdminOrderDetail = async (orderId) => {
  const res = await api.get(`/admin/orders/${orderId}`);
  return res.data;
};

export const updateAdminOrderStatus = async (orderId, status) => {
  const res = await api.put(`/admin/orders/${orderId}/status`, { status });
  return res.data;
};

export const updateAdminPaymentStatus = async (orderId, paymentStatus) => {
  const res = await api.put(`/admin/orders/${orderId}/payment-status`, { paymentStatus });
  return res.data;
};