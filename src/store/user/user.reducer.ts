import { UserState, USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE: UserState = {
  currentUser: null,
};

//TODO:adicionar interface
export const userReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      return state;
  }
};
