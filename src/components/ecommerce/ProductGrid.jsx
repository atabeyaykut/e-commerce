import React from 'react';
import ProductCard from './ProductCard';

const ProductGrid = ({ title, className = "" }) => {
  const products = [
    {
      id: 1,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      rating: 4,
      image: 'https://picsum.photos/400'
    },
    {
      id: 2,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      rating: 4,
      image: 'https://picsum.photos/400'
    },
    {
      id: 3,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      rating: 4,
      image: 'https://picsum.photos/400'
    },
    {
      id: 4,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      rating: 4,
      image: 'https://picsum.photos/400'
    },
    {
      id: 5,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      rating: 4,
      image: 'https://picsum.photos/400'
    },
    {
      id: 6,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      rating: 4,
      image: 'https://picsum.photos/400'
    },
    {
      id: 7,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      rating: 4,
      image: 'https://picsum.photos/400'
    },
    {
      id: 8,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      rating: 4,
      image: 'https://picsum.photos/400'
    },
  ];

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
