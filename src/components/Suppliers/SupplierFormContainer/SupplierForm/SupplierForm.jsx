const SupplierForm = ({ name, onInputChange }) => {
    return (
        <div>
            <label htmlFor="supplier_name">Nombre:</label>
            <input
                id="supplier_name"
                type="text"
                name="name"
                autoComplete="off"
                value={name}
                onChange={onInputChange}
                required
                aria-labelledby="supplier_name"
            />
        </div>
    );
};

export default SupplierForm;
