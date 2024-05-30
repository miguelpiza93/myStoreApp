import { useParams } from "react-router-dom";
import { useGetPurchaseOrderQuery } from "../../../api/purchaseOrder/purchaseOrder";
import SelectedProducts from "../../Supplying/SelectedProducts"

const PurchaseOrderDetail = () => {

    const { purchaseOrderId } = useParams();
    const { data, error, isLoading } = useGetPurchaseOrderQuery(purchaseOrderId);

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>Missing data!</div>;
    if (error) return <div>Error getting data!</div>;

    return (
        <SelectedProducts productInfoList={data.purchaseOrderLines.map(purchaseOrder=>{
            return {
                ...purchaseOrder,
                price: purchaseOrder.unitPrice,
                name: purchaseOrder.productName,
            }
        })} />
    )
};

export default PurchaseOrderDetail;