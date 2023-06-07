import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxLogger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { rootSaga } from "./root-saga";
import createSagaMiddleware from "redux-saga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares =
  process.env.NODE_ENV !== "production"
    ? [reduxLogger, sagaMiddleware]
    : [sagaMiddleware];

const composeEnhancer =
  process.env.NODE_ENV !== "production" &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
