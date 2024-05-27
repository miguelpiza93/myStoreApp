import cn from 'classnames';
import styles from "./LeftSidebar.module.scss";
import SidebarLink from "./SidebarLink";
import { getAppSideBarRoutes } from '../../routes/constants/appRoutes';
import { useState, useEffect, useCallback } from 'react';

const MODES = {
  FIXED: "FIXED",
  COLLAPSABLE: "COLLAPSABLE"
};

const Sidebar = ({ className }) => {
  const routes = getAppSideBarRoutes();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarMode, setSidebarMode] = useState(MODES.FIXED);

  const updateSidebarMode = useCallback(() => {
    setSidebarMode(window.innerWidth >= 800 ? MODES.FIXED : MODES.COLLAPSABLE);
  }, []);

  useEffect(() => {
    if (sidebarMode === MODES.FIXED) {
      setIsSidebarOpen(false);
    }
  }, [sidebarMode]);

  useEffect(() => {
    window.addEventListener('resize', updateSidebarMode);
    updateSidebarMode();

    return () => {
      window.removeEventListener('resize', updateSidebarMode);
    };
  }, [updateSidebarMode]);

  return (
    <aside className={cn(className, styles.sidebar)}>
      {sidebarMode === MODES.COLLAPSABLE && (
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? "Close" : "Open"}
        </button>
      )}
      {(isSidebarOpen || sidebarMode === MODES.FIXED) && routes.map(routeProps => (
        <SidebarLink className={styles.sideBarLink} key={routeProps.label} {...routeProps} />
      ))}
    </aside>
  );
};

export default Sidebar;
