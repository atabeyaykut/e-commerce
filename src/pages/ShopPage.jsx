import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, List, Filter, Search } from 'lucide-react';
import { fetchProductsAsync } from '../actions/productActions';
import { setFilter, setSort, setCategory, clearFilters } from '../store/productsSlice';
import ProductCard from '../components/ProductCard';
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

const PRODUCTS_PER_PAGE = 20;

const ShopPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const {
    products,
    isLoading: productsLoading,
    error: productsError,
    total,
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

  // Pagination calculation
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i);
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  }, [currentPage, products.length]);

  // Calculate current page products
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  }, [currentPage, products]);

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
        {productsError && (
          <div className="text-center text-red-600 mb-4">
            {productsError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700">Ürün bulunamadı</h3>
              <p className="text-gray-500 mt-2">Lütfen farklı bir arama yapmayı deneyin</p>
            </div>
          ) : (
            currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Pagination */}
        {!productsLoading && products.length > PRODUCTS_PER_PAGE && (
          <div className="flex justify-center mt-8">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                <span className="sr-only">Önceki</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>

              {paginationRange.map((pageNum, index) => {
                if (pageNum === '...') {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === pageNum
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(products.length / PRODUCTS_PER_PAGE), prev + 1))}
                disabled={currentPage === Math.ceil(products.length / PRODUCTS_PER_PAGE)}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                  currentPage === Math.ceil(products.length / PRODUCTS_PER_PAGE)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                } text-sm font-medium`}
              >
                <span className="sr-only">Sonraki</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      <BrandLogos />
    </div>
  );
};

export default ShopPage;
