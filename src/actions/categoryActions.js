import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://workintech-fe-ecommerce.onrender.com';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        'Failed to fetch categories. Please try again later.'
      );
    }
  }
);

export const fetchCategoryNames = createAsyncThunk(
  'categories/fetchCategoryNames',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/names`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 
        'Failed to fetch category names. Please try again later.'
      );
    }
  }
);
