import { useGetProductsQuery, useDeleteProductMutation } from "../../../../api/product/productApi";
import Table from '../../../Table/Table';

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
          'Name',
          'Description'
        ]
      }
      data={
        products.map(product => {
          return {
            id: product.id,
            name: product.name
          }
        })
      }
      onDelete={(item)=> removeProduct(item.id)} 
    />
  );
};

export default ProductTable;