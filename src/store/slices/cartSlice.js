import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          count: 1,
          checked: true,
          product: action.payload
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
    },
    updateItemCount: (state, action) => {
      const { productId, count } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      if (item && count >= 1) {
        item.count = count;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateItemCount, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
