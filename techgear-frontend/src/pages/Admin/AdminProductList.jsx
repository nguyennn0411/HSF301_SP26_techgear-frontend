import React, { useEffect, useState } from 'react';
import api from '../../api/axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const AdminProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    const res = await api.post('/products/filter', {}); // Lấy tất cả không lọc
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này?")) {
      try {
        await api.delete(`/products/${id}`); // Gọi deleteMapping trong Controller
        setProducts(products.filter(p => p.id !== id));
        alert("Xoá thành công!");
      } catch (err) { alert("Lỗi khi xoá sản phẩm"); }
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Quản lý Sản phẩm</h1>
        <Link to="/admin/products/new" className="bg-green-600 text-white px-4 py-2 rounded">
          + Thêm sản phẩm mới
        </Link>
      </div>
      <table className="w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Tên</th>
            <th className="p-3">Giá</th>
            <th className="p-3">Kho</th>
            <th className="p-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-b">
              <td className="p-3">{p.id}</td>
              <td className="p-3 font-medium">{p.name}</td>
              <td className="p-3">{p.price?.toLocaleString()}đ</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3">
                <Link to={`/admin/products/edit/${p.id}`} className="text-blue-600 mr-3">Sửa</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-600">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;