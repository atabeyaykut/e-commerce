import React from 'react';
import { Link } from 'react-router-dom';

const ShopProductCard = ({ product }) => {
  return (
    <div className="group">
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-[3/4]">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-gray-900 hover:text-blue-600">
            {product.title}
          </h3>
        </Link>
        <div className="text-sm text-gray-500 mt-1">{product.category}</div>

        {/* Price */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Options */}
        {product.colors && (
          <div className="mt-3 flex items-center justify-center gap-2">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProductCard;
