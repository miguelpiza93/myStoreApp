import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AddProduct.module.css";
import { useAddProductMutation } from "../../../api/product/productApi";
//import { addNewProduct } from "../../../store/products/slice";

const INITIAL_VALUE = {
    description: "",
    name: "",
};

const AddProduct = () => {
    const [product, setProduct] = useState(INITIAL_VALUE)
    const navigate = useNavigate();
    const [addProduct, { isLoading }] = useAddProductMutation()

    const onAddProductClick = () => {
        addProduct({ ...product })
        .then(()=>{
            //dispatch(addNewProduct({...product}))
            //setProduct(INITIAL_VALUE);
            navigate("/products");
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
    };

    return (
        <div className={style.form}>
            <h1>Agregar Producto</h1>
            <div>
                <label htmlFor="product_name">Nombre:</label>
                <input
                    id="product_name"
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                    aria-labelledby="product_name" />
            </div>


            <div>
                <label htmlFor="product_description">Description:</label>
                <input
                    id="product_description"
                    type="text"
                    name="description"
                    autoComplete="off"
                    value={product.description}
                    onChange={handleInputChange}
                    required
                    aria-labelledby="product_description"
                />
            </div>

            <button disabled={isLoading} onClick={onAddProductClick} aria-labelledby="submit">
                Submit
            </button>
        </div>
    );
}

export default AddProduct;