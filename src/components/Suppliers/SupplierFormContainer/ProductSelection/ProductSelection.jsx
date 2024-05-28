import cn from 'classnames';
import styles from "./ProductSelection.module.scss"

const ProductSelection = ({ className, products, selectedProducts, onCheckboxChange, onPriceChange }) => {
    return (
        <table className={cn(className, styles.table)}>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>
                            <input
                                type="checkbox"
                                id={`checkbox_${product.id}`}
                                name={product.name}
                                checked={selectedProducts.some(selectedProduct => selectedProduct?.id === product.id)}
                                onChange={(e) => onCheckboxChange(e, product.id)}
                            />
                            {product.name}</td>
                        <td>
                            <input
                                id={`price_${product.id}`}
                                type="number"
                                onChange={(e) => onPriceChange(e, product.id)}
                                disabled={!selectedProducts.some(selectedProduct => selectedProduct?.id === product.id)}
                                value={selectedProducts.find(selectedProduct => selectedProduct?.id === product.id)?.price || ''}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductSelection;
