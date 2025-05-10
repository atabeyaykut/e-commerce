import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsAsync, fetchCategoriesAsync } from '../../actions/productActions';

const initialState = {
  selectedProduct: null,
  loading: false,
  error: null,
  products: [],
  categories: [],
  categoriesLoading: false,
  categoriesError: null,
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
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle products fetch
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = null;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle categories fetch
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = action.payload;
        state.categoriesError = null;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError = action.payload;
      });
  }
});

export const {
  clearSelectedProduct,
  setFilters,
  clearFilters
} = productSlice.actions;

export default productSlice.reducer;
