import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import styles from "./cartItemsList.module.css";
import Currency from "react-currency-formatter";
import {
  decreaseQty,
  increaseQty,
  removeItemFromCart,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartItemsList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { cartItems } = useAppSelector((state) => state.carts);

  const getTotal = () => {
    return cartItems?.reduce((a, b) => a + b.product.price * b.qty, 0);
  };

  if (cartItems.length > 0) {
    return (
      <div className={styles.mainContainer}>
        <div className={`${styles.container} ${styles.header}`}>
          <h4 style={{ width: "60%" }}>Product</h4>
          <h4 style={{ width: "25%", textAlign: "center" }}>Quantity</h4>
          <h4 style={{ width: "15%", textAlign: "center" }}>subTotal</h4>
        </div>

        {cartItems.map((cartItem, index) => {
          return (
            <div
              key={index}
              className={styles.container}
              style={{ padding: "1rem" }}
            >
              <div style={{ width: "60%" }}>
                <div className={styles.product}>
                  <img
                    src={cartItem.product.image}
                    alt=""
                    onClick={() => navigate(`/products/${cartItem.product.id}`)}
                  />
                  <div className={styles.product_info}>
                    <h4>{cartItem.product.title} </h4>
                    <h5>Price : {cartItem.product.price} rupees </h5>
                    {cartItem.size && <h5>size : {cartItem.size} </h5>}

                    <p
                      onClick={() =>
                        dispatch(removeItemFromCart(cartItem.product.id))
                      }
                    >
                      Remove
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.counter}>
                <span
                  onClick={() => dispatch(decreaseQty(cartItem.product.id))}
                >
                  -
                </span>
                <span>{cartItem.qty}</span>
                <span
                  onClick={() => dispatch(increaseQty(cartItem.product.id))}
                >
                  +
                </span>
              </div>
              <div style={{ width: "15%", textAlign: "center" }}>
                <Currency
                  quantity={cartItem.product.price * cartItem.qty}
                  currency="INR"
                />
              </div>
            </div>
          );
        })}
        <hr
          style={{ width: "90%", margin: "auto", border: "1px solid #ec684a" }}
        />
        <div className={styles.totalContainer}>
          <h4 className={styles.counter}>Sub total</h4>
          <p>
            <Currency quantity={getTotal()} currency="INR" />
          </p>
        </div>

        <div className={styles.totalContainer}>
          <h4 className={styles.counter}>Delivery</h4>
          <p>Free</p>
        </div>

        <div className={styles.totalContainer}>
          <h4 className={styles.counter}>Total</h4>
          <p>{getTotal().toFixed(2)}</p>
        </div>

        <div className={styles.totalContainer}>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    );
  }

  return <img src="/no_items_in_cart.webp" />;
}
