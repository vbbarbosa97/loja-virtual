import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { ItemShop } from "../../shop-data";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../store/categories/categories.selector";
import "./category.styles.scss";
import Spinner from "../../components/spinner/spinner.component";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  const [products, setProducts] = useState<ItemShop[]>(
    categoriesMap[category!]
  );

  useEffect(() => {
    if (category && categoriesMap) {
      const categories = categoriesMap[category];
      setProducts(categories);
    }
  }, [category, categoriesMap]);

  return (
    <>
      <h2 className="category-title">{category?.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {Children.toArray(
            products &&
              products.map((product) => <ProductCard product={product} />)
          )}
        </div>
      )}
    </>
  );
};

export default Category;
