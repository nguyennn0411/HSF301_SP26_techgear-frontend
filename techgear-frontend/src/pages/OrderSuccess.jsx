import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/orders" replace />;
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body text-center p-5">
          <h2 className="text-success mb-3">Đặt hàng thành công</h2>
          <p className="mb-2">Mã đơn hàng: <strong>#{order.orderId}</strong></p>
          <p className="mb-2">Trạng thái: <strong>{order.status}</strong></p>
          <p className="mb-4">
            Tổng tiền: <strong className="text-danger">{order.total?.toLocaleString()}đ</strong>
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Link to="/orders" className="btn btn-dark">
              Xem đơn hàng của tôi
            </Link>
            <Link to="/" className="btn btn-outline-secondary">
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;