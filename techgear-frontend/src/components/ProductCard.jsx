import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div 
        className="h-48 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img 
          src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <p className="text-xs text-blue-500 font-semibold uppercase">{product.brand?.name}</p>
        <h3 
          className="text-lg font-bold text-gray-800 truncate cursor-pointer hover:text-blue-600"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-red-600">
            {product.price?.toLocaleString('vi-VN')} đ
          </span>
          <button 
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            title="Thêm vào giỏ hàng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;