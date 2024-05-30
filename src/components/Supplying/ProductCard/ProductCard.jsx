import styles from "./ProductCard.module.scss"
import COP from "../../../utils/CurrencyUtils"

const ProductCard = ({ item }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div>{item.product.name}</div>
                <div>{item.supplier.name}</div>
            </div>
            <div className={styles.info}>{item.quantity}</div>
            <div className={styles.info}>{COP.format(item.product.price)}</div>
            <div className={styles.info}>{COP.format(item.product.price * item.quantity)}</div>
        </div>
    )
}

export default ProductCard;