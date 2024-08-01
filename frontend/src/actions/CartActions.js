const ADD_TO_CART = "ADD_TO_CART";
const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const REMOVE_FROM_WISHLIST = "REMOVE_FROM_WISHLIST";
const SAVE_SHIPPING_ADDRESS = "SAVE_SHIPPING_ADDRESS";
const SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD";
const CLEAR_CART = "CLEAR_CART";
const SAVE_CART = "SAVE_CART";


export const addToCart = (item) =>({
    type: ADD_TO_CART,
    payload: item,
  });

export const addToWishlist = (item) =>({
    type: ADD_TO_WISHLIST,
    payload: item,
  });

export const removeFromCart = (id) =>({
    type: REMOVE_FROM_CART,
    payload: id,
  });

export const removeFromWishlist = (id) =>({
    type: REMOVE_FROM_WISHLIST,
    payload: id,
  });

export const clearCart = () =>({
    type: CLEAR_CART,
  });

export const saveCart = (cartItems) => ({
    type: 'SAVE_CART',
    payload: { cartItems },
});


