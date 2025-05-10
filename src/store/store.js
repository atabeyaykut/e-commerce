import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] // Sadece cart state'ini persist edeceğiz
};

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // redux-persist ile uyumluluk için
    })
});

export const persistor = persistStore(store);
