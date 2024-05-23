const ProductCard = ({ item }) => {
    return (
        <div>
            <div>{item.product.name}</div>
            <div>{item.supplier.name}</div>
            <div>{item.quantity}</div>
        </div>
    )
}

export default ProductCard;