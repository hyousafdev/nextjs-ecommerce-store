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

  return (
    <Provider store={store}>
      <CartPersistence />
      {children}
    </Provider>
  );
}