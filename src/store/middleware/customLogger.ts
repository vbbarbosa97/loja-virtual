export const customLoggerMiddleware = (store: any) => (next: any) => (action: any) => {
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