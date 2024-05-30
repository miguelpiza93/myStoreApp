import { useState } from "react";
import SelectingSection from "./SelectingSection";
import SelectedProducts from "./SelectedProducts";
import styles from "./Supplying.module.scss"

const Supplying = () => {
    const [selection, setSelection] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState();

    const handleProductAdd = (newProduct) => {
        setSelection(
            [...selection, newProduct]
        )
    }

    const handleSaveSupplying = () => {
        const purchaseOrderLines = selection.map(selectedItem =>{
            return {
                productId: selectedItem.id,
                quantity: selectedItem.quantity
            }
        });
        const body = {
            supplierId: selectedSupplier.id,
            purchaseOrderLines
        }
        console.log(body);
    }

    return (
        <div className={styles.wrapper}>
            <SelectingSection className={styles.child} onAdd={handleProductAdd} onSupplierSelection={setSelectedSupplier} selectedSupplier={selectedSupplier} />
            <SelectedProducts productInfoList={selection} />
            <div>
                <button disabled={!selection} onClick={handleSaveSupplying}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default Supplying;