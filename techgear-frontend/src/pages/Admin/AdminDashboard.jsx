import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard quản lý</h2>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4>Quản lý sản phẩm</h4>
              <p className="text-muted">Thêm, sửa, xóa sản phẩm</p>
              <Link to="/admin/products" className="btn btn-dark">
                Vào quản lý sản phẩm
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4>Quản lý đơn hàng</h4>
              <p className="text-muted">Xem và cập nhật trạng thái đơn hàng</p>
              <Link to="/admin/orders" className="btn btn-dark">
                Vào quản lý đơn hàng
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4>Quản lý người dùng</h4>
              <p className="text-muted">Xem, sửa, khóa và tạo tài khoản người dùng</p>
              <Link to="/admin/users" className="btn btn-dark">
                Vào quản lý user
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;