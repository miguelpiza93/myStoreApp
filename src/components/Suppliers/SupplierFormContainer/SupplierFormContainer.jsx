import { useCallback, useReducer } from 'react';
import { useGetProductsQuery } from '../../../api/product/productApi';
import ProductSelection from './ProductSelection';
import { reducer, INITIAL_STATE } from '../../../reducers/suppliers/supplier.reducer';
import Form from '../../Form';
import styles from "./SupplierFormContainer.module.scss"

const SupplierFormContainer = ({ initialData = INITIAL_STATE, onSave }) => {
    const [state, dispatchState] = useReducer(reducer, initialData);
    const { data: availableProducts, error, isLoading } = useGetProductsQuery();

    const handleInputChange = useCallback((event) => {
        const { name, value } = event.target;
        dispatchState({ type: 'SET_FIELD', field: name, value });
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

    const fields = [
        {
            name: 'name',
            type: 'text',
            placeholder: "Name"
        },
        {
            name: 'phone',
            type: 'text',
            placeholder: "Phone"
        },
    ];

    const { products, ...suppierData } = state;


    return (
        <div className={styles.wrapper}>
            <Form
                className={styles.form}
                fields={fields}
                data={suppierData}
                onFieldChange={handleInputChange}
            />
            <ProductSelection
                className={styles.productSelection}
                products={availableProducts}
                selectedProducts={products}
                onCheckboxChange={handleCheckboxChange}
                onPriceChange={handlePriceChange}
            />
            <button disabled={isLoading} onClick={handleSubmit} aria-labelledby="submit">
                Save
            </button>
        </div>
    );
};

export default SupplierFormContainer;
