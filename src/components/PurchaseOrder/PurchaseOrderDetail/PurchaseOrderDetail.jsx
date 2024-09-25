import { useParams } from "react-router-dom";
import { useGetPurchaseOrderQuery } from "../../../api/purchaseOrder/purchaseOrder";
import SelectedProducts from "../../Supplying/SelectedProducts"
import { utcToLocalFormat } from "../../../utils/DateUtils";
import styles from "./PurchaseOrderDetail.module.scss"

const PurchaseOrderDetail = () => {

    const { purchaseOrderId } = useParams();
    const { data, error, isLoading } = useGetPurchaseOrderQuery(purchaseOrderId);

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>Missing data!</div>;
    if (error) return <div>Error getting data!</div>;

    return (
        <div>
            <div className={styles.orderInformation}>
                <div><strong>Supplier: </strong>{data.supplierName}</div>
                <div><strong>Creation Date: </strong>{utcToLocalFormat(data.createdAt)}</div>
                <div><strong>Estimated Delivery Date: </strong>{utcToLocalFormat(data.estimatedDeliveryDate, true)}</div>
            </div>
            {/* <button>Marcar como recibido</button> */}
            <SelectedProducts productInfoList={data.purchaseOrderLines.map(purchaseOrder => {
                return {
                    ...purchaseOrder,
                    price: purchaseOrder.unitPrice,
                    name: purchaseOrder.product?.name,
                    description: purchaseOrder.product?.description
                }
            })} />
        </div>
    )
};

export default PurchaseOrderDetail;