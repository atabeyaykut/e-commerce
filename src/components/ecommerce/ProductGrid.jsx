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
      image: 'https://picsum.photos/400/500?random=10',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 2,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      image: 'https://picsum.photos/400/500?random=11',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 3,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      image: 'https://picsum.photos/400/500?random=12',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 4,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      image: 'https://picsum.photos/400/500?random=13',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 5,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      image: 'https://picsum.photos/400/500?random=14',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 6,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      image: 'https://picsum.photos/400/500?random=15',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 7,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      image: 'https://picsum.photos/400/500?random=16',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    {
      id: 8,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      image: 'https://picsum.photos/400/500?random=17',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
