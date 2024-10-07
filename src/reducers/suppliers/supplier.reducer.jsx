export const INITIAL_STATE = {
    name: "",
    phone: "",
    products: []
};

const handleFieldChange = (state, action) => ({ ...state, [action.field]: action.value });

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

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return handleFieldChange(state, action);
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
