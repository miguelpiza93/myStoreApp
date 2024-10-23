import React, { useState } from 'react';
import styles from './AddItemModal.module.scss';
import { useGetSupplierProductQuery } from '../../../api/supplier/supplierApi';

const AddItemModal = ({ isOpen, onClose, onAdd, item }) => {
    const [selectedUnit, setSelectedUnit] = useState('');
    const [quantity, setQuantity] = useState('');
    const { data, error, isLoading } = useGetSupplierProductQuery({ vendorId: item.vendorId, productId: item.productId });


    if (isLoading) return <div>Loading...</div>
    if (!data) return <div>Missing units!</div>
    if (error) return <div>Error getting units!</div>

    const handleAddClick = () => {
        if (selectedUnit && quantity) {
            const unitPrice = data.salePrices.find(price => price.unitId == selectedUnit).price;
            const total = Number(unitPrice) * quantity;
            const unitName = data.units.find(unit => unit.id == selectedUnit ).name;
            onAdd({ ...item, unitId: selectedUnit, unitName, quantity: Number(quantity), unitPrice, total  });
            setSelectedUnit('');
            setQuantity('');
            onClose(); // Cierra el modal después de agregar
        }
    };

    if (!isOpen) return null; // No renderiza el modal si no está abierto

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Añadir {item.fullDescription}</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="unit">Unidad</label>
                    <select
                        id="unit"
                        value={selectedUnit}
                        onChange={(e) => setSelectedUnit(e.target.value)}
                    >
                        <option value="">Seleccionar</option>
                        {data.units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                                {unit.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="quantity">Cantidad</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="1"
                    />
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleAddClick}>Agregar</button>
                </div>
            </div>
        </div>
    );
};

export default AddItemModal;
