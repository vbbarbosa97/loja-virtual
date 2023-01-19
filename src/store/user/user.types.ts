import { User } from "firebase/auth";

export type UserState = {
  currentUser: null | User | undefined;
};

export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = "SET_CURRENT_USER",
}
