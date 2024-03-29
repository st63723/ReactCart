export const SET_PRODUCTS = "@app/common/SET_PRODUCTS";
export const SET_MAIN_PRODUCTS = "@app/common/SET_MAIN_PRODUCTS";
export const CLEAR_PRODUCTS = "@app/common/CLEAR_PRODUCTS";
export const ADD_TO_CART = "@app/common/ADD_TO_CART";
export const SET_WISHLIST = "@app/common/SET_WISHLIST";
export const DELETE_TO_CART = "@app/common/DELETE_TO_CART";
export const CART_JEWELLERY = "@app/common/CART_JEWELLERY";
export const CHECKOUT = "@app/common/CHECKOUT";
export const FILTER_RESULT_STATE = "@app/common/FILTER_RESULT_STATE"
const initialState = { checkout: [], filter: [], data: [], loading: false, cart: [], datas: [], wishlist: [], jewellery: [] }
const addItemToCart = (state, action) => {
  action.payload.quantity = action.quantity;
  const x = [action.payload];
  const y = x;
  const itemInCart = state.cart.find(item => item.id === y.id);
  if (!itemInCart) {
    state.cart = [...state.cart, y[0]];
  } else {
  }
  return { ...state };
}
const products = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        data: action.payload
      };
    case CHECKOUT:
      return {
        ...state,
        checkout: action.payload
      };
    case SET_MAIN_PRODUCTS:
      return {
        ...state,
        datas: action.payload
      };
    case SET_WISHLIST:
      return {
        ...state,
        wishlist: action.payload
      };
    case DELETE_TO_CART:
      return {
        ...state,
        cart: action.payload
      };
    case FILTER_RESULT_STATE:
      return {
        ...state,
        filter: action.payload
      };
    case CART_JEWELLERY:
      return {
        ...state,
        jewellery: action.payload
      };
    case ADD_TO_CART:
      return addItemToCart(state, action);
    case CLEAR_PRODUCTS:
      return initialState;
    default:
      return state;
  }
};
export default products;
export const checkout = list => ({
  type: CHECKOUT,
  payload: list
});
export const filterResultState = list => ({
  type: FILTER_RESULT_STATE,
  payload: list
});
export const setProducts = list => ({
  type: SET_PRODUCTS,
  payload: list
});
export const setWishlist = list => ({
  type: SET_WISHLIST,
  payload: list
});
export const setMainProducts = list => ({
  type: SET_MAIN_PRODUCTS,
  payload: list
});
export const addToCart = (product, count) => ({
  type: ADD_TO_CART,
  payload: product,
  quantity: count
});
export const deleteToCart = (product) => ({
  type: DELETE_TO_CART,
  payload: product
});
export const setCartJewellery = product => ({
  type: CART_JEWELLERY,
  payload: product
});
export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
});