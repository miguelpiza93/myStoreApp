const ProductSelection = ({ products, selectedProducts, onCheckboxChange, onPriceChange }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th></th>
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
                                checked={selectedProducts.hasOwnProperty(product.id)}
                                onChange={(e) => onCheckboxChange(e, product.id)}
                            />
                        </td>
                        <td>{product.name}</td>
                        <td>
                            <input
                                id={`price_${product.id}`}
                                type="number"
                                onChange={(e) => onPriceChange(e, product.id)}
                                disabled={!selectedProducts.hasOwnProperty(product.id)}
                                value={selectedProducts[product.id] || ''}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductSelection;
