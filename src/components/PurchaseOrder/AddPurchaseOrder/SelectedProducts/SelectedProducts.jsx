import ProductCard from "../ProductCard"
import styles from "./SelectedProducts.module.scss"

const SelectedProducts = ({ productInfoList }) => {
    return (
        <div className={styles.wrapper}>
            <strong>Selected products</strong>
            <div className={styles.header}>
                <strong>Nombre</strong>
                <strong>Cantidad</strong>
                <strong>Precio Unitario</strong>
                <strong>Total</strong>
            </div>
            <div className={styles.cardContainer}>
                {productInfoList.map(productInfo => (
                    <ProductCard key={productInfo.id} item={productInfo} />
                ))}
            </div>
        </div>
    )
}

export default SelectedProducts;