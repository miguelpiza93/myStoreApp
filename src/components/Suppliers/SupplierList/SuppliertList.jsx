import { useNavigate } from "react-router-dom";
import SupplierTable from "./SupplierTable";

const SupplierList = () => {
  const navigate = useNavigate();
  const handleRedirectToAddProduct = () => {
    navigate("/suppliers/create");
  };
  return (
    <div>
      <h1>Listado de proveedores</h1>
      <button onClick={handleRedirectToAddProduct} aria-label="Add Supplier">
        Add Supplier
      </button>
      <SupplierTable/>
    </div>
  );
};

export default SupplierList;