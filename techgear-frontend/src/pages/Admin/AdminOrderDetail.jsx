import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAdminOrderDetail } from '../../api/adminOrderApi';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const data = await getAdminOrderDetail(id);
      setOrder(data);
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể tải chi tiết đơn hàng');
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (!order) {
    return <div className="container py-4">Đang tải chi tiết đơn hàng...</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Chi tiết đơn hàng #{order.orderId}</h2>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <p><strong>Trạng thái đơn:</strong> {order.status}</p>
          <p><strong>Trạng thái thanh toán:</strong> {order.paymentStatus}</p>
          <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
          <p><strong>Mã coupon:</strong> {order.couponCode || 'Không có'}</p>
          <p><strong>Giảm giá:</strong> {order.discountPercent || 0}%</p>
          <p><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p className="mb-0">
            <strong>Tổng tiền:</strong>{' '}
            <span className="text-danger fw-bold">{order.total?.toLocaleString()}đ</span>
          </p>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">Sản phẩm</h4>

          {order.items?.map((item) => (
            <div
              key={`${order.orderId}-${item.productId}`}
              className="d-flex justify-content-between border-bottom py-3"
            >
              <div>
                <div className="fw-semibold">{item.productName}</div>
                <small className="text-muted">
                  {item.quantity} x {item.unitPrice?.toLocaleString()}đ
                </small>
              </div>
              <div className="fw-bold text-danger">
                {item.lineTotal?.toLocaleString()}đ
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;