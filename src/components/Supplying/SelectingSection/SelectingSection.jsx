import cn from 'classnames';
import { useState } from "react";
import SupplierSelection from "../SupplierSelection"
import { SupplierProductSelection, SupplierProductSelectionSkeleton } from "../SupplierProductSelection"
import styles from "./SelectingSection.module.scss"

const SelectingSection = ({ className, onAdd, onSupplierSelection, selectedSupplier }) => {
    const [selectedProduct, setSelectedProduct] = useState();
    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (e) => {
        const { value } = e.target;
        setQuantity(value ? parseInt(value) : "");
    }

    const handleAddProduct = () => {
        const productInfoToAdd = {
            ...selectedProduct,
            quantity
        }
        onAdd(productInfoToAdd);
        setQuantity(0);
    }

    return (
        <div className={cn(className, styles.wrapper)}>
            <SupplierSelection className={styles.option} onChange={onSupplierSelection} />
            {!selectedSupplier ?
                <SupplierProductSelectionSkeleton className={styles.option} />
                : <SupplierProductSelection className={styles.option} supplierId={selectedSupplier?.id} onChange={setSelectedProduct} />
            }
            <div className={styles.option}>
                <label htmlFor="quantity">Cantidad:</label>
                <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                    required
                    aria-labelledby="quantity"
                    disabled={!selectedProduct} />
            </div>
            <div>
                <button disabled={quantity <= 0} onClick={handleAddProduct}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default SelectingSection;