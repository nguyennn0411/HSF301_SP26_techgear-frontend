import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../api/productApi.js';
import { useCart } from '../contexts/CartContext.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Lỗi lấy chi tiết sản phẩm:', error.response?.data || error.message);
      alert('Không thể tải chi tiết sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    if (product.stock <= 0) {
      alert('Sản phẩm đã hết hàng');
      return;
    }

    await addToCart(product.id, quantity);
  };

  if (loading) {
    return <div className="container py-4">Đang tải chi tiết sản phẩm...</div>;
  }

  if (!product) {
    return <div className="container py-4">Không tìm thấy sản phẩm.</div>;
  }

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-5">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/500x400?text=TechGear'}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ width: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-7">
          <h2 className="mb-3">{product.name}</h2>

          <p className="text-muted">
            {product.description || 'Không có mô tả sản phẩm'}
          </p>

          <div className="mb-2">
            <strong>Giá:</strong>{' '}
            <span className="text-danger fs-4 fw-bold">
              {product.price?.toLocaleString()}đ
            </span>
          </div>

          <div className="mb-2">
            <strong>Màu sắc:</strong> {product.color || 'N/A'}
          </div>

          <div className="mb-2">
            <strong>Size:</strong> {product.size || 'N/A'}
          </div>

          <div className="mb-2">
            <strong>Tồn kho:</strong> {product.stock}
          </div>

          <div className="mb-4">
            <strong>Trạng thái:</strong>{' '}
            {product.isActive ? (
              <span className="badge text-bg-success">Đang bán</span>
            ) : (
              <span className="badge text-bg-secondary">Ngừng bán</span>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 mb-4">
            <button className="btn btn-outline-secondary" onClick={handleDecrease}>
              -
            </button>

            <input
              type="number"
              className="form-control text-center"
              style={{ width: '90px' }}
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (!val || val < 1) {
                  setQuantity(1);
                } else if (val > product.stock) {
                  setQuantity(product.stock);
                } else {
                  setQuantity(val);
                }
              }}
            />

            <button className="btn btn-outline-secondary" onClick={handleIncrease}>
              +
            </button>
          </div>

          <button
            className="btn btn-dark"
            disabled={product.stock <= 0 || !product.isActive}
            onClick={handleAddToCart}
          >
            {product.stock > 0 && product.isActive ? 'Thêm vào giỏ hàng' : 'Không thể mua'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;