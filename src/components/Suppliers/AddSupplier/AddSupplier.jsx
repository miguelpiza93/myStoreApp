import { useReducer } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./AddSupplier.module.css";
import { createSupplier } from "../../../redux/supplier/actions/createSupplier.action";

const INITIAL_STATE = {
    description: "",
    name: "",
};

const reducer = (state, payload) => ({ ...state, ...payload });

const AddSupplier = ({ dispatch }) => {

    const [state, setState] = useReducer(reducer, INITIAL_STATE);
    const navigate = useNavigate();

    const onAddSupplierClick = async () => {
        await dispatch(createSupplier({ ...state }));
        setState(INITIAL_STATE);
        navigate("/suppliers");
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState({ [name]: value });
    };

    return (
        <div className={style.form}>
            <h1>Agregar Proveedor</h1>
            <div>
                <label htmlFor="supplier_name">Nombre:</label>
                <input
                    id="supplier_name"
                    type="text"
                    name="name"
                    autoComplete="off"
                    value={state.name}
                    onChange={handleInputChange}
                    required
                    aria-labelledby="supplier_name"
                />
            </div>
            <button onClick={onAddSupplierClick} aria-labelledby="submit">
                Submit
            </button>
        </div>
    );
}

export default connect()(AddSupplier);