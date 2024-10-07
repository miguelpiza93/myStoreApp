import { useNavigate, useParams } from 'react-router-dom';
import { useGetSupplierQuery, useGetSupplierProductsQuery, useAddProductToSupplierMutation, useUpdateSupplierMutation } from '../../../api/supplier/supplierApi';
import SupplierFormContainer from '../SupplierFormContainer';
import styles from "./EditSupplier.module.scss"

const EditSupplier = () => {
    const navigate = useNavigate();
    const { supplierId } = useParams();
    const { data: originalSupplier, error, isLoading } = useGetSupplierQuery(supplierId);
    const { data: currentProducts, currentProductsError, isLoadingCurrentProducts } = useGetSupplierProductsQuery(supplierId);
    const [updateSupplier] = useUpdateSupplierMutation();
    const [addProductToSupplier] = useAddProductToSupplierMutation();

    const handleSave = async (state) => {
        const { products, ...suppierData } = state;

        await updateSupplier({ id: supplierId, ...suppierData });
        const productsToLink = Object.fromEntries(
            state.products.map(({ id, price }) => [id, parseInt(price)])
        );
        await addProductToSupplier({ id: supplierId, body: { products: productsToLink } });
        navigate("/suppliers");
    };

    if (isLoading) return <div>Loading...</div>;
    if (!originalSupplier) return <div>Missing supplier!</div>;
    if (error) return <div>Error getting supplier!</div>;

    if (isLoadingCurrentProducts) return <div>Loading...</div>;
    if (!currentProducts) return <div>Missing products supplier!</div>;
    if (currentProductsError) return <div>Error getting products from supplier!</div>;

    let initialData = {
        ...originalSupplier,
        products: currentProducts.map(suplierProduct => {
            return {
                id: suplierProduct.product.id,
                price: suplierProduct.price
            }
        })
    }

    return (
        <div className={styles.wrapper}>
            <strong>{"Editar Proveedor"}</strong>
            <SupplierFormContainer initialData={initialData} onSave={handleSave} />
        </div>
    );
};

export default EditSupplier;
