import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ProductCard from "../products/ProductCard";
import styles from "../products/Product.module.css";
import { addSearchText, getAllProducts } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const { products, searchText } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addSearchText(""));
  }, []);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {searchText === ""
        ? products?.map((product, index) => {
            return (
              <Link to={`/products/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            );
          })
        : products
            ?.slice()
            ?.filter(
              (product) =>
                product.category.toLowerCase().includes(searchText) ||
                product.description.toLowerCase().includes(searchText) ||
                product.title.toLowerCase().includes(searchText)
            )
            ?.map((product, index) => {
              return (
                <Link to={`/products/${product.id}`} key={product.id}>
                  <ProductCard product={product} />
                </Link>
              );
            })}
    </div>
  );
}
