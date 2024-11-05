import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowRight, faPencil, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import styles from "./Row.module.scss";

// Función para crear un input editable
const EditableCell = ({ columnDefinition, value, onChange }) => {
    return (
        <input
            type={columnDefinition.type || "text"}
            placeholder="Enter value"
            value={value}
            onChange={onChange}
        />
    );
};

// Función para crear una celda no editable
const ReadOnlyCell = ({ value }) => {
    return <span>{`${value}`}</span>;
};

const Row = ({ data, columns, onEdit, onDelete, onDetail }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState(data);

    // Maneja el cambio de los valores de los inputs
    const handleInputChange = (event, accessor, type) => {
        const { value } = event.target;
        setUpdatedData(prev => ({
            ...prev,
            [accessor]: type === 'number' ? parseInt(value) : value,
        }));
    };

    // Función para guardar los cambios
    const handleSave = () => {
        setIsEditing(false);
        onEdit(updatedData);
    };

    // Función para cancelar la edición y restaurar los valores originales
    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedData(data);
    };

    // Renderiza una celda: editable o de solo lectura
    const renderCell = (columnDefinition) => {
        const value = columnDefinition.isEditable
            ? (updatedData[columnDefinition.accessor] ?? data[columnDefinition.accessor])
            : data[columnDefinition.accessor];

        const formatter = columnDefinition.formatter
        const finalValue = formatter ? formatter.format(value) : value;

        if (isEditing && columnDefinition.isEditable) {
            return (
                <EditableCell
                    columnDefinition={columnDefinition}
                    value={value}
                    onChange={(e) => handleInputChange(e, columnDefinition.accessor, columnDefinition.type)}
                />
            );
        }

        return <ReadOnlyCell value={finalValue} />;
    };

    const displayActionColumns = onEdit || onDelete || onDetail;

    return (
        <tr key={`tr_${data.id}`}>
            {columns.map((columnDefinition) => (
                <td key={`td_${columnDefinition.accessor}_${data.id}`}>
                    {renderCell(columnDefinition)}
                </td>
            ))}
            {displayActionColumns && (
                <td className={styles.actions}>
                    {onDetail && <span onClick={() => onDetail(data)}><FontAwesomeIcon icon={faArrowRight} /></span>}

                    {onEdit && (
                        <>
                            {isEditing ? (
                                <>
                                    <span onClick={handleSave}><FontAwesomeIcon icon={faFloppyDisk} /></span>
                                    <span onClick={handleCancel}><FontAwesomeIcon icon={faBan} /></span>
                                </>
                            ) : (
                                <span onClick={() => setIsEditing(true)}><FontAwesomeIcon icon={faPencil} /></span>
                            )}
                        </>
                    )}
                    {onDelete && <span onClick={() => onDelete(data)}><FontAwesomeIcon icon={faTrash} /></span>}
                </td>
            )}
        </tr>
    );
};

export default Row;
