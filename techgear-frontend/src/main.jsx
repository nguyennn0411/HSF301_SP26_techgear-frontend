import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.jsx';
import './index.css';
import { CartProvider } from './contexts/CartContext.jsx';
import Navbar from './components/Navbar.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);