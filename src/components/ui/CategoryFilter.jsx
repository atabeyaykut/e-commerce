import React from 'react';

const CategoryFilter = () => {
  const categories = [
    { id: 1, name: 'BESTSELLER PRODUCTS', count: null },
    { id: 2, name: 'Men', count: null },
    { id: 3, name: 'Women', count: null },
    { id: 4, name: 'Accessories', count: null },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between py-6">
        <div className="flex items-center gap-8">
          {categories.map((category) => (
            <button
              key={category.id}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              {category.name}
              {category.count && (
                <span className="ml-1 text-sm text-gray-400">({category.count})</span>
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <button className="p-2 text-gray-400 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
