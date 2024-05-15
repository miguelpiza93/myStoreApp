import cn from 'classnames';
import PropTypes from 'prop-types';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
import SidebarItem from '../SidebarItem';
import styles from './SidebarLink.module.scss';

const SidebarLink = ({ icon, iconActive, label, href, rightBadge, childRoutes }) => {
  const location = useLocation();

  // Taken from https://github.com/remix-run/react-router/blob/v5.3.0/packages/react-router-dom/modules/NavLink.js#L56
  const escapedPath = href && href.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");

  const match = matchPath({
    path: escapedPath,
    exact: false
  }, location.pathname);

  const hasSubRoutes = !!childRoutes?.length;

  return (
    <>
      <NavLink className={styles.item} to={href}>
        <SidebarItem
          className={cn({ [styles.active]: match, [styles.withSubRoutes]: hasSubRoutes })}
          icon={match ? iconActive : icon}
          label={label}
          rightBadge={rightBadge}
        />
      </NavLink>
      {match && hasSubRoutes && (
        <div className={styles.childRoutes}>
          {childRoutes.map(({ exact, label, href, isActive }) => (
            <NavLink
              activeClassName={styles.activeSubItem}
              className={styles.subItem}
              exact={exact}
              isActive={isActive}
              key={href}
              to={href}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

SidebarLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  iconActive: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  rightBadge: PropTypes.node
};

export default SidebarLink;
