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
            <SelectingSection onAdd={handleProductAdd} />
            <SelectedProducts productInfoList={selectedProducts} />
            <button disabled={!selectedProducts} onClick={handleSaveSupplying}>
                Save
            </button>
        </div>
    )
}

export default Supplying;