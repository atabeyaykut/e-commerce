import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import api from '../utils/axios';

const initialState = {
  user: null,         // All user information
  addressList: [],    // User's address list
  creditCards: [],    // User's credit card list
  roles: [],         // Available roles
  theme: 'light',    // UI theme preference
  language: 'en'     // Language preference
};

const clientStore = (set, get) => ({
  ...initialState,

  // Set user information
  setUser: (userData) => {
    set((state) => ({
      ...state,
      user: userData
    }), false, 'setUser');
  },

  // Set user's address list
  setAddressList: (addresses) => {
    set((state) => ({
      ...state,
      addressList: addresses
    }), false, 'setAddressList');
  },

  // Set user's credit card list
  setCreditCards: (cards) => {
    set((state) => ({
      ...state,
      creditCards: cards
    }), false, 'setCreditCards');
  },

  // Set available roles
  setRoles: (roles) => {
    set((state) => ({
      ...state,
      roles: roles
    }), false, 'setRoles');
  },

  // Set UI theme
  setTheme: (theme) => {
    set((state) => ({
      ...state,
      theme: theme
    }), false, 'setTheme');

    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  },

  // Set language preference
  setLanguage: (language) => {
    set((state) => ({
      ...state,
      language: language
    }), false, 'setLanguage');

    // Set HTML lang attribute
    document.documentElement.lang = language;
  },

  // Reset store to initial state
  reset: () => {
    set(initialState, false, 'reset');
  },

  // Fetch user profile data
  fetchUserProfile: async () => {
    try {
      const [userResponse, addressesResponse, cardsResponse] = await Promise.all([
        api.get('/user/profile'),
        api.get('/user/addresses'),
        api.get('/user/credit-cards')
      ]);

      set((state) => ({
        ...state,
        user: userResponse.data,
        addressList: addressesResponse.data,
        creditCards: cardsResponse.data
      }), false, 'fetchUserProfile');

      return true;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return false;
    }
  }
});

// Create store with persistence and dev tools
const useClientStore = create(
  devtools(
    persist(clientStore, {
      name: 'client-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        user: state.user
      })
    })
  )
);

export default useClientStore;
