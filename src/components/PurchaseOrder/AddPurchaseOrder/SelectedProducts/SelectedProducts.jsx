import styles from "./SelectedProducts.module.scss"
import COP from "../../../../utils/CurrencyUtils"
import Table from '../../../Table';


const SelectedProducts = ({ productInfoList, onEdit }) => {
    return (
        <div className={styles.wrapper}>
            <strong>Productos seleccionados</strong>
            <Table
                columns={
                    [
                        {
                            label: 'Nombre',
                            accessor: 'productFullName'
                        },
                        {
                            label: 'Cantidad',
                            accessor: 'quantity'
                        },
                        {
                            label: 'Precio Unitario',
                            accessor: 'unitPrice',
                            isEditable: true,
                            type: 'number',
                            formatter: COP,
                        },
                        {
                            label: 'Total',
                            accessor: 'total',
                            formatter: COP,
                        }
                    ]
                }
                data={productInfoList.map(item => {
                    return {
                        id: item.id,
                        productFullName: `${item.name} - ${item.description}`,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        total: item.unitPrice * item.quantity,
                    }
                })}
                onEdit={onEdit}
            />
        </div>
    )
}

export default SelectedProducts;