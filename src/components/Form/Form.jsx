import cn from 'classnames';
import React from 'react';

const Form = ({ className, title, fields, data, onFieldChange, onSubmit }) => {
    return (
        <div className={cn(className)} >
            <h1>{title}</h1>
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

            <button
                onClick={onSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default Form;
