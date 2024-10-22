import { useGetStockSummaryQuery } from "../../../../api/stock/stockApi";
import Table from '../../../Table';

const StockTable = ({ className }) => {
  const { data: stock, error, isLoading } = useGetStockSummaryQuery();

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
            label: 'Vendor',
            accessor: 'vendorName'
          },
          {
            label: 'Cantidad',
            accessor: 'quantity'
          },
          {
            label: 'Costo Ponderado',
            accessor: 'weightedCost'
          }
        ]
      }
      data={stock.map(item => {
        return { id: item.vendorProductId, ...item }
      })}
    />
  );
};

export default StockTable;