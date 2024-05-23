import { useState } from "react";
import SelectingSection from "./SelectingSection";
import SelectedProducts from "./SelectedProducts";

const Supplying = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleProductAdd = (newProduct) => {
        setSelectedProducts(
            [...selectedProducts, newProduct]
        )
    }

    const handleSaveSupplying = () => {
        console.log("in progress");
    }

    return (
        <div>
            <h1>Supplying</h1>
            <SelectingSection onAdd={handleProductAdd} />
            <SelectedProducts productInfoList={selectedProducts} />
            <button disabled={!selectedProducts} onClick={handleSaveSupplying}>
                Save
            </button>
        </div>
    )
}

export default Supplying;