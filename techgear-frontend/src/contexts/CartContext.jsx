import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios.js';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    cartId: null,
    userId: null,
    totalItems: 0,
    totalAmount: 0,
    items: [],
  });
  const [loading, setLoading] = useState(false);

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  const fetchCart = async () => {
    if (!isLoggedIn()) {
      setCart({
        cartId: null,
        userId: null,
        totalItems: 0,
        totalAmount: 0,
        items: [],
      });
      return;
    }

    try {
      setLoading(true);
      const res = await api.get('/cart');
      setCart(res.data);
    } catch (error) {
      console.error('Lỗi lấy giỏ hàng:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isLoggedIn()) {
      alert('Vui lòng đăng nhập!');
      return;
    }

    try {
      setLoading(true);
      await api.post('/cart/items', {
        productId,
        quantity,
      });
      await fetchCart();
      alert('Đã thêm vào giỏ hàng');
    } catch (error) {
      console.error('Lỗi thêm vào giỏ hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể thêm vào giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (cartItemId, quantity) => {
    try {
      setLoading(true);
      await api.put(`/cart/items/${cartItemId}`, { quantity });
      await fetchCart();
    } catch (error) {
      console.error('Lỗi cập nhật giỏ hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể cập nhật giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (cartItemId) => {
    try {
      setLoading(true);
      await api.delete(`/cart/items/${cartItemId}`);
      await fetchCart();
    } catch (error) {
      console.error('Lỗi xóa sản phẩm khỏi giỏ:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể xóa sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await api.delete('/cart');
      await fetchCart();
    } catch (error) {
      console.error('Lỗi xóa giỏ hàng:', error.response?.data || error.message);
      alert(error.response?.data || 'Không thể xóa toàn bộ giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = useMemo(
    () => ({
      cart,
      loading,
      fetchCart,
      addToCart,
      updateCartItem,
      removeCartItem,
      clearCart,
    }),
    [cart, loading]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);