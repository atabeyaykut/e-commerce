import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authReducer from './reducers/authReducer';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import productsReducer from './productsSlice';
import selectedProductReducer from './slices/productSlice';

const middleware = [];

// Only add logger in development
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    product: productReducer,
    cart: cartReducer,
    products: productsReducer,
    selectedProduct: selectedProductReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
