import styles from "./ProductCard.module.scss"
import COP from "../../../../utils/CurrencyUtils"

const ProductCard = ({ item }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div>{item.name} - {item.description}</div>
            </div>
            <div className={styles.info}>{item.quantity}</div>
            <div className={styles.info}>{COP.format(item.price)}</div>
            <div className={styles.info}>{COP.format(item.price * item.quantity)}</div>
        </div>
    )
}

export default ProductCard;