import { useState } from "react";
import SelectingSection from "./SelectingSection";
import SelectedProducts from "./SelectedProducts";
import styles from "./AddPurchaseOrder.module.scss"
import { useAddPurchaseOrderMutation } from "../../../api/purchaseOrder/purchaseOrder";
import { useNavigate } from "react-router-dom";
import { dateToString } from "../../../utils/DateUtils";

const AddPurchaseOrder = () => {
    const [selection, setSelection] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState();
    const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(dateToString(new Date()));
    const [addPurchaseOrder] = useAddPurchaseOrderMutation();
    const navigate = useNavigate();

    const handleProductAdd = (newProduct) => {
        setSelection(
            [...selection, newProduct]
        )
    }

    const handleCreateOrder = () => {
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
                navigate("/purchase-orders");
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
                    min={dateToString(new Date())}
                    onChange={handleInputChange}
                />
            </div>
            <SelectingSection className={styles.child} onAdd={handleProductAdd} onSupplierSelection={setSelectedSupplier} selectedSupplier={selectedSupplier} />
            <SelectedProducts productInfoList={selection} />
            <div>
                <button disabled={!selection} onClick={handleCreateOrder}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default AddPurchaseOrder;