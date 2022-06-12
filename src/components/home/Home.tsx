import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ProductCard from "../products/ProductCard";
import styles from "../products/Product.module.css";
import { getAllProducts } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const { products } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  console.log(products.map(p=> p.rating.rate))

  return (
    <div className={styles.container}>
      {products?.map((product, index) => {
        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        );
      })}
    </div>
  );
}
