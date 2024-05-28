import { useState } from "react";
import SelectingSection from "./SelectingSection";
import SelectedProducts from "./SelectedProducts";
import styles from "./Supplying.module.scss"

const Supplying = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductAdd = (newProduct) => {
        setSelectedProducts(
            [...selectedProducts, newProduct]
        )
    }

    const handleSaveSupplying = () => {
        console.log("in progress");
    }

    return (
        <div className={styles.wrapper}>
            <SelectingSection className={styles.child} onAdd={handleProductAdd} />
            <SelectedProducts productInfoList={selectedProducts} />
            <div>
                <button disabled={!selectedProducts} onClick={handleSaveSupplying}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default Supplying;