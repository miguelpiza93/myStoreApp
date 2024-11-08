import { useState } from "react";
import { useGetSuppliersQuery } from "../../../../api/supplier/supplierApi";

const SupplierSelection = ({ className, onChange }) => {
    const { data: suppliers, error, isLoading } = useGetSuppliersQuery();
    const [isSupplierSelected, setIsSupplierSelected] = useState(false);

    if (isLoading) return <div>Loading...</div>
    if (!suppliers) return <div>Missing suppliers!</div>
    if (error) return <div>Error getting suppliers!</div>

    const onChangeSelection = (e) => {
        const { value } = e.target;
        const selected = suppliers.find(supplier => supplier.id === parseInt(value));
        onChange(selected);
        setIsSupplierSelected(true);
    }

    return (
        <div className={className}>
            <label htmlFor="supplier-select">Proveedor:</label>
            <select name="suppliers" id="supplier-select" onChange={onChangeSelection} disabled={isSupplierSelected}>
                <option value="">Seleccione una opción</option>
                {suppliers.map(supplier => {
                    return <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                })}
            </select>
        </div>
    )
}

export default SupplierSelection;