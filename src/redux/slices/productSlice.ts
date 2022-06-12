import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: 1;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface ProductState {
  products: Product[];
  categories: string[];
}

const initialState: ProductState = {
  products: [],
  categories: [],
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
  async (productId:number) => {
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
  reducers: {},
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
      state.products = [{...payload}]
    });
  },
});

export default productsSlice.reducer;
