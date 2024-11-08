const SupplierProductSelectionSkeleton = ({ className }) => {
    return (
        <div className={className}>
            <label htmlFor="product-select">Producto:</label>
            <select name="products" id="product-select" disabled>
                <option value="">Seleccione una opción</option>
            </select>
        </div>
    )
}

export default SupplierProductSelectionSkeleton;