import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllCategories } from "../../redux/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import styles from "./Header.module.css";
import { ShoppingCartIcon } from "@heroicons/react/outline";

export default function Header() {
  const navigate = useNavigate();
  const { categories } = useAppSelector((state) => state.products);
  const { cartItems } = useAppSelector((state) => state.carts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const getTotalItemsInCart = () => {
    return cartItems.reduce((a, b) => a + b.qty, 0);
  };

  return (
    <header>
      <div className={styles["category-container"]}>
        <h2
          style={{ marginRight: "3rem", cursor: "pointer" }}
          onClick={() => navigate("/", { replace: true })}
        >
          ZEROZILLA
        </h2>
        <>
          <Link to="/">Home</Link>
          {categories.map((category, index) => {
            return (
              <Link to={`/products?category=${category}`} key={index}>
                {category}{" "}
              </Link>
            );
          })}
        </>
      </div>

      <div className={styles.cart} onClick={() => navigate("/cart")}>
        <ShoppingCartIcon />
        {cartItems.length > 0 && <p>{getTotalItemsInCart()}</p>}
      </div>
    </header>
  );
}
