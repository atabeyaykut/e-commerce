import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => {
    if (item.checked) {
      return sum + (item.product.price * item.count);
    }
    return sum;
  }, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(
        item => 
          item.product.id === product.id && 
          item.product.size === product.size
      );
      
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          product,
          count: 1,
          checked: true
        });
      }
      
      state.total = calculateTotal(state.items);
    },
    
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        item => 
          !(item.product.id === productId && item.product.size === size)
      );
      
      state.total = calculateTotal(state.items);
    },
    
    updateItemCount: (state, action) => {
      const { productId, size, count } = action.payload;
      const item = state.items.find(
        item => 
          item.product.id === productId && 
          item.product.size === size
      );
      
      if (item) {
        item.count = Math.max(0, count);
        
        // Remove item if count is 0
        if (item.count === 0) {
          state.items = state.items.filter(i => i !== item);
        }
      }
      
      state.total = calculateTotal(state.items);
    },
    
    toggleItemCheck: (state, action) => {
      const { productId, size } = action.payload;
      const item = state.items.find(
        item => 
          item.product.id === productId && 
          item.product.size === size
      );
      
      if (item) {
        item.checked = !item.checked;
        state.total = calculateTotal(state.items);
      }
    },
    
    toggleAllItems: (state, action) => {
      const checked = action.payload;
      state.items.forEach(item => {
        item.checked = checked;
      });
      
      state.total = calculateTotal(state.items);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateItemCount,
  toggleItemCheck,
  toggleAllItems,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
