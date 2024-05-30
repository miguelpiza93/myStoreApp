import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from "./Row.module.scss"

const Row = ({ data, columns, onEdit, onDelete, onDetail }) => {
    return <tr key={`tr_${data.id}`}>
        {columns.map((columnDefinition) => (
            <td key={`td_${data[columnDefinition.accessor]}`}>
                {data[columnDefinition.accessor]}
            </td>
        ))}
        <td className={styles.actions}>
            {onDetail && <span onClick={() => onDetail(data)}><FontAwesomeIcon icon={faArrowRight} /></span>}
            {onEdit && <span onClick={() => onEdit(data)}>Edit</span>}
            {onDelete && <span onClick={() => onDelete(data)}><FontAwesomeIcon icon={faTrash} /></span>}
        </td>
    </tr>;
};

export default Row;
