import { useNavigate } from "react-router-dom";
import { useGetStockSummaryQuery } from "../../../../api/stock/stockApi";
import Table from '../../../Table';

const StockTable = ({ className }) => {
  const { data: stock, error, isLoading } = useGetStockSummaryQuery();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>
  if (!stock) return <div>Missing stock!</div>
  if (error) return <div>Error getting stock!</div>

  const handleRedirectToDetail = (stockItem) => {
    navigate(`/products/${stockItem.productId}/vendor/${stockItem.vendorId}`);
  };

  return (
    <Table
      className={className}
      columns={
        [
          {
            label: 'Item',
            accessor: 'fullDescription'
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
      onDetail={(item) => handleRedirectToDetail(item)}
    />
  );
};

export default StockTable;