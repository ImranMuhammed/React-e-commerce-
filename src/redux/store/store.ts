import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import productSlice from "../slices/productSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    carts:cartSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
