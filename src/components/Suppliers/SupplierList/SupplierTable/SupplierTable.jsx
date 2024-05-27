import { useNavigate } from "react-router-dom";
import { useGetSuppliersQuery, useDeleteSupplierMutation } from "../../../../api/supplier/supplierApi";
import Table from '../../../Table/Table';

const SupplierTable = ({ className }) => {
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
    <Table
      className={className}
      columns={
        [
          'Name',
        ]
      }
      data={
        suppliers.map(supplier => {
          return {
            id: supplier.id,
            name: supplier.name
          }
        })
      }
      onDelete={(item)=> onRemove(item.id)} 
      onDetail={(item)=> handleRedirectToDetail(item.id)}
    />
  );
};

export default SupplierTable;