import { useGetSuppliersQuery } from "../../../api/supplier/supplierApi";

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

export default SupplierSelection;