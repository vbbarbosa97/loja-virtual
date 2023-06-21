import { RootState } from "../../store";
import {
  selectCategories,
  selectCategoriesIsLoading,
  selectCategoryReducer,
} from "../categories.selector";

const mockState: Partial<RootState> = {
  categories: {
    isLoading: false,
    error: null,
    categories: [
      {
        title: "mens",
        items: [{ id: 1, imageUrl: "Teste", name: "Item", price: 10 }],
      },
    ],
  },
};

describe("Category Selector", () => {
  it("selectCategoryReducer", () => {
    const categoriesSlice = selectCategoryReducer(mockState as RootState);

    expect(categoriesSlice).toEqual(mockState.categories);
  });

  it("selectCategories", () => {
    const categoriesSlice = selectCategories(mockState as RootState);

    expect(categoriesSlice).toEqual(mockState.categories?.categories);
  });

  it("selectCategoriesIsLoading", () => {
    const categoriesSlice = selectCategoriesIsLoading(mockState as RootState);

    expect(categoriesSlice).toEqual(false);
  });
});
