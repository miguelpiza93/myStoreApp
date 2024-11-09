import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGetSalesQuery } from "../../api/sale/saleApi";
import { utcToLocalFormat } from "../../utils/DateUtils";
import COP from "../../utils/CurrencyUtils";
import Table from '../Table';
import styles from "./Sales.module.scss";

const Sales = () => {
    const navigate = useNavigate();
    const [groupBy, setGroupBy] = useState("DAY"); // Estado para el tipo de agrupación
    const { data, error, isLoading } = useGetSalesQuery(groupBy);

    const handleRegisterSale = () => {
        navigate("/sales/new");
    };

    const handleGroupChange = (e) => {
        setGroupBy(e.target.value); // Cambiar el filtro de agrupación
    };

    const getColumns = () => {
        switch (groupBy) {
            case "MONTH":
                return [
                    { label: 'Fecha', accessor: 'createdAt' },
                    { label: 'Total', accessor: 'total', formatter: COP },
                ];
            case "YEAR":
                return [
                    { label: 'Fecha', accessor: 'createdAt' },
                    { label: 'Total', accessor: 'total', formatter: COP },
                ];
            default:
                return [
                    { label: 'Fecha', accessor: 'createdAt' },
                    { label: 'Estado', accessor: 'status' },
                    { label: 'Total', accessor: 'total', formatter: COP },
                ];
        }
    };

    const formatSalesData = (sales) => {
        return sales.map(sale => {
            let formattedDate;
            if (groupBy === "MONTH") {
                formattedDate = utcToLocalFormat(sale.createdAt, 'month');
            } else if (groupBy === "YEAR") {
                formattedDate = utcToLocalFormat(sale.createdAt, 'year');
            } else {
                formattedDate = utcToLocalFormat(sale.createdAt, 'fullDay');
            }
            return { ...sale, createdAt: formattedDate };
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error getting sales!</div>;

    return (
        <div className={styles.wrapper} >
            <button onClick={handleRegisterSale} aria-labelledby="submit">
                Registar Venta
            </button>

            {/* Selector de agrupación */}
            <div className={styles.filterContainer}>
                <label>Mostrar ventas por: </label>
                <select value={groupBy} onChange={handleGroupChange}>
                    <option value="DAY">Día</option>
                    <option value="MONTH">Mes</option>
                    <option value="YEAR">Año</option>
                </select>
            </div>

            {/* Tabla de ventas */}
            <Table
                columns={getColumns()}
                data={formatSalesData(data || [])}
            />
        </div>
    );
};

export default Sales;