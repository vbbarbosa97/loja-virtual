import { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.components";
import {
  selectCategories,
  selectCategoriesIsLoading,
} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () => {
  const isLoading = useSelector(selectCategoriesIsLoading);
  const categories = useSelector(selectCategories);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        categories.map((category) => {
          return (
            <CategoryPreview
              key={category.title}
              title={category.title}
              products={category.items}
            />
          );
        })
      )}
    </Fragment>
  );
};

export default CategoriesPreview;
