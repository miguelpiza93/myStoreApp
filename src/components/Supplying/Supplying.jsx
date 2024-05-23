import { useState } from "react";
import { useGetSupplierQuery, useGetSuppliersQuery } from "../../api/supplier/supplierApi";

const SupplierSelection = ({ onChange }) => {
    const { data: suppliers, error, isLoading } = useGetSuppliersQuery();

    if (isLoading) return <div>Loading...</div>
    if (!suppliers) return <div>Missing suppliers!</div>
    if (error) return <div>Error getting suppliers!</div>

    return (
        <div>
            <label htmlFor="supplier-select">Supplier:</label>
            <select name="suppliers" id="supplier-select" onChange={onChange}>
                <option value="">Select an option</option>
                {suppliers.map(supplier => {
                    return <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                })}
            </select>
        </div>
    )
}

const SupplierProductSelection = ({ supplierId, onChange }) => {
    const { data: supplier, error, isLoading } = useGetSupplierQuery(supplierId);

    if (isLoading) return <div>Loading...</div>
    if (!supplier) return <div>Missing supplier!</div>
    if (error) return <div>Error getting supplier!</div>

    return (
        <div>
            <label htmlFor="product-select">Product:</label>
            <select name="products" id="product-select" onChange={onChange}>
                <option value="">Select an option</option>
                {supplier.products.map(product => {
                    return <option key={product.id} value={product.id}>{product.name}</option>
                })}
            </select>
        </div>
    )
}

const SelectingSection = ({ onAdd }) => {

    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handleSupplierSelection = (e) => {
        const { value: id } = e.target;
        setSelectedSupplier(id);
    };

    const handleProductSelection = (e) => {
        const { value: id } = e.target;
        setSelectedProduct(id);
    };

    const handleQuantityChange = (e) => {
        const { value } = e.target;
        setQuantity(value);
    }

    const handleAddProduct = () => {
        const productToAdd = {
            supplierId: selectedSupplier,
            productId: selectedProduct,
            quantity
        }
        onAdd(productToAdd);
        setQuantity(0);
    }

    return (
        <div>
            <SupplierSelection onChange={handleSupplierSelection} />
            {selectedSupplier && <SupplierProductSelection supplierId={selectedSupplier} onChange={handleProductSelection} />}
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

const SelectedProducts = ({ products }) => {
    return (
        <div>
            <h1>Selected products</h1>
            {products.map(product => {
                return (
                    <strong key={product.id} >{product.quantity}</strong>
                )
            })}
        </div>
    )
}


const Supplying = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductAdd = (newProduct) => {
        setSelectedProducts(
            [...selectedProducts, newProduct]
        )
    }

    return (
        <div>
            <h1>Supplying</h1>
            <SelectingSection onAdd={handleProductAdd} />
            <SelectedProducts products={selectedProducts} />
        </div>
    )
}

export default Supplying;