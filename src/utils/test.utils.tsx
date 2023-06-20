import { createStore } from "redux";
import { rootReducer } from "../store/root-reducer";
import { AppStore, RootState } from "../store/store";
import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import type { PreloadedState } from '@reduxjs/toolkit'

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = createStore(rootReducer, preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
