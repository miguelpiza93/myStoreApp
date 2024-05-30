import { useGetpurchaseOrdersQuery } from "../../../api/purchaseOrder/purchaseOrder";
import utcToLocalFormat from "../../../utils/DateUtils";

const PurchaseOrderList = () => {

    const { data: purchaseOrders, error, isLoading } = useGetpurchaseOrdersQuery();
    if (isLoading) return <div>Loading...</div>
    if (!purchaseOrders) return <div>Missing purchaseOrders!</div>
    if (error) return <div>Error getting purchaseOrders!</div>

    return (
        <div>
            {purchaseOrders.map(purchaseOrder => {
                return (
                    <div key={purchaseOrder.id} >{purchaseOrder.supplierName} | {utcToLocalFormat(purchaseOrder.createdAt)}</div>
                )
            })}
        </div>
    )
};

export default PurchaseOrderList;