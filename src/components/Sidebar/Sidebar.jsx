import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink"
import styles from './Sidebar.module.scss';
import { getAppRoutes } from '../../routes/constants/appRoutes'

const Sidebar = () => {
  const routes = getAppRoutes();
  const navigate = useNavigate();
  const handleRedirectToAddProduct = () => {
    navigate("/add");
  };
  return (
    <div className={styles.sidebar}>
      {routes.map(routeProps => (
        <SidebarLink key={routeProps.label} {...routeProps}/>
      ))}
    </div>
  );
};

export default Sidebar;