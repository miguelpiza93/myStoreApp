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

    const fields = [
        {
            name: 'name',
            type: 'text',
            placeholder: "Nombre"
        },
        {
            name: 'symbol',
            type: 'text',
            placeholder: "Simbolo"
        },
        {
            name: 'isFractional',
            type: 'boolean',
            placeholder: "Permite decimales",
        },
        {
            name: 'isBaseUnit',
            type: 'boolean',
            placeholder: "Es unidad mínima",
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