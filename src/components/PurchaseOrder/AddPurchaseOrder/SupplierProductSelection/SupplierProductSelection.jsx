import { useGetSupplierProductsQuery } from "../../../../api/supplier/supplierApi";

const SupplierProductSelection = ({ className, supplierId, onChange }) => {
    const { data: supplierProducts, error, isLoading } = useGetSupplierProductsQuery(supplierId);

    if (isLoading) return <div>Loading...</div>
    if (!supplierProducts) return <div>Missing supplier!</div>
    if (error) return <div>Error getting supplier!</div>

    let productsDataInfo = supplierProducts.map(sp=>{
        return {
            id: sp.product.id,
            unitPrice: sp.price,
            name: sp.product.name,
            description: sp.product.description,
            referenceUnitSymbol: sp.product.referenceUnitSymbol,
            fractionalUnit: sp.product.fractionalUnit,
        }
    })

    const handleProductSelection = (e) => {
        const { value } = e.target;
        const selected = productsDataInfo.find(product => product.id === parseInt(value));
        onChange(selected);
    }

    return (
        <div className={className}>
            <label htmlFor="product-select">Producto:</label>
            <select name="products" id="product-select" onChange={handleProductSelection}>
                <option value="">Seleccione una opción</option>
                {productsDataInfo.map(product => {
                    return <option key={product.id} value={product.id}>{product.name} - {product.description}</option>
                })}
            </select>
        </div>
    )
}

export default SupplierProductSelection;