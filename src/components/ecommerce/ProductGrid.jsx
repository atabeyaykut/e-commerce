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
    <div className={className}>
      {title && (
        <h2 className="text-2xl font-bold mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
