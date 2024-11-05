import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUnitsQuery } from "../../../api/unit/unitApi";
import { useAddProductMutation } from "../../../api/product/productApi";
import Form from "../../Form";
import styles from "./AddProduct.module.scss"

const INITIAL_VALUE = {
    description: "",
    name: "",
    referenceUnitId: 0,
};

const AddProduct = () => {
    const [product, setProduct] = useState(INITIAL_VALUE)
    const navigate = useNavigate();
    const [addProduct] = useAddProductMutation()


    const { data: units, error, isLoading } = useGetUnitsQuery();

    if (isLoading) return <div>Loading...</div>
    if (!units) return <div>Missing units!</div>
    if (error) return <div>Error getting units!</div>

    const onAddProductClick = () => {
        addProduct({ ...product })
            .then(() => {
                navigate("/settings/products");
            });
    };

    const onFieldChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    const options = units.map(unit => {
        return {
            key: parseInt(unit.id),
            value: `${unit.name} - ${unit.symbol}`
        }
    })

    const fields = [
        {
            name: 'name',
            type: 'text',
            placeholder: "Name"
        },
        {
            name: 'description',
            type: 'text',
            placeholder: "Description"
        },
        {
            name: 'referenceUnitId',
            type: 'selection',
            placeholder: "Unidad de referencia",
            options,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <Form
                className={styles.form}
                title={"Agregar Producto"}
                fields={fields}
                data={product}
                onFieldChange={onFieldChange}
                onSubmit={onAddProductClick}
            />
        </div>
    );
}

export default AddProduct;