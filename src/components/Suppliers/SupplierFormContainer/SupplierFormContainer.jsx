import { useCallback, useReducer } from 'react';
import { useGetProductsQuery } from '../../../api/product/productApi';
import SupplierForm from './SupplierForm';
import ProductSelection from './ProductSelection';
import { reducer, INITIAL_STATE } from '../../../reducers/suppliers/supplier.reducer';

const SupplierFormContainer = ({ initialData, onSave }) => {
    const [state, dispatchState] = useReducer(reducer, initialData || INITIAL_STATE);
    const { data: availableProducts, error, isLoading } = useGetProductsQuery();

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

    const handleSubmit = async () => {
        try {
            await onSave(state);
            dispatchState({ type: 'RESET' });
        } catch (error) {
            console.error('Error saving supplier', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error getting available products!</div>;

    return (
        <div>
            <SupplierForm name={state.name} onInputChange={handleInputChange} />
            <ProductSelection
                products={availableProducts}
                selectedProducts={state.products}
                onCheckboxChange={handleCheckboxChange}
                onPriceChange={handlePriceChange}
            />
            <button disabled={isLoading} onClick={handleSubmit} aria-labelledby="submit">
                {"Submit"}
            </button>
        </div>
    );
};

export default SupplierFormContainer;
