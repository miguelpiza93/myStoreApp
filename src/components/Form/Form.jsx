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
    />
);

// Función para crear el campo de select
const createSelectField = (field, data, onFieldChange) => (
    <select
        name={field.name}
        value={data[field.name] || ''}
        onChange={onFieldChange}
        required
    >
        <option value="" disabled>{field.placeholder}</option>
        {field.options.map(option => (
            <option key={option.key} value={option.key}>
                {option.value}
            </option>
        ))}
    </select>
);

const Form = ({ className, title, fields, data, onFieldChange, onSubmit }) => {
    return (
        <div className={cn(className, styles.wrapper)}>
            <strong>{title}</strong>
            {fields.map(field => (
                <div key={field.name}>
                    {field.type === 'selection'
                        ? createSelectField(field, data, onFieldChange)
                        : createInputField(field, data, onFieldChange)
                    }
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
