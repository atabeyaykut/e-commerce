import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import api from '../utils/axios';

export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED'
};

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: FETCH_STATES.NOT_FETCHED
};

const productStore = (set, get) => ({
  ...initialState,

  // Setters
  setCategories: (categories) => set({ categories }),
  setProductList: (products) => set({ productList: products }),
  setTotal: (total) => set({ total }),
  setFetchState: (fetchState) => set({ fetchState }),
  setLimit: (limit) => set({ limit }),
  setOffset: (offset) => set({ offset }),
  setFilter: (filter) => set({ filter }),

  // Actions
  fetchProducts: async () => {
    const { limit, offset, filter } = get();
    set({ fetchState: FETCH_STATES.FETCHING });

    try {
      const response = await api.get('/products', {
        params: { limit, offset, filter }
      });

      set({
        productList: response.data.products,
        total: response.data.total,
        fetchState: FETCH_STATES.FETCHED
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ fetchState: FETCH_STATES.FAILED });
    }
  },

  // Reset
  reset: () => set(initialState)
});

const useProductStore = create(devtools(productStore));

export default useProductStore;
