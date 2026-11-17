"use client";

import { useEffect } from "react";
import { loadCart, saveCart } from "@/lib/cartStorage";
import { hydrateCart } from "@/store/cartSlice";
import { useAppDispatch, useAppStore } from "@/store/hooks";

export default function CartPersistence() {
  const dispatch = useAppDispatch();
  const store = useAppStore();

  useEffect(() => {
    dispatch(hydrateCart(loadCart()));

    let previousItems = store.getState().cart.items;

    const unsubscribe = store.subscribe(() => {
      const items = store.getState().cart.items;

      if (items !== previousItems) {
        previousItems = items;
        saveCart(items);
      }
    });

    return unsubscribe;
  }, [dispatch, store]);

  return null;
}