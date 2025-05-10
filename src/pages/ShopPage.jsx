import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, List, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchProductsAsync, fetchCategoriesAsync } from '../actions/productActions';
import { setFilters } from '../store/slices/productSlice';
import ProductCard from '../components/ProductCard';
import PageHeader from '../components/PageHeader';
import { Input } from '../components/ui/input';
import debounce from 'lodash/debounce';

const PRODUCTS_PER_PAGE = 20;

const ShopPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const {
    products,
    loading: productsLoading,
    error: productsError,
    categories,
    categoriesLoading,
    filters
  } = useSelector((state) => state.product);

  // Get unique categories by combining same gender categories
  const uniqueCategories = useMemo(() => {
    if (!categories) return [];

    const categoryMap = new Map();

    categories.forEach(category => {
      const key = category.title.toLowerCase();
      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          ...category,
          genders: [category.gender]
        });
      } else {
        const existing = categoryMap.get(key);
        if (!existing.genders.includes(category.gender)) {
          existing.genders.push(category.gender);
        }
      }
    });

    return Array.from(categoryMap.values());
  }, [categories]);

  // Debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(setFilters({ ...filters, search: value }));
      }, 500),
    [dispatch, filters]
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleCategoryClick = (category) => {
    const filter = {
      category: category.id,
      gender: category.genders
    };
    dispatch(setFilters(filter));

    // Update URL
    const genderPath = category.genders.length > 1 ? 'unisex' : category.genders[0];
    history.push(`/shop/${genderPath}/${category.title.toLowerCase()}/${category.id}`);
  };

  // Initial load of products and categories
  useEffect(() => {
    dispatch(fetchProductsAsync());
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  // Update products when filters change
  useEffect(() => {
    if (filters) {
      dispatch(fetchProductsAsync(filters));
    }
  }, [dispatch, filters]);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Shop', link: '/shop' }
  ];

  if (params.gender) {
    breadcrumbs.push({ label: params.gender, link: `/shop/${params.gender}` });
  }

  // Calculate current page products
  const indexOfLastProduct = currentPage * PRODUCTS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate pagination range
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginationRange = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      paginationRange.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationRange.push('...');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={filters?.category ? uniqueCategories.find(c => c.id === filters.category)?.title || 'Shop' : 'Shop'}
        breadcrumbs={breadcrumbs}
      />

      {/* Categories Grid */}
      <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto px-4 py-8">
        {categoriesLoading ? (
          <div className="flex justify-center w-full py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          uniqueCategories.map((category) => (
            <motion.div
              key={category.id}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer w-full sm:w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(25%-1rem)] aspect-[4/3]"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleCategoryClick(category)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-110"
                style={{ backgroundImage: `url(${category.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute h-full flex items-center justify-center p-4 w-full">
                <h3 className="text-white  text-xl font-bold mb-1">
                  {category.title}
                </h3>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Search and Filter Bar */}
      <div className="w-full mx-auto p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-evenly p-6">
          <div className="w-full sm:w-96">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={handleSearchChange}
                className="pl-10 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
            <div className="flex items-center gap-2 border border-gray-300 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-400'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-primary' : 'text-gray-400'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {productsError ? (
          <div className="text-center text-red-600 mb-4">
            {productsError}
          </div>
        ) : productsLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700">Ürün bulunamadı</h3>
            <p className="text-gray-500 mt-2">Lütfen farklı bir kategori seçin</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!productsLoading && products.length > PRODUCTS_PER_PAGE && (
          <div className="flex justify-center mt-8">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${currentPage === 1
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
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === pageNum
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
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${currentPage === Math.ceil(products.length / PRODUCTS_PER_PAGE)
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
    </div>
  );
};

export default ShopPage;
