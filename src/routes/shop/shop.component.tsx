import { Children, useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { ProductsContext } from "../../context/products.context";

import "./shop.styles.scss";

const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {Children.toArray(products.map((item) => <ProductCard product={item} />))}
    </div>
  );
};

export default Shop;
