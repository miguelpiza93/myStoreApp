import { useState } from "react";
import SelectingSection from "./SelectingSection";
import SelectedProducts from "./SelectedProducts";
import styles from "./Supplying.module.scss"
import { useAddPurchaseOrderMutation } from "../../api/purchaseOrder/purchaseOrder";
import { useNavigate } from "react-router-dom";

const Supplying = () => {
    const [selection, setSelection] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState();
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(new Date().toISOString());
    const [addPurchaseOrder] = useAddPurchaseOrderMutation();
    const navigate = useNavigate();

    const handleProductAdd = (newProduct) => {
        setSelection(
            [...selection, newProduct]
        )
    }

    const handleSaveSupplying = () => {
        const purchaseOrderLines = selection.map(selectedItem => {
            return {
                productId: selectedItem.id,
                quantity: selectedItem.quantity
            }
        });
        const body = {
            supplierId: selectedSupplier.id,
            purchaseOrderLines,
            estimatedDeliveryDate
        }
        addPurchaseOrder(body)
            .then(() => {
                setSelection([])
                setSelectedSupplier(undefined);
                navigate("/products");
            });
    }

    const handleInputChange = (e) => {
        const { value } = e.target;
        setEstimatedDeliveryDate(value);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.child}>
                <label htmlFor="start">Estimated delivery date:</label>
                <input
                    type="date"
                    id="start"
                    name="trip-start"
                    value={estimatedDeliveryDate}
                    min="2018-01-01"
                    onChange={handleInputChange}
                />
            </div>
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