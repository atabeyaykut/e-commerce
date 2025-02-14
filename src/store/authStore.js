import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { toast } from 'react-toastify';
import api from '../utils/axios';

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

const authStore = (set, get) => ({
  ...initialState,

  // Actions
  login: async (credentials) => {
    set({ loading: true, error: null });

    try {
      const response = await api.post('/login', {
        email: credentials.email,
        password: credentials.password
      });

      if (!response.data) {
        throw new Error('No response data received');
      }

      const userData = {
        id: response.data.id,
        name: response.data.name || response.data.email.split('@')[0],
        email: response.data.email,
        role: response.data.role
      };

      const token = response.data.token;

      if (!userData.email || !token) {
        throw new Error('Invalid response data structure');
      }

      // Store in localStorage or sessionStorage
      if (credentials.rememberMe) {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData));
        sessionStorage.setItem('token', token);
      }

      set({ user: userData, token, loading: false });
      toast.success('Successfully logged in!', { autoClose: 2000 });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return false;
    }
  },

  logout: () => {
    // Clear storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');

    // Reset state
    set(initialState);
    toast.success('Successfully logged out!');
  },

  // Initialize auth state from storage
  initAuth: () => {
    const storedUser = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null');
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (storedUser && storedToken) {
      set({ user: storedUser, token: storedToken });
    }
  }
});

const useAuthStore = create(devtools(authStore));

export default useAuthStore;
