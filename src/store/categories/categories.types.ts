import { ItemShop } from "../../shop-data";

export type Category = {
  [key: string]: ItemShop[];
};

export enum CATEGORIES_ACTION_TYPES {
  SET_CATEGORIES = "categories/SET_CATEGORIES",
}
