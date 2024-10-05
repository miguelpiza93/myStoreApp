import StockTable from "./StockTable";
import styles from "./StockList.module.scss"

const StockList = () => {
  return (
    <div className={styles.wrapper} >
      <StockTable className={styles.table} />
    </div>
  );
};

export default StockList;