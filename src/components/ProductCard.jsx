import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const ProductCard = ({ product }) => {
  // Örnek renk seçenekleri (API'den gelmiyorsa)
  const defaultColors = ['#000000', '#3B82F6', '#EF4444', '#10B981'];
  const colors = product.colors || defaultColors;

  const formatPrice = (price) => {
    return `${price.toFixed(2)} ₺`;
  };

  return (
    <Card className="group border-none shadow-none">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Link to={`/product/${product.id}`} className="block">
            <AspectRatio ratio={3/4} className="overflow-hidden">
              <img
                src={product.images[0]?.url || "https://picsum.photos/300/400"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </Link>
        </div>
      </CardHeader>

      <CardContent className="mt-4 text-center p-0">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-base font-medium text-gray-900 hover:text-blue-600">
            {product.name || "English Department"}
          </h3>
        </Link>
        <div className="text-sm text-gray-500 mt-1">
          {product.category || "Graphic Design"}
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(product.price || 16.48)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.oldPrice)}
            </span>
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
