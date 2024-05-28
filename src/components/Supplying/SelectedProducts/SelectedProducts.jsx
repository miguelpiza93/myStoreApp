import ProductCard from "../ProductCard"
import styles from "./SelectedProducts.module.scss"

const SelectedProducts = ({ productInfoList }) => {
    return (
        <div className={styles.wrapper}>
            <strong>Selected products</strong>
            {productInfoList.map(productInfo => (
                <ProductCard key={productInfo.id} item={productInfo} />
            ))}
        </div>
    )
}

export default SelectedProducts;