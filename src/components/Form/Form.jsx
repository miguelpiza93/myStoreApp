import cn from 'classnames';
import React from 'react';
import styles from "./Form.module.scss"

const Form = ({ className, title, fields, data, onFieldChange, onSubmit }) => {
    return (
        <div className={cn(className, styles.wrapper)} >
            <strong>{title}</strong>
            {fields.map(field => {
                return (
                    <div key={field.name}>
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            autoComplete="off"
                            value={data[field.name]}
                            onChange={onFieldChange}
                            required
                        />
                    </div>
                )
            })}

            {onSubmit && <div className={styles.actionContainer} >
                <button
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </div>}
        </div>
    );
};

export default Form;
