import { AddProduct, ProductList } from "../../components/Product";
import { SupplierList, Supplier } from "../../components/Suppliers";
import EditSupplier from "../../components/Suppliers/EditSupplier";
import Supplying from "../../components/Supplying/Supplying";



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
    icon: 'ProductIcon',
    label: 'Supplying',
    href: '/supplying',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: Supplying,
    hidden: false
  },
]

export const getAppSideBarRoutes = () => {
  const routes = getAppRoutes();
  return routes.filter(route => !route.hidden);
};