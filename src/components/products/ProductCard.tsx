import Currency from "react-currency-formatter";
import { Product } from "../../redux/slices/productSlice";
import styles from "./Product.module.css";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  return (
    <div className={styles.gridItem}>
      <div>
        <p>{product.category}</p>
        <img
          src={product.image}
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
        />
      </div>

      <h3>{product.title}</h3>

      <div className={styles.currency}>
        <Currency quantity={product.price} currency="INR" />
      </div>
    </div>
  );
}
