import { useNavigate } from "react-router-dom";
import { useGetUnitsQuery } from "../../../api/unit/unitApi";
import Table from '../../Table/Table';
import styles from "./UnitList.module.scss"

const UnitList = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetUnitsQuery();

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Missing units!</div>
  if (error) return <div>Error getting units!</div>

  const handleRedirectToAddItem = () => {
    navigate("/units/create");
  };
  return (
    <div className={styles.wrapper} >
      <div className={styles.options}>
        <button onClick={handleRedirectToAddItem} aria-label="Add Unit">
          Add Unit
        </button>
      </div>
      <Table
        columns={
          [
            {
              label: 'Name',
              accessor: 'name'
            },
            {
              label: 'Symbol',
              accessor: 'symbol'
            },
            {
              label: 'Allow fractions',
              accessor: 'isFractional'
            },
            {
              label: 'Is Base',
              accessor: 'isBaseUnit'
            },
          ]
        }
        data={data}
      />
    </div>
  );
};

export default UnitList;