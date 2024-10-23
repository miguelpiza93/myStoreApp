import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetStockSummaryQuery } from "../../../api/stock/stockApi";
import SearchableDropdown from "../../SearchableDropdown";
import Table from '../../Table';

const RegisterSale = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetStockSummaryQuery();

    const [selectedProducts, setSelectedProducts] = useState([]);

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Missing stock!</div>
    if (error) return <div>Error getting stock!</div>

    const handleRegisterSale = () => {
        navigate("/sales");
    }

    const handleSelect = (item) => {
        setSelectedProducts([...selectedProducts, item])
    };

    const stockData = data.map(stockItem => { 
        return { 
            ...stockItem, 
            id: stockItem.vendorProductId,
            availableQuantity: stockItem.quantity,
        } 
    });

    return (
        <div>
            <h1>Registrar Venta</h1>
            <SearchableDropdown
                placeholder="Search for a product..."
                data={stockData}
                searchField="fullDescription"
                onSelect={handleSelect}
            />
            <Table
                columns={
                    [
                        {
                            label: 'Item',
                            accessor: 'fullDescription'
                        },
                        {
                            label: 'Cantidad',
                        },
                        {
                            label: 'Precio Unitario',
                        },
                        {
                            label: 'Total',
                        }
                    ]
                }
                data={selectedProducts}
            />
            <button onClick={handleRegisterSale} aria-labelledby="submit">
                Guardar
            </button>
        </div>

    );
};

export default RegisterSale;