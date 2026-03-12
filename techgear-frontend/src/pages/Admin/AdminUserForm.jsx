import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createAdminUser,
  getAdminUserById,
  updateAdminUser
} from '../../api/adminUserApi';

const AdminUserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    avatarUrl: '',
  });

  const fetchUser = async () => {
    try {
      const data = await getAdminUserById(id);
      setFormData({
        fullName: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        password: '',
        role: data.role || 'CUSTOMER',
        status: data.status || 'ACTIVE',
        avatarUrl: data.avatarUrl || '',
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể tải thông tin user');
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateAdminUser(id, formData);
        alert('Cập nhật user thành công');
      } else {
        await createAdminUser(formData);
        alert('Tạo user thành công');
      }

      navigate('/admin/users');
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể lưu user');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">{isEdit ? 'Cập nhật user' : 'Thêm user'}</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Họ tên</label>
                <input
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Số điện thoại</label>
                <input
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  {isEdit ? 'Mật khẩu mới (không bắt buộc)' : 'Mật khẩu'}
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!isEdit}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="CUSTOMER">CUSTOMER</option>
                  <option value="STAFF">STAFF</option>
                  <option value="OWNER">OWNER</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="DISABLED">DISABLED</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Avatar URL</label>
                <input
                  className="form-control"
                  name="avatarUrl"
                  value={formData.avatarUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-dark" type="submit">
                  {isEdit ? 'Cập nhật' : 'Tạo mới'}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/admin/users')}
                >
                  Quay lại
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUserForm;