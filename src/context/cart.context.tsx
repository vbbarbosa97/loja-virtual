import { createContext, ReactNode, useState } from "react";

type CartContextProps = {
  isCartOpen: boolean;
  setIsCartOpenHandler: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartContext = createContext<CartContextProps>({
  isCartOpen: false,
  setIsCartOpenHandler: () => {},
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const setIsCartOpenHandler = () => {
    setIsCartOpen((value) => !value);
  };

  const value = { isCartOpen, setIsCartOpenHandler };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
