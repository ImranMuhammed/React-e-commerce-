import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import CategoriesList from "../components/categories/CategoriesList";
import Home from "../components/home/Home";
import ProductDetails from "../components/products/ProductDetails";

export default function AppRouter() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<CategoriesList />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}
