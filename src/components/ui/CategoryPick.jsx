import React from 'react';
import { Link } from 'react-router-dom';

const CategoryPick = () => {
  const categories = [
    {
      id: 1,
      name: 'Ice Cream',
      image: '/images/categories/ice-cream.png',
      count: '12 Products'
    },
    {
      id: 2,
      name: 'Fresh Fruits',
      image: '/images/categories/fruits.png',
      count: '15 Products'
    },
    {
      id: 3,
      name: 'Fresh Meat',
      image: '/images/categories/meat.png',
      count: '8 Products'
    },
    {
      id: 4,
      name: 'Snacks',
      image: '/images/categories/snacks.png',
      count: '24 Products'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-8">Shop By Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group relative overflow-hidden rounded-lg"
          >
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-sm">{category.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryPick;
