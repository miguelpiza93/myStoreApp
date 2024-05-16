import { useReducer } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./AddProduct.module.css";
import { createProduct } from "../../../redux/product/actions/createProduct.action";

const INITIAL_STATE = {
    description: "",
    name: "",
};

const reducer = (state, payload) => ({ ...state, ...payload });

const AddProduct = ({ dispatch }) => {

    const [state, setState] = useReducer(reducer, INITIAL_STATE);
    const navigate = useNavigate();

    const onAddProductClick = async () => {
        await dispatch(createProduct({ ...state }));
        setState(INITIAL_STATE);
        navigate("/products");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState({ [name]: value });
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
                    value={state.name}
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
                    value={state.description}
                    onChange={handleInputChange}
                    required
                    aria-labelledby="product_description"
                />
            </div>

            <button onClick={onAddProductClick} aria-labelledby="submit">
                Submit
            </button>
        </div>
    );
}

export default connect()(AddProduct);