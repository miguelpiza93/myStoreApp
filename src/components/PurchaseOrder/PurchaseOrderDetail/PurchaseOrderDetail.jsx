import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetPurchaseOrderQuery, useReceivePurchaseOrderMutation, useUpdatePurchaseOrderLineMutation } from "../../../api/purchaseOrder/purchaseOrder";
import { useGetStockSummaryQuery } from "../../../api/stock/stockApi";
import SelectedProducts from "../AddPurchaseOrder/SelectedProducts"
import { utcToLocalFormat } from "../../../utils/DateUtils";
import styles from "./PurchaseOrderDetail.module.scss"

const PurchaseOrderDetail = () => {

    const { purchaseOrderId } = useParams();
    const { data, error, isLoading } = useGetPurchaseOrderQuery(purchaseOrderId);    
    const { refetch: refetchStockSummary } = useGetStockSummaryQuery(); // Traer la función de refetch para forzar actualización
    const navigate = useNavigate();
    const [receivePurchaseOrder] = useReceivePurchaseOrderMutation();
    const [updateUnitPrice] = useUpdatePurchaseOrderLineMutation();

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>Missing data!</div>;
    if (error) return <div>Error getting data!</div>;

    const onReceiveClick = () => {
        receivePurchaseOrder(purchaseOrderId)
            .then(() => {
                refetchStockSummary();  // Forzar que los datos de stock se actualicen
                navigate("/purchase-orders");
            });
    };

    const onEdit = (data) => {
        updateUnitPrice({ orderId: purchaseOrderId, lineId: data.id, unitPrice: data.unitPrice });
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
                onEdit={data.status === 'PENDING' ? onEdit : null} />
            <div className={styles.option}>
                <button disabled={data.status !== 'PENDING'} onClick={onReceiveClick}>Marcar como recibido</button>
            </div>
        </div>
    )
};

export default PurchaseOrderDetail;