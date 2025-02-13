import React from 'react';
import ShopProductCard from './ShopProductCard';

const ShopProductGrid = ({ className = "" }) => {
  const products = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    title: 'Graphic Design',
    category: 'English Department',
    price: 16.48,
    oldPrice: 6.48,
    image: `https://picsum.photos/400/500?random=${index + 1}`,
    colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
  }));

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ShopProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShopProductGrid;
