import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store: any) => (next: any) => (action: any) => {
  if (!action.type) {
    return next(action);
  }

  console.log({
    type: action.type,
    payload: action.payload,
    currentState: store.getState(),
  });

  next(action);

  console.log("next state: ", store.getState());
};

const middleWares = [loggerMiddleware];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
