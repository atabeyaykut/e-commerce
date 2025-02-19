import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, List, Filter } from 'lucide-react';
import ShopProductGrid from '../components/ecommerce/ShopProductGrid';
import PageHeader from '../components/ui/PageHeader';
import BrandLogos from '../components/ui/BrandLogos';

const ShopPage = () => {
  const { category, gender } = useParams();
  const history = useHistory();
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [selectedGender, setSelectedGender] = useState(gender);

  useEffect(() => {
    setSelectedCategory(category);
    setSelectedGender(gender);
  }, [category, gender]);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Shop', link: '/shop' },
    ...(gender ? [{ label: gender.charAt(0).toUpperCase() + gender.slice(1), link: `/shop/${gender}` }] : []),
    ...(category ? [{ label: category.charAt(0).toUpperCase() + category.slice(1) }] : [])
  ];

  const categories = [
    {
      id: 1,
      title: 'CLOTHING',
      image: 'https://picsum.photos/400/500?random=1',
      items: '5 Items',
      slug: 'clothing'
    },
    {
      id: 2,
      title: 'SHOES',
      image: '/images/categories/shoes.jpg',
      items: '5 Items',
      slug: 'shoes'
    },
    {
      id: 3,
      title: 'ACCESSORIES',
      image: '/images/categories/accessories.jpg',
      items: '5 Items',
      slug: 'accessories'
    },
    {
      id: 4,
      title: 'BAGS',
      image: '/images/categories/bags.jpg',
      items: '5 Items',
      slug: 'bags'
    },
    {
      id: 5,
      title: 'JEWELRY',
      image: '/images/categories/jewelry.jpg',
      items: '5 Items',
      slug: 'jewelry'
    }
  ];

  const handleCategoryClick = (categorySlug) => {
    if (gender) {
      history.push(`/shop/${gender}/${categorySlug}`);
    } else {
      history.push(`/shop/${categorySlug}`);
    }
  };

  const handleGenderChange = (newGender) => {
    if (category) {
      history.push(`/shop/${newGender}/${category}`);
    } else {
      history.push(`/shop/${newGender}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title="Shop" breadcrumbs={breadcrumbs} />
      
      {/* Gender Filter */}
     

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-9/11 mx-auto px-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="relative group cursor-pointer"
            onClick={() => handleCategoryClick(cat.slug)}
          >
            <div className="aspect-[1/1] overflow-hidden h-full w-full">
              <img
                src="https://picsum.photos/300/400"
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className={`absolute inset-0 flex flex-col items-center justify-center text-white ${
                selectedCategory === cat.slug ? 'bg-blue-600 bg-opacity-70' : 'bg-black bg-opacity-40'
              }`}>
                <h3 className="text-base md:text-xl font-bold">{cat.title}</h3>
                <p className="mt-2 text-xs md:text-sm">{cat.items}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Shop Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 md:gap-0">
          <div className="flex items-center justify-between md:justify-start gap-4">
            <span className="text-sm text-gray-500">
              {selectedCategory || selectedGender 
                ? `Showing results for ${[selectedGender, selectedCategory].filter(Boolean).join(' - ')}`
                : 'Showing all results'}
            </span>
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
          <div className="flex items-center justify-between md:justify-end gap-4">
            <select className="w-full md:w-auto border rounded-md px-3 py-2 text-sm">
              <option>Popularity</option>
              <option>Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-md text-sm">
              <Filter className="w-4 h-4 inline-block mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <ShopProductGrid category={selectedCategory} gender={selectedGender} viewMode={viewMode} />

        <BrandLogos />

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button 
              className="px-4 md:px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-r border-gray-300 text-sm md:text-base"
              onClick={() => setCurrentPage(1)}
            >
              First
            </button>
            <button 
              className="px-4 md:px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-r border-gray-300 text-sm md:text-base"
            >
              1
            </button>
            <button 
              className="px-4 md:px-6 py-2 bg-blue-500 text-white text-sm md:text-base"
            >
              2
            </button>
            <button 
              className="px-4 md:px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-l border-gray-300 text-sm md:text-base"
            >
              3
            </button>
            <button 
              className="px-4 md:px-6 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-l border-gray-300 text-sm md:text-base"
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
