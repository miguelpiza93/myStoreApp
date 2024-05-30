import { AddProduct, ProductList } from "../../components/Product";
import { SupplierList, Supplier } from "../../components/Suppliers";
import EditSupplier from "../../components/Suppliers/EditSupplier";
import Supplying from "../../components/Supplying/Supplying";
import { PurchaseOrderList, PurchaseOrderDetail } from "../../components/PurchaseOrder";
import Icons from "../../components/Icons/Icons";


export const getAppRoutes = () => [
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
    icon: 'SupplyingIcon',
    label: 'Supplying',
    href: '/supplying',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: Supplying,
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