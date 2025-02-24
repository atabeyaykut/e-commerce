import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { createSlug } from '../utils/stringUtils';
import { useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Örnek renk seçenekleri (API'den gelmiyorsa)
  const defaultColors = ['#000000', '#3B82F6', '#EF4444', '#10B981'];
  const colors = product.colors || defaultColors;

  const formatPrice = (price) => {
    return `${price.toFixed(2)} ₺`;
  };

  const getProductUrl = () => {
    const nameSlug = createSlug(product.name || '');
    // If category name is not available, use "uncategorized"
    const categoryName = product.category || 'uncategorized';
    const categorySlug = createSlug(categoryName);
    const gender = product.gender || 'unisex';
    const categoryId = product.category_id || 0;

    return `/shop/${gender}/${categorySlug}/${categoryId}/${nameSlug}/${product.id}`;
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation
    dispatch(addToCart(product));
  };

  return (
    <Card className="group relative gap-2 pb-6 border shadow-sm rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Link to={getProductUrl()} className="block cursor-pointer">
            <AspectRatio ratio={3 / 4} className="overflow-hidden bg-gray-100">
              <img
                src={product.images?.[0]?.url || "https://picsum.photos/300/400"}
                alt={product.name || 'Product Image'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.stock <= 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-semibold px-4 py-2 bg-red-500 rounded">Out of Stock</span>
                </div>
              )}
            </AspectRatio>
          </Link>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              variant="default"
              className="w-full text-gray-900 hover:bg-gray-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              Sepete Ekle
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <Link
          to={getProductUrl()}
          className="block group-hover:text-blue-600 transition-colors duration-300 cursor-pointer"
        >
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
            {product.name || 'Untitled Product'}
          </h3>
        </Link>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(product.price || 0)}
            </span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{product.rating?.toFixed(1) || 'N/A'}</span>
            </div>
            <span>({product.sell_count || 0})</span>
          </div>
        </div>

        {/* Stock indicator */}
        <div className="mt-2 text-sm">
          {product.stock > 0 ? (
            <span className="text-green-600">{product.stock} in stock</span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-gray-300 transition-all"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
