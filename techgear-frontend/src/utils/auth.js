export const getToken = () => localStorage.getItem('token');

export const getUserRole = () => localStorage.getItem('role');

export const isLoggedIn = () => !!getToken();

export const isAdmin = () => {
  const role = getUserRole();
  return role === 'STAFF' || role === 'OWNER' || role === 'ADMIN';
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('email');
  localStorage.removeItem('user');
};