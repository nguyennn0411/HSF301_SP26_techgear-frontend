import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css'
import { CartProvider } from './contexts/CartContext.jsx';
import Navbar from './components/Navbar';
ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
  <React.StrictMode>
    <BrowserRouter>
      {/* Bạn có thể bao bọc thêm AuthProvider hoặc CartProvider tại đây sau này */}
      <Navbar />
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </CartProvider>
);