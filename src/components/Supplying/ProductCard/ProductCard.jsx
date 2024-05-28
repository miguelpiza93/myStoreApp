import styles from "./ProductCard.module.scss"

const ProductCard = ({ item }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <div>{item.product.name}</div>
                <div>{item.supplier.name}</div>
            </div>
            <div className={styles.info}>{item.quantity}</div>
        </div>
    )
}

export default ProductCard;