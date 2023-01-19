import { createContext, ReactNode, useReducer, useState } from "react";
import { Product, ProductCart } from "../model/product.model";

type CartContextProps = {
  isCartOpen: boolean;
  setIsCartOpenHandler: () => void;
  cartItems: ProductCart[];
  addItemToCart: (item: Product) => void;
  removeItemToCart: (item: Product) => void;
  clearItemFromCart: (item: Product) => void;
  cartTotal: number;
  cartCount: number;
};

type CartProviderProps = {
  children: ReactNode;
};

enum CART_ACTION_TYPES {
  SET_IS_CART_OPEN = "SET_IS_CART_OPEN",
  SET_CART_ITEMS = "SET_CART_ITEMS",
  SET_CART_COUNT = "SET_CART_COUNT",
  SET_CART_TOTAL = "SET_CART_TOTAL",
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  total: 0,
  cartCount: 0,
};

const cartReducer = (state: CartContextProps, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const addCartItem = (items: ProductCart[], product: Product) => {
  const existingCartItem = items.find((cartItem) => cartItem.id === product.id);

  if (existingCartItem) {
    return items.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...items, { ...product, quantity: 1 }];
};

const removeCartItem = (items: ProductCart[], product: Product) => {
  const existingCartItem = items.find((cartItem) => cartItem.id === product.id);

  if (existingCartItem?.quantity === 1) {
    return items.filter((cartItem) => cartItem.id !== product.id);
  }

  return items.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (items: ProductCart[], product: Product) => {
  return items.filter((cartItem) => cartItem.id !== product.id);
};

export const CartContext = createContext<CartContextProps>({
  isCartOpen: false,
  setIsCartOpenHandler: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemToCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (cartItems: ProductCart[]) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch({ type: CART_ACTION_TYPES.SET_CART_ITEMS, payload });
  };

  const setIsCartOpenHandler = () => {
    setIsCartOpen((value) => !value);
  };

  const addItemToCart = (item: Product) => {
    const newItems = addCartItem(cartItems, item);

    updateCartItemsReducer(newItems);
  };

  const removeItemToCart = (item: Product) => {
    const newItems = removeCartItem(cartItems, item);

    updateCartItemsReducer(newItems);
  };

  const clearItemFromCart = (item: Product) => {
    const newItems = clearCartItem(cartItems, item);

    updateCartItemsReducer(newItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpenHandler,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartTotal,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
