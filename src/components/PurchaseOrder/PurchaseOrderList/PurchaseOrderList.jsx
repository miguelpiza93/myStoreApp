import { useGetpurchaseOrdersQuery } from "../../../api/purchaseOrder/purchaseOrder";
import { utcToLocalFormat } from "../../../utils/DateUtils";
import Table from "../../../components/Table"
import { useNavigate } from "react-router-dom";

const PurchaseOrderList = () => {
    const navigate = useNavigate();
    const handleRedirectToDetail = (id) => {
        navigate(`/purchase-orders/${id}`);
    };

    const { data: purchaseOrders, error, isLoading } = useGetpurchaseOrdersQuery();
    if (isLoading) return <div>Loading...</div>
    if (!purchaseOrders) return <div>Missing purchaseOrders!</div>
    if (error) return <div>Error getting purchaseOrders!</div>

    return (
        <Table
            columns={
                [
                    {
                        label: 'Supplier Name',
                        accessor: 'supplierName'
                    },
                    {
                        label: 'Creation Date',
                        accessor: 'createdAt'
                    },
                ]
            }
            data={
                purchaseOrders.map(purchaseOrder => ({
                    ...purchaseOrder,
                    createdAt: utcToLocalFormat(purchaseOrder.createdAt)
                }))
            }
            onDetail={(item) => handleRedirectToDetail(item.id)}
        />
    )
};

export default PurchaseOrderList;