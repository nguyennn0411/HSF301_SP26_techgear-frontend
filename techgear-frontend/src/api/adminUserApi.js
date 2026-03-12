import api from './axios.js';

export const getAdminUsers = async (params = {}) => {
  const res = await api.get('/admin/users', { params });
  return res.data;
};

export const getAdminUserById = async (id) => {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
};

export const createAdminUser = async (payload) => {
  const res = await api.post('/admin/users', payload);
  return res.data;
};

export const updateAdminUser = async (id, payload) => {
  const res = await api.put(`/admin/users/${id}`, payload);
  return res.data;
};

export const updateAdminUserStatus = async (id, status) => {
  const res = await api.put(`/admin/users/${id}/status`, { status });
  return res.data;
};

export const deleteAdminUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};