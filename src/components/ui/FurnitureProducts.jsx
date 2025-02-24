import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { addToCart } from '../../store/slices/cartSlice';

const FurnitureProducts = () => {
  const dispatch = useDispatch();
  
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const products = [
    {
      id: 1,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/dessert1/300/300'
    },
    {
      id: 2,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/dessert2/300/300'
    },
    {
      id: 3,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/dessert3/300/300'
    },
    {
      id: 4,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/dessert4/300/300'
    },
    {
      id: 5,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/dessert5/300/300'
    },
    {
      id: 6,
      name: 'Graphic Design',
      department: 'English Department',
      price: 16.48,
      salePrice: 6.48,
      image: 'https://picsum.photos/seed/dessert6/300/300'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex gap-8">
        {/* Left Side - Products */}
        <div className="w-2/3">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">FURNITURE</h2>
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
              <div key={product.id} className="group relative">
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative aspect-square overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        onClick={(e) => handleAddToCart(e, product)}
                        variant="default"
                        className="w-full bg-white text-gray-900 hover:bg-gray-100 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.department}</p>
                    <div className="flex items-center">
                      <span className="text-gray-400 line-through mr-2">${product.price}</span>
                      <span className="text-green-600">${product.salePrice}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Featured Image */}
        <div className="w-1/3">
          <div className="bg-blue-100 h-full rounded-lg overflow-hidden relative">
            <img 
              src="https://picsum.photos/seed/donut/800/1000" 
              alt="Featured Donut"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-8 left-8 text-white">
              <h2 className="text-2xl font-bold mb-2">FURNITURE</h2>
              <p>5 Items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureProducts;
