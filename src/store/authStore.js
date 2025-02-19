import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { toast } from 'react-toastify';
import api from '../utils/axios';
import useClientStore from './clientStore';
import md5 from 'md5';

const initialState = {
  loading: false,
  error: null
};

const authStore = (set, get) => ({
  ...initialState,

  // Initialize auth state from storage
  initAuth: async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    if (!token) {
      return false;
    }

    try {
      // Set token in API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Fetch user profile
      const response = await api.get('/user/profile');
      
      if (!response.data) {
        throw new Error('No user data received');
      }

      const userData = {
        id: response.data.id,
        name: response.data.name || response.data.email.split('@')[0],
        email: response.data.email,
        role: response.data.role,
        avatar: `https://www.gravatar.com/avatar/${md5(response.data.email.toLowerCase().trim())}?s=200&d=identicon`
      };

      // Update user in client store
      useClientStore.getState().setUser(userData);
      
      return true;
    } catch (error) {
      console.error('Error initializing auth:', error);
      // Clear invalid token
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      return false;
    }
  },

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
        role: response.data.role,
        avatar: `https://www.gravatar.com/avatar/${md5(response.data.email.toLowerCase().trim())}?s=200&d=identicon`
      };

      const token = response.data.token;

      if (!userData.email || !token) {
        throw new Error('Invalid response data structure');
      }

      // Store token based on remember me preference
      if (credentials.rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }

      // Set token in API headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Update user in client store
      useClientStore.getState().setUser(userData);

      // Show success message
      toast.success('Login successful!');

      set({ loading: false, error: null });
      return true;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      set({ loading: false, error: errorMessage });
      toast.error(errorMessage);
      return false;
    }
  },

  logout: () => {
    // Clear token
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    
    // Clear auth headers
    delete api.defaults.headers.common['Authorization'];
    
    // Clear user from client store
    useClientStore.getState().setUser(null);
    
    // Reset state
    set(initialState);
    
    // Show success message
    toast.success('Logged out successfully');
  },

  // Get current auth state
  getAuthState: () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    }
    return false;
  }
});

const useAuthStore = create(devtools(authStore, { name: 'Auth Store' }));

export default useAuthStore;
