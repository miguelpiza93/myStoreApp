import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetStockSummaryQuery } from "../../../api/stock/stockApi";
import { useAddSaleMutation } from "../../../api/sale/saleApi";
import SearchableDropdown from "../../SearchableDropdown";
import Table from '../../Table';
import AddItemModal from '../AddItemModal';

const RegisterSale = () => {
    const navigate = useNavigate();
    const { data, error, isLoading, refetch: refetchStockSummary } = useGetStockSummaryQuery();

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null); // Para guardar el item seleccionado
    const [addSale] = useAddSaleMutation();

    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Missing stock!</div>
    if (error) return <div>Error getting stock!</div>

    const handleRegisterSale = () => {
        const saleData = {
            items: selectedProducts.map(
                selectedProduct => {
                    return {
                        vendorProductId: selectedProduct.vendorProductId,
                        unitId: selectedProduct.unitId,
                        quantity: selectedProduct.quantity,
                    }
                }
            )
        };
        addSale(saleData)
            .then(refetchStockSummary)
            .then(() => {
                navigate("/sales");
            });
    }

    // handleSelect se ejecuta cuando un elemento es seleccionado
    const handleSelect = (item) => {
        const existingProduct = selectedProducts.find((prod) => prod.id === item.id);
        if (existingProduct) {
            // Si ya existe el producto, aumentamos el requestedQuantity
            const updatedProducts = selectedProducts.map((prod) =>
                prod.id === item.id
                    ? { ...prod, requestedQuantity: prod.requestedQuantity + 1 }
                    : prod
            );
            setSelectedProducts(updatedProducts);
        } else {
            // Si no existe, guardamos el item seleccionado y abrimos el modal
            setCurrentItem(item);
            setIsModalOpen(true); // Abre el modal
        }
    };

    const stockData = data.map(stockItem => {
        return {
            ...stockItem,
            id: stockItem.vendorProductId,
            availableQuantity: stockItem.quantity,
        }
    });

    // Función que se pasa al modal para agregar el producto con la cantidad seleccionada
    const handleAddItem = (newItem) => {
        setSelectedProducts([...selectedProducts, newItem]);
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Registrar Venta</h1>
            <SearchableDropdown
                placeholder="Search for a product..."
                data={stockData}
                searchField="fullDescription"
                onSelect={handleSelect}
                clearOnSelect={true}
            />
            {currentItem ?
                <AddItemModal
                    isOpen={isModalOpen}
                    item={currentItem}
                    onClose={() => setIsModalOpen(false)} // Cierra el modal
                    onAdd={handleAddItem} // Agrega el producto con la unidad y cantidad seleccionada
                />
                : <></>
            }
            <Table
                columns={
                    [
                        {
                            label: 'Item',
                            accessor: 'fullDescription'
                        },
                        {
                            label: 'Unidad',
                            accessor: 'unitName'
                        },
                        {
                            label: 'Cantidad',
                            accessor: 'quantity'
                        },
                        {
                            label: 'Precio Unitario',
                            accessor: 'unitPrice'
                        },
                        {
                            label: 'Total',
                            accessor: 'total'
                        }
                    ]
                }
                data={selectedProducts}
            />
            <button onClick={handleRegisterSale} aria-labelledby="submit">
                Guardar
            </button>
        </div>

    );
};

export default RegisterSale;