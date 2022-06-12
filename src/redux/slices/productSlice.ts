import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/models";

export interface ProductState {
  products: Product[];
  categories: string[];
  searchText: string;
}

const initialState: ProductState = {
  products: [],
  categories: [],
  searchText: "",
};

export const getAllCategories = createAsyncThunk("categories/get", async () => {
  const categories_list = await fetch(
    "https://fakestoreapi.com/products/categories"
  );
  return categories_list.json();
});

export const getAllProducts = createAsyncThunk("products/get", async () => {
  const products_list = await fetch("https://fakestoreapi.com/products");
  return products_list.json();
});

export const getProductById = createAsyncThunk(
  "products/:id/get",
  async (productId: number) => {
    const products_details = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    return products_details.json();
  }
);

export const getProductsByCategory = createAsyncThunk(
  "products/categories/get",
  async (category: string) => {
    const products_list = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    return products_list.json();
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload.trim().toLowerCase();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.length > 0 ? payload : [];
    });

    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.products = payload.length > 0 ? payload : [];
    });

    builder.addCase(getProductsByCategory.fulfilled, (state, { payload }) => {
      state.products = payload.length > 0 ? payload : [];
    });

    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      state.products = [{ ...payload }];
    });
  },
});

export const {addSearchText}=productsSlice.actions;

export default productsSlice.reducer;
