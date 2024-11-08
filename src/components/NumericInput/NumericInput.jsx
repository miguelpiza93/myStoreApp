import React, { useCallback } from 'react';
import cn from 'classnames';
import styles from './NumericInput.module.scss';

const NumericInput = ({
    id,
    name,
    value,
    onChange,
    placeholder = '',
    disabled = false,
    required = false,
    allowDecimals = false,
}) => {
    const handleNumericChange = useCallback((e) => {
        const { value } = e.target;
        // Verificar si el valor es válido para números, con o sin decimales
        if (allowDecimals) {
            // Permitir números decimales y el caso de solo un punto (por ejemplo "2." antes de escribir "2.5")
            if (/^\d*\.?\d*$/.test(value)) {
                onChange(value);
            }
        } else {
            // Para enteros, solo permitir dígitos
            if (/^\d*$/.test(value)) {
                onChange(value ? parseInt(value, 10) : "");
            }
        }
    }, [onChange, allowDecimals]);

    return (
        <input
            id={id}
            type="text"
            name={name}
            value={value}
            onChange={handleNumericChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={cn(styles.input, { [styles.disabled]: disabled })}
        />
    );
};

export default NumericInput;
