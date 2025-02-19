import { create } from 'zustand';
import { toast } from 'react-toastify';
import api from '../services/api';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  login: async ({ email, password, rememberMe }) => {
    set({ loading: true, error: null });
    try {
      // For development testing, simulate successful login
      if (process.env.NODE_ENV === 'development') {
        const mockResponse = {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJpYXQiOjE3Mzk5Njk3NjcsImV4cCI6MTc0MTYxMTM2N30.GiHyByvRaciZbSUZjeaLqvpWBbmNPYIOZeO0nlbD7g0",
          name: "Cust Omer",
          email: "customer@commerce.com",
          role_id: "3"
        };

        // Store rememberMe preference
        localStorage.setItem('rememberMe', rememberMe);

        // Store token and user data if rememberMe is true
        if (rememberMe) {
          localStorage.setItem('token', mockResponse.token);
          localStorage.setItem('user', JSON.stringify({
            name: mockResponse.name,
            email: mockResponse.email,
            role_id: mockResponse.role_id
          }));
        }

        // Set token in axios headers (without Bearer prefix)
        api.defaults.headers.common['Authorization'] = mockResponse.token;

        set({
          user: {
            name: mockResponse.name,
            email: mockResponse.email,
            role_id: mockResponse.role_id
          },
          token: mockResponse.token,
          isAuthenticated: true,
          loading: false
        });

        toast.success('Successfully logged in!');
        return true;
      }

      const response = await api.post('/login', { email, password });
      const { token, name, email: userEmail, role_id } = response.data;

      // Store rememberMe preference
      localStorage.setItem('rememberMe', rememberMe);

      // Store token and user data if rememberMe is true
      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({
          name,
          email: userEmail,
          role_id
        }));
      }

      // Set token in axios headers (without Bearer prefix)
      api.defaults.headers.common['Authorization'] = token;

      set({
        user: {
          name,
          email: userEmail,
          role_id
        },
        token,
        isAuthenticated: true,
        loading: false
      });

      toast.success('Successfully logged in!');
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'An error occurred during login',
        loading: false
      });
      toast.error(error.response?.data?.message || 'An error occurred during login');
      return false;
    }
  },

  logout: () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    
    // Remove token from axios headers
    delete api.defaults.headers.common['Authorization'];

    set({
      user: null,
      token: null,
      isAuthenticated: false
    });

    toast.success('Successfully logged out!');
  },

  verifyToken: async () => {
    const token = localStorage.getItem('token');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    // Only proceed if we have a token AND rememberMe was true
    if (!token || !rememberMe) {
      // Clear any leftover data if rememberMe is false
      if (!rememberMe) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
      }
      return;
    }

    try {
      // For development testing, simulate successful verification
      if (process.env.NODE_ENV === 'development') {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          
          // Set token in axios headers (without Bearer prefix)
          api.defaults.headers.common['Authorization'] = token;

          set({
            user,
            token,
            isAuthenticated: true
          });
        }
        return;
      }

      // Set token in axios headers (without Bearer prefix)
      api.defaults.headers.common['Authorization'] = token;

      // Verify token with backend
      const response = await api.get('/verify');
      const { name, email, role_id } = response.data;

      // Update user data in store and localStorage
      const user = { name, email, role_id };
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      }

      set({
        user,
        token,
        isAuthenticated: true
      });
    } catch (error) {
      // If token verification fails, clear everything
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('rememberMe');
      delete api.defaults.headers.common['Authorization'];
      
      set({
        user: null,
        token: null,
        isAuthenticated: false
      });
    }
  }
}));

export default useAuthStore;
