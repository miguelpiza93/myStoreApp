import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './SidebarItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesStacked, faCartFlatbed, faHome } from '@fortawesome/free-solid-svg-icons';

const iconMap = {
  SupplierIcon: faCartFlatbed,
  ProductIcon: faBoxesStacked,
  HomeIcon: faHome,
};

const SidebarItem = ({ icon, label, rightBadge, className, onClick }) => {
  const iconObject = iconMap[icon];

  return (
    <div className={cn(styles.sidebarItem, className)} onClick={onClick}>
      {iconObject && <FontAwesomeIcon icon={iconObject} className={styles.icon}/>}
      <span className={styles.text}>{label}</span>
      {rightBadge}
    </div>
  );
};

SidebarItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  rightBadge: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default SidebarItem;
