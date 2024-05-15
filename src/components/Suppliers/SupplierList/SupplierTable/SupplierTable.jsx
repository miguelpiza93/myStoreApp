import { connect } from "react-redux";
import SupplierRow from "./SupplierRow";
import styles from "./SupplierTable.module.css";
import { useSelector } from 'react-redux'
import { getSuppliers } from "../../../../redux/supplier/actions/getSupplier.action";
import { useEffect } from "react";
import { selectSuppliers } from "../../../../redux/supplier/supplier.selectors";

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers,
  };
};



const SupplierTable = ({dispatch}) => {
  const suppliers = useSelector(selectSuppliers);

  const onRemove = id => {
    //dispatch(deleteProduct(id));
    console.log("to implement");
  }

  useEffect(()=>{
    dispatch(getSuppliers());
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
          {suppliers.map((supplier) => (
            <SupplierRow key={supplier.id} item={supplier} onRemove={onRemove}/>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default connect(mapStateToProps)(SupplierTable);