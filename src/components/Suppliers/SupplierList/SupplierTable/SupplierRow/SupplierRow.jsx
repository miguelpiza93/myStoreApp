import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const SupplierRow = ({ item, onRemove }) => {
  return (
    <tr>
      <td>{item.name}</td>
      <td>
        <button onClick={() => onRemove(item.id)}>
        <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default SupplierRow;