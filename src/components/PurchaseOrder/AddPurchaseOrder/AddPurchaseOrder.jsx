import { useState, useEffect } from "react";
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

    const handleProductEdit = (productId, newPrice) => {
        setSelection(selection.map(product =>
            product.id === productId
                ? { ...product, unitPrice: newPrice }
                : product
        ));
    };

    useEffect(() => {
        const updatedProducts = selection.map((product) => ({
            ...product,
            total: product.unitPrice * product.quantity,
        }));
        if (JSON.stringify(updatedProducts) !== JSON.stringify(selection)) {

            setSelection(updatedProducts);
        }
    }, [selection]);

    const handleCreateOrder = () => {
        const purchaseOrderLines = selection.map(selectedItem => {
            return {
                productId: selectedItem.id,
                quantity: selectedItem.quantity,
                unitPrice: selectedItem.unitPrice,
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

    const onEdit = (data) => {
        handleProductEdit(data.id, data.unitPrice)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.child}>
                <label htmlFor="start">Fecha estimada de entrega:</label>
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
            <SelectedProducts productInfoList={selection} onEdit={onEdit} />
            <div>
                <button disabled={!selection} onClick={handleCreateOrder}>
                    Guardar orden
                </button>
            </div>
        </div>
    )
}

export default AddPurchaseOrder;