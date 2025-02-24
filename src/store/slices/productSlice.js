import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedProduct: null,
  loading: false,
  error: null,
  products: [],
  categories: [],
  filters: {
    category: null,
    priceRange: null,
    sortBy: null
  }
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.selectedProduct = null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.error = null;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  }
});

export const {
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
  clearSelectedProduct,
  setProducts,
  setCategories,
  setFilters,
  clearFilters
} = productSlice.actions;

export default productSlice.reducer;
