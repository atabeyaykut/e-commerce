import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../utils/axios';

// Fetch states
const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED'
};

const initialState = {
  categories: [],      // Array of category objects
  productList: [],     // Array of product objects
  total: 0,           // Total number of products
  limit: 25,          // Products per page
  offset: 0,          // Pagination offset
  filter: '',         // Filter string
  fetchState: FETCH_STATES.NOT_FETCHED
};

const productStore = (set, get) => ({
  // State
  ...initialState,

  // Basic Actions
  setCategories: (categories) => 
    set({ categories }, false, 'setCategories'),

  setProductList: (products) => 
    set({ productList: products }, false, 'setProductList'),

  setTotal: (total) => 
    set({ total }, false, 'setTotal'),

  setFetchState: (state) => {
    if (!Object.values(FETCH_STATES).includes(state)) {
      console.error(`Invalid fetch state: ${state}`);
      return;
    }
    set({ fetchState: state }, false, 'setFetchState');
  },

  setLimit: (limit) => {
    if (limit < 1) {
      console.error('Limit must be greater than 0');
      return;
    }
    set({ limit, offset: 0 }, false, 'setLimit'); // Reset offset when limit changes
  },

  setOffset: (offset) => {
    if (offset < 0) {
      console.error('Offset must be non-negative');
      return;
    }
    set({ offset }, false, 'setOffset');
  },

  setFilter: (filter) => 
    set({ filter, offset: 0 }, false, 'setFilter'), // Reset offset when filter changes

  // Reset state
  reset: () => 
    set(initialState, false, 'reset'),

  // Pagination helpers
  nextPage: () => {
    const { offset, limit, total } = get();
    const newOffset = offset + limit;
    if (newOffset < total) {
      set({ offset: newOffset }, false, 'nextPage');
      return true;
    }
    return false;
  },

  prevPage: () => {
    const { offset, limit } = get();
    const newOffset = Math.max(0, offset - limit);
    if (newOffset !== offset) {
      set({ offset: newOffset }, false, 'prevPage');
      return true;
    }
    return false;
  },

  // Async Actions
  fetchCategories: async () => {
    const { categories, setFetchState } = get();
    
    // Return cached categories if available
    if (categories.length > 0) {
      return categories;
    }

    setFetchState(FETCH_STATES.FETCHING);
    
    try {
      const response = await api.get('/categories');
      set({ 
        categories: response.data,
        fetchState: FETCH_STATES.FETCHED 
      }, false, 'fetchCategories');
      
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      set({ fetchState: FETCH_STATES.FAILED }, false, 'fetchCategoriesFailed');
      return [];
    }
  },

  fetchProducts: async (params = {}) => {
    const { setFetchState } = get();
    setFetchState(FETCH_STATES.FETCHING);

    try {
      const { limit, offset, filter } = get();
      const response = await api.get('/products', {
        params: {
          limit,
          offset,
          filter,
          ...params
        }
      });

      set({
        productList: response.data.products,
        total: response.data.total,
        fetchState: FETCH_STATES.FETCHED
      }, false, 'fetchProducts');

      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ 
        fetchState: FETCH_STATES.FAILED,
        productList: [],
        total: 0
      }, false, 'fetchProductsFailed');
      
      return null;
    }
  },

  // Fetch a single product by ID
  getProductById: async (productId) => {
    try {
      const response = await api.get(`/products/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
});

// Create store with devtools
const useProductStore = create(devtools(productStore, { 
  name: 'Product Store',
  enabled: process.env.NODE_ENV === 'development'
}));

export default useProductStore;
