import { useNavigate } from "react-router-dom";
import SupplierRow from "./SupplierRow";
import styles from "./SupplierTable.module.css";
import { useGetSuppliersQuery, useDeleteSupplierMutation } from "../../../../api/supplier/supplierApi";


const SupplierTable = () => {
  const navigate = useNavigate();
  const handleRedirectToDetail = (id) => {
    navigate(`/suppliers/${id}`);
  };
  const { data: suppliers, error, isLoading } = useGetSuppliersQuery();
  const [removeSupplier] = useDeleteSupplierMutation();


  if (isLoading) return <div>Loading...</div>
  if (!suppliers) return <div>Missing suppliers!</div>
  if (error) return <div>Error getting suppliers!</div>

  const onRemove = id => {
    try {
      removeSupplier(id)
        .then(() => {
          navigate("/suppliers")
        })
    } catch (error) {
      console.error('Error removing supplier', error);
    }
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
            <SupplierRow key={supplier.id} item={supplier} onRemove={onRemove} onDetail={handleRedirectToDetail} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupplierTable;