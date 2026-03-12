import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createAdminProduct, getAdminProductById, updateAdminProduct } from '../../api/adminProductApi';
import api from '../../api/axios';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    color: '',
    size: '',
    imageUrl: '',
    isActive: true,
    categoryId: '',
    brandId: '',
  });

  const fetchCategoriesAndBrands = async () => {
    try {
      const [categoryRes, brandRes] = await Promise.all([
        api.get('/categories'),
        api.get('/brands'),
      ]);

      setCategories(categoryRes.data || []);
      setBrands(brandRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const data = await getAdminProductById(id);

      setFormData({
        name: data.name || '',
        description: data.description || '',
        price: data.price || '',
        stock: data.stock || '',
        color: data.color || '',
        size: data.size || '',
        imageUrl: data.imageUrl || '',
        isActive: data.isActive ?? true,
        categoryId: data.categoryId || '',
        brandId: data.brandId || '',
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể tải dữ liệu sản phẩm');
    }
  };

  useEffect(() => {
    fetchCategoriesAndBrands();
    if (isEdit) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        categoryId: Number(formData.categoryId),
        brandId: Number(formData.brandId),
      };

      if (isEdit) {
        await updateAdminProduct(id, payload);
        alert('Cập nhật sản phẩm thành công');
      } else {
        await createAdminProduct(payload);
        alert('Thêm sản phẩm thành công');
      }

      navigate('/admin/products');
    } catch (error) {
      console.error(error);
      alert(error.response?.data || 'Không thể lưu sản phẩm');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">{isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}</h2>

      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tên sản phẩm</label>
                <input
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Ảnh URL</label>
                <input
                  className="form-control"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label">Mô tả</label>
                <textarea
                  className="form-control"
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Giá</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Tồn kho</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Màu</label>
                <input
                  className="form-control"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Size</label>
                <input
                  className="form-control"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Brand</label>
                <select
                  className="form-select"
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Chọn brand</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input
                    id="isActive"
                    type="checkbox"
                    className="form-check-input"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                  <label htmlFor="isActive" className="form-check-label">
                    Đang bán
                  </label>
                </div>
              </div>

              <div className="col-12 d-flex gap-2">
                <button className="btn btn-dark" type="submit">
                  {isEdit ? 'Cập nhật' : 'Tạo mới'}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/admin/products')}
                >
                  Quay lại
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;