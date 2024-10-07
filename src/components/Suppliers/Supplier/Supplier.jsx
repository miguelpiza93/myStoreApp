import { useNavigate } from 'react-router-dom';
import { useAddSupplierMutation, useAddProductToSupplierMutation } from '../../../api/supplier/supplierApi';
import SupplierFormContainer from '../SupplierFormContainer';
import styles from "./Supplier.module.scss"

const Supplier = () => {
    const navigate = useNavigate();
    const [addSupplier] = useAddSupplierMutation();
    const [addProductToSupplier] = useAddProductToSupplierMutation();

    const handleSave = async (state) => {
        const { products, ...suppierData } = state;
        const response = await addSupplier(suppierData);
        const supplierId = response.data.id;
        const productsToLink = Object.fromEntries(
            state.products.map(({ id, price }) => [id, price])
        );
        await addProductToSupplier({ id: supplierId, body: { products: productsToLink } });
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
