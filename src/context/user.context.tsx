import { User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

type UserContextProps = {
  currentUser: null | User;
  setUser: (user: User | null) => void;
};

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextProps>({
  currentUser: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const setUser = (user: User | null) => {
    setCurrentUser(user);
  };

  const listenerUser = () => {
    return onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setUser(user);
    });
  };

  useEffect(() => {
    const unsubscribe = listenerUser();

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = { currentUser, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
