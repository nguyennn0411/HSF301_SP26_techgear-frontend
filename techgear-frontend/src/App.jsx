import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import AdminProductList from './pages/admin/AdminProductList';
import ProductForm from './pages/admin/ProductForm';
import Cart from './pages/Cart.jsx';
function App() {
  console.log("App Component đang Render..."); // Kiểm tra xem App có chạy vào đây không

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
    
      

      {/* KHU VỰC HIỂN THỊ NỘI DUNG */}
      <div style={{ border: '2px dashed #ccc', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* Trang báo lỗi nếu sai đường dẫn */}
          <Route path="*" element={<h1>404 - Đường dẫn không tồn tại</h1>} />
          <Route path="/admin/products" element={<AdminProductList />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;