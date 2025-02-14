import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import clientReducer from './reducers/clientReducer';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  product: productReducer,
  cart: cartReducer
});

const middleware = [thunk];

// Only add logger in development
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
