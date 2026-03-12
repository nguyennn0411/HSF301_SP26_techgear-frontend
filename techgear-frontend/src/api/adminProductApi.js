import api from './axios.js';

export const getAdminProducts = async (params = {}) => {
  const res = await api.get('/admin/products', { params });
  return res.data;
};

export const getAdminProductById = async (id) => {
  const res = await api.get(`/admin/products/${id}`);
  return res.data;
};

export const createAdminProduct = async (payload) => {
  const res = await api.post('/admin/products', payload);
  return res.data;
};

export const updateAdminProduct = async (id, payload) => {
  const res = await api.put(`/admin/products/${id}`, payload);
  return res.data;
};

export const deleteAdminProduct = async (id) => {
  const res = await api.delete(`/admin/products/${id}`);
  return res.data;
};