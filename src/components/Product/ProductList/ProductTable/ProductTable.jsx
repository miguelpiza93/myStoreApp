import { connect } from "react-redux";
import ProductRow from "./ProductRow";
import styles from "./ProductTable.module.css";
import { useSelector } from 'react-redux'
import { getProducts } from "../../../../redux/product/actions/getProduct.action";
import { useEffect } from "react";
import { selectProducts } from "../../../../redux/product/product.selectors";

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};



const ProductTable = ({dispatch}) => {
  const products = useSelector(selectProducts);

  const onRemove = id => {
    //dispatch(deleteProduct(id));
    console.log("to implement");
  }

  useEffect(()=>{
    dispatch(getProducts());
  }, [dispatch])

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.id} item={product} onRemove={onRemove}></ProductRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(mapStateToProps)(ProductTable);