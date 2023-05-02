import { ItemShop } from "../../shop-data";

export type Category = {
  [key: string]: ItemShop[];
};

export enum CATEGORIES_ACTION_TYPES {
  FETCH_CATEGORIES_START = "categories/FETCH_CATEGORIES_START",
  FETCH_CATEGORIES_SUCCESS = "categories/FETCH_CATEGORIES_SUCCESS",
  FETCH_CATEGORIES_FAILED = "categories/FETCH_CATEGORIES_FAILED",
}
