import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders, cancelMyOrder } from '../api/orderApi';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data || []);
    } catch (error) {
      console.error('Lỗi lấy danh sách đơn hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể lấy danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    const ok = window.confirm('Bạn có chắc muốn hủy đơn hàng này không?');
    if (!ok) return;

    try {
      await cancelMyOrder(orderId);
      await fetchOrders();
      alert('Hủy đơn hàng thành công');
    } catch (error) {
      console.error('Lỗi hủy đơn hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể hủy đơn hàng');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="container py-4">Đang tải đơn hàng...</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Đơn hàng của tôi</h2>

      {!orders.length ? (
        <div className="alert alert-info">Bạn chưa có đơn hàng nào.</div>
      ) : (
        <div className="row g-3">
          {orders.map((order) => (
            <div className="col-12" key={order.orderId}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h5 className="mb-1">Đơn hàng #{order.orderId}</h5>
                      <div className="text-muted">
                        Ngày tạo: {new Date(order.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <span className="badge text-bg-secondary">{order.status}</span>
                  </div>

                  <div className="mb-3">
                    <strong>Tổng tiền:</strong>{' '}
                    <span className="text-danger">{order.total?.toLocaleString()}đ</span>
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    <Link to={`/orders/${order.orderId}`} className="btn btn-sm btn-dark">
                      Xem chi tiết
                    </Link>

                    {order.status === 'PENDING' && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleCancel(order.orderId)}
                      >
                        Hủy đơn
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;