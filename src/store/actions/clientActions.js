import api from '../../utils/axios';
import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS
} from '../reducers/clientReducer';

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: SET_LANGUAGE,
  payload: language
});

export const setAddressList = (addresses) => ({
  type: SET_ADDRESS_LIST,
  payload: addresses
});

export const setCreditCards = (cards) => ({
  type: SET_CREDIT_CARDS,
  payload: cards
});

// Thunk Actions
export const fetchRoles = () => async (dispatch, getState) => {
  const { client } = getState();
  
  // Only fetch if roles are not already loaded
  if (client.roles.length === 0) {
    try {
      const response = await api.get('/roles');
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  }
};
