import cn from 'classnames';
import styles from "./LeftSidebar.module.scss";
import SidebarLink from "./SidebarLink"
import { getAppSideBarRoutes } from '../../routes/constants/appRoutes'

const Sidebar = ({ className }) => {
  const routes = getAppSideBarRoutes();
  return (
    <aside className={cn(className, styles.sidebar)}>
      {routes.map(routeProps => (
        <SidebarLink className={styles.sideBarLink} key={routeProps.label} {...routeProps} />
      ))}
    </aside>
  );
};

export default Sidebar;