import AddProduct from "../../components/Product/AddProduct"
import ProductList from "../../components/Product/ProductList";
import SupplierList from "../../components/Suppliers/SupplierList";

export const getAppRoutes = () => [
    {
      icon: 'HomeLineIcon',
      iconActive: 'HomeIcon',
      label: 'Products',
      href: '/products',
      rightBadge: undefined,
      childRoutes: [],
      componentToDisplay: ProductList
    },
    {
      icon: 'HomeLineIcon',
      iconActive: 'HomeIcon',
      label: 'Suppliers',
      href: '/suppliers',
      rightBadge: undefined,
      childRoutes: [],
      componentToDisplay: SupplierList
    },
    {
      icon: 'HomeLineIcon',
      iconActive: 'HomeIcon',
      label: 'Create',
      href: '/products/create',
      rightBadge: undefined,
      childRoutes: [],
      componentToDisplay: AddProduct
    }
  ]