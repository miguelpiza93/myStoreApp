import { useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Supplier.module.scss";
import { useAddSupplierMutation, useAddProductToSupplierMutation } from "../../../api/supplier/supplierApi";
import SupplierForm from "./SupplierForm";
import ProductSelection from "./ProductSelection";
import { useGetProductsQuery } from "../../../api/product/productApi";

const INITIAL_STATE = {
    name: "",
    products: []
};

const handleNameChange = (state, value) => ({ ...state, name: value });

const handlePriceChange = (state, productId, value) => ({
    ...state,
    products: state.products.map(product => product.id !== productId ? product : { ...product, price: value })
});

const handleProductSelection = (state, selectedProduct, checked) => {
    if (checked) {
        return {
            ...state,
            products: [...state.products, selectedProduct]
        };
    } else {
        return {
            ...state,
            products: state.products.filter(product => product.id !== selectedProduct.id)
        };
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return handleNameChange(state, action.value);
        case 'SET_PRICE':
            return handlePriceChange(state, action.productId, action.value);
        case 'TOGGLE_PRODUCT':
            return handleProductSelection(state, action.product, action.checked);
        case 'RESET':
            return INITIAL_STATE;
        case 'SET_INITIAL_STATE':
            return action.state;
        default:
            return state;
    }
};

const Supplier = () => {
    const [state, dispatchState] = useReducer(reducer, INITIAL_STATE);
    const navigate = useNavigate();
    const { data: availableProducts, error, isLoading } = useGetProductsQuery();
    const [addSupplier, { isLoadingCreation }] = useAddSupplierMutation();
    const [addProductToSupplier] = useAddProductToSupplierMutation();

    const onAddSupplierClick = async () => {
        try {
            addSupplier({ name: state.name })
                .then((response) => {
                    const supplierId = response.data.id;
                    const products = Object.fromEntries(
                        state.products.map(({ id, price }) => [id, price])
                    );
                    return addProductToSupplier({ products, supplierId })
                })
                .then(() => {
                    dispatchState({ type: 'RESET' });
                    navigate("/suppliers")
                })
        } catch (error) {
            console.error('Error creating supplier', error);
        }
    };

    const handleInputChange = useCallback((event) => {
        const { value } = event.target;
        dispatchState({ type: 'SET_NAME', value });
    }, []);

    const handleCheckboxChange = useCallback((event, productId) => {
        const { checked } = event.target;
        dispatchState({ type: 'TOGGLE_PRODUCT', product: availableProducts.find(product => product.id === productId), checked });
    }, [availableProducts]);

    const handlePriceChange = useCallback((event, productId) => {
        const { value } = event.target;
        dispatchState({ type: 'SET_PRICE', productId, value });
    }, []);

    if (isLoading) return <div>Loading...</div>
    if (!availableProducts) return <div>Missing availableProducts!</div>
    if (error) return <div>Error getting available products!</div>

    return (
        <div className={style.form}>
            <h1>{"Agregar Proveedor"}</h1>
            <SupplierForm name={state.name} onInputChange={handleInputChange} />
            <ProductSelection
                products={availableProducts}
                selectedProducts={state.products}
                onCheckboxChange={handleCheckboxChange}
                onPriceChange={handlePriceChange}
            />
            <button disabled={isLoadingCreation} onClick={onAddSupplierClick} aria-labelledby="submit">
                {"Submit"}
            </button>
        </div>
    );
}
export default Supplier;