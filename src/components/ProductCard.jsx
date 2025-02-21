import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Örnek renk seçenekleri (API'den gelmiyorsa)
  const defaultColors = ['#000000', '#3B82F6', '#EF4444', '#10B981'];
  const colors = product.colors || defaultColors;

  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-[3/4]">
            <img
              src={product.images[0]?.url || "https://picsum.photos/300/400"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-gray-900 hover:text-blue-600">
            {product.name || "English Department"}
          </h3>
        </Link>
        <div className="text-sm text-gray-500 mt-1">{product.category || "Graphic Design"}</div>

        {/* Price */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-blue-600">
            ${(product.price || 16.48).toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Options */}
        <div className="mt-3 flex items-center justify-center gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-300 transition-all"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
