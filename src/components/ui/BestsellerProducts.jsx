import React from 'react';

const BestsellerProducts = () => {
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
    },
    {
      id: 5,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/product5/300/300'
    },
    {
      id: 6,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/product6/300/300'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex gap-8">
        {/* Left Side - Featured Image */}
        <div className="w-1/3">
          <div className="bg-yellow-400 h-full rounded-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">FURNITURE</h2>
            <p className="text-gray-700 mb-4">5 Items</p>
            <div className="flex-grow relative">
              <img 
                src="https://picsum.photos/seed/furniture-main/800/1000" 
                alt="Featured Furniture"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Products */}
        <div className="w-2/3">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">BESTSELLER PRODUCTS</h2>
            <div className="flex items-center">
              <div className="flex space-x-6 mr-8">
                <button className="text-blue-600 hover:text-blue-800">Men</button>
                <button className="text-gray-600 hover:text-blue-600">Women</button>
                <button className="text-gray-600 hover:text-blue-600">Accessories</button>
              </div>
              <div className="flex space-x-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-blue-600 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group">
                <div className="mb-3">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-medium text-center">{product.name}</h3>
                <p className="text-gray-600 text-sm text-center mb-2">{product.department}</p>
                <div className="flex justify-center items-center">
                  <span className="text-gray-400 line-through mr-2">${product.price}</span>
                  <span className="text-green-600">${product.salePrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestsellerProducts;
