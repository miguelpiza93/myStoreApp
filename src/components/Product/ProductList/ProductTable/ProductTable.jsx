import cn from 'classnames';
import ProductRow from "./ProductRow";
import { useGetProductsQuery, useDeleteProductMutation } from "../../../../api/product/productApi";
import styles from "./ProductTable.module.scss"

const ProductTable = ({ className }) => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [removeProduct] = useDeleteProductMutation();

  if (isLoading) return <div>Loading...</div>
  if (!products) return <div>Missing products!</div>
  if (error) return <div>Error getting products!</div>

  return (
    <table className={cn(className, styles.table)}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.name} item={product} onRemove={() => removeProduct(product.id)}></ProductRow>
          ))}
        </tbody>
      </table>
  );
};

export default ProductTable;