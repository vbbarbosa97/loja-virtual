import { SagaType, expectSaga, testSaga } from "redux-saga-test-plan";
import { call } from "typed-redux-saga/macro";
import {
  categoriesSaga,
  fetchCategoriesAsync,
  onFetchCategories,
} from "../categories.saga";
import { CATEGORIES_ACTION_TYPES } from "../categories.types";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "../categories.action";
import { throwError } from "redux-saga-test-plan/providers";

describe("Category Saga", () => {
  it("categoriesSaga", () => {
    //Testa apenas se a saga segue o fluxo correto que foi escrito
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories) as any])
      .next()
      .isDone();
  });

  it("onFetchCategories should takeLatest FETCH_CATEGORIES_START and call fetchCategoriesAsync", () => {
    //Testa apenas se a saga segue o fluxo correto que foi escrito
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
      )
      .next()
      .isDone();
  });

  it("fetchCategoriesAsync success", () => {
    const mockCategoriesArray = [
      {
        title: "Hats",
        items: [
          {
            id: 1,
            name: "Brown Brim",
            imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
            price: 25,
          },
        ],
      },
    ];

    return expectSaga(fetchCategoriesAsync as SagaType<[]>)
      .provide([[call(getCategoriesAndDocuments), mockCategoriesArray]])
      .put(fetchCategoriesSuccess(mockCategoriesArray))
      .run();
  });

  it("fetchCategoriesAsync failure", () => {
    const error = new Error("An error occurred");

    return expectSaga(fetchCategoriesAsync as SagaType<[]>)
      .provide([[call(getCategoriesAndDocuments), throwError(error)]])
      .put(fetchCategoriesFailed(error))
      .run();
  });
});
