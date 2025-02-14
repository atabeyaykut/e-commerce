import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

// Get initial user data from storage
const getInitialUser = () => {
  try {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    return {
      user: userStr ? JSON.parse(userStr) : null,
      token: token || null,
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error('Error parsing stored user data:', error);
    // Return default state if there's an error
    return {
      user: null,
      token: null,
      loading: false,
      error: null,
    };
  }
};

const initialState = getInitialUser();

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      // Clear storage on logout
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      
      return {
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
