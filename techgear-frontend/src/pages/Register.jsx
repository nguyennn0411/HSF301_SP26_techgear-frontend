import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      await api.post('/auth/register', formData);
      alert('Đăng ký thành công! Hãy đăng nhập.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Đăng ký thất bại, email có thể đã tồn tại');
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
                      minHeight: '700px',
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
                  <div className="p-4 p-md-5" style={{ minHeight: '700px' }}>
                    <div className="mb-4">
                      <h2 className="fw-bold mb-2" style={{ color: '#111827' }}>
                        Đăng ký
                      </h2>
                      <p className="text-muted mb-0">
                        Tạo tài khoản mới để bắt đầu với TechGear Store
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
                      <div className="mb-3">
                        <label className="form-label fw-semibold">Họ và tên</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập họ và tên"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          required
                          style={{
                            height: '52px',
                            borderRadius: '14px',
                            border: '1px solid #d1d5db',
                          }}
                        />
                      </div>

                      <div className="mb-3">
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

                      <div className="mb-3">
                        <label className="form-label fw-semibold">Số điện thoại</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập số điện thoại"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
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

                      <button
                        type="submit"
                        className="btn w-100 text-white fw-semibold"
                        disabled={loading}
                        style={{
                          height: '52px',
                          borderRadius: '14px',
                          background: 'linear-gradient(90deg, #16a34a 0%, #15803d 100%)',
                          border: 'none',
                          boxShadow: '0 12px 24px rgba(22, 163, 74, 0.25)',
                        }}
                      >
                        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                      </button>
                    </form>

                    <div className="text-center mt-4">
                      <span className="text-muted">Đã có tài khoản? </span>
                      <span
                        onClick={() => navigate('/login')}
                        className="fw-semibold"
                        style={{ color: '#2563eb', cursor: 'pointer' }}
                      >
                        Đăng nhập
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

export default Register;