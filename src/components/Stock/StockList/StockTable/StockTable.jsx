import { useGetStockSummaryQuery, useSetSalePriceMutation } from "../../../../api/stock/stockApi";
import Table from '../../../Table';

const StockTable = ({ className }) => {
  const { data: stock, error, isLoading } = useGetStockSummaryQuery();
  const [updateStockItem] = useSetSalePriceMutation();


  if (isLoading) return <div>Loading...</div>
  if (!stock) return <div>Missing stock!</div>
  if (error) return <div>Error getting stock!</div>

  const onEdit = (data) => {
    updateStockItem(data);
  };

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
            label: 'Costo Ponderado',
            accessor: 'weightedCost'
          },
          {
            label: 'Precio de venta',
            accessor: 'salePrice',
            isEditable: true,
            type: 'number',
          }
        ]
      }
      data={stock.map(item => {
        return { id: item.productId, ...item }
      })}
      onEdit={onEdit}
    />
  );
};

export default StockTable;