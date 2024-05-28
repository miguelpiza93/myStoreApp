import { useNavigate } from 'react-router-dom';
import { useAddSupplierMutation, useAddProductToSupplierMutation } from '../../../api/supplier/supplierApi';
import SupplierFormContainer from '../SupplierFormContainer';
import styles from "./Supplier.module.scss"

const Supplier = () => {
    const navigate = useNavigate();
    const [addSupplier] = useAddSupplierMutation();
    const [addProductToSupplier] = useAddProductToSupplierMutation();

    const handleSave = async (state) => {
        const response = await addSupplier({ name: state.name });
        const supplierId = response.data.id;
        const products = Object.fromEntries(
            state.products.map(({ id, price }) => [id, price])
        );
        await addProductToSupplier({ products, supplierId });
        navigate("/suppliers");
    };

    return (
        <div className={styles.wrapper}>
            <strong>{"Agregar Proveedor"}</strong>
            <SupplierFormContainer onSave={handleSave} />
        </div>
    );
};

export default Supplier;
