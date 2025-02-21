import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from '../actions/categoryActions';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
  selectedCategory: null
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.categories = [];
      });
  }
});

export const { setCategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;
