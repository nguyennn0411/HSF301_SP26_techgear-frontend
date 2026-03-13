import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const response = await api.post('/auth/login', formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('email', response.data.email || response.data.username || '');
      localStorage.setItem('user', JSON.stringify(response.data));

      if (
        response.data.role === 'STAFF' ||
        response.data.role === 'OWNER' ||
        response.data.role === 'ADMIN'
      ) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

      window.location.reload();
    } catch (err) {
      setError(err.response?.data || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 50%, #60a5fa 100%)',
      }}
    >
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10 col-xl-9">
            <div
              className="card border-0 shadow-lg overflow-hidden"
              style={{ borderRadius: '28px' }}
            >
              <div className="row g-0">
                <div className="col-md-6 d-none d-md-flex">
                  <div
                    className="w-100 h-100 d-flex flex-column justify-content-center align-items-center position-relative"
                    style={{
                      minHeight: '620px',
                      background: 'linear-gradient(180deg, #0f172a 0%, #1e3a8a 100%)',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '12%',
                        left: '15%',
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.06)',
                        filter: 'blur(2px)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '14%',
                        right: '12%',
                        width: '120px',
                        height: '120px',
                        borderRadius: '24px',
                        background: 'rgba(96,165,250,0.12)',
                        transform: 'rotate(18deg)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '22%',
                        right: '18%',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#60a5fa',
                        boxShadow: '0 0 20px rgba(96,165,250,0.7)',
                      }}
                    />

                    <div className="text-center text-white position-relative">
                      <div
                        className="mx-auto mb-4 d-flex align-items-center justify-content-center position-relative"
                        style={{
                          width: '180px',
                          height: '180px',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            width: '180px',
                            height: '180px',
                            borderRadius: '50%',
                            border: '2px solid rgba(255,255,255,0.08)',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            width: '130px',
                            height: '130px',
                            borderRadius: '24px',
                            background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
                            boxShadow: '0 18px 40px rgba(37,99,235,0.35)',
                            transform: 'rotate(12deg)',
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            width: '76px',
                            height: '76px',
                            borderRadius: '18px',
                            background: '#ffffff',
                            transform: 'rotate(12deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1d4ed8',
                            fontSize: '34px',
                            fontWeight: '700',
                          }}
                        >
                          ⚡
                        </div>
                      </div>

                      <h1
                        className="fw-bold mb-0"
                        style={{
                          fontSize: '2rem',
                          letterSpacing: '0.5px',
                        }}
                      >
                        TechGear Store
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-4 p-md-5" style={{ minHeight: '620px' }}>
                    <div className="mb-4">
                      <h2 className="fw-bold mb-2" style={{ color: '#111827' }}>
                        Đăng nhập
                      </h2>
                      <p className="text-muted mb-0">
                        Chào mừng bạn quay lại
                      </p>
                    </div>

                    {error && (
                      <div
                        className="alert alert-danger border-0"
                        style={{ borderRadius: '14px' }}
                      >
                        {error}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label className="form-label fw-semibold">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Nhập email của bạn"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          style={{
                            height: '52px',
                            borderRadius: '14px',
                            border: '1px solid #d1d5db',
                          }}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label fw-semibold">Mật khẩu</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Nhập mật khẩu"
                          value={formData.password}
                          onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                          }
                          required
                          style={{
                            height: '52px',
                            borderRadius: '14px',
                            border: '1px solid #d1d5db',
                          }}
                        />
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="rememberMe" />
                          <label className="form-check-label text-muted" htmlFor="rememberMe">
                            Ghi nhớ đăng nhập
                          </label>
                        </div>

                        <span
                          className="text-primary"
                          style={{ cursor: 'pointer', fontWeight: 500 }}
                        >
                          Quên mật khẩu?
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="btn w-100 text-white fw-semibold"
                        disabled={loading}
                        style={{
                          height: '52px',
                          borderRadius: '14px',
                          background: 'linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)',
                          border: 'none',
                          boxShadow: '0 12px 24px rgba(37, 99, 235, 0.25)',
                        }}
                      >
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                      </button>
                    </form>

                    <div className="text-center mt-4">
                      <span className="text-muted">Chưa có tài khoản? </span>
                      <span
                        onClick={() => navigate('/register')}
                        className="fw-semibold"
                        style={{ color: '#2563eb', cursor: 'pointer' }}
                      >
                        Đăng ký ngay
                      </span>
                    </div>

                    <div className="text-center mt-5 text-muted" style={{ fontSize: '14px' }}>
                      © 2026 TechGear Store
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Login;