import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../contexts/CartContext.jsx';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const handleAddToCart = () => {
        if (product && product.id) {
            // Gọi hàm addToCart với ID sản phẩm và số lượng mặc định là 1
            addToCart(product.id, 1);
        }
    };
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Lỗi lấy chi tiết sản phẩm:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary mb-3" />
                <p>Đang tải thông tin sản phẩm...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container py-5 text-center">
                <p>Không tìm thấy sản phẩm!</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            {/* Nút quay lại */}
            <button
                className="btn btn-link mb-4 px-0"
                onClick={() => navigate(-1)}
            >
                ← Quay lại
            </button>

            <div className="card shadow-lg">
                <div className="row g-0">
                    {/* Bên trái: Hình ảnh */}
                    <div className="col-md-6 bg-light d-flex align-items-center justify-content-center">
                        <img
                            src={product.imageUrl || 'https://via.placeholder.com/500'}
                            alt={product.name}
                            className="img-fluid p-4"
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Bên phải: Thông tin */}
                    <div className="col-md-6">
                        <div className="card-body p-4 p-lg-5">
                            <p className="text-primary fw-bold text-uppercase mb-1">
                                {product.brand?.name}
                            </p>

                            <h3 className="card-title fw-bold mb-3">
                                {product.name}
                            </h3>

                            <h4 className="text-danger fw-bold mb-4">
                                {product.price?.toLocaleString('vi-VN')} đ
                            </h4>

                            <hr />

                            <h6 className="fw-bold mt-4">Mô tả sản phẩm:</h6>
                            <p className="text-muted">
                                {product.description || 'Chưa có mô tả cho sản phẩm này.'}
                            </p>

                            <ul className="list-unstyled mt-4">
                                <li>
                                    <strong>Màu sắc:</strong> {product.color || 'N/A'}
                                </li>
                                <li>
                                    <strong>Kích thước:</strong> {product.size || 'N/A'}
                                </li>
                                <li>
                                    <strong>Tình trạng:</strong>
                                    {product.stock > 0 ? (
                                        <span className="text-success ms-2">
                                            Còn hàng ({product.stock})
                                        </span>
                                    ) : (
                                        <span className="text-danger ms-2">
                                            Hết hàng
                                        </span>
                                    )}
                                </li>
                            </ul>

                            <button
                                disabled={product.stock <= 0}
                                onClick={handleAddToCart} // <--- THÊM DÒNG NÀY
                                className={`btn w-100 py-3 fw-bold mt-4 ${product.stock > 0
                                    ? 'btn-primary'
                                    : 'btn-secondary disabled'
                                    }`}
                            >
                                {product.stock > 0 ? 'THÊM VÀO GIỎ HÀNG' : 'HẾT HÀNG'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
