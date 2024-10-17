import { useNavigate } from "react-router-dom";
import { useGetStockSummaryQuery } from "../../../api/stock/stockApi";
import SearchableDropdown from "../../SearchableDropdown";

const RegisterSale = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetStockSummaryQuery();

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Missing stock!</div>
    if (error) return <div>Error getting stock!</div>

    const handleRegisterSale = () => {
        navigate("/sales");
    }

    const handleSelect = (item) => {
        console.log("Selected item:", item);
    };

    return (
        <div>
            <h1>Registrar Venta</h1>
            <SearchableDropdown
                placeholder="Search for a product..."
                data={data.map(stockItem => { return { ...stockItem, id: stockItem.productId } })}
                searchField="productName"
                onSelect={handleSelect}
            />
            <button onClick={handleRegisterSale} aria-labelledby="submit">
                Guardar
            </button>
        </div>

    );
};

export default RegisterSale;