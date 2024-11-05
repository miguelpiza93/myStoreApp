import cn from 'classnames';
import PropTypes from 'prop-types';
import { useMatch, NavLink } from 'react-router-dom';
import SidebarItem from '../SidebarItem';
import styles from "./SidebarLink.module.scss"

const SidebarLink = ({ className, icon, label, href, rightBadge, childRoutes }) => {
  const match = useMatch(`${href}/*`);
  const hasSubRoutes = !!childRoutes?.length;

  return (
    <>
      <NavLink 
        className={cn(className, styles.wrapper, match ? styles.active : '')}
        to={href}
        >
        <SidebarItem
          icon={icon}
          label={label}
          rightBadge={rightBadge}
        />
      </NavLink>
      {match && hasSubRoutes && (
        <div className={styles.childRoutes}>
          {childRoutes.map(({ exact, label, href, isActive }) => (
            <NavLink
              className={cn(className, styles.wrapper, match && isActive(match) ? styles.active : '' )}
              exact={exact}
              key={href}
              to={href}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}</>
  );
};

SidebarLink.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  rightBadge: PropTypes.node
};

export default SidebarLink;
