import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 1,
      title: 'Unique Life',
      subtitle: 'Your Space',
      image: 'https://picsum.photos/400/300?random=1',
      link: '/',
      buttonText: 'Explore Items'
    },
    {
      id: 2,
      title: 'Elements Style',
      subtitle: 'Ends Today',
      image: 'https://picsum.photos/400/300?random=2',
      link: '/',
      buttonText: 'Explore Items'
    },
    {
      id: 3,
      title: 'Elements Style',
      subtitle: 'Ends Today',
      image: 'https://picsum.photos/400/300?random=3',
      link: '/',
      buttonText: 'Explore Items'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="relative overflow-hidden group">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex flex-col justify-center p-6 bg-gradient-to-t from-black/50 to-transparent">
              <span className="text-white text-sm">{category.subtitle}</span>
              <h3 className="text-white text-2xl font-bold mt-2">{category.title}</h3>
              <Link
                to={category.link}
                className="text-white text-sm mt-4 hover:underline"
              >
                {category.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
