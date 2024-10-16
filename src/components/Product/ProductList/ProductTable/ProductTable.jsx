import { useNavigate } from "react-router-dom";
import { useGetProductsQuery, useDeleteProductMutation } from "../../../../api/product/productApi";
import Table from '../../../Table';

const ProductTable = ({ className }) => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [removeProduct] = useDeleteProductMutation();
  const navigate = useNavigate();


  if (isLoading) return <div>Loading...</div>
  if (!products) return <div>Missing products!</div>
  if (error) return <div>Error getting products!</div>

  const handleRedirectToDetail = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <Table
      className={className}
      columns={
        [
          {
            label: 'Name',
            accessor: 'name'
          },
          {
            label: 'Description',
            accessor: 'description'
          }
        ]
      }
      data={products}
      onDelete={(item) => removeProduct(item.id)}
      onDetail={(item) => handleRedirectToDetail(item.id)}
    />
  );
};

export default ProductTable;