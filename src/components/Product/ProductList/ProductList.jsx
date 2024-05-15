import { useNavigate } from "react-router-dom";
import ProductTable from "./ProductTable";

const ProductList = () => {
  const navigate = useNavigate();
  const handleRedirectToAddProduct = () => {
    navigate("/products/create");
  };
  return (
    <div>
      <h1>Listado de productos</h1>
      <button onClick={handleRedirectToAddProduct} aria-label="Add Product">
        Add Product
      </button>
      <ProductTable/>
    </div>
  );
};

export default ProductList;