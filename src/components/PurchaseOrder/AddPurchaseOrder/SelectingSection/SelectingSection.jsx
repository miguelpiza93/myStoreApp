import cn from 'classnames';
import { useState } from "react";
import SupplierSelection from "../SupplierSelection"
import { SupplierProductSelection, SupplierProductSelectionSkeleton } from "../SupplierProductSelection"
import { NumericInput } from '../../../NumericInput'
import styles from "./SelectingSection.module.scss"

const SelectingSection = ({ className, onAdd, onSupplierSelection, selectedSupplier }) => {
    const [selectedProduct, setSelectedProduct] = useState();
    const [quantity, setQuantity] = useState(0);

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
                <label htmlFor="quantity">Cantidad {selectedProduct ? `(${selectedProduct.referenceUnitSymbol})` : ''}:</label>
                <NumericInput
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    onChange={setQuantity}
                    disabled={!selectedProduct}
                    allowDecimals={selectedProduct?.fractionalUnit}
                />
            </div>
            <div>
                <button disabled={quantity <= 0} onClick={handleAddProduct}>
                    Agregar
                </button>
            </div>
        </div>
    )
}

export default SelectingSection;