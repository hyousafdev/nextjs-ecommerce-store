import { configureStore } from "@reduxjs/toolkit";
import type { Reducer, UnknownAction } from "@reduxjs/toolkit";
import cartReducer from "@/store/cartSlice";

export type RootState = {
  cart: ReturnType<typeof cartReducer>;
};

// Redux's combineReducers calls Math.random() while validating reducers.
// Next.js Cache Components does not allow that during prerendering,
// so the slices are combined by hand here.
const rootReducer: Reducer<RootState, UnknownAction> = (state, action) => {
  const cart = cartReducer(state?.cart, action);

  if (state && state.cart === cart) {
    return state;
  }

  return { cart };
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];