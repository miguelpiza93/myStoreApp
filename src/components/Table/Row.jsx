import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight, faPencil, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import styles from "./Row.module.scss";

const Row = ({ data, columns, onEdit, onDelete, onDetail }) => {
    const [editingField, setEditingField] = useState(false);
    const [updatedData, setUpdatedData] = useState(data);

    const handleInputChange = (event, accessor, type) => {
        const { value } = event.target;
        setUpdatedData(prev => ({
            ...prev,
            [accessor]: type === 'number' ? parseInt(value) : value,
        }));
    };

    const handleSave = () => {
        setEditingField(null);
        onEdit(updatedData);
    };

    const handleCancel = () => {
        setEditingField(null);
        setUpdatedData(data);
    };

    return (
        <tr key={`tr_${data.id}`}>
            {columns.map((columnDefinition) => (
                <td key={`td_${data[columnDefinition.accessor]}`}>
                    {editingField && columnDefinition.isEditable ? (
                        <input
                            type={columnDefinition.type || "text"}
                            placeholder="Enter value"
                            value={updatedData[columnDefinition.accessor] || data[columnDefinition.accessor]}
                            onChange={(e) => handleInputChange(e, columnDefinition.accessor, columnDefinition.type)}
                        />
                    ) : (
                        data[columnDefinition.accessor]
                    )}
                </td>
            ))}
            <td className={styles.actions}>
                {onDetail && <span onClick={() => onDetail(data)}><FontAwesomeIcon icon={faArrowRight} /></span>}

                {onEdit && (
                    <>
                        {editingField ? (
                            <>
                                <span onClick={handleSave}><FontAwesomeIcon icon={faFloppyDisk} /></span>
                                <span onClick={handleCancel}><FontAwesomeIcon icon={faBan} /></span>
                            </>
                        ) : (
                            <span onClick={() => setEditingField(true)}><FontAwesomeIcon icon={faPencil} /></span>
                        )}
                    </>
                )}

                {onDelete && <span onClick={() => onDelete(data)}><FontAwesomeIcon icon={faTrash} /></span>}
            </td>
        </tr>
    );
};

export default Row;
