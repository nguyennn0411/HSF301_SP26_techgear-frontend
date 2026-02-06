import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State quản lý danh sách từ Database
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  
  // State quản lý dữ liệu Form
  const [formData, setFormData] = useState({
    name: '', price: '', stock: '', description: '', 
    imageUrl: '', color: '', size: '', isActive: true,
    category: { id: '' }, 
    brand: { id: '' }
  });

  useEffect(() => {
    // 1. Lấy dữ liệu Category và Brand để đổ vào Dropdown
    const fetchData = async () => {
      try {
        const [catRes, brandRes] = await Promise.all([
          api.get('/categories'), // Giả định bạn đã có @GetMapping("/api/categories")
          api.get('/brands/active') // Gọi API lấy brand đang active bạn đã viết
        ]);
        setCategories(catRes.data);
        setBrands(brandRes.data);
      } catch (err) {
        console.error("Lỗi tải danh mục/thương hiệu", err);
      }
    };

    fetchData();

    // 2. Nếu là Edit, lấy thông tin sản phẩm cũ
    if (id) {
      api.get(`/products/${id}`).then(res => {
        const p = res.data;
        setFormData({
          ...p,
          category: { id: p.category?.id || '' },
          brand: { id: p.brand?.id || '' }
        });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await api.put(`/products/${id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      alert("Lưu sản phẩm thành công!");
      navigate('/admin/products');
    } catch (err) {
      alert("Lỗi: " + (err.response?.data?.message || "Không thể lưu"));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl mt-10 rounded-xl border border-gray-100">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4">
        {id ? ' chỉnh sửa sản phẩm' : ' Thêm sản phẩm mới'}
      </h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tên sản phẩm */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Tên sản phẩm *</label>
          <input type="text" className="w-full border-gray-300 border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
        </div>

        {/* Giá và Kho */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Giá bán (VNĐ) *</label>
          <input type="number" className="w-full border-gray-300 border p-2.5 rounded-lg" 
            value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Số lượng trong kho *</label>
          <input type="number" className="w-full border-gray-300 border p-2.5 rounded-lg" 
            value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
        </div>

        {/* Dropdown Danh mục */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Danh mục *</label>
          <select 
            className="w-full border-gray-300 border p-2.5 rounded-lg bg-white cursor-pointer"
            value={formData.category.id} 
            onChange={e => setFormData({...formData, category: {id: e.target.value}})}
            required
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Dropdown Thương hiệu */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Thương hiệu *</label>
          <select 
            className="w-full border-gray-300 border p-2.5 rounded-lg bg-white cursor-pointer"
            value={formData.brand.id} 
            onChange={e => setFormData({...formData, brand: {id: e.target.value}})}
            required
          >
            <option value="">-- Chọn thương hiệu --</option>
            {brands.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* URL Ảnh */}
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-700 mb-1">Link hình ảnh</label>
          <input type="text" className="w-full border-gray-300 border p-2.5 rounded-lg" 
            value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
        </div>

        {/* Trạng thái kinh doanh */}
        <div className="md:col-span-2 flex items-center gap-2">
          <input type="checkbox" id="isActive" checked={formData.isActive}
            onChange={e => setFormData({...formData, isActive: e.target.checked})} 
            className="w-5 h-5 cursor-pointer" />
          <label htmlFor="isActive" className="text-sm font-bold text-gray-700 cursor-pointer">Cho phép hiển thị trên cửa hàng</label>
        </div>

        {/* Nút Submit */}
        <div className="md:col-span-2 mt-4">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold shadow-lg transition">
            {id ? 'CẬP NHẬT SẢN PHẨM' : 'TẠO SẢN PHẨM MỚI'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;