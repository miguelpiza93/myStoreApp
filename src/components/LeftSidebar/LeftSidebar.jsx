import cn from 'classnames';
import styles from "./LeftSidebar.module.scss";
import SidebarLink from "./SidebarLink"
import { getAppSideBarRoutes } from '../../routes/constants/appRoutes'
import { useState } from 'react';

const Sidebar = ({ className }) => {
  const routes = getAppSideBarRoutes();

  const [state, setState] = useState(false);

  const build = (isCollapsable) => {
    return <aside className={cn(className, styles.sidebar, isCollapsable ? styles.collapsable : styles.fixed)}>
      {isCollapsable && <button onClick={() => setState(!state)}>{state ? "Close" : "Open"}</button>}
      {(state || !isCollapsable) && routes.map(routeProps => (
        <SidebarLink className={styles.sideBarLink} key={routeProps.label} {...routeProps} />
      ))}
    </aside>
  }

  return (
    <>
      {build(true)}
      {build(false)}
    </>
  );
};

export default Sidebar;