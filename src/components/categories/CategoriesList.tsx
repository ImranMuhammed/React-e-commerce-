import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import ProductCard from "../products/ProductCard";
import styles from "../products/Product.module.css";
import { useQuery } from "../../utils/utils";
import { addSearchText, getProductsByCategory } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";

export default function CategoriesList() {
  const query = useQuery();
  const dispatch = useAppDispatch();
  const { products, searchText } = useAppSelector((state) => state.products);

  useEffect(()=>{
    dispatch(addSearchText(""))
  },[])

  useEffect(() => {
    dispatch(getProductsByCategory(query.get("category")!));
  }, [query]);

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
