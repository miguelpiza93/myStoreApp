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

const AddSupplier = ({ dispatch }) => {

    const [state, setState] = useReducer(reducer, INITIAL_STATE);
    const navigate = useNavigate();

    const onAddProductClick = async () => {
        await dispatch(createProduct({ ...state }));
        setState(INITIAL_STATE);
        navigate("/");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState({ [name]: value });
    };

    return (
        <div className={style.form}>
            <h1>Agregar Producto</h1>
            <div>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    name="name"
                    value={state.name}
                    onChange={handleInputChange}
                    required
                    aria-labelledby="name"
                />
            </div>

            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={state.description}
                    onChange={handleInputChange}
                    required
                    aria-labelledby="description"
                />
            </div>

            <button onClick={onAddProductClick} aria-labelledby="submit">
                Submit
            </button>
        </div>
    );
}

export default connect()(AddSupplier);