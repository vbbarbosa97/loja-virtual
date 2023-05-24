import { UserState, USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

//TODO:adicionar interface
export const userReducer = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return { ...state, currentUser: payload };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return { ...state, error: payload };
    default:
      return state;
  }
};
