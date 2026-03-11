import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/productApi.js';
import { useCart } from '../contexts/CartContext.jsx';

const Home = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState('');
  const [activeOnly, setActiveOnly] = useState(true);

  const fetchProducts = async (customParams = {}) => {
    try {
      setLoading(true);

      const params = {
        activeOnly,
        ...customParams,
      };

      const data = await getProducts(params);
      setProducts(data || []);
    } catch (error) {
      console.error('Lỗi lấy danh sách sản phẩm:', error.response?.data || error.message);
      alert('Không thể tải danh sách sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    const params = {
      activeOnly,
    };

    if (keyword.trim()) {
      params.keyword = keyword.trim();
    }

    await fetchProducts(params);
  };

  if (loading) {
    return <div className="container py-4">Đang tải sản phẩm...</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Danh sách sản phẩm</h2>

      <form className="row g-2 mb-4" onSubmit={handleSearch}>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm theo tên sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="col-md-2 d-flex align-items-center">
          <div className="form-check">
            <input
              id="activeOnly"
              className="form-check-input"
              type="checkbox"
              checked={activeOnly}
              onChange={(e) => setActiveOnly(e.target.checked)}
            />
            <label htmlFor="activeOnly" className="form-check-label">
              Chỉ hiện active
            </label>
          </div>
        </div>

        <div className="col-md-2">
          <button type="submit" className="btn btn-dark w-100">
            Tìm kiếm
          </button>
        </div>
      </form>

      <div className="row">
        {products.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-info">Không có sản phẩm nào.</div>
          </div>
        ) : (
          products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300x220?text=TechGear'}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '220px', objectFit: 'cover' }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>

                  <p className="card-text text-muted small">
                    {product.description
                      ? product.description.length > 80
                        ? product.description.slice(0, 80) + '...'
                        : product.description
                      : 'Không có mô tả'}
                  </p>

                  <p className="mb-1">
                    <strong>Giá:</strong>{' '}
                    <span className="text-danger fw-bold">
                      {product.price?.toLocaleString()}đ
                    </span>
                  </p>

                  <p className="mb-3">
                    <strong>Tồn kho:</strong> {product.stock}
                  </p>

                  <div className="mt-auto d-grid gap-2">
                    <Link to={`/product/${product.id}`} className="btn btn-outline-dark">
                      Xem chi tiết
                    </Link>

                    <button
                      className="btn btn-dark"
                      disabled={product.stock <= 0}
                      onClick={() => addToCart(product.id, 1)}
                    >
                      {product.stock > 0 ? 'Thêm vào giỏ hàng' : 'Hết hàng'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;