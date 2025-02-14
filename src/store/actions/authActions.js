import { toast } from 'react-toastify';
import api from '../../utils/axios';

// Action Types
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

// Thunk action for login
export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_START });

  try {
    // API'ye login isteği gönder
    const response = await api.post('/login', {
      email: credentials.email,
      password: credentials.password
    });

    // API yanıtını kontrol et
    if (!response.data) {
      throw new Error('No response data received');
    }

    // API'den gelen veriyi yapılandır
    const userData = {
      user: {
        id: response.data.id,
        name: response.data.name || response.data.email.split('@')[0],
        email: response.data.email,
        role: response.data.role
      },
      token: response.data.token
    };

    // Veriyi kontrol et
    if (!userData.user?.email || !userData.token) {
      throw new Error('Invalid response data structure');
    }

    // Kullanıcı verisini string'e çevir
    const userStr = JSON.stringify(userData.user);

    // Storage'a kaydet
    if (credentials.rememberMe) {
      localStorage.setItem('user', userStr);
      localStorage.setItem('token', userData.token);
    } else {
      sessionStorage.setItem('user', userStr);
      sessionStorage.setItem('token', userData.token);
    }

    // Redux store'u güncelle
    dispatch({
      type: LOGIN_SUCCESS,
      payload: userData
    });

    toast.success('Successfully logged in!', { autoClose: 2000 });
    return true;
  } catch (error) {
    console.error('Login error details:', {
      error: error,
      response: error.response,
      data: error.response?.data
    });

    const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';
    
    dispatch({
      type: LOGIN_FAILURE,
      payload: errorMessage
    });
    
    toast.error(errorMessage);
    return false;
  }
};

export const logout = () => (dispatch) => {
  // Clear storage
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('token');

  // Update Redux store
  dispatch({ type: LOGOUT });
  toast.success('Successfully logged out!');
};
