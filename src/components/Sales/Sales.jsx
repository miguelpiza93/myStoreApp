import { useNavigate } from "react-router-dom";
import { useGetSalesQuery } from "../../api/sale/saleApi";
import { utcToLocalFormat } from "../../utils/DateUtils";
import COP from "../../utils/CurrencyUtils"
import Table from '../Table';
import styles from "./Sales.module.scss"

const Sales = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetSalesQuery();

    const handleRegisterSale = () => {
        navigate("/sales/new");
    }

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Missing sales!</div>
    if (error) return <div>Error getting sales!</div>

    return (
        <div className={styles.wrapper} >
            <button onClick={handleRegisterSale} aria-labelledby="submit">
                Registar Venta
            </button>

            <Table
                columns={
                    [
                        {
                            label: 'Fecha',
                            accessor: 'createdAt'
                        },
                        {
                            label: 'Estado',
                            accessor: 'status'
                        },
                        {
                            label: 'Total',
                            accessor: 'total',
                            formatter: COP,
                        },
                    ]
                }
                data={data.map(sale=>({...sale, createdAt: utcToLocalFormat(sale.createdAt)}))}
            />
        </div>
    );
};

export default Sales;