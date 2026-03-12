import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteAdminProduct, getAdminProducts } from '../../api/adminProductApi';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);

  const fetchProducts = async () => {
    try {
      const params = {};
      if (keyword.trim()) params.keyword = keyword.trim();
      if (activeOnly) params.activeOnly = true;

      const data = await getAdminProducts(params);
      setProducts(data || []);
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể tải danh sách sản phẩm');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeOnly]);

  const handleDelete = async (id) => {
    const ok = window.confirm('Bạn có chắc muốn xóa sản phẩm này không?');
    if (!ok) return;

    try {
      await deleteAdminProduct(id);
      await fetchProducts();
      alert('Xóa sản phẩm thành công');
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể xóa sản phẩm');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await fetchProducts();
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý sản phẩm</h2>
        <Link to="/admin/products/new" className="btn btn-dark">
          Thêm sản phẩm
        </Link>
      </div>

      <form className="row g-2 mb-4" onSubmit={handleSearch}>
        <div className="col-md-8">
          <input
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
              Chỉ active
            </label>
          </div>
        </div>

        <div className="col-md-2">
          <button className="btn btn-outline-dark w-100" type="submit">
            Tìm kiếm
          </button>
        </div>
      </form>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Kho</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">Không có sản phẩm</td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>
                      <img
                        src={p.imageUrl || 'https://via.placeholder.com/60x60?text=No+Image'}
                        alt={p.name}
                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                      />
                    </td>
                    <td>{p.name}</td>
                    <td className="text-danger fw-bold">{p.price?.toLocaleString()}đ</td>
                    <td>{p.stock}</td>
                    <td>{p.categoryName || 'N/A'}</td>
                    <td>{p.brandName || 'N/A'}</td>
                    <td>
                      {p.isActive ? (
                        <span className="badge text-bg-success">Active</span>
                      ) : (
                        <span className="badge text-bg-secondary">Inactive</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Link to={`/admin/products/edit/${p.id}`} className="btn btn-sm btn-outline-primary">
                          Sửa
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProductList;