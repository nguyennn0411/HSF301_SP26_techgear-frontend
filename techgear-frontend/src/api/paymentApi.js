import api from './axios.js';

export const payOrder = async (orderId) => {
  const res = await api.post(`/payments/orders/${orderId}/pay`);
  return res.data;
};

export const failOrderPayment = async (orderId) => {
  const res = await api.post(`/payments/orders/${orderId}/fail`);
  return res.data;
};

export const getPaymentByOrder = async (orderId) => {
  const res = await api.get(`/payments/orders/${orderId}`);
  return res.data;
};