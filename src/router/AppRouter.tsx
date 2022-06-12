import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CartItemsList from "../components/cart/CartItemsList";
import CategoriesList from "../components/categories/CategoriesList";
import Home from "../components/home/Home";
import ProductDetails from "../components/products/ProductDetails";

export default function AppRouter() {
  return (
    <div style={{margin:"auto", maxWidth:"1200px"}} >
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<CategoriesList />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<CartItemsList />} />
        </Routes>
      </Suspense>
    </div>
  );
}
