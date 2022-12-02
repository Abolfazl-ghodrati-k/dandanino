import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: { cartItems: []},
  user: ''
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existedItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existedItem
        ? state.cart.cartItems.map((item) =>
            item.name === existedItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "ADD_USERNAME": {
      const username = action.payload;
      return {...state, user: username}
    }
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
