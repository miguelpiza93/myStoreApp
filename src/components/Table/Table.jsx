import cn from 'classnames';
import React from 'react';
import Row from './Row';
import styles from "./Table.module.scss"

const Table = ({ className, columns, data, onEdit, onDelete, onDetail }) => {
  return (
    <table className={cn(className, styles.table)}>
      <thead>
        <tr>
          {columns.map((columnDefinition) => (
            <th key={columnDefinition.accessor} >{columnDefinition.label}</th>
          ))}
          <th className={styles.actions} >Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <Row key={item.id} data={item} columns={columns} onEdit={onEdit} onDelete={onDelete} onDetail={onDetail} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
