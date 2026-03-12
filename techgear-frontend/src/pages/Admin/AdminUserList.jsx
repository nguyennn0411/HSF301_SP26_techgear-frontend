import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteAdminUser,
  getAdminUsers,
  updateAdminUserStatus
} from '../../api/adminUserApi';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const fetchUsers = async () => {
    try {
      const params = {};
      if (keyword.trim()) params.keyword = keyword.trim();
      if (role) params.role = role;
      if (status) params.status = status;

      const data = await getAdminUsers(params);
      setUsers(data || []);
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể tải danh sách user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [role, status]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchUsers();
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Bạn có chắc muốn xóa user này không?');
    if (!ok) return;

    try {
      await deleteAdminUser(id);
      await fetchUsers();
      alert('Xóa user thành công');
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể xóa user');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateAdminUserStatus(id, newStatus);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể cập nhật trạng thái');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý người dùng</h2>
        <Link to="/admin/users/new" className="btn btn-dark">
          Thêm user
        </Link>
      </div>

      <form className="row g-2 mb-4" onSubmit={handleSearch}>
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Tìm tên, email, số điện thoại..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Tất cả role</option>
            <option value="CUSTOMER">CUSTOMER</option>
            <option value="STAFF">STAFF</option>
            <option value="OWNER">OWNER</option>
          </select>
        </div>

        <div className="col-md-2">
          <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Tất cả status</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="DISABLED">DISABLED</option>
          </select>
        </div>

        <div className="col-md-3">
          <button className="btn btn-outline-dark w-100" type="submit">
            Tìm kiếm
          </button>
        </div>
      </form>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Avatar</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Role</th>
                <th>Status</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">Không có user</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>
                      <img
                        src={u.avatarUrl || 'https://via.placeholder.com/50x50?text=User'}
                        alt={u.fullName}
                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                      />
                    </td>
                    <td>{u.fullName}</td>
                    <td>{u.email}</td>
                    <td>{u.phone || 'N/A'}</td>
                    <td>{u.role}</td>
                    <td>
                      <select
                        className="form-select"
                        value={u.status}
                        onChange={(e) => handleStatusChange(u.id, e.target.value)}
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="DISABLED">DISABLED</option>
                      </select>
                    </td>
                    <td>{new Date(u.createdAt).toLocaleString()}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/admin/users/edit/${u.id}`} className="btn btn-sm btn-outline-primary">
                          Sửa
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(u.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;