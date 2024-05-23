import { useState } from "react";
import SupplierSelection from "../SupplierSelection"
import SupplierProductSelection from "../SupplierProductSelection"

const SelectingSection = ({ onAdd }) => {

    const [selectedSupplier, setSelectedSupplier] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [quantity, setQuantity] = useState(0);

    const handleQuantityChange = (e) => {
        const { value } = e.target;
        setQuantity(value);
    }

    const handleAddProduct = () => {
        const productInfoToAdd = {
            id: `${selectedSupplier.id}_${selectedProduct.id}`,
            supplier: selectedSupplier,
            product: selectedProduct,
            quantity
        }
        onAdd(productInfoToAdd);
        setQuantity(0);
    }

    return (
        <div>
            <SupplierSelection onChange={setSelectedSupplier} />
            {selectedSupplier && <SupplierProductSelection supplierId={selectedSupplier.id} onChange={setSelectedProduct} />}
            {selectedProduct &&
                <>
                    <div>
                        <label htmlFor="quantity">Cantidad:</label>
                        <input
                            id="quantity"
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            required
                            aria-labelledby="quantity" />
                    </div>
                    <button disabled={quantity <= 0} onClick={handleAddProduct}>
                        Add
                    </button>
                </>
            }
        </div>
    )
}

export default SelectingSection;