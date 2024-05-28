import { useNavigate, useParams } from 'react-router-dom';
import { useGetSupplierQuery, useAddProductToSupplierMutation, useUpdateSupplierMutation } from '../../../api/supplier/supplierApi';
import SupplierFormContainer from '../SupplierFormContainer';
import styles from "./EditSupplier.module.scss"

const EditSupplier = () => {
    const navigate = useNavigate();
    const { supplierId } = useParams();
    const { data: originalSupplier, error, isLoading } = useGetSupplierQuery(supplierId);
    const [updateSupplier] = useUpdateSupplierMutation();
    const [addProductToSupplier] = useAddProductToSupplierMutation();

    const handleSave = async (state) => {
        await updateSupplier({ id: supplierId, name: state.name });
        const products = Object.fromEntries(
            state.products.map(({ id, price }) => [id, price])
        );
        await addProductToSupplier({ products, supplierId });
        navigate("/suppliers");
    };

    if (isLoading) return <div>Loading...</div>;
    if (!originalSupplier) return <div>Missing supplier!</div>;
    if (error) return <div>Error getting supplier!</div>;

    return (
        <div className={styles.wrapper}>
            <strong>{"Editar Proveedor"}</strong>
            <SupplierFormContainer initialData={originalSupplier} onSave={handleSave} />
        </div>
    );
};

export default EditSupplier;
