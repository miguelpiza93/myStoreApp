import { useGetSupplierProductsQuery } from "../../../api/supplier/supplierApi";

const SupplierProductSelection = ({ className, supplierId, onChange }) => {
    const { data: supplierProducts, error, isLoading } = useGetSupplierProductsQuery(supplierId);

    if (isLoading) return <div>Loading...</div>
    if (!supplierProducts) return <div>Missing supplier!</div>
    if (error) return <div>Error getting supplier!</div>

    let productsDataInfo = supplierProducts.map(sp=>{
        return {
            id: sp.product.id,
            price: sp.price,
            name: sp.product.name,
            description: sp.product.description
        }
    })

    const handleProductSelection = (e) => {
        const { value } = e.target;
        const selected = productsDataInfo.find(product => product.id === parseInt(value));
        onChange(selected);
    }

    return (
        <div className={className}>
            <label htmlFor="product-select">Product:</label>
            <select name="products" id="product-select" onChange={handleProductSelection}>
                <option value="">Select an option</option>
                {productsDataInfo.map(product => {
                    return <option key={product.id} value={product.id}>{product.name} - {product.description}</option>
                })}
            </select>
        </div>
    )
}

export default SupplierProductSelection;