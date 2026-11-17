import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "@/types";
import type { RootState } from "@/store/store";

type CartState = {
  items: CartItem[];
  isHydrated: boolean;
};

const initialState: CartState = {
  items: [],
  isHydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.isHydrated = true;
    },
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

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  hydrateCart,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectIsCartHydrated = (state: RootState) =>
  state.cart.isHydrated;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state: RootState) =>
  Math.round(
    state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    ) * 100,
  ) / 100;