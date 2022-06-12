import Currency from "react-currency-formatter";
import { Product } from "../../models/models";
import { StarIcon } from "@heroicons/react/solid";
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

      <div className={styles.rating}>
        {[...Array(Math.ceil(product.rating.rate))].map((_, index) => {
          return <StarIcon key={index} height={20} />;
        })}
      </div>

      <div className={styles.currency}>
        <Currency quantity={product.price} currency="INR" />
      </div>
    </div>
  );
}
