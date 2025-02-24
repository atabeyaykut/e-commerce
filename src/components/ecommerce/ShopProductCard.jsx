import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { createSlug } from '../../utils/stringUtils';

const ShopProductCard = ({ product, onAddToCart }) => {
  const getProductUrl = () => {
    const gender = product.gender || 'unisex';
    const categorySlug = createSlug(product.category.name);
    const nameSlug = createSlug(product.name);
    return `/shop/${gender}/${categorySlug}/${product.category.id}/${nameSlug}/${product.id}`;
  };

  return (
    <div className="group relative">
      <Link to={getProductUrl()} className="block cursor-pointer">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={(e) => onAddToCart(e, product)}
              variant="default"
              className="w-full text-gray-900 hover:bg-gray-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              Sepete Ekle
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category.name}</p>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              {product.price.toFixed(2)} TL
            </p>
            {product.oldPrice && (
              <p className="text-sm text-gray-500 line-through">
                {product.oldPrice.toFixed(2)} TL
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ShopProductCard;
