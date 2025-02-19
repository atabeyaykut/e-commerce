import api from '../utils/axios';

// Action Types
export const PRODUCT_ACTIONS = {
  SET_CATEGORIES: 'product/SET_CATEGORIES',
  SET_PRODUCT_LIST: 'product/SET_PRODUCT_LIST',
  SET_TOTAL: 'product/SET_TOTAL',
  SET_FETCH_STATE: 'product/SET_FETCH_STATE',
  SET_LIMIT: 'product/SET_LIMIT',
  SET_OFFSET: 'product/SET_OFFSET',
  SET_FILTER: 'product/SET_FILTER'
};

// Fetch States
export const FETCH_STATES = {
  NOT_FETCHED: 'NOT_FETCHED',
  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  FAILED: 'FAILED'
};

// Action Creators
export const setCategories = (categories) => ({
  type: PRODUCT_ACTIONS.SET_CATEGORIES,
  payload: categories
});

export const setProductList = (products) => ({
  type: PRODUCT_ACTIONS.SET_PRODUCT_LIST,
  payload: products
});

export const setTotal = (total) => ({
  type: PRODUCT_ACTIONS.SET_TOTAL,
  payload: total
});

export const setFetchState = (state) => ({
  type: PRODUCT_ACTIONS.SET_FETCH_STATE,
  payload: state
});

export const setLimit = (limit) => ({
  type: PRODUCT_ACTIONS.SET_LIMIT,
  payload: limit
});

export const setOffset = (offset) => ({
  type: PRODUCT_ACTIONS.SET_OFFSET,
  payload: offset
});

export const setFilter = (filter) => ({
  type: PRODUCT_ACTIONS.SET_FILTER,
  payload: filter
});

// Thunk Actions
export const fetchProducts = (params = {}) => async (dispatch, getState) => {
  dispatch(setFetchState(FETCH_STATES.FETCHING));

  try {
    const { limit, offset, filter } = getState().product;
    const response = await api.get('/products', {
      params: {
        limit,
        offset,
        filter,
        ...params
      }
    });

    dispatch(setProductList(response.data.products));
    dispatch(setTotal(response.data.total));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
    return null;
  }
};

export const fetchCategories = () => async (dispatch, getState) => {
  const { categories } = getState().product;
  
  // Return if categories are already loaded
  if (categories.length > 0) {
    return categories;
  }

  dispatch(setFetchState(FETCH_STATES.FETCHING));

  try {
    const response = await api.get('/categories');
    dispatch(setCategories(response.data));
    dispatch(setFetchState(FETCH_STATES.FETCHED));
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    dispatch(setFetchState(FETCH_STATES.FAILED));
    return null;
  }
};
