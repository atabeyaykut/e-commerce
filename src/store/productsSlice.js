import { createSlice } from '@reduxjs/toolkit';
import { fetchProductsAsync } from '../actions/productActions';

const initialState = {
  products: [],
  total: 0,
  isLoading: false,
  error: null,
  filter: '',
  sort: '',
  currentCategory: null,
  queryParams: {
    category: null,
    filter: '',
    sort: ''
  }
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.queryParams.filter = action.payload;
    },
    setSort: (state, action) => {
      state.queryParams.sort = action.payload;
    },
    setCategory: (state, action) => {
      state.queryParams.category = action.payload;
    },
    clearFilters: (state) => {
      state.queryParams = initialState.queryParams;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'An error occurred while fetching products';
        state.products = [];
        state.total = 0;
      });
  }
});

export const { setFilter, setSort, setCategory, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
