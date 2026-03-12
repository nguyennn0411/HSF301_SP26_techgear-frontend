import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../api/orderApi';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, fetchCart } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [submitting, setSubmitting] = useState(false);

  const items = cart?.items || [];

  const handleCreateOrder = async () => {
    if (!items.length) {
      alert('Giỏ hàng đang trống');
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        paymentMethod,
      };

      if (couponCode.trim()) {
        payload.couponCode = couponCode.trim();
      }

      const order = await createOrder(payload);
      await fetchCart();

      if (paymentMethod === 'ONLINE') {
        navigate(`/payment/${order.orderId}`, {
          state: { order },
        });
      } else {
        navigate('/order-success', {
          state: { order },
        });
      }
    } catch (error) {
      console.error('Lỗi tạo đơn hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể đặt hàng');
    } finally {
      setSubmitting(false);
    }
  };

  if (!items.length) {
    return (
      <div className="container py-4">
        <h2>Không thể thanh toán</h2>
        <p>Giỏ hàng của bạn đang trống.</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Thanh toán</h2>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h4 className="mb-3">Danh sách sản phẩm</h4>

              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="d-flex justify-content-between align-items-center border-bottom py-3"
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

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3">Xác nhận đơn hàng</h4>

              <div className="mb-3">
                <label className="form-label">Mã giảm giá</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã giảm giá nếu có"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phương thức thanh toán</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="COD">Thanh toán khi nhận hàng</option>
                  <option value="ONLINE">Thanh toán online</option>
                </select>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tổng số lượng</span>
                <strong>{cart.totalItems}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Tạm tính</span>
                <strong>{cart.totalAmount?.toLocaleString()}đ</strong>
              </div>

              <button
                className="btn btn-dark w-100"
                onClick={handleCreateOrder}
                disabled={submitting}
              >
                {submitting ? 'Đang xử lý...' : 'Đặt hàng'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;