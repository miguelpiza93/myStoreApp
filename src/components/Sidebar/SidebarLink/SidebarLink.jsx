import cn from 'classnames';
import PropTypes from 'prop-types';
import { useMatch, NavLink } from 'react-router-dom';
import SidebarItem from '../SidebarItem';
import styles from './SidebarLink.module.scss';

const SidebarLink = ({ icon, label, href, rightBadge, childRoutes }) => {
  const match = useMatch(`${href}/*`);
  const hasSubRoutes = !!childRoutes?.length;
  return (
    <>
      <NavLink className={styles.item} to={href}>
        <SidebarItem
          className={cn({ [styles.active]: match, [styles.withSubRoutes]: hasSubRoutes })}
          icon={icon}
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
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  rightBadge: PropTypes.node
};

export default SidebarLink;
