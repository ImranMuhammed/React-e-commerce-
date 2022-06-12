import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import styles from "./Product.module.css";
import Currency from "react-currency-formatter";
import { addItemTocart } from "../../redux/slices/cartSlice";
import { StarIcon } from "@heroicons/react/solid";

export default function ProductDetails() {
  const { productId }: any = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.products.products[0]);
  const availableSizes = ["XS", "S", "M", "L", "XL"];
  const [size, setSize] = useState("M");

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [productId, dispatch]);

  const handleIncrement = () => {
    setQty((qty) => qty + 1);
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty((qty) => qty - 1);
    }
  };

  const handleChangeSize = (newSize: string) => {
    setSize(newSize);
  };

  const handleAddToCart = () => {
    const cart = {
      product: product,
      size: size,
      qty: qty,
    };
    dispatch(addItemTocart(cart));
    setQty(1);
  };

  if (product) {
    return (
      <div className={styles.product_details_container}>
        <div style={{ width: "50%" }}>
          <img src={product?.image} alt="" width="100%" />
        </div>

        <div className={styles.product_details}>
          <p style={{ fontStyle: "italic", marginBottom: "1rem" }}>
            {product.category}
          </p>
          <h2>{product.title}</h2>

          <div className={styles.rating} >
          {[...Array(Math.ceil(product.rating.rate))].map((_, index) => {
            return <StarIcon key={index} height={20} />;
          })}
        </div>
          <h2>
            <Currency quantity={product.price} currency="INR" />{" "}
          </h2>

          <div className={styles.counter}>
            <h4 style={{ marginBottom: "0.7rem" }}>Select Qty </h4>
            <span onClick={handleDecrement}>-</span>
            <span>{qty}</span>
            <span onClick={handleIncrement}>+</span>
          </div>

          {(product.category.toLowerCase() === "men's clothing".toLowerCase() ||
            product.category.toLowerCase() ===
              "women's clothing".toLowerCase()) && (
            <div className={styles.sizes}>
              {availableSizes.map((s, index) => {
                return (
                  <div
                    key={index}
                    className={s === size ? styles.selected : ""}
                    onClick={() => handleChangeSize(s)}
                  >
                    {s}{" "}
                  </div>
                );
              })}
            </div>
          )}

          <button onClick={handleAddToCart}>Add to cart</button>

          <h3>Product details </h3>
          <p>{product.description} </p>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
}
