import { createSelector } from "reselect";
import { ProductCart } from "../../model/product.model";
import { RootState } from "../store";
import { CartState } from "./cart.reducer";

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: ProductCart) =>
      total + cartItem.quantity * cartItem.price,
    0
  )
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total: number, cartItem: ProductCart) => total + cartItem.quantity,
    0
  )
);
