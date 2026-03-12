import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import MyOrders from './pages/MyOrders.jsx';
import OrderDetail from './pages/OrderDetail.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

import AdminRoute from './components/AdminRoute.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminProductList from './pages/Admin/AdminProductList.jsx';
import ProductForm from './pages/Admin/ProductForm.jsx';
import AdminOrderList from './pages/Admin/AdminOrderList.jsx';
import AdminOrderDetail from './pages/Admin/AdminOrderDetail.jsx';
import AdminUserList from './pages/Admin/AdminUserList.jsx';
import AdminUserForm from './pages/Admin/AdminUserForm.jsx';
function App() {
  return (
    <Routes>
      {/* Public / User routes */}
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="/orders/:id" element={<OrderDetail />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/payment/:orderId" element={<PaymentPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin routes */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminRoute>
            <AdminProductList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/new"
        element={
          <AdminRoute>
            <ProductForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/products/edit/:id"
        element={
          <AdminRoute>
            <ProductForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AdminRoute>
            <AdminOrderList />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/orders/:id"
        element={
          <AdminRoute>
            <AdminOrderDetail />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUserList />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users/new"
        element={
          <AdminRoute>
            <AdminUserForm />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users/edit/:id"
        element={
          <AdminRoute>
            <AdminUserForm />
          </AdminRoute>
        }
      />
      {/* Fallback */}
      <Route path="*" element={<h2 className="text-center mt-5">404 - Không tìm thấy trang</h2>} />
    </Routes>
  );
}

export default App;