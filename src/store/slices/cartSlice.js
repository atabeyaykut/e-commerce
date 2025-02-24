import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        existingItem.count += 1;
      } else {
        state.items.push({
          product,
          count: 1,
          checked: true
        });
      }
      
      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        if (item.checked) {
          return sum + (item.product.price * item.count);
        }
        return sum;
      }, 0);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.product.id !== productId);
      
      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        if (item.checked) {
          return sum + (item.product.price * item.count);
        }
        return sum;
      }, 0);
    },
    updateItemCount: (state, action) => {
      const { productId, count } = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        item.count = Math.max(0, count);
        if (item.count === 0) {
          state.items = state.items.filter(item => item.product.id !== productId);
        }
      }
      
      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        if (item.checked) {
          return sum + (item.product.price * item.count);
        }
        return sum;
      }, 0);
    },
    toggleItemCheck: (state, action) => {
      const productId = action.payload;
      const item = state.items.find(item => item.product.id === productId);
      
      if (item) {
        item.checked = !item.checked;
      }
      
      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        if (item.checked) {
          return sum + (item.product.price * item.count);
        }
        return sum;
      }, 0);
    },
    toggleAllItems: (state, action) => {
      const checkedState = action.payload;
      state.items.forEach(item => {
        item.checked = checkedState;
      });
      
      // Recalculate total
      state.total = state.items.reduce((sum, item) => {
        if (item.checked) {
          return sum + (item.product.price * item.count);
        }
        return sum;
      }, 0);
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
