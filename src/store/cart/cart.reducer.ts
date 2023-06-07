import { AnyAction } from "redux";
import { ProductCart } from "../../model/product.model";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  isCartOpen: boolean;
  cartItems: ProductCart[];
};

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
