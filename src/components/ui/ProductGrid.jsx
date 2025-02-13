import React from 'react';

const ProductGrid = () => {
  const products = [
    {
      id: 1,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/product1/300/300'
    },
    {
      id: 2,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/product2/300/300'
    },
    {
      id: 3,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/product3/300/300'
    },
    {
      id: 4,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/product4/300/300'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">BESTSELLER PRODUCTS</h2>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="mb-3 relative overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-base font-medium mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-1">{product.department}</p>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm line-through mr-2">${product.price}</span>
              <span className="text-green-600 text-sm font-semibold">${product.salePrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
