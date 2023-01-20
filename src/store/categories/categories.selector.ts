import { createSelector } from "reselect";

//TODO:adicionar interface
const selectCategoryReducer = (state: any) => state.categories;

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice: any) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) =>
    categories.reduce((acc: any, { title, items }: any) => {
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);
