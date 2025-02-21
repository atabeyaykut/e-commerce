import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, List, Filter, Search } from 'lucide-react';
import { fetchProductsAsync } from '../actions/productActions';
import { setFilter, setSort, setCategory } from '../store/productsSlice';
import ShopProductGrid from '../components/ecommerce/ShopProductGrid';
import PageHeader from '../components/ui/PageHeader';
import BrandLogos from '../components/ui/BrandLogos';
import debounce from 'lodash/debounce';
import { motion } from 'framer-motion';

const API_URL = 'https://workintech-fe-ecommerce.onrender.com';

const SORT_OPTIONS = [
  { value: '', label: 'Default Sorting' },
  { value: 'price:asc', label: 'Price: Low to High' },
  { value: 'price:desc', label: 'Price: High to Low' },
  { value: 'rating:asc', label: 'Rating: Low to High' },
  { value: 'rating:desc', label: 'Rating: High to Low' }
];

const categories = [
  {
    "id": 1,
    "title": "Tişört",
    "img": `${API_URL}/assets/category-img/category_kadın_tişört.jpg`,
  },
  {
    "id": 2,
    "title": "Ayakkabı",
    "img": `${API_URL}/assets/category-img/category_kadın_ayakkabı.jpg`,
  },
  {
    "id": 3,
    "title": "Ceket",
    "img": `${API_URL}/assets/category-img/category_kadın_ceket.jpg`,
  },
  {
    "id": 4,
    "title": "Elbise",
    "img": `${API_URL}/assets/category-img/category_kadın_elbise.jpg`,
  },
  {
    "id": 5,
    "title": "Etek",
    "img": `${API_URL}/assets/category-img/category_kadın_etek.jpg`,
  },
  {
    "id": 6,
    "title": "Gömlek",
    "img": `${API_URL}/assets/category-img/category_kadın_gömlek.jpg`,
  },
  {
    "id": 7,
    "title": "Kazak",
    "img": `${API_URL}/assets/category-img/category_kadın_kazak.jpg`,
  },
  {
    "id": 8,
    "title": "Pantalon",
    "img": `${API_URL}/assets/category-img/category_kadın_pantalon.jpg`,
  }
];

const ShopPage = () => {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const {
    products,
    isLoading: productsLoading,
    error: productsError,
    queryParams
  } = useSelector((state) => state.products);

  const getCategorySlug = (category) => {
    if (category.slug) return category.slug;
    return category.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[ğ]/g, 'g')
      .replace(/[ü]/g, 'u')
      .replace(/[ş]/g, 's')
      .replace(/[ı]/g, 'i')
      .replace(/[ö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9-]/g, '');
  };

  // Update category when URL changes
  useEffect(() => {
    const { categoryId, gender, categoryName } = params;
    if (categoryId) {
      const selectedCategory = categories.find(cat => cat.id === Number(categoryId));
      if (selectedCategory) {
        dispatch(setCategory(categoryId));

        // Check if we need to redirect
        const currentSlug = getCategorySlug(selectedCategory);
        const currentGender = gender === 'men' ? 'erkek' : (gender === 'women' ? 'kadin' : gender);

        if (gender === 'men' || gender === 'women' || categoryName !== currentSlug) {
          history.replace(`/shop/${currentGender}/${currentSlug}/${categoryId}`);
        }
      } else {
        // If category not found, redirect to shop page
        history.replace('/shop');
      }
    }
  }, [params, history, dispatch]);

  // Debounced search handler
  const debouncedSearch = debounce((value) => {
    dispatch(setFilter(value));
  }, 500);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  // Fetch products when query params change
  useEffect(() => {
    dispatch(fetchProductsAsync(queryParams));
  }, [dispatch, queryParams]);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Shop', link: '/shop' }
  ];

  if (params.gender) {
    breadcrumbs.push({
      label: params.gender === 'kadin' ? 'Kadın' : 'Erkek',
      link: `/shop/${params.gender}`
    });
  }

  const currentCategory = categories.find(cat => cat.id === Number(params.categoryId));

  if (currentCategory) {
    breadcrumbs.push({
      label: currentCategory.title,
      link: `/shop/${params.gender}/${getCategorySlug(currentCategory)}/${currentCategory.id}`
    });
  }

  const handleCategoryClick = (cat) => {
    const targetGender = params.gender || 'kadin';
    const targetSlug = getCategorySlug(cat);
    history.push(`/shop/${targetGender}/${targetSlug}/${cat.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={currentCategory ? currentCategory.title : 'Shop'}
        breadcrumbs={breadcrumbs}
      />

      {/* Categories Grid */}
      <div className="flex flex-wrap justify-center gap-8 max-w-9/11 mx-auto px-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md min-h-[220px] min-w-[200px] w-1/2 md:w-1/5"
            onClick={() => handleCategoryClick(category)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-30 transition-opacity z-10" />
            <img
              src={category.img}
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `${API_URL}/assets/category-img/default.jpg`;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <h3 className="text-white text-2xl font-semibold text-center">
                {category.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>


      {/* Filters Bar */}
      <div className=" max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow">
          {/* View Mode and Filter Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className={`p-2 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-500'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={20} />
            </button>
            <button
              className={`p-2 ${viewMode === 'list' ? 'text-primary' : 'text-gray-500'}`}
              onClick={() => setViewMode('list')}
            >
              <List size={20} />
            </button>
          </div>

          {/* Search Input */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          {/* Sort Select */}
          <div className="w-full md:w-auto">
            <select
              value={queryParams.sort}
              onChange={handleSortChange}
              className="w-full md:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>



      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
          {products.map((product) => (
            <div key={product.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${viewMode === 'list' ? 'flex' : ''}`}>
              <div className={`${viewMode === 'list' ? 'w-1/3' : 'w-full'}`}>
                <img
                  src={product.images[0]?.url || "https://picsum.photos/300/400"}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className={`p-4 ${viewMode === 'list' ? 'w-2/3' : 'w-full'}`}>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                {viewMode === 'list' && (
                  <p className="text-gray-600 mb-4">{product.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ₺{product.price.toFixed(2)}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">★</span>
                    <span className="text-gray-600">{product.rating?.toFixed(1) || "N/A"}</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

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

        <BrandLogos />
      </div>
    </div>
  );
};

export default ShopPage;
