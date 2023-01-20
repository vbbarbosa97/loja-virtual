import { Children, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { ItemShop } from "../../shop-data";
import { selectCategoriesMap } from "../../store/categories/categories.selector";
import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);

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
