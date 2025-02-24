import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from './ui/card';
import { AspectRatio } from './ui/aspect-ratio';
import { Button } from './ui/button';
import { Image } from './ui/image';
import { Price } from './ui/price';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { createSlug } from '../utils/stringUtils';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const getProductUrl = () => {
    const nameSlug = createSlug(product.name);
    const categoryName = product.category?.name || 'uncategorized';
    const categorySlug = createSlug(categoryName);
    const gender = product.gender || 'unisex';
    const categoryId = product.category_id || 0;

    return `/shop/${gender}/${categorySlug}/${categoryId}/${nameSlug}/${product.id}`;
  };

  return (
    <Card className="group relative gap-2 pb-6 border shadow-sm rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Link to={getProductUrl()} className="block cursor-pointer">
            <AspectRatio ratio={3 / 4} className="overflow-hidden bg-gray-100">
              <Image
                src={product.images?.[0]?.url}
                alt={product.name}
                className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                fallbackSrc="https://picsum.photos/300/400"
              />
            </AspectRatio>
          </Link>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              variant="default"
              className="w-full text-gray-900 hover:bg-gray-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to cart
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
          <Price 
            amount={product.price} 
            oldAmount={product.oldPrice}
          />
          
          <div className="flex flex-col items-end text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span>{product.rating || '4.5'}</span>
            </div>
            <span>{product.reviewCount || '128'} reviews</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
