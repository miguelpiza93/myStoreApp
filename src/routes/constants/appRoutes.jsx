import { AddProduct, EditProduct } from "../../components/Product";
import { Supplier } from "../../components/Suppliers";
import { StockList } from "../../components/Stock";
import { Sales, RegisterSale } from "../../components/Sales";
import { AddUnit } from "../../components/Units";
import Settings from "../Settings";
import EditSupplier from "../../components/Suppliers/EditSupplier";
import { PurchaseOrderList, PurchaseOrderDetail, AddPurchaseOrder } from "../../components/PurchaseOrder";
import Icons from "../../components/Icons/Icons";


export const getAppRoutes = () => [
  {
    icon: 'SalesIcon',
    label: 'Ventas',
    href: '/sales',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: Sales,
    hidden: false
  },
  {
    href: '/sales/new',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: RegisterSale,
    hidden: true
  },
  {
    icon: 'StockIcon',
    label: 'Inventario',
    href: '/stock',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: StockList,
    hidden: false
  },
  {
    icon: 'PurchaseIcon',
    label: 'Órdenes de compra',
    href: '/purchase-orders',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: PurchaseOrderList,
    hidden: false
  },
  {
    href: '/purchase-orders/new',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: AddPurchaseOrder,
    hidden: true
  },
  {
    href: '/units/create',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: AddUnit,
    hidden: true
  },
  {
    href: '/products/:productId/vendor/:vendorId',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: EditProduct,
    hidden: true
  },
  {
    href: '/products/create',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: AddProduct,
    hidden: true
  },
  {
    href: '/suppliers/create',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: Supplier,
    hidden: true
  },
  {
    href: '/suppliers/:supplierId',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: EditSupplier,
    hidden: true
  },
  {
    href: '/purchase-orders/:purchaseOrderId',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: PurchaseOrderDetail,
    hidden: true
  },
  {
    icon: 'SettingsIcon',
    label: 'Ajustes',
    href: '/settings',
    componentToDisplay: Settings,
    rightBadge: undefined,
    childRoutes: [
      {
        isActive: ({ pathname }) => pathname.includes('settings') && pathname.includes('suppliers'),
        label: 'Proveedores',
        href: '/settings/suppliers',
        rightBadge: undefined,
      },
      {
        isActive: ({ pathname }) => pathname.includes('settings') && pathname.includes('products'),
        label: 'Productos',
        href: '/settings/products',
        rightBadge: undefined,
      },
      {
        isActive: ({ pathname }) => pathname.includes('settings') && pathname.includes('units'),
        label: 'Medidas',
        href: '/settings/units',
        rightBadge: undefined,
      },
    ],
    hidden: false
  },
  {
    icon: 'ProductIcon',
    label: 'Icons',
    href: '/icons',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: Icons,
    hidden: true
  },
]

export const getAppSideBarRoutes = () => {
  const routes = getAppRoutes();
  return routes.filter(route => !route.hidden);
};