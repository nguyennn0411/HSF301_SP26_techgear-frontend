import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, loading, updateCartItem, removeCartItem, clearCart } = useCart();

  const items = cart?.items || [];

  if (loading) {
    return <div className="container py-4">Đang tải giỏ hàng...</div>;
  }

  if (!items.length) {
    return (
      <div className="container py-4">
        <h2>Giỏ hàng trống</h2>
        <p>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
        <Link to="/" className="btn btn-dark">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Giỏ hàng của bạn</h2>
        <button className="btn btn-outline-danger" onClick={clearCart}>
          Xóa toàn bộ giỏ hàng
        </button>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {items.map((item) => (
            <div key={item.cartItemId} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      src={item.imageUrl || 'https://via.placeholder.com/120x120?text=TechGear'}
                      alt={item.productName}
                      className="img-fluid rounded"
                    />
                  </div>

                  <div className="col-md-4">
                    <h5 className="mb-1">{item.productName}</h5>
                    <div className="text-muted">Đơn giá: {item.unitPrice?.toLocaleString()}đ</div>
                    <div className="text-muted">Tồn kho: {item.stock}</div>
                  </div>

                  <div className="col-md-3">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateCartItem(item.cartItemId, item.quantity - 1)}
                      >
                        -
                      </button>

                      <span className="fw-bold">{item.quantity}</span>

                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateCartItem(item.cartItemId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-md-2 text-end">
                    <div className="fw-bold text-danger">{item.lineTotal?.toLocaleString()}đ</div>
                  </div>

                  <div className="col-md-1 text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeCartItem(item.cartItemId)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="mb-3">Tóm tắt đơn hàng</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Tổng số lượng</span>
                <strong>{cart.totalItems}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tổng tiền</span>
                <strong className="text-danger">{cart.totalAmount?.toLocaleString()}đ</strong>
              </div>

              <button
                className="btn btn-dark w-100"
                onClick={() => navigate('/checkout')}
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;