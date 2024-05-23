import { useState } from "react";
import { useGetSupplierQuery, useGetSuppliersQuery } from "../../api/supplier/supplierApi";

const SupplierSelection = ({ onChange }) => {
    const { data: suppliers, error, isLoading } = useGetSuppliersQuery();

    if (isLoading) return <div>Loading...</div>
    if (!suppliers) return <div>Missing suppliers!</div>
    if (error) return <div>Error getting suppliers!</div>

    const onChangeSelection = (e) => {
        const { value } = e.target;
        const selected = suppliers.find(supplier => supplier.id === parseInt(value));
        onChange(selected);
    }

    return (
        <div>
            <label htmlFor="supplier-select">Supplier:</label>
            <select name="suppliers" id="supplier-select" onChange={onChangeSelection}>
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

    const handleProductSelection = (e) => {
        const { value } = e.target;
        const selected = supplier.products.find(product => product.id === parseInt(value));
        onChange(selected);
    }

    return (
        <div>
            <label htmlFor="product-select">Product:</label>
            <select name="products" id="product-select" onChange={handleProductSelection}>
                <option value="">Select an option</option>
                {supplier.products.map(product => {
                    return <option key={product.id} value={product.id}>{product.name}</option>
                })}
            </select>
        </div>
    )
}

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

const ProductCard = ({ item }) => {
    return (
        <div>
            <div>{item.product.name}</div>
            <div>{item.supplier.name}</div>
            <div>{item.quantity}</div>
        </div>
    )
}

const SelectedProducts = ({ productInfoList }) => {
    return (
        <div>
            <h1>Selected products</h1>
            {productInfoList.map(productInfo => (
                <ProductCard key={productInfo.id} item={productInfo} />
            ))}
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

    const handleSaveSupplying = () => {
        console.log("in progress");
    }

    return (
        <div>
            <h1>Supplying</h1>
            <SelectingSection onAdd={handleProductAdd} />
            <SelectedProducts productInfoList={selectedProducts} />
            <button disabled={!selectedProducts} onClick={handleSaveSupplying}>
                Save
            </button>
        </div>
    )
}

export default Supplying;