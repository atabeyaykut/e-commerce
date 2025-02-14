import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const initialState = {
  cart: [],
  payment: null,
  address: null
};

const cartStore = (set, get) => ({
  ...initialState,

  // Setters
  setCart: (cart) => set({ cart }),
  setPayment: (payment) => set({ payment }),
  setAddress: (address) => set({ address }),

  // Cart Actions
  addToCart: (product, count = 1) => {
    const { cart } = get();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.product.id === product.id
          ? { ...item, count: item.count + count }
          : item
      );
      set({ cart: updatedCart });
    } else {
      set({ cart: [...cart, { product, count }] });
    }
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    set({ cart: cart.filter(item => item.product.id !== productId) });
  },

  updateCartItemCount: (productId, count) => {
    const { cart } = get();
    if (count <= 0) {
      set({ cart: cart.filter(item => item.product.id !== productId) });
    } else {
      set({
        cart: cart.map(item =>
          item.product.id === productId ? { ...item, count } : item
        )
      });
    }
  },

  // Calculations
  getCartTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + (item.product.price * item.count), 0);
  },

  getCartItemCount: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.count, 0);
  },

  // Reset
  reset: () => set(initialState)
});

const useCartStore = create(
  devtools(
    persist(cartStore, {
      name: 'cart-storage'
    })
  )
);

export default useCartStore;
