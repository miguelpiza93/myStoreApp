import { useGetSupplierQuery } from "../../../api/supplier/supplierApi";

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

export default SupplierProductSelection;