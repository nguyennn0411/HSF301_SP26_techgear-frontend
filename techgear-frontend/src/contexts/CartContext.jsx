import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy giỏ hàng từ Backend
 const fetchCart = async () => {
  try {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    
    // Sửa từ user.id thành user.userId
    const idToCall = user.userId; 

    if (!idToCall) {
      console.warn("Không tìm thấy userId trong localStorage. Thử đăng nhập lại.");
      return;
    }

    const res = await api.get(`/carts/${idToCall}`);
    setCart(res.data);
  } catch (err) {
    console.error("Lỗi lấy giỏ hàng:", err.response?.data || err.message);
  }
};

  // Thêm sản phẩm
  const addToCart = async (productId, quantity = 1) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.userId) return alert("Vui lòng đăng nhập!");

  try {
    await api.post(`/carts/${user.userId}/items/${productId}?quantity=${quantity}`);
    alert("Đã thêm vào giỏ hàng!");
  } catch (err) {
    console.error("Lỗi thêm giỏ hàng:", err);
    // Nếu vẫn lỗi 500 do Jackson, dữ liệu thực tế vẫn đã vào DB
    // Chúng ta thử gọi lại fetchCart để xem dữ liệu mới nhất
  } finally {
    await fetchCart(); // Luôn cập nhật lại số lượng ở Navbar
  }
};

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart, addToCart, loading }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);