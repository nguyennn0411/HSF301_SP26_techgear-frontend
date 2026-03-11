import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMyOrderDetail, cancelMyOrder } from '../api/orderApi';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await getMyOrderDetail(id);
      setOrder(data);
    } catch (error) {
      console.error('Lỗi lấy chi tiết đơn hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể lấy chi tiết đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    const ok = window.confirm('Bạn có chắc muốn hủy đơn này không?');
    if (!ok) return;

    try {
      await cancelMyOrder(id);
      await fetchOrder();
      alert('Hủy đơn hàng thành công');
    } catch (error) {
      console.error('Lỗi hủy đơn hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể hủy đơn hàng');
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <div className="container py-4">Đang tải chi tiết đơn hàng...</div>;
  if (!order) return <div className="container py-4">Không tìm thấy đơn hàng.</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Chi tiết đơn hàng #{order.orderId}</h2>
        {order.status === 'PENDING' && (
          <button className="btn btn-outline-danger" onClick={handleCancel}>
            Hủy đơn
          </button>
        )}
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <p><strong>Trạng thái:</strong> {order.status}</p>
          <p><strong>Ngày tạo:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Mã giảm giá:</strong> {order.couponCode || 'Không có'}</p>
          <p><strong>Giảm giá:</strong> {order.discountPercent ? `${order.discountPercent}%` : '0%'}</p>
          <p className="mb-0">
            <strong>Tổng tiền:</strong>{' '}
            <span className="text-danger fw-bold">{order.total?.toLocaleString()}đ</span>
          </p>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-3">Sản phẩm trong đơn</h4>

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
              <div className="fw-bold text-danger">{item.lineTotal?.toLocaleString()}đ</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;