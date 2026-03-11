import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const itemCount = cart?.totalItems || 0;

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          TechGear
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Trang chủ</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orders">Đơn hàng</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/cart" className="btn btn-outline-dark position-relative">
              Giỏ hàng
              <span className="badge text-bg-danger ms-2">{itemCount}</span>
            </Link>

            <button className="btn btn-dark" onClick={() => navigate('/login')}>
              Đăng nhập
            </button>

            <button className="btn btn-outline-secondary" onClick={() => navigate('/register')}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;