import { useGetStockQuery } from "../../../../api/stock/stockApi";
import Table from '../../../Table';

const StockTable = ({ className }) => {
  const { data: stock, error, isLoading } = useGetStockQuery();

  if (isLoading) return <div>Loading...</div>
  if (!stock) return <div>Missing stock!</div>
  if (error) return <div>Error getting stock!</div>

  return (
    <Table
      className={className}
      columns={
        [
          {
            label: 'Name',
            accessor: 'productName'
          },
          {
            label: 'Cantidad',
            accessor: 'quantity'
          },
          {
            label: 'Precio de venta',
            accessor: 'salePrice'
          }
        ]
      }
      data={stock}
    />
  );
};

export default StockTable;