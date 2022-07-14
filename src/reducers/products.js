export const SET_PRODUCTS = "@app/common/SET_PRODUCTS";
export const SET_MAIN_PRODUCTS = "@app/common/SET_MAIN_PRODUCTS";
export const CLEAR_PRODUCTS = "@app/common/CLEAR_PRODUCTS";
export const ADD_TO_CART = "@app/common/ADD_TO_CART";
export const SET_WISHLIST = "@app/common/SET_WISHLIST";
export const DELETE_TO_CART = "@app/common/DELETE_TO_CART";
export const CART_JEWELLERY = "@app/common/CART_JEWELLERY";
export const CART_MEN = "@app/common/CART_MEN";
export const CART_WOMEN = "@app/common/CART_WOMEN";
export const CART_ELECTRONICS = "@app/common/CART_ELECTRONICS";

const initialState = { data: [], loading: false, cart: [] , datas:[], wishlist:[], men:[], women:[], jewellery:[], electronics:[] }

/*const addItemToCart = (state, action) => {
  const x = [action.payload];
  const y = x.map(obj =>({ ...obj, quantity: action.quantity}));
  const itemInCart = state.cart.find(item => item.id === y.id);
 
  if(!itemInCart) {
    state.cart = [...state.cart, y[0]];
  }else {
    
  }
  return { ...state };
} */
/* const deleteItemToCart = (state, action) => {
  const indexOfObject = state.cart.findIndex(object => {
    return object.id === action.payload;
  });    
  if(indexOfObject){
     state.cart.splice(indexOfObject, 1);
  } else {

  }
  return { ...state };
} */

const products = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        data: action.payload
      };
      case SET_MAIN_PRODUCTS:
        return {
          ...state,
          datas: action.payload
        };
        case SET_WISHLIST:
          return {
            ...state,
            datas: action.payload
          };   
        case DELETE_TO_CART:
          return {
            ...state,
            cart: action.payload
          };

        case CART_ELECTRONICS:
          return {
            ...state,
            electronics: action.payload
          };
          case CART_JEWELLERY:
        return {
          ...state,
          jewellery: action.payload
        };
        case CART_MEN:
        return {
          ...state,
          men: action.payload
        };
        case CART_WOMEN:
        return {
          ...state,
          women: action.payload
        };  
    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload
      }; 

    case CLEAR_PRODUCTS:
      return initialState;
    default:
      return state;
  }
};

export default products;

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

export const addToCart = list => ({
  type: ADD_TO_CART,
  payload: list
});
export const deleteToCart = (product) => ({
  type: DELETE_TO_CART,
  payload: product
});

export const setCartElectronics = product => ({
  type: CART_ELECTRONICS,
  payload: product
});
export const setCartJewellery = product => ({
  type: CART_JEWELLERY,
  payload: product
});
export const setCartWomen = product => ({
  type: CART_WOMEN,
  payload: product
});
export const setCartMen = product => ({
  type: CART_MEN,
  payload: product
});

export const clearProducts = () => ({
  type: CLEAR_PRODUCTS
});
