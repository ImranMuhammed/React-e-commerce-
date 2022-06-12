import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    addTocart: (state, { payload }: PayloadAction<Cart>) => {
      const isItemAvailable = state.cartItems.find(
        (item) => item.product.id === payload.product.id
      );
      state.cartItems.push(payload);
    },
  },
});

export const { addTocart } = cartSlice.actions;

export default cartSlice.reducer;
