import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getAdminOrders,
  updateAdminOrderStatus,
  updateAdminPaymentStatus
} from '../../api/adminOrderApi';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchOrders = async () => {
    try {
      const params = {};
      if (statusFilter) {
        params.status = statusFilter;
      }

      const data = await getAdminOrders(params);
      setOrders(data || []);
    } catch (error) {
      console.error('Lỗi lấy danh sách đơn hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể tải đơn hàng');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleOrderStatusChange = async (orderId, status) => {
    try {
      await updateAdminOrderStatus(orderId, status);
      await fetchOrders();
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể cập nhật trạng thái đơn');
    }
  };

  const handlePaymentStatusChange = async (orderId, paymentStatus) => {
    try {
      await updateAdminPaymentStatus(orderId, paymentStatus);
      await fetchOrders();
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể cập nhật trạng thái thanh toán');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý đơn hàng</h2>

        <select
          className="form-select"
          style={{ width: '220px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="PENDING">PENDING</option>
          <option value="PAID">PAID</option>
          <option value="SHIPPED">SHIPPED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
      </div>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày tạo</th>
                <th>Tổng tiền</th>
                <th>Trạng thái đơn</th>
                <th>Thanh toán</th>
                <th>Phương thức</th>
                <th>Chi tiết</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">Không có đơn hàng</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>#{order.orderId}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="text-danger fw-bold">{order.total?.toLocaleString()}đ</td>

                    <td>
                      <select
                        className="form-select"
                        value={order.status}
                        onChange={(e) => handleOrderStatusChange(order.orderId, e.target.value)}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="CANCELED">CANCELED</option>
                      </select>
                    </td>

                    <td>
                      <select
                        className="form-select"
                        value={order.paymentStatus}
                        onChange={(e) => handlePaymentStatusChange(order.orderId, e.target.value)}
                      >
                        <option value="UNPAID">UNPAID</option>
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="FAILED">FAILED</option>
                      </select>
                    </td>

                    <td>{order.paymentMethod}</td>

                    <td>
                      <Link
                        to={`/admin/orders/${order.orderId}`}
                        className="btn btn-sm btn-dark"
                      >
                        Xem
                      </Link>
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

export default AdminOrderList;