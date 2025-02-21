import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authReducer from './reducers/authReducer';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import productsReducer from './productsSlice';

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
    products: productsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production'
});
