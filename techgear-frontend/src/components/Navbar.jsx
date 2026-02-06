import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useCart } from '../contexts/CartContext.jsx';
import Cart from '../pages/Cart.jsx';
const Navbar = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    const itemCount = cart?.items?.length || cart?.cartItems?.length || 0;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                {/* Logo */}
                <Link className="navbar-brand fw-bold" to="/">
                    TechGear
                </Link>

                {/* Toggle mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu */}
                <div className="collapse navbar-collapse" id="mainNavbar">
                    {/* Left menu */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Trang chủ
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/products">
                                Sản phẩm
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                Giới thiệu
                            </Link>
                        </li>
                    </ul>

                    {/* Search */}
                    <form className="d-flex me-3">
                        <input
                            className="form-control form-control-sm me-2"
                            type="search"
                            placeholder="Tìm sản phẩm..."
                        />
                        <button className="btn btn-outline-light btn-sm">
                            Tìm
                        </button>
                    </form>
                    {/* Cart */}

                    // Trong JSX Navbar:
                    <Link to="/cart" className="btn btn-outline-primary position-relative">
                        Giỏ hàng
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {itemCount}
                        </span>
                    </Link>
                    {/* Right menu */}
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-outline-light btn-sm me-2"
                            onClick={() => navigate('/login')}
                        >
                            Đăng nhập
                        </button>

                        <button
                            className="btn btn-warning btn-sm"
                            onClick={() => navigate('/register')}
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
