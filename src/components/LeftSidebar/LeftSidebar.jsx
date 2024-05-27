import cn from 'classnames';
import styles from "./LeftSidebar.module.scss";
import SidebarLink from "./SidebarLink"
import { getAppSideBarRoutes } from '../../routes/constants/appRoutes'
import { useState, useEffect } from 'react';

const Sidebar = ({ className }) => {
  const routes = getAppSideBarRoutes();

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("FIXED");

  useEffect(() => {
    if (mode === "FIXED") {
      setIsOpen(false);
    }
  }, [mode]);

  useEffect(() => {
    const handleResize = () => {
      setMode(window.innerWidth >= 800 ? "FIXED" : "COLLAPSABLE");
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <aside className={cn(className, styles.sidebar)}>
      {mode === "COLLAPSABLE" && <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Close" : "Open"}</button>}
      {(isOpen || mode === "FIXED") && routes.map(routeProps => (
        <SidebarLink className={styles.sideBarLink} key={routeProps.label} {...routeProps} />
      ))}
    </aside>
  );
};

export default Sidebar;