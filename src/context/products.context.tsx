import { createContext, ReactNode, useState } from "react";
import { Product } from "../model/product.model";
import PRODUCTS from "../shop-data.json";

type ProductContextProps = {
  products: Product[];
};

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductsContext = createContext<ProductContextProps>({
  products: [],
});

export const ProductsProvider = ({ children }: ProductProviderProps) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};