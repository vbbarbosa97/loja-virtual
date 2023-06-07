import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";
import { ItemShop } from "../../shop-data";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const isLoading = useSelector(selectCategoriesIsLoading);
  const categories = useSelector(selectCategories);

  const items = categories.find(
    (x) => x.title.toLowerCase() === category?.toLowerCase()
  )?.items;

  const [products, setProducts] = useState<ItemShop[]>(items ?? []);

  useEffect(() => {
    if (category && categories) {
      const items =
        categories.find((x) => x.title.toLowerCase() === category.toLowerCase())
          ?.items ?? [];
      setProducts(items);
    }
  }, [category, categories]);

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
