import { useParams } from 'react-router-dom';
import { useSetSalePriceMutation } from '../../../api/product/productApi';
import { useGetSupplierProductQuery } from '../../../api/supplier/supplierApi';
import Table from '../../Table';
import COP from "../../../utils/CurrencyUtils"
import styles from "./EditProduct.module.scss"

const EditProduct = () => {
    const { productId, vendorId } = useParams();
    const { data, error, isLoading, refetch: refetchSupplierProduct } = useGetSupplierProductQuery({vendorId, productId});
    const [setProductSalePrice] = useSetSalePriceMutation();


    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>Missing product!</div>;
    if (error) return <div>Error getting product!</div>;

    const onEdit = (data) => {
        setProductSalePrice({ unitId: data.unitId, salePrice: data.price, productId, vendorId })
        .then(() => {
            refetchSupplierProduct();
        });;
    };


    return (
        <div className={styles.wrapper}>
            <strong>{"Configuración de Producto"}</strong>
            <div><strong>{data.name}: {data.description} - {data.vendorName}</strong></div>
            <Table className={styles.wrapper}
                columns={
                    [
                        {
                            label: 'Unidad',
                            accessor: 'unitName',
                        },
                        {
                            label: 'Precio de venta',
                            accessor: 'price',
                            isEditable: true,
                            type: 'number',
                            formatter: COP
                        }
                    ]
                }
                data={data.salePrices.map(price => { return { ...price, id: price.unitId } })}
                onEdit={onEdit}
            />
        </div>
    );
};

export default EditProduct;
