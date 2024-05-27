import { useNavigate } from "react-router-dom";
import ProductTable from "./ProductTable";
import styles from "./ProductList.module.scss"

const ProductList = () => {
  const navigate = useNavigate();
  const handleRedirectToAddProduct = () => {
    navigate("/products/create");
  };
  return (
    <div className={styles.wrapper} >
      <div className={styles.options}>
        <button onClick={handleRedirectToAddProduct} aria-label="Add Product">
          Add Product
        </button>
      </div>
      <ProductTable className={styles.table} />
    </div>
  );
};

export default ProductList;