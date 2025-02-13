import React from 'react';

const FurnitureComponent = () => {
  const products = [
    {
      id: 1,
      category: 'Men',
      itemCount: 5,
      name: 'Morgan Daisy',
      type: 'Graphe Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/furniture1/300/200'
    },
    {
      id: 2,
      category: 'Women',
      itemCount: 5,
      name: 'Morgan Daisy',
      type: 'Graphe Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/furniture2/300/200'
    },
    {
      id: 3,
      category: 'Accessories',
      itemCount: 5,
      name: 'Morgan Daisy',
      type: 'Graphe Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/furniture3/300/200'
    },
    {
      id: 4,
      category: 'Men',
      itemCount: 5,
      name: 'Morgan Daisy',
      type: 'Graphe Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/furniture4/300/200'
    },
    {
      id: 5,
      category: 'Women',
      itemCount: 5,
      name: 'Morgan Daisy',
      type: 'Graphe Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/furniture5/300/200'
    }
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">FURNITURE</h2>
      <h3 className="text-lg font-semibold mb-2">BESTSELLER PRODUCTS</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Men</span>
              <span className="text-sm text-gray-600">Women</span>
              <span className="text-sm text-gray-600">Accessories</span>
            </div>
            <div className="text-center mb-2">
              <span className="text-sm text-gray-600">{product.itemCount} items</span>
            </div>
            <div className="text-center mb-2">
              <span className="font-bold">{product.name}</span>
            </div>
            <div className="text-center mb-2">
              <span className="text-sm text-gray-600">{product.type}</span>
            </div>
            <div className="text-center mb-2">
              <span className="text-sm text-gray-600">{product.department}</span>
            </div>
            <div className="text-center">
              <span className="text-sm line-through text-gray-400">${product.price}</span>
              <span className="text-sm text-green-600 ml-2">${product.salePrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureComponent;
