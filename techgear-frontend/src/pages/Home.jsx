import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.post('/products/filter', {
        activeOnly: true
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-5 text-center">
        <h1 className="fw-bold">Sản Phẩm Mới Nhất</h1>
        <p className="text-muted mt-2">
          Khám phá công nghệ đỉnh cao tại TechGear
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center text-muted">
              Không có sản phẩm nào.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
