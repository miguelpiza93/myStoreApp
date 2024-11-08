import { useGetpurchaseOrdersQuery } from "../../../api/purchaseOrder/purchaseOrder";
import { utcToLocalFormat } from "../../../utils/DateUtils";
import Table from "../../../components/Table"
import styles from "./PurchaseOrderList.module.scss"
import { useNavigate } from "react-router-dom";

const PurchaseOrderList = () => {
    const navigate = useNavigate();
    const handleRedirectToDetail = (id) => {
        navigate(`/purchase-orders/${id}`);
    };

    const handleRedirectToNewPurchaseOrder = () => {
        navigate("/purchase-orders/new");
    };

    const { data: purchaseOrders, error, isLoading } = useGetpurchaseOrdersQuery();
    if (isLoading) return <div>Loading...</div>
    if (!purchaseOrders) return <div>Missing purchaseOrders!</div>
    if (error) return <div>Error getting purchaseOrders!</div>

    return (
        <div className={styles.wrapper} >
            <div className={styles.options}>
                <button onClick={handleRedirectToNewPurchaseOrder} aria-label="Create">
                    Crear Orden
                </button>
            </div>
            <Table className={styles.table}
                columns={
                    [
                        {
                            label: 'Proveedor',
                            accessor: 'supplierName'
                        },
                        {
                            label: 'Estado',
                            accessor: 'status'
                        },
                        {
                            label: 'Fecha de creación',
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
        </div>
    )
};

export default PurchaseOrderList;