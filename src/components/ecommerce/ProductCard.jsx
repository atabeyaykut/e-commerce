import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg h-[400px]">
        <Link to={`/product/${product.id}`}>
          <div className="w-full h-full">
            <img
              src={`https://picsum.photos/400`}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </Link>
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <ShoppingCart className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Sale Badge */}
        {product.sale && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-sm rounded">
            Sale
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <div className="text-sm text-gray-500 mb-1">{product.category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-blue-600">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center text-yellow-400">
              {'★'.repeat(product.rating)}
              {'☆'.repeat(5 - product.rating)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
