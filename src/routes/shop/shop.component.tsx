import { Children, useContext } from "react";
import { ProductsContext } from "../../context/products.context";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div>
      {Children.toArray(
        products.map((item) => (
          <div>
            <h1>{item.name}</h1>
          </div>
        ))
      )}
    </div>
  );
};

export default Shop;
