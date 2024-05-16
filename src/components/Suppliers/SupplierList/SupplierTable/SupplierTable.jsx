import { useNavigate } from "react-router-dom";
import SupplierRow from "./SupplierRow";
import styles from "./SupplierTable.module.css";
import { useGetSuppliersQuery } from "../../../../api/supplier/supplierApi";


const SupplierTable = () => {
  const navigate = useNavigate();
  const handleRedirectToDetail = (id) => {
    navigate(`/suppliers/${id}`);
  };
  const { data: suppliers, error, isLoading } = useGetSuppliersQuery();


  if (isLoading) return <div>Loading...</div>
  if (!suppliers) return <div>Missing suppliers!</div>
  if (error) return <div>Error getting suppliers!</div>

  const onRemove = id => {
    //dispatch(deleteProduct(id));
    console.log("to implement");
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <SupplierRow key={supplier.id} item={supplier} onRemove={onRemove} onClick={() => handleRedirectToDetail(supplier.id)} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;