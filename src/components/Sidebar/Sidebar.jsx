import SidebarLink from "./SidebarLink"
import styles from './Sidebar.module.scss';
import { getAppSideBarRoutes } from '../../routes/constants/appRoutes'

const Sidebar = () => {
  const routes = getAppSideBarRoutes();
  return (
    <div className={styles.sidebar}>
      {routes.map(routeProps => (
        <SidebarLink key={routeProps.label} {...routeProps}/>
      ))}
    </div>
  );
};

export default Sidebar;