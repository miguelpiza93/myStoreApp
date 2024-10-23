import { useGetProductsQuery, useDeleteProductMutation } from "../../../../api/product/productApi";
import Table from '../../../Table';

const ProductTable = ({ className }) => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [removeProduct] = useDeleteProductMutation();


  if (isLoading) return <div>Loading...</div>
  if (!products) return <div>Missing products!</div>
  if (error) return <div>Error getting products!</div>

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
    />
  );
};

export default ProductTable;