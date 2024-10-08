import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetPurchaseOrderQuery, useReceivePurchaseOrderMutation } from "../../../api/purchaseOrder/purchaseOrder";
import SelectedProducts from "../AddPurchaseOrder/SelectedProducts"
import { utcToLocalFormat } from "../../../utils/DateUtils";
import styles from "./PurchaseOrderDetail.module.scss"

const PurchaseOrderDetail = () => {

    const { purchaseOrderId } = useParams();
    const { data, error, isLoading } = useGetPurchaseOrderQuery(purchaseOrderId);
    const navigate = useNavigate();
    const [receivePurchaseOrder] = useReceivePurchaseOrderMutation();

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>Missing data!</div>;
    if (error) return <div>Error getting data!</div>;

    const onReceiveClick = () => {
        receivePurchaseOrder(purchaseOrderId)
        .then(()=>{
            navigate("/purchase-orders");
        });
    };

    const onEdit = (data) => {
        console.log(data);
    }

    return (
        <div>
            <div className={styles.orderInformation}>
                <div><strong>Supplier: </strong>{data.supplierName}</div>
                <div><strong>Creation Date: </strong>{utcToLocalFormat(data.createdAt)}</div>
                <div><strong>Estimated Delivery Date: </strong>{utcToLocalFormat(data.estimatedDeliveryDate, true)}</div>
            </div>
            <SelectedProducts productInfoList={data.purchaseOrderLines.map(purchaseOrder => {
                return {
                    ...purchaseOrder,
                    price: purchaseOrder.unitPrice,
                    name: purchaseOrder.product?.name,
                    description: purchaseOrder.product?.description
                }
            })}
            onEdit={onEdit} />
            <div className={styles.option}>
                <button disabled={data.status !== 'PENDING'} onClick={onReceiveClick}>Marcar como recibido</button>
            </div>
        </div>
    )
};

export default PurchaseOrderDetail;