import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddUnitMutation } from "../../../api/unit/unitApi";
import Form from "../../Form";
import styles from "./AddUnit.module.scss"

const INITIAL_VALUE = {
    name: "",
    symbol: "",
    isFractional: false,
    isBaseUnit: false,
};

const AddUnit = () => {
    const [unit, setUnit] = useState(INITIAL_VALUE)
    const navigate = useNavigate();
    const [addUnit] = useAddUnitMutation()

    const onAddUnitClick = () => {
        addUnit(unit)
            .then(() => {
                navigate("/settings/units");
            });
    };

    const onFieldChange = (event) => {
        const { name, value } = event.target;
        setUnit({ ...unit, [name]: value });
    };

    const booleanOptions = [
        {
            key: true,
            value: `Si`
        },
        {
            key: false,
            value: `No`
        }
    ]

    const fields = [
        {
            name: 'name',
            type: 'text',
            placeholder: "Name"
        },
        {
            name: 'symbol',
            type: 'text',
            placeholder: "Simbolo"
        },
        {
            name: 'isFractional',
            type: 'selection',
            placeholder: "Permite decimales",
            options: booleanOptions,
        },
        {
            name: 'isBaseUnit',
            type: 'selection',
            placeholder: "Es unidad mínima",
            options: booleanOptions,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <Form
                className={styles.form}
                title={"Agregar Unidad"}
                fields={fields}
                data={unit}
                onFieldChange={onFieldChange}
                onSubmit={onAddUnitClick}
            />
        </div>
    );
}

export default AddUnit;