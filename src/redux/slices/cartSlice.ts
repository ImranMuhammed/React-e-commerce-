import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../models/models";

export interface CartState {
  cartItems: Cart[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addItemTocart: (state, { payload }: PayloadAction<Cart>) => {
      const item = state.cartItems.find(
        (item) => item.product.id === payload.product.id
      );
      if (
        item &&
        item.product.id === payload.product.id &&
        item.size === payload.size
      ) {
        const updatedItem = { ...item, qty: item.qty + payload.qty };
        state.cartItems = state.cartItems.map((item) =>
          item.product.id === payload.product.id ? updatedItem : item
        );
      } else state.cartItems.push(payload);
    },

    removeItemFromCart: (state, { payload }: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== payload
      );
    },

    increaseQty: (state, { payload }: any) => {
      const isItemAvailable = state.cartItems.find(
        (item) => item.product.id === payload
      );
      if (isItemAvailable) {
        state.cartItems = state.cartItems.map((item) =>
          item.product.id === payload ? { ...item, qty: item.qty + 1 } : item
        );
      }
    },

    decreaseQty: (state, { payload }: PayloadAction<number>) => {
      const isItemAvailable = state.cartItems.find(
        (item) => item.product.id === payload
      );
      if (isItemAvailable && isItemAvailable.qty > 1) {
        state.cartItems = state.cartItems.map((item) =>
          item.product.id === payload ? { ...item, qty: item.qty - 1 } : item
        );
      } else if (isItemAvailable && isItemAvailable.qty === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.product.id !== payload
        );
      }
    },
  },
});

export const { addItemTocart, increaseQty, decreaseQty, removeItemFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
