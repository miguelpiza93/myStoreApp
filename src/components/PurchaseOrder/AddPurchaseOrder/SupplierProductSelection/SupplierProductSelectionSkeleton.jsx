const SupplierProductSelectionSkeleton = ({ className }) => {
    return (
        <div className={className}>
            <label htmlFor="product-select">Product:</label>
            <select name="products" id="product-select" disabled>
                <option value="">Select an option</option>
            </select>
        </div>
    )
}

export default SupplierProductSelectionSkeleton;