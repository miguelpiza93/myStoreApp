import ProductCard from "../ProductCard"

const SelectedProducts = ({ productInfoList }) => {
    return (
        <div>
            <h1>Selected products</h1>
            {productInfoList.map(productInfo => (
                <ProductCard key={productInfo.id} item={productInfo} />
            ))}
        </div>
    )
}

export default SelectedProducts;