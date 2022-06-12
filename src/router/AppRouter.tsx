import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../components/home/Home"));
const CartItemsList = lazy(() => import("../components/cart/CartItemsList"));
const CategoriesList = lazy(
  () => import("../components/categories/CategoriesList")
);
const ProductDetails = lazy(
  () => import("../components/products/ProductDetails")
);

export default function AppRouter() {
  return (
    <div style={{ margin: "auto", maxWidth: "1200px" }}>
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
