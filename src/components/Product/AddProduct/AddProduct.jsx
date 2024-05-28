import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddProductMutation } from "../../../api/product/productApi";
import Form from "../../Form";
import styles from "./AddProduct.module.scss"

const INITIAL_VALUE = {
    description: "",
    name: "",
};

const AddProduct = () => {
    const [product, setProduct] = useState(INITIAL_VALUE)
    const navigate = useNavigate();
    const [addProduct] = useAddProductMutation()

    const onAddProductClick = () => {
        addProduct({ ...product })
        .then(()=>{
            //dispatch(addNewProduct({...product}))
            //setProduct(INITIAL_VALUE);
            navigate("/products");
        });
    };

    const onFieldChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

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
        }
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