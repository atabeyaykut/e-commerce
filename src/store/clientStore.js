import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import api from '../utils/axios';

const initialState = {
  user: null,
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en'
};

const clientStore = (set, get) => ({
  ...initialState,

  // Setters
  setUser: (user) => set({ user }),
  setAddressList: (addressList) => set({ addressList }),
  setCreditCards: (creditCards) => set({ creditCards }),
  setRoles: (roles) => set({ roles }),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),

  // Actions
  fetchRoles: async () => {
    const { roles } = get();
    if (roles.length === 0) {
      try {
        const response = await api.get('/roles');
        set({ roles: response.data });
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    }
  },

  // Reset
  reset: () => set(initialState)
});

const useClientStore = create(
  devtools(
    persist(clientStore, {
      name: 'client-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language
      })
    })
  )
);

export default useClientStore;
