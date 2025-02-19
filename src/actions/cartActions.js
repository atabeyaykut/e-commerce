// Action Types
export const CART_ACTIONS = {
  SET_CART: 'cart/SET_CART',
  SET_PAYMENT: 'cart/SET_PAYMENT',
  SET_ADDRESS: 'cart/SET_ADDRESS',
  ADD_TO_CART: 'cart/ADD_TO_CART',
  REMOVE_FROM_CART: 'cart/REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'cart/UPDATE_QUANTITY',
  CLEAR_CART: 'cart/CLEAR_CART',
  CLEAR_CHECKOUT: 'cart/CLEAR_CHECKOUT'
};

// Action Creators
export const setCart = (cart) => ({
  type: CART_ACTIONS.SET_CART,
  payload: cart
});

export const setPayment = (payment) => ({
  type: CART_ACTIONS.SET_PAYMENT,
  payload: payment
});

export const setAddress = (address) => ({
  type: CART_ACTIONS.SET_ADDRESS,
  payload: address
});

export const addToCart = (product, quantity = 1) => ({
  type: CART_ACTIONS.ADD_TO_CART,
  payload: { product, quantity }
});

export const removeFromCart = (productId) => ({
  type: CART_ACTIONS.REMOVE_FROM_CART,
  payload: productId
});

export const updateQuantity = (productId, quantity) => ({
  type: CART_ACTIONS.UPDATE_QUANTITY,
  payload: { productId, quantity }
});

export const clearCart = () => ({
  type: CART_ACTIONS.CLEAR_CART
});

export const clearCheckout = () => ({
  type: CART_ACTIONS.CLEAR_CHECKOUT
});

// Thunk Actions
export const initiateCheckout = (paymentInfo, addressInfo) => async (dispatch) => {
  try {
    // Validate payment and address info
    if (!paymentInfo || !addressInfo) {
      throw new Error('Payment and address information are required');
    }

    // Set payment and address info
    dispatch(setPayment(paymentInfo));
    dispatch(setAddress(addressInfo));

    return true;
  } catch (error) {
    console.error('Error initiating checkout:', error);
    return false;
  }
};
