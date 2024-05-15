import AddProduct from "../../components/Product/AddProduct"
import ProductList from "../../components/Product/ProductList";
import SupplierList from "../../components/Suppliers/SupplierList";

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
    icon: 'HomeIcon',
    label: 'Create',
    href: '/products/create',
    rightBadge: undefined,
    childRoutes: [],
    componentToDisplay: AddProduct,
    hidden: true
  }
]

export const getAppSideBarRoutes = () => {
  const routes = getAppRoutes();
  return routes.filter(route => !route.hidden);
};