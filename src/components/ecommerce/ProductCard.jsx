import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    image,
    colors = ['#FF0000', '#00FF00', '#0000FF'],
    category = 'Category',
    isNew = false,
    isSale = false,
    salePrice,
  } = product;

  return (
    <Card className="group overflow-hidden border-none shadow-none">
      <CardHeader className="p-0">
        <div className="relative">
          <AspectRatio ratio={1}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </AspectRatio>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.sale && (
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-100"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-100"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        <h3 className="text-lg font-medium mb-2">{product.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.oldPrice ? (
              <>
                <span className="text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                <span className="text-red-600">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span>${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
        <div className="mt-1 md:mt-2 flex items-center">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-3 h-3 md:w-4 md:h-4 ${
                index < product.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
