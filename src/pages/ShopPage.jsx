import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import ShopProductGrid from '../components/ecommerce/ShopProductGrid';
import PageHeader from '../components/ui/PageHeader';
import BrandLogos from '../components/ui/BrandLogos';

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Shop' }
  ];

  const categories = [
    {
      id: 1,
      title: 'CLOTHING',
      image: 'https://picsum.photos/400/500?random=1',
      items: '5 Items'
    },
    {
      id: 2,
      title: 'SHOES',
      image: '/images/categories/shoes.jpg',
      items: '5 Items'
    },
    {
      id: 3,
      title: 'ACCESSORIES',
      image: '/images/categories/accessories.jpg',
      items: '5 Items'
    },
    {
      id: 4,
      title: 'BAGS',
      image: '/images/categories/bags.jpg',
      items: '5 Items'
    },
    {
      id: 5,
      title: 'JEWELRY',
      image: '/images/categories/jewelry.jpg',
      items: '5 Items'
    }
  ];

  const products = [
    {
      id: 1,
      title: 'Graphic Design',
      category: 'English Department',
      price: 16.48,
      oldPrice: 6.48,
      rating: 4,
      image: 'https://picsum.photos/400/500?random=5',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42']
    },
    // Add more products as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Shop" breadcrumbs={breadcrumbs} />
      
      {/* Header with Categories */}
      <div className="grid grid-cols-5 gap-4 max-w-9/11 mx-auto px-4">
        {categories.map((category) => (
          <div key={category.id} className="relative group cursor-pointer">
            <div className="aspect-[1/1] overflow-hidden h-full w-full">
              <img
                src="https://picsum.photos/300/400"
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white">
                <h3 className="text-xl font-bold">{category.title}</h3>
                <p className="mt-2 text-sm">{category.items}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shop Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Showing all 20 results</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>Popularity</option>
              <option>Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
              Filter
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <ShopProductGrid />

        <BrandLogos />

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button 
              className="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-r border-gray-300"
              onClick={() => setCurrentPage(1)}
            >
              First
            </button>
            <button 
              className="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-r border-gray-300"
            >
              1
            </button>
            <button 
              className="px-6 py-2 bg-blue-500 text-white"
            >
              2
            </button>
            <button 
              className="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-l border-gray-300"
            >
              3
            </button>
            <button 
              className="px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-l border-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
