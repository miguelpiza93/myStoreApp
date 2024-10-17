import { useNavigate } from "react-router-dom";

const Sales = () => {
    const navigate = useNavigate();

    const handleRegisterSale = ()=>{
        navigate("/sales/new");
    }

    return (
        <button onClick={handleRegisterSale} aria-labelledby="submit">
            Registar Venta
        </button>
    );
};

export default Sales;