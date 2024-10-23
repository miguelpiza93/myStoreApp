import { AddProduct, ProductList, EditProduct } from "../../components/Product";
import { SupplierList, Supplier } from "../../components/Suppliers";
import { StockList } from "../../components/Stock";
import { Sales, RegisterSale } from "../../components/Sales";
import EditSupplier from "../../components/Suppliers/EditSupplier";
import { PurchaseOrderList, PurchaseOrderDetail, AddPurchaseOrder } from "../../components/PurchaseOrder";
import Icons from "../../components/Icons/Icons";


export const getAppRoutes = () => [
  {
    icon: 'SalesIcon',
    label: 'Sales',
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
    label: 'Stock',
    href: '/stock',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: StockList,
    hidden: false
  },
  {
    icon: 'PurchaseIcon',
    label: 'Purchase Orders',
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
    icon: 'ProductIcon',
    label: 'Products',
    href: '/products',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: ProductList,
    hidden: false
  },
  {
    href: '/products/:productId/vendor/:vendorId',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: EditProduct,
    hidden: true
  },
  {
    icon: 'SupplierIcon',
    label: 'Suppliers',
    href: '/suppliers',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: SupplierList,
    hidden: false
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