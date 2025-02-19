import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const initialState = {
  cart: [],     // Array of { count: Number, product: Object }
  payment: null, // Payment information object
  address: null  // Delivery address object
};

const cartStore = (set, get) => ({
  // State
  ...initialState,

  // Basic Actions
  setCart: (cart) => 
    set({ cart }, false, 'setCart'),
  
  setPayment: (payment) => 
    set({ payment }, false, 'setPayment'),
  
  setAddress: (address) => 
    set({ address }, false, 'setAddress'),

  // Cart Operations
  addToCart: (product, quantity = 1) => {
    if (!product?.id) {
      console.error('Invalid product object');
      return false;
    }

    if (quantity <= 0) {
      console.error('Quantity must be positive');
      return false;
    }

    const { cart } = get();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, count: item.count + quantity }
          : item
      );
      set({ cart: updatedCart }, false, 'addToCart/update');
    } else {
      set({ cart: [...cart, { count: quantity, product }] }, false, 'addToCart/new');
    }
    return true;
  },

  removeFromCart: (productId) => {
    if (!productId) {
      console.error('Product ID is required');
      return false;
    }

    const { cart } = get();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    
    if (updatedCart.length === cart.length) {
      console.warn('Product not found in cart');
      return false;
    }

    set({ cart: updatedCart }, false, 'removeFromCart');
    return true;
  },

  updateQuantity: (productId, quantity) => {
    if (!productId) {
      console.error('Product ID is required');
      return false;
    }

    if (quantity <= 0) {
      return get().removeFromCart(productId);
    }

    const { cart } = get();
    const existingItem = cart.find(item => item.product.id === productId);

    if (!existingItem) {
      console.warn('Product not found in cart');
      return false;
    }

    const updatedCart = cart.map(item =>
      item.product.id === productId
        ? { ...item, count: quantity }
        : item
    );

    set({ cart: updatedCart }, false, 'updateQuantity');
    return true;
  },

  // Cart Helpers
  clearCart: () => 
    set({ cart: [] }, false, 'clearCart'),

  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => 
      total + (item.count * (item.product.price || 0)), 0);
  },

  getCartItemCount: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.count, 0);
  },

  // Checkout Helpers
  clearCheckout: () => 
    set({ payment: null, address: null }, false, 'clearCheckout'),

  validateCheckout: () => {
    const { cart, payment, address } = get();
    
    if (cart.length === 0) {
      return { valid: false, error: 'Cart is empty' };
    }

    if (!payment) {
      return { valid: false, error: 'Payment information is required' };
    }

    if (!address) {
      return { valid: false, error: 'Delivery address is required' };
    }

    return { valid: true };
  },

  // Reset entire store
  reset: () => 
    set(initialState, false, 'reset')
});

// Create store with persistence and dev tools
const useCartStore = create(
  devtools(
    persist(cartStore, {
      name: 'shopping-cart',
      partialize: (state) => ({
        cart: state.cart // Only persist cart items
      })
    }),
    {
      name: 'Cart Store',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
);

export default useCartStore;
