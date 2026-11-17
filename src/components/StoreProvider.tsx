"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import CartPersistence from "@/components/CartPersistence";
import { makeStore } from "@/store/store";

type StoreProviderProps = {
  children: React.ReactNode;
};

export default function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(() => makeStore());

  // The state the server rendered with. Used only for the hydration render,
  // so the first client render matches the server HTML.
  const [initialState] = useState(() => store.getState());

  return (
    <Provider store={store} serverState={initialState}>
      <CartPersistence />
      {children}
    </Provider>
  );
}