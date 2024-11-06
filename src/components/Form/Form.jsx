import cn from 'classnames';
import React from 'react';
import styles from "./Form.module.scss";

// Función para crear el campo de input
const createInputField = (field, data, onFieldChange) => (
    <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        autoComplete="off"
        value={data[field.name]}
        onChange={onFieldChange}
        required
        className={styles.inputField}
    />
);

// Función para crear el campo de select
const createSelectField = (field, data, onFieldChange) => (
    <select
        name={field.name}
        value={data[field.name] || ''}
        onChange={onFieldChange}
        required
        className={styles.inputField}
    >
        <option value="" disabled>{field.placeholder}</option>
        {field.options.map(option => (
            <option key={option.key} value={option.key}>
                {option.value}
            </option>
        ))}
    </select>
);

// Función para crear el campo de checkbox
const createCheckboxField = (field, data, onFieldChange) => (
    <label className={styles.checkboxField}>
        <span>{field.placeholder}</span>
        <input
            type="checkbox"
            name={field.name}
            checked={data[field.name] || false}
            onChange={e => onFieldChange({ target: { name: field.name, value: e.target.checked } })}
        />
    </label>
);

// Función para renderizar el campo según su tipo
const renderFieldByType = (field, data, onFieldChange) => {
    switch (field.type) {
        case 'selection':
            return createSelectField(field, data, onFieldChange);
        case 'boolean':
            return createCheckboxField(field, data, onFieldChange);
        default:
            return createInputField(field, data, onFieldChange);
    }
};

const Form = ({ className, title, fields, data, onFieldChange, onSubmit }) => {
    return (
        <div className={cn(className, styles.wrapper)}>
            <strong>{title}</strong>
            {fields.map(field => (
                <div key={field.name} className={styles.field}>
                    {renderFieldByType(field, data, onFieldChange)}
                </div>
            ))}

            {onSubmit && (
                <div className={styles.actionContainer}>
                    <button onClick={onSubmit}>Submit</button>
                </div>
            )}
        </div>
    );
};

export default Form;
