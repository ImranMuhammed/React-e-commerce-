import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ProductCard from "../products/ProductCard";
import styles from "../products/Product.module.css";
import { useQuery } from "../../utils/utils";
import { getProductsByCategory } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsByCategory(query.get("category")!));
  }, [query]);

  return (
    <div className={styles.container}>
      {products?.map((product, index) => {
        return (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard key={product.id} product={product} />
          </Link>
        );
      })}
    </div>
  );
}
