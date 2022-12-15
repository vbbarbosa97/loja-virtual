import { createContext, ReactNode, useState } from "react";
import { Product, ProductCart } from "../model/product.model";

type CartContextProps = {
  isCartOpen: boolean;
  setIsCartOpenHandler: () => void;
  cartItems: ProductCart[];
  addItemToCart: (item: Product) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const handlerArrayItems = (items: ProductCart[], product: Product) => {
  const existingCartItem = items.find(
    (cartItem) => cartItem.id === product.id
  );

  if (existingCartItem) {
    return items.map((cartItem) =>
      cartItem.id === product.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...items, { ...product, quantity: 1 }];
};

export const CartContext = createContext<CartContextProps>({
  isCartOpen: false,
  setIsCartOpenHandler: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);

  const setIsCartOpenHandler = () => {
    setIsCartOpen((value) => !value);
  };

  const addItemToCart = (item: Product) => {
    const newItems = handlerArrayItems(cartItems, item);

    setCartItems(newItems);
  };

  const value = { isCartOpen, setIsCartOpenHandler, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
