import { createContext, ReactNode, useEffect, useState } from "react";
import { ItemShop } from "../shop-data";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

type Category = {
  [key: string]: ItemShop[];
};

type ProductContextProps = {
  categoriesMap: Category;
};

type ProductProviderProps = {
  children: ReactNode;
};

export const CategoriesContext = createContext<ProductContextProps>({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }: ProductProviderProps) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
