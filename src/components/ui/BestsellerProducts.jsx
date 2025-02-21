import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        <Card className="w-1/3 border-none shadow-none">
          <CardContent className="bg-yellow-400 h-full rounded-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold mb-2">FURNITURE</h2>
            <p className="text-gray-700 mb-4">5 Items</p>
            <div className="flex-grow relative">
              <AspectRatio ratio={4/5}>
                <img 
                  src="https://picsum.photos/seed/furniture-main/800/1000" 
                  alt="Featured Furniture"
                  className="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </AspectRatio>
            </div>
          </CardContent>
        </Card>

        {/* Right Side - Products */}
        <div className="w-2/3">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">BESTSELLER PRODUCTS</h2>
            <div className="flex items-center">
              <div className="flex space-x-6 mr-8">
                <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto">Men</Button>
                <Button variant="link" className="text-gray-600 hover:text-blue-600 p-0 h-auto">Women</Button>
                <Button variant="link" className="text-gray-600 hover:text-blue-600 p-0 h-auto">Accessories</Button>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-8 h-8 rounded-full border-gray-300 hover:border-blue-600 hover:text-blue-600"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-8 h-8 rounded-full border-gray-300 hover:border-blue-600 hover:text-blue-600"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="group border-none shadow-none">
                <CardContent className="p-0">
                  <div className="mb-3">
                    <AspectRatio ratio={1}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </AspectRatio>
                  </div>
                  <h3 className="text-lg font-medium text-center">{product.name}</h3>
                  <p className="text-gray-600 text-sm text-center mb-2">{product.department}</p>
                  <div className="flex justify-center items-center">
                    <span className="text-gray-400 line-through mr-2">${product.price}</span>
                    <span className="text-green-600">${product.salePrice}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestsellerProducts;
