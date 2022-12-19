import { createContext, ReactNode, useEffect, useState } from "react";
import { Product, ProductCart } from "../model/product.model";

type CartContextProps = {
  isCartOpen: boolean;
  setIsCartOpenHandler: () => void;
  cartItems: ProductCart[];
  addItemToCart: (item: Product) => void;
  removeItemToCart: (item: Product) => void;
  clearItemFromCart: (item: Product) => void;
  total: number;
};

type CartProviderProps = {
  children: ReactNode;
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
  total: 0,
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);
  const [total, setTotal] = useState<number>(0);

  const setIsCartOpenHandler = () => {
    setIsCartOpen((value) => !value);
  };

  const addItemToCart = (item: Product) => {
    const newItems = addCartItem(cartItems, item);

    setCartItems(newItems);
  };

  const removeItemToCart = (item: Product) => {
    const newItems = removeCartItem(cartItems, item);

    setCartItems(newItems);
  };

  const clearItemFromCart = (item: Product) => {
    const newItems = clearCartItem(cartItems, item);

    setCartItems(newItems);
  };

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    setTotal(newTotal);
  }, [cartItems]);

  const value = {
    isCartOpen,
    setIsCartOpenHandler,
    cartItems,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
