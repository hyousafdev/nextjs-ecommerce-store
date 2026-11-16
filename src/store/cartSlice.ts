import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/types";
import type { RootState } from "./store";

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity = Math.min(existing.quantity + 1, existing.stock);
      } else if (product.stock > 0) {
        state.items.push({
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((entry) => entry.id === action.payload);

      if (item) {
        item.quantity = Math.min(item.quantity + 1, item.stock);
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((entry) => entry.id === action.payload);

      if (!item) {
        return;
      }

      if (item.quantity <= 1) {
        state.items = state.items.filter((entry) => entry.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state: RootState) =>
  Math.round(
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ) * 100,
  ) / 100;