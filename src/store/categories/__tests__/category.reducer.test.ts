import { ShopData } from "../../../shop-data";
import {
  fetchCategoriesFailed,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
} from "../categories.action";
import {
  CATEGORIES_INITIAL_STATE,
  CategoriesState,
  categoriesReducer,
} from "../categories.reducer";

describe("Category Reducer", () => {
  it("fetchCategoriesStart", () => {
    const expectedState: CategoriesState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: true,
    };

    const action = fetchCategoriesStart();
    const state = categoriesReducer(CATEGORIES_INITIAL_STATE, action);

    expect(state).toEqual(expectedState);
  });

  it("fetchCategoriesSuccess", () => {
    const data: ShopData[] = [
      {
        title: "mens",
        items: [{ id: 1, imageUrl: "Teste", name: "Item", price: 10 }],
      },
    ];

    const expectedState: CategoriesState = {
      ...CATEGORIES_INITIAL_STATE,
      categories: data,
    };

    const action = fetchCategoriesSuccess(data);
    const state = categoriesReducer(CATEGORIES_INITIAL_STATE, action);

    expect(state).toEqual(expectedState);
  });

  it("fetchCategoriesFailed", () => {
    const error = new Error("Error");

    const expectedState: CategoriesState = {
      ...CATEGORIES_INITIAL_STATE,
      error: error,
    };

    const action = fetchCategoriesFailed(error);
    const state = categoriesReducer(CATEGORIES_INITIAL_STATE, action);

    expect(state).toEqual(expectedState);
  });
});
