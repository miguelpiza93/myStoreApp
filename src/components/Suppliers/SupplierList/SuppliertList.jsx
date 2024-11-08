import { useNavigate } from "react-router-dom";
import SupplierTable from "./SupplierTable";
import styles from "./SupplierList.module.scss"

const SupplierList = () => {
  const navigate = useNavigate();
  const handleRedirectToAddProduct = () => {
    navigate("/suppliers/create");
  };
  return (
    <div className={styles.wrapper} >
      <div className={styles.options}>
        <button onClick={handleRedirectToAddProduct} aria-label="Add Supplier">
          Agregar proveedor
        </button>
      </div>
      <SupplierTable className={styles.table} />
    </div>
  );
};

export default SupplierList;