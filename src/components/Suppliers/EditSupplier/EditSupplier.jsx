import { useNavigate, useParams } from 'react-router-dom';
import { useGetSupplierQuery, useAddProductToSupplierMutation, useUpdateSupplierMutation } from '../../../api/supplier/supplierApi';
import SupplierFormContainer from '../SupplierFormContainer/SupplierFormContainer';
import style from "./Supplier.module.scss";

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
        <div className={style.form}>
            <h1>{"Editar Proveedor"}</h1>
            <SupplierFormContainer initialData={originalSupplier} onSave={handleSave} />
        </div>
    );
};

export default EditSupplier;
