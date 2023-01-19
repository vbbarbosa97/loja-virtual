import { User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { GenericContext } from "./genericContext";

type UserContextProps = {
  currentUser: null | User | undefined;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextProps>({
  currentUser: null,
});

export enum USER_ACTION_TYPES {
  SET_CURRENT_USER = "SET_CURRENT_USER",
}

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state: UserContextProps, action: UserAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const setCurrentUser = (user: User | null) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = { currentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

type UserAction = GenericContext<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  User | null
>;
