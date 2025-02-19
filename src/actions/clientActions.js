import api from '../utils/axios';

// Action Types
export const CLIENT_ACTIONS = {
  SET_USER: 'client/SET_USER',
  SET_ROLES: 'client/SET_ROLES',
  SET_THEME: 'client/SET_THEME',
  SET_LANGUAGE: 'client/SET_LANGUAGE',
  SET_ADDRESS_LIST: 'client/SET_ADDRESS_LIST',
  SET_CREDIT_CARDS: 'client/SET_CREDIT_CARDS'
};

// Action Creators
export const setUser = (user) => ({
  type: CLIENT_ACTIONS.SET_USER,
  payload: user
});

export const setRoles = (roles) => ({
  type: CLIENT_ACTIONS.SET_ROLES,
  payload: roles
});

export const setTheme = (theme) => ({
  type: CLIENT_ACTIONS.SET_THEME,
  payload: theme
});

export const setLanguage = (language) => ({
  type: CLIENT_ACTIONS.SET_LANGUAGE,
  payload: language
});

export const setAddressList = (addresses) => ({
  type: CLIENT_ACTIONS.SET_ADDRESS_LIST,
  payload: addresses
});

export const setCreditCards = (cards) => ({
  type: CLIENT_ACTIONS.SET_CREDIT_CARDS,
  payload: cards
});

// Thunk Actions
export const fetchRoles = () => async (dispatch, getState) => {
  const { roles } = getState().client;

  // Return if roles are already loaded
  if (roles.length > 0) {
    return roles;
  }

  try {
    const response = await api.get('/roles');
    
    // Filter out admin role for security
    const filteredRoles = response.data.filter(role => role.name.toLowerCase() !== 'admin');
    
    dispatch(setRoles(filteredRoles));
    return filteredRoles;
  } catch (error) {
    console.error('Error fetching roles:', error);
    return [];
  }
};

export const fetchUserProfile = () => async (dispatch) => {
  try {
    // Fetch user data in parallel
    const [profileResponse, addressesResponse, cardsResponse] = await Promise.all([
      api.get('/user/profile'),
      api.get('/user/addresses'),
      api.get('/user/credit-cards')
    ]);

    // Update user profile
    dispatch(setUser(profileResponse.data));
    
    // Update address list
    dispatch(setAddressList(addressesResponse.data));
    
    // Update credit cards
    dispatch(setCreditCards(cardsResponse.data));

    return true;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return false;
  }
};
