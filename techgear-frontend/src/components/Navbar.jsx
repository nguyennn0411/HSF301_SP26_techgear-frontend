import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext.jsx';
import { isAdmin, isLoggedIn, logout } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const itemCount = cart?.totalItems || 0;

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          TechGear
        </Link>

        <div className="collapse navbar-collapse show">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Trang chủ</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/orders">Đơn hàng</Link>
            </li>

            {isAdmin() && (
              <li className="nav-item">
                <Link className="nav-link text-danger fw-bold" to="/admin/dashboard">
                  Dashboard quản lý
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            <Link to="/cart" className="btn btn-outline-dark">
              Giỏ hàng
              <span className="badge text-bg-danger ms-2">{itemCount}</span>
            </Link>

            {!isLoggedIn() ? (
              <>
                <button className="btn btn-dark" onClick={() => navigate('/login')}>
                  Đăng nhập
                </button>
                <button className="btn btn-outline-secondary" onClick={() => navigate('/register')}>
                  Đăng ký
                </button>
              </>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;