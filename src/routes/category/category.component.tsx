import { Children, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../context/categories.context";
import { ItemShop } from "../../shop-data";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState<ItemShop[]>([]);

  useEffect(() => {
    if (category && categoriesMap) {
      const categories = categoriesMap[category];
      setProducts(categories);
    }
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      <div className="category-container">
        {Children.toArray(
          products &&
            products.map((product) => <ProductCard product={product} />)
        )}
      </div>
    </>
  );
};

export default Category;
