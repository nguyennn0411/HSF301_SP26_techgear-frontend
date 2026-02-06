import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await api.post('/auth/login', formData);
    
    // In ra console để kiểm tra xem Backend trả về gì
    console.log("Login Success Data:", response.data);

    // Backend của bạn trả về JwtResponse (token, id, username, role)
    // Phải lưu response.data (chứa id) chứ không chỉ mỗi token
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data)); 

    alert('Đăng nhập thành công!');
    navigate('/');
    window.location.reload(); // Ép App load lại để CartContext nhận User mới
  } catch (err) {
    setError('Đăng nhập thất bại');
  }
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">TechGear Login</h2>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Đăng nhập
        </button>
        <p className="mt-4 text-sm text-center">
          Chưa có tài khoản? <span onClick={() => navigate('/register')} className="text-blue-500 cursor-pointer">Đăng ký ngay</span>
        </p>
      </form>
    </div>
  );
};

export default Login;