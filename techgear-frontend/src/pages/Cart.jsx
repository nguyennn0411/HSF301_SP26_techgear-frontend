import React from 'react';
import { useCart } from '../contexts/CartContext';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, fetchCart } = useCart();

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    const user = JSON.parse(localStorage.getItem('user'));
    await api.put(`/carts/${user.id}/items/${productId}?quantity=${newQty}`);
    fetchCart();
  };

  const removeItem = async (productId) => {
    if (window.confirm("Xóa sản phẩm này khỏi giỏ?")) {
      const user = JSON.parse(localStorage.getItem('user'));
      await api.delete(`/carts/${user.id}/items/${productId}`);
      fetchCart();
    }
  };

  if (!cart || cart.items.length === 0) return (
    <div className="container mt-5 text-center">
      <h3>Giỏ hàng trống</h3>
      <Link to="/" className="btn btn-primary mt-3">Tiếp tục mua sắm</Link>
    </div>
  );

  // Tính tổng tiền
  const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Giỏ hàng của bạn</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={item.product.imageUrl} alt="" style={{width: '50px'}} className="me-3" />
                        <span>{item.product.name}</span>
                      </div>
                    </td>
                    <td>{item.product.price.toLocaleString()}đ</td>
                    <td>
                      <div className="input-group input-group-sm" style={{width: '100px'}}>
                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                        <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                        <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td className="fw-bold">{(item.product.price * item.quantity).toLocaleString()}đ</td>
                    <td>
                      <button className="btn btn-sm btn-link text-danger" onClick={() => removeItem(item.product.id)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card shadow-sm p-4">
            <h4>Tóm tắt đơn hàng</h4>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <span>Tổng cộng:</span>
              <span className="fs-5 fw-bold text-danger">{total.toLocaleString()}đ</span>
            </div>
            <Link to="/checkout" className="btn btn-success w-full py-2 fw-bold">TIẾN HÀNH THANH TOÁN</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;